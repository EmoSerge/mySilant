from django.db import models
from django.contrib.auth.models import User


class Users(models.Model):
    class Role(models.TextChoices):
        CLIENT = 'CL', 'Клиент'
        MANAGER = 'MR', 'Менеджер'
        SERVICEORGANIZATION = 'SO', 'Сервисная организация'

    user = models.OneToOneField(User, related_name='users', verbose_name='Пользователь', on_delete=models.CASCADE)
    role = models.CharField(max_length=2, verbose_name='Роль', choices=Role.choices, default='')

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        