from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User, Group, Permission
from .models import Users
# from rest_framework.authtoken.models import Token


@receiver(post_save, sender = Users)
def addToGroup(sender, instance=None, created=False, **kwargs):
  
    if created:
        if instance.role == 'CR':
            group, _created = Group.objects.get_or_create(name = 'Клиент')
            group.permissions.add(Permission.objects.get(id=28))
            group.permissions.add(Permission.objects.get(id=34))
            group.permissions.add(Permission.objects.get(id=36))
            group.permissions.add(Permission.objects.get(id=40))
        
        if instance.role == 'MR':
            group, _created = Group.objects.get_or_create(name = 'Менеджер')
            group.permissions.add(Permission.objects.get(id=26))
            group.permissions.add(Permission.objects.get(id=28))
            group.permissions.add(Permission.objects.get(id=34))
            group.permissions.add(Permission.objects.get(id=36))
            group.permissions.add(Permission.objects.get(id=38))
            group.permissions.add(Permission.objects.get(id=40))
            
        if instance.role == 'SC':
            group, _created = Group.objects.get_or_create(name = 'Сервисная Компания')
            group.permissions.add(Permission.objects.get(id=28))
            group.permissions.add(Permission.objects.get(id=34))
            group.permissions.add(Permission.objects.get(id=36))
            group.permissions.add(Permission.objects.get(id=38))
            group.permissions.add(Permission.objects.get(id=40))
            
        user = User.objects.get(pk = instance.user_id)
        # Token.objects.get_or_create(user=user)
        
        user.groups.add(group)
        user.save()