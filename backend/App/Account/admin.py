from django.contrib import admin
from .models import Users

# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ['get_username', 'role', 'get_group']
    
    def get_username(self, obj):
        return obj.user.first_name
    
    def get_group(self, obj):
        return obj.user.groups.get()
    
admin.site.register(Users, UsersAdmin)