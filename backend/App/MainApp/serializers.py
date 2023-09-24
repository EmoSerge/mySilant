from .models import *
from Handbook.models import *
from rest_framework import serializers
from Account.models import *
     

class ModelOfMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfMachine
        fields = ['id', 'title',]


class ModelOfEngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfEngine
        fields = ['id', 'title',]


class ModelOfTransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfTransmission
        fields = ['id', 'title',]


class ModelOfMainAxleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfMainAxle
        fields = ['id', 'title',]


class ModelOfSteeringAxleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfSteeringAxle
        fields = ['id', 'title',]


class FirstNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name']
        

class TypeOfMaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfMaintenance
        fields = ('__all__')


class TypeOfFailureSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfFailure
        fields = '__all__'


class MethodOfRecoverySerializer(serializers.ModelSerializer):
    class Meta:
        model = MethodOfRecovery
        fields = '__all__'
        
        
class MachineSerializer(serializers.ModelSerializer):
    modelOfMachine = ModelOfMachineSerializer(read_only=True)
    modelOfEngine = ModelOfEngineSerializer(read_only=True)
    modelOfTransmission = ModelOfTransmissionSerializer(read_only=True)
    modelOfMainAxle = ModelOfMainAxleSerializer(read_only=True)
    modelOfSteeringAxle = ModelOfSteeringAxleSerializer(read_only=True)
    client = FirstNameSerializer(read_only = True)
    serviceCompany = FirstNameSerializer(read_only = True)
    class Meta:
        model = Machine
        fields = ['factoryNumberOfMachine', 'modelOfMachine', 'modelOfEngine', \
                'factoryNumberOfEngine', 'modelOfTransmission', 'factoryNumberOfTransmission', \
                'modelOfMainAxle', 'factoryNumberOfMainAxle', 'modelOfSteeringAxle', \
                'factoryNumberOfSteeringAxle', 'supplyContract', 'dateOfShipment', \
                'consumer', 'operationAddress', 'additionalOptions', 'client', 'serviceCompany']        

        
class MaintenanceSerializer(serializers.ModelSerializer):
    machine = MachineSerializer(read_only = True)
    typeOfMaintenance = TypeOfMaintenanceSerializer(read_only = True)
    maintenanceServiceCompany = FirstNameSerializer(read_only = True)
    serviceCompany = FirstNameSerializer(read_only = True)
    class Meta:
        model = Maintenance
        fields = ['id', 'dateOfMaintenance', 'operatingTime', 'numberOrderWork', \
            'dateOrderWork', 'maintenanceServiceCompany', 'serviceCompany', 'typeOfMaintenance', 'machine']
        
        
class ComplaintsSerializer(serializers.ModelSerializer):
    machine = MachineSerializer(read_only = True)
    nodeOfFailure = TypeOfFailureSerializer(read_only = True)
    recoveryMethod = MethodOfRecoverySerializer(read_only = True)
    serviceCompany = FirstNameSerializer(read_only = True)
    class Meta:
        model = Complaints
        fields = ['id', 'machine', 'dateOfFailure', 'operatingTime', 'nodeOfFailure', \
            'descriptionOfFailure', 'recoveryMethod', 'usedSpareParts', 'dateOfRecovery', \
                'downtimeOfMachine', 'serviceCompany']


class DetailedMachineSerilizer(serializers.ModelSerializer):
    # complaints_machine = serializers.StringRelatedField(many = True)
    # machine = serializers.StringRelatedField(many = True)
    complaints_machine = ComplaintsSerializer(many=True, read_only=True)
    machine = MaintenanceSerializer(many=True, read_only=True)
    class Meta:
        model = Machine
        fields = ['complaints_machine', 'machine']
        
