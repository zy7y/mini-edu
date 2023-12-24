from django.db import models
from mdeditor.fields import MDTextField

from apps.user.models import User

# Create your models here.

default_tell = """#### 课程须知
如果有问题及时反馈  
#### 你能学到什么
Django Ninja & React 前后端的使用
"""


class Course(models.Model):
    name = models.CharField(max_length=50, verbose_name="名称")
    briefly = models.CharField(max_length=255, verbose_name="简介")
    level = models.IntegerField(choices=((3, '初级'), (2, '中级'), (1, '高级')), verbose_name="难度")
    study_number = models.IntegerField(verbose_name="学习人数", default=0)
    tell = MDTextField(verbose_name="需要告知的内容", default=default_tell)
    image = models.ImageField(upload_to="courses/", verbose_name="图片")
    sort_number = models.IntegerField(default=999, verbose_name="序号")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "课程"
        verbose_name_plural = "课程管理"


class Chapter(models.Model):
    name = models.CharField(max_length=50, verbose_name="名称")
    briefly = models.CharField(max_length=200, verbose_name="简介")
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, verbose_name="所属课程", null=True)
    sort_number = models.IntegerField(default=999, verbose_name="序号")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "章节"
        verbose_name_plural = "章节管理"


class Video(models.Model):
    title = models.CharField(max_length=100, verbose_name="标题")
    video = models.FileField(upload_to="videos/", verbose_name="视频文件")
    chapter = models.ForeignKey(Chapter, verbose_name="所属章节", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "视频"
        verbose_name_plural = "视频管理"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name="用户", null=True)
    content = models.TextField(verbose_name="评论内容")
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, verbose_name="课程", null=True)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = "评论"
        verbose_name_plural = "评论管理"


class UserHub(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name="用户")
    act_type = models.IntegerField(choices=((1, '学习'), (2, '收藏')))
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, verbose_name="课程")

    def __str__(self):
        return self.user.username + f" {self.act_type} "  + self.course.name

    class Meta:
        verbose_name = "操作记录"
        verbose_name_plural = "用户操作记录"
