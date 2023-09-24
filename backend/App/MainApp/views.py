from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import MachineSerializer, MaintenanceSerializer, ComplaintsSerializer, DetailedMachineSerilizer
from .models import Machine, Maintenance, Complaints, User
from Handbook.models import *
from django.db.models import Q 
import json
from datetime import datetime

# Create your views here.

class MachineViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
    serializer_class = MachineSerializer
    http_method_names = ('get', 'post')
    
    def create(self, request, *args, **kwargs):
        if request.method == 'POST':
            data = json.loads(self.request.data['body'])
            # data = self.request.data
            
            newMachine = {
                'factoryNumberOfMachine': data['factoryNumberOfMachine'],
                'modelOfMachine': ModelOfMachine.objects.get(title = data['modelOfMachine']['title']),
                'modelOfEngine': ModelOfEngine.objects.get(title = data['modelOfEngine']['title']),
                'factoryNumberOfEngine': data['factoryNumberOfEngine'],
                'modelOfTransmission': ModelOfTransmission.objects.get(title = data['modelOfTransmission']['title']),
                'factoryNumberOfTransmission': data['factoryNumberOfTransmission'],
                'modelOfMainAxle': ModelOfMainAxle.objects.get(title = data['modelOfMainAxle']['title']),
                'factoryNumberOfMainAxle': data['factoryNumberOfMainAxle'],
                'modelOfSteeringAxle': ModelOfSteeringAxle.objects.get(title = data['modelOfSteeringAxle']['title']),
                'factoryNumberOfSteeringAxle': data['factoryNumberOfSteeringAxle'],
                'supplyContract': data['supplyContract'],
                'dateOfShipment': data['dateOfShipment'],
                'consumer': data['consumer'],
                'additionalOptions': data['additionalOptions'],
                'operationAddress': data['operationAddress'],
                'client': User.objects.get(first_name = data['client']['first_name']),
                'serviceCompany': User.objects.get(first_name = data['serviceCompany']['first_name']),
            }
            
            # print(ModelOfMachine.objects.get(title = data['modelOfMachine']['title']))
            Machine.objects.create(**newMachine)
            # machine.save()
            res = {'created': True}
            return Response(res, status=status.HTTP_200_OK)
            
    def get_queryset(self):
        user = self.request.user
        
        if user.is_anonymous:
            return Machine.objects.all()
        
        if user.is_superuser or user.users.role == 'MR':
            return Machine.objects.all()
        
        if user.users.role == 'CR':
            return Machine.objects.filter(client = user)
        
        if user.users.role == 'SC':
            return Machine.objects.filter(serviceCompany = user)



class MaintenanceViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = MaintenanceSerializer
    http_method_names = ('get', 'post')
    
    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            data = self.request.data
            serviceCompany = Machine.objects.get(factoryNumberOfMachine = data['modelOfMachine'])
            if data['serviceCompany'] == "Самостоятельно":
                maintenanceServiceCompany = serviceCompany.client
            else:
                maintenanceServiceCompany = data['serviceCompany']
            
            newMaintenance = {
                'machine': Machine.objects.get(factoryNumberOfMachine = data['modelOfMachine']),
                'typeOfMaintenance': TypeOfMaintenance.objects.get(title = data['typeOfMaintenance']),
                'dateOfMaintenance': data['dateOfMaintenance'],
                'operatingTime': data['operatingTime'],
                'dateOrderWork': data['dateOrderWork'],
                'numberOrderWork': data['numberOrderWork'],
                'maintenanceServiceCompany': User.objects.get(username = maintenanceServiceCompany),
                'serviceCompany': User.objects.get(username = serviceCompany.serviceCompany)
            }
            Maintenance.objects.create(**newMaintenance)
            res = {'created': True}
            return Response(res, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_anonymous:
            return ''
             
        if user.is_superuser or user.users.role == 'MR':
            return Maintenance.objects.all()
        
        if user.users.role == 'CR':
            machine = Machine.objects.filter(client = user)
            return Maintenance.objects.filter(machine__in = machine)
        
        if user.users.role == 'SC':
            return Maintenance.objects.filter(Q(serviceCompany = user) | Q(maintenanceServiceCompany = user))


class ComplaintsViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = ComplaintsSerializer
    http_method_names = ('get', 'post')
    
    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
          
            newComplaints = {
                'machine': Machine.objects.get(factoryNumberOfMachine = self.request.data['machine']),
                'dateOfFailure': datetime.strptime(self.request.data['dateOfFailure'], '%Y-%m-%d').date(),
                'operatingTime': self.request.data['operatingTime'],
                'nodeOfFailure': TypeOfFailure.objects.get(title = self.request.data['nodeOfFailure']),
                'descriptionOfFailure': self.request.data['descriptionOfFailure'],
                'recoveryMethod': MethodOfRecovery.objects.get(title = self.request.data['recoveryMethod']),
                'usedSpareParts': self.request.data['usedSpareParts'],
                'dateOfRecovery': datetime.strptime(self.request.data['dateOfRecovery'], '%Y-%m-%d').date(),
                'serviceCompany': User.objects.get(first_name = self.request.data['serviceCompany'])
            }
            Complaints.objects.create(**newComplaints)
            return Response({'message': 'Запись Добавлен'}, status=status.HTTP_201_CREATED)
        # return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_anonymous:
            return ''
             
        if user.is_superuser or user.users.role == 'MR':
            return Complaints.objects.all()
        
        if user.users.role == 'CR':
            machine = Machine.objects.filter(client = user)
            return Complaints.objects.filter(machine__in = machine)
        
        if user.users.role == 'SC':
            maintenanceOfMachines = Maintenance.objects.filter(Q(serviceCompany = user) | Q(maintenanceServiceCompany = user)).values_list('machine_id', flat=True)
            machine = Machine.objects.filter(serviceCompany = user)
            machines = Machine.objects.filter(factoryNumberOfMachine__in = maintenanceOfMachines)
            return Complaints.objects.filter(machine__in = machines)
 

class DetailMaintenance(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    http_method_names = ['get',]
    queryset = Machine.objects.all()
    serializer_class = DetailedMachineSerilizer
   

        
    