from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissionsOrAnonReadOnly, DjangoModelPermissions
from datetime import datetime
import json

from .serializers import *
from .models import *


class ModelOfTechnicViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfTechnicSerializer
    http_method_names = ('get',)

    def get_queryset(self):
        user = self.request.user
        if user.users.role == 'MR' or user.is_superuser:
            return ModelOfTechnic.objects.all()

        if user.users.role == 'SO':
            machines = Machine.objects.filter(serviceCompany=user)
            return ModelOfTechnic.objects.filter(machine__in=machines)

        if user.users.role == 'CL':
            machines = Machine.objects.filter(client=user)
            return ModelOfTechnic.objects.filter(machine__in=machines)

        response = {'message': 'Для доступа необходимо авторизоваться'}
        return Response(response, HTTP_401_UNAUTHORIZED)


class ModelOfEngineViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfEngineSerializer
    http_method_names = ('get',)
    queryset = ModelOfEngine.objects.all()


class ModelOfTransmissionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfTransmissionSerializer
    http_method_names = ('get',)
    queryset = ModelOfTransmission.objects.all()


class ModelOfMainBridgeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfMainBridgeSerializer
    http_method_names = ('get',)
    queryset = ModelOfMainBridge.objects.all()


class ModelOfSteerableBridgeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ModelOfSteerableBridgeSerializer
    http_method_names = ('get',)
    queryset = ModelOfSteerableBridge.objects.all()


class TypeofTOViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TypeOfTOSerializer
    http_method_names = ('get',)
    queryset = TypeOfTO.objects.all()


class FailureTypeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = FailureTypeSerializer
    http_method_names = ('get',)
    queryset = FailureType.objects.all()


class RecoveryMethodViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RecoveryMethodSerializer
    http_method_names = ('get',)
    queryset = RecoveryMethod.objects.all()


class MachineViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
    serializer_class = MachineSerializer
    http_method_names = ('get', 'post')

    def create(self, request, *args, **kwargs):
        if request.method == 'POST':
            data = json.loads(self.request.data['body'])

            new_machine = {
                'factoryNumberOfMachine': data['factoryNumberOfMachine'],
                'modelOfMachine': ModelOfTechnic.objects.get(title=data['modelOfMachine']['title']),
                'modelOfEngine': ModelOfEngine.objects.get(title=data['modelOfEngine']['title']),
                'factoryNumberOfEngine': data['factoryNumberOfEngine'],
                'modelOfTransmission': ModelOfTransmission.objects.get(title=data['modelOfTransmission']['title']),
                'factoryNumberOfTransmission': data['factoryNumberOfTransmission'],
                'modelOfMainBridge': ModelOfMainBridge.objects.get(title=data['modelOfMainBridge']['title']),
                'factoryNumberOfMainBridge': data['factoryNumberOfMainBridge'],
                'modelOfSteerableBridge': ModelOfSteerableBridge.objects.get(title=data['modelOfSteerableBridge']['title']),
                'factoryNumberOfSteerableBridge': data['factoryNumberOfSteerableBridge'],
                'contract': data['contract'],
                'dateOfShipment': data['dateOfShipment'],
                'consumer': data['consumer'],
                'additionalOptions': data['additionalOptions'],
                'operationAddress': data['operationAddress'],
                'client': User.objects.get(first_name=data['client']['first_name']),
                'serviceCompany': User.objects.get(first_name=data['serviceCompany']['first_name']),
            }

            Machine.objects.create(**new_machine)
            res = {'created': True}
            return Response(res, status=status.HTTP_200_OK)

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Machine.objects.all()

        if user.is_superuser or user.users.role == 'MR':
            return Machine.objects.all()

        if user.users.role == 'CL':
            return Machine.objects.filter(client=user)

        if user.users.role == 'SO':
            return Machine.objects.filter(serviceCompany=user)


class TOViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = TOSerializer
    http_method_names = ('get', 'post')

    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            data = self.request.data
            serviceCompany = Machine.objects.get(factoryNumberOfMachine=data['modelOfMachine'])
            if data['serviceCompany'] == "Самостоятельно":
                maintenanceServiceCompany = serviceCompany.client
            else:
                maintenanceServiceCompany = data['serviceCompany']

            new_TO = {
                'machine': Machine.objects.get(factoryNumberOfMachine=data['modelOfMachine']),
                'typeOfMaintenance': TypeOfTO.objects.get(title=data['typeOfMaintenance']),
                'dateOfMaintenance': data['dateOfMaintenance'],
                'operatingTime': data['operatingTime'],
                'dateOrderWork': data['dateOrderWork'],
                'numberOrderWork': data['numberOrderWork'],
                'maintenanceServiceCompany': User.objects.get(username=maintenanceServiceCompany),
                'serviceCompany': User.objects.get(username=serviceCompany.serviceCompany)
            }
            TO.objects.create(**new_TO)
            res = {'created': True}
            return Response(res, status=status.HTTP_200_OK)

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return ''

        if user.is_superuser or user.users.role == 'MR':
            return TO.objects.all()

        if user.users.role == 'CL':
            machine = Machine.objects.filter(client=user)
            return TO.objects.filter(machine__in=machine)

        if user.users.role == 'SO':
            return TO.objects.filter(Q(serviceCompany=user) | Q(maintenanceServiceCompany=user))


class ComplaintsViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = ComplaintsSerializer
    http_method_names = ('get', 'post')

    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            new_complaints = {
                'machine': Machine.objects.get(factoryNumberOfMachine=self.request.data['machine']),
                'dateOfFailure': datetime.strptime(self.request.data['dateOfFailure'], '%Y-%m-%d').date(),
                'operatingTime': self.request.data['operatingTime'],
                'nodeOfFailure': FailureType.objects.get(title=self.request.data['nodeOfFailure']),
                'descriptionOfFailure': self.request.data['descriptionOfFailure'],
                'recoveryMethod': RecoveryMethod.objects.get(title=self.request.data['recoveryMethod']),
                'usedSpareParts': self.request.data['usedSpareParts'],
                'dateOfRecovery': datetime.strptime(self.request.data['dateOfRecovery'], '%Y-%m-%d').date(),
                'serviceCompany': User.objects.get(first_name=self.request.data['serviceCompany'])
            }
            Complaints.objects.create(**new_complaints)
            return Response({'message': 'Рекламация добавлена'}, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return ''

        if user.is_superuser or user.users.role == 'MR':
            return Complaints.objects.all()

        if user.users.role == 'CL':
            machine = Machine.objects.filter(client=user)
            return Complaints.objects.filter(machine__in=machine)

        if user.users.role == 'SO':
            maintenanceOfMachines = TO.objects.filter(
                Q(serviceCompany=user) | Q(maintenanceServiceCompany=user)).values_list('machine_id', flat=True)
            machine = Machine.objects.filter(serviceCompany=user)
            machines = Machine.objects.filter(factoryNumberOfMachine__in=maintenanceOfMachines)
            return Complaints.objects.filter(machine__in=machines)


class DetailTO(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    http_method_names = ['get',]
    queryset = Machine.objects.all()
    serializer_class = DetailedMachineSerilizer
