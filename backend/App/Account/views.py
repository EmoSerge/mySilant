from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, UsersSerializer
from .models import User
from django.db.models import Q

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ('get',)
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        
        user = User.objects.filter(pk = self.request.user.pk)
        return user
    
    
class UsersViewSet(viewsets.ModelViewSet):
    http_method_names = ('get',)
    serializer_class = UsersSerializer
    permission_classes = [AllowAny, ]
    queryset = User.objects.filter(Q(users__role = 'SC') | Q(users__role = 'CR'))
    