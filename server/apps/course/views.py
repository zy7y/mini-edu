from typing import List

from ninja import Router

from apps.core import auth, R
from apps.course.models import Course, Chapter, Comment
from apps.course.schemas import CourseSchema, ChapterSchema, CommentSchema, CommentCreate

# Create your views here.

router = Router()


@router.get('/all', summary="课程列表", response=List[CourseSchema])
def get_course_all(request, name: str = None):
    kwargs = {}
    if name:
        kwargs = {"name__icontains": name}
    return Course.objects.filter(**kwargs).order_by("-sort_number")


@router.get("/{id}", summary="课程详情", response=CourseSchema)
def get_course_by_id(request, id: int):
    return Course.objects.get(id=id)


@router.get('/chapter/list', summary="章节列表", response=List[ChapterSchema])
def get_chapters_by_course_id(request, course_id: int):
    chapters = Chapter.objects.filter(course_id=course_id).all()
    for chapter in chapters:
        setattr(chapter, "videos", chapter.video_set.all())
    return chapters


@router.get('/comment/list', summary="评论列表", response=List[CommentSchema])
def get_comments_by_course_id(request, course_id: int):
    objs = Comment.objects.filter(course_id=course_id).all()
    for obj in objs:
        setattr(obj, "user", obj.user)
    return objs


@router.post("/comment/add", summary="添加评论", **auth)
def add_comment(request, data: CommentCreate):
    Comment.objects.create(**data.dict(), user_id=request.auth)
    return R.ok()
