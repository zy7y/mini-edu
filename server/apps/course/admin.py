from django.contrib import admin

from .models import Course, Chapter, Video, Comment, UserHub


class ChapterInline(admin.StackedInline):
    model = Chapter
    extra = 0


# 内联
class VideoInline(admin.StackedInline):
    model = Video
    extra = 0


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'briefly', 'level', 'study_number', 'sort_number')
    search_fields = ('name',)
    inlines = [ChapterInline]
    fieldsets = (
        (None, {
            'fields': ('name', 'briefly', 'level', 'tell', 'image', 'sort_number')
        }),
    )


@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('name', 'briefly', 'course', 'sort_number')
    search_fields = ('name',)
    inlines = [VideoInline]
    list_filter = ('course',)


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'chapter',)
    search_fields = ('title',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'content',)
    search_fields = ('user__username', 'course__name',)


@admin.register(UserHub)
class UserHubAdmin(admin.ModelAdmin):
    list_display = ('user', 'act_type', 'course',)
    search_fields = ('user__username', 'course__name',)
    list_filter = ('act_type',)
