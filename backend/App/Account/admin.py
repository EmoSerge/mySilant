from django.contrib import admin
from .models import Users

# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ['get_username', 'role',]

    @admin.display(description='Клиент')
    def get_username(self, obj):
        return obj.user.first_name

    
admin.site.register(Users, UsersAdmin)