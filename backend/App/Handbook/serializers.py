from .models import *
from rest_framework import serializers

class modelOfMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfMachine
        fields = ('__all__')


class ModelOfEngineSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ModelOfEngine
        fields = ('__all__')


class ModelOfTransmissionSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ModelOfTransmission
        fields = ('__all__')


class ModelOfMainAxleSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ModelOfMainAxle
        fields = ('__all__')


class ModelOfSteeringAxleSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ModelOfSteeringAxle
        fields = ('__all__')

