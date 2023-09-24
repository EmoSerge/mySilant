from django.contrib import admin
from .models import *

# Register your models here.
class MaintenanceAdmin(admin.ModelAdmin):
    fields = ['machine', 'typeOfMaintenance', 'dateOfMaintenance', 'operatingTime', 'numberOrderWork', 'dateOrderWork', 'maintenanceServiceCompany', 'serviceCompany']
    list_display = ['machine', 'typeOfMaintenance', 'maintenance_made', 'service_Company']
    
    def maintenance_made(self, obj):
        
        machine = obj.machine
        SC = Machine.objects.get(factoryNumberOfMachine = machine)
        
        print(SC.client.id , '-' , obj.maintenanceServiceCompany.id)
        if SC.client_id == obj.maintenanceServiceCompany.id:
            return 'Самостоятельно'
        return obj.maintenanceServiceCompany.first_name
    
    def service_Company(self, obj):
        return obj.serviceCompany.first_name
    
    maintenance_made.short_description = 'Организация, проводившая ТО'
    service_Company.short_description = 'Сервисная компания'
    

class MachineAdmin(admin.ModelAdmin):
      
    list_display = ['factoryNumberOfMachine', 'dateOfShipment', 'supplyContract', 'consumer', 'operationAddress', 'get_client', 'get_serviceCompany']
    
    def get_fields(self, request, obj):
        print(request)
        return super().get_fields(request, obj)
    
    def get_client(self, obj):
        return obj.client.first_name
    
    def get_serviceCompany(self, obj):
        return obj.serviceCompany.first_name

class ComplaintsAdmin(admin.ModelAdmin):
    fields = ['machine', 'dateOfFailure', 'operatingTime', 'nodeOfFailure', 'descriptionOfFailure', 'recoveryMethod', 'usedSpareParts', 'dateOfRecovery', 'serviceCompany']
    list_display = ['machine', 'dateOfFailure', 'operatingTime', 'nodeOfFailure', 'descriptionOfFailure', 'recoveryMethod', 'usedSpareParts', 'downtimeOfMachine', 'dateOfRecovery']
    
admin.site.register(Machine, MachineAdmin)
admin.site.register(Maintenance, MaintenanceAdmin)
admin.site.register(Complaints, ComplaintsAdmin)
