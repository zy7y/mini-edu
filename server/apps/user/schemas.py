from enum import Enum

from ninja import Schema, Field, ModelSchema

from apps.user.models import Banner


class LoginSchema(Schema):
    username: str = Field(..., description="用户名")
    password: str = Field(..., description="密码")


class UserSchema(Schema):
    password: str = Field(None, description="密码")
    nickname: str = Field(None, description="昵称")
    avatar: str = Field(None, description="头像 url")


class UserInfo(Schema):
    username: str = Field(None, description="昵称")
    avatar: str = Field(None, description="头像 url")


class LoginResult(Schema):
    token: str
    user: UserInfo


class BannerSchema(ModelSchema):
    class Meta:
        model = Banner
        fields = "__all__"


class FeedbackSchema(Schema):
    content: str = Field(..., description="内容")
    phone: str = Field(..., max_length=11, min_length=11, description="联系电话")


class ActTypeEnum(Enum):
    TYPE_1 = 1
    TYPE_2 = 2


class UserHubSchema(Schema):
    course_id: int = Field(..., description="课程ID")
    act_type: ActTypeEnum = Field(1, description="操作类型")
    is_add: bool = Field(True, description="是否新增")
