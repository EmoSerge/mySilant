from django.contrib import admin
from .models import *


@admin.register(FailureType)
class TypeOfFailureAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(RecoveryMethod)
class RecoveryMethodAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(TypeOfTO)
class TypeOfTOAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ModelOfSteerableBridge)
class ModelOfSteerableBridgeAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ModelOfMainBridge)
class ModelOfMainBridgeAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ModelOfTransmission)
class ModelOfTransmissionAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ModelOfEngine)
class ModelOfEngineAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ModelOfTechnic)
class ModelOfMachineAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


class TOAdmin(admin.ModelAdmin):
    fields = ['machine', 'typeOfTO', 'dateOfTO', 'operatingTime', 'numberOrderWork', 'dateOrderWork',
              'maintenanceServiceCompany', 'serviceCompany']
    list_display = ['machine', 'typeOfTO', 'operatingTime', 'maintenance_made', 'service_company']

    def maintenance_made(self, obj):
        machine = obj.machine
        SO = Machine.objects.get(factoryNumberOfMachine=machine)
        if SO.client_id == obj.maintenanceServiceCompany.id:
            return 'Самостоятельно'
        return obj.maintenanceServiceCompany.first_name

    def service_company(self, obj):
        return obj.serviceCompany.first_name

    maintenance_made.short_description = 'Организация, проводившая ТО'
    service_company.short_description = 'Сервисная компания'


class MachineAdmin(admin.ModelAdmin):
    list_display = ['factoryNumberOfMachine', 'dateOfShipment', 'contract', 'consumer', 'operationAddress',
                    'get_client', 'get_serviceCompany']

    def get_fields(self, request, obj):
        print(request)
        return super().get_fields(request, obj)

    @admin.display(description='Клиент')
    def get_client(self, obj):
        return obj.client.first_name

    @admin.display(description='Сервисная компания')
    def get_serviceCompany(self, obj):
        return obj.serviceCompany.first_name


class ComplaintsAdmin(admin.ModelAdmin):
    fields = ['machine', 'dateOfFailure', 'operatingTime', 'nodeOfFailure', 'descriptionOfFailure', 'recoveryMethod',
              'usedSpareParts', 'dateOfRecovery', 'serviceCompany']
    list_display = ['machine', 'dateOfFailure', 'operatingTime', 'nodeOfFailure', 'descriptionOfFailure',
                    'recoveryMethod', 'usedSpareParts', 'downtimeOfMachine', 'dateOfRecovery']


admin.site.register(Machine, MachineAdmin)
admin.site.register(TO, TOAdmin)
admin.site.register(Complaints, ComplaintsAdmin)