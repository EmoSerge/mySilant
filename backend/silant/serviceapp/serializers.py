from .models import *
from accountapp.models import *
from rest_framework import serializers


class ModelOfTechnicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfTechnic
        fields = '__all__'


class ModelOfEngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfEngine
        fields = '__all__'


class ModelOfTransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfTransmission
        fields = '__all__'


class ModelOfMainBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfMainBridge
        fields = '__all__'


class ModelOfSteerableBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfSteerableBridge
        fields = '__all__'


class TypeOfTOSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfTO
        fields = '__all__'


class FailureTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureType
        fields = '__all__'


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'


class FirstNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name']


class MachineSerializer(serializers.ModelSerializer):
    modelOfMachine = ModelOfTechnicSerializer(read_only=True)
    modelOfEngine = ModelOfEngineSerializer(read_only=True)
    modelOfTransmission = ModelOfTransmissionSerializer(read_only=True)
    modelOfMainBridge = ModelOfMainBridgeSerializer(read_only=True)
    modelOfSteerableBridge = ModelOfSteerableBridgeSerializer(read_only=True)
    client = FirstNameSerializer(read_only=True)
    serviceCompany = FirstNameSerializer(read_only=True)

    class Meta:
        model = Machine
        fields = '__all__'


class TOSerializer(serializers.ModelSerializer):
    machine = MachineSerializer(read_only=True)
    typeOfTO = TypeOfTOSerializer(read_only=True)
    maintenanceServiceCompany = FirstNameSerializer(read_only=True)
    serviceCompany = FirstNameSerializer(read_only=True)

    class Meta:
        model = TO
        fields = '__all__'


class ComplaintsSerializer(serializers.ModelSerializer):
    machine = MachineSerializer(read_only=True)
    nodeOfFailure = FailureTypeSerializer(read_only=True)
    recoveryMethod = RecoveryMethodSerializer(read_only=True)
    serviceCompany = FirstNameSerializer(read_only=True)

    class Meta:
        model = Complaints
        fields = '__all__'


class DetailedMachineSerilizer(serializers.ModelSerializer):
    complaints_machine = ComplaintsSerializer(many=True, read_only=True)
    machine = TOSerializer(many=True, read_only=True)

    class Meta:
        model = Machine
        fields = ['complaints_machine', 'machine']
