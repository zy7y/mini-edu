from ninja import NinjaAPI

ninja_api = NinjaAPI()

from apps.user import views as user_views

ninja_api.add_router("/user", user_views.router, tags=["用户相关"])

from apps.course import views as course_views

ninja_api.add_router("/course", course_views.router, tags=["课程相关"])

