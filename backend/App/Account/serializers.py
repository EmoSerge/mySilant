from rest_framework import serializers
from .models import User, Users

        
class UserSerializer(serializers.ModelSerializer):
    # role = UsersSerializer(read_only = True)
    role = serializers.SerializerMethodField()
    # group_id = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'username', 'role']
        
    def get_role(self, obj):
        return obj.users.get_role_display()
   

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('__all__')
        
        
class UsersSerializer(serializers.ModelSerializer):
    users = AccountsSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'first_name', 'username', 'users']
