import logging
import os.path
from typing import List,  Union

from ninja import Router

from apps.core import R, token_util, auth
from apps.course.models import UserHub, Course
from apps.course.schemas import CourseSchema
from apps.user.models import Banner, User, Feedback
from apps.user.schemas import LoginSchema, BannerSchema, UserSchema, FeedbackSchema, LoginResult
from ninja import File, UploadedFile
from django.contrib.auth.hashers import make_password, check_password

from server import settings

# Create your views here.

router = Router()


@router.post("/login", summary="登录", response=Union[LoginResult, R])
def auth_login(request, auth: LoginSchema):
    try:
        obj = User.objects.get(username=auth.username)
        if not check_password(auth.password, obj.password):
            # 验证失败
            return R.fail("用户名或密码错误")
    except User.DoesNotExist:
        # 用户不存在
        password = make_password(auth.password)  # 对密码进行哈希处理
        obj = User.objects.create(username=auth.username, password=password)

    # 生成token
    token = token_util.build(obj.id)
    return {"token": token, "user": obj}


@router.post("/logout", summary="退出")
def auth_logout(request):
    request.session.clear()
    return R.ok()


@router.post("/avatar", summary="上传头像", **auth)
def auth_avatar(request, avatar: UploadedFile = File(...)):
    root = settings.MEDIA_ROOT / "avatars"
    if not os.path.isdir(root):
        os.mkdir(root)
    with open(root / avatar.name, "wb") as w:
        w.write(avatar.read())
    user = User.objects.get(id=request.auth)
    user.avatar = f"avatars/{avatar.name}"
    user.save()
    return R.ok(data={"url": user.avatar.url})


@router.patch('/profile', summary="修改信息", **auth)
def auth_profile(request, data: UserSchema):
    if obj := data.dict(exclude_unset=True):
        if "password" in obj:
            obj["password"] = make_password(obj["password"])
        User.objects.filter(pk=request.auth).update(**obj)
        return R.ok()
    return R.fail("无效修改")


###

@router.get('/banner', summary="轮播图", response=List[BannerSchema])
def get_banners(request):
    return Banner.objects.all().order_by("-sort_number")


@router.get("/course", summary="根据操作类型获取课程", response=List[CourseSchema], **auth)
def get_courses_by_act_type(request, act_type: int = 1):
    """act_type 1 or 2, 1学习 2收藏"""
    objs = UserHub.objects.filter(user_id=request.auth, act_type=act_type)
    return [obj.course for obj in objs]


@router.post("/course", summary="收藏/学习", **auth)
def add_user_hub(request, course_id: int, act_type: int):
    kwargs = dict(user_id=request.auth, act_type=act_type, course_id=course_id)
    course = Course.objects.filter(id=course_id).first()
    if not course:
        return R.fail("课程不存在")
    try:
        obj = UserHub.objects.get(**kwargs)
        if obj.act_type != 1:
            obj.delete()
            logging.info(f"{obj.user_id} 取消 {act_type} {course_id}")
            return R.ok(msg="已取消收藏")
    except UserHub.DoesNotExist:
        UserHub.objects.create(**kwargs)
        if act_type == 1:
            course.study_number += 1
            course.save()

    return R.ok(msg="收藏成功")


@router.post("/feedback", summary="反馈留言", **auth)
def add_feedback(request, data: FeedbackSchema):
    Feedback.objects.create(user_id=request.auth, **data.dict())
    return R.ok()
