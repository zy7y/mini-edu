from django.contrib import admin
from .models import User, Banner, Feedback


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'nickname', 'avatar')
    search_fields = ('username', 'nickname')
    list_filter = ('username',)
    ordering = ('-id',)


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('image', 'to_id', 'sort_number')
    ordering = ('sort_number',)


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'status', 'phone')
    list_filter = ('status',)
    ordering = ('-id',)


admin.site.site_header = "在线教育后台"
admin.site.site_index = "在线教育"
