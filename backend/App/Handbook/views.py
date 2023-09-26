from rest_framework import viewsets
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from MainApp.serializers import *
from .serializers import *
from .models import *
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenVerifyResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenVerifyView(TokenVerifyView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenVerifyResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenBlacklistResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class DecoratedTokenBlacklistView(TokenBlacklistView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenBlacklistResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class ModelOfMachineViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfMachineSerializer
    http_method_names = ('get',)

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            response = {'message': 'Требуется авторизация'}
            return Response(response, HTTP_401_UNAUTHORIZED)
        if user.users.role == 'MR' or user.is_superuser:
            return ModelOfMachine.objects.all()
        
        if user.users.role == 'SC':
            machines = Machine.objects.filter(serviceCompany = user)
            return ModelOfMachine.objects.filter(machine__in = machines)
        
        if user.users.role == 'CR':
            machines = Machine.objects.filter(client = user)
            return ModelOfMachine.objects.filter(machine__in = machines)
            



class ModelOfEngineViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfEngineSerialiser
    http_method_names = ('get',)
    queryset = ModelOfEngine.objects.all()


class ModelOfTransmissionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfTransmissionSerialiser
    http_method_names = ('get',)
    queryset = ModelOfTransmission.objects.all()


class ModelOfMainAxleViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfMainAxleSerialiser
    http_method_names = ('get',)
    queryset = ModelOfMainAxle.objects.all()


class ModelOfSteeringAxleViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfSteeringAxleSerialiser
    http_method_names = ('get',)
    queryset = ModelOfSteeringAxle.objects.all()


class TypeofMaintenanceViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TypeOfMaintenanceSerializer
    http_method_names = ('get',)
    queryset = TypeOfMaintenance.objects.all()
    
    
class TypeOfFailureViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TypeOfFailureSerializer
    http_method_names = ('get',)
    queryset = TypeOfFailure.objects.all()
    
    
class MethodOfRecoveryViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = MethodOfRecoverySerializer
    http_method_names = ('get',)
    queryset = MethodOfRecovery.objects.all()