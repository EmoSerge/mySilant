from django.db import models
from django.contrib.auth.models import  User

# Create your models here.


class Users(models.Model):
    class Role(models.TextChoices):
        CONSUMER = 'CR', 'Клиент'
        MANAGER = 'MR', 'Менеджер'
        SERVICECOMPANY = 'SC', 'Сервисная компания'
        
    user = models.OneToOneField(User, related_name='users', verbose_name='Пользователь', on_delete=models.CASCADE)
    role = models.CharField(max_length=2, verbose_name='Роль', choices=Role.choices, default='')
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    # def __str__(self):
    #     return self.user.first_name
    
    def __repr__(self):
        return self.get_role_display()
