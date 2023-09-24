from rest_framework import viewsets
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from MainApp.serializers import *
from .serializers import *
from .models import *
# Create your views here.

class ModelOfMachineViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfMachineSerializer
    http_method_names = ('get',)

    def get_queryset(self):
        user = self.request.user
        if user.users.role == 'MR' or user.is_superuser:
            return ModelOfMachine.objects.all()
        
        if user.users.role == 'SC':
            machines = Machine.objects.filter(serviceCompany = user)
            return ModelOfMachine.objects.filter(machine__in = machines)
        
        if user.users.role == 'CR':
            machines = Machine.objects.filter(client = user)
            return ModelOfMachine.objects.filter(machine__in = machines)
            
        response = {'message': 'Требуется авторизация'}
        return Response(response, HTTP_401_UNAUTHORIZED)

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