from django.urls import path, include
from rest_framework import routers
from .views import MachineViewSet, MaintenanceViewSet, ComplaintsViewSet, DetailMaintenance

router = routers.SimpleRouter()
router.register(r'machine', MachineViewSet, basename='machine')

router.register(r'maintenance', MaintenanceViewSet, basename='maintenance')
router.register(r'complaints', ComplaintsViewSet, basename='complaints')
router.register(r'detailed', DetailMaintenance, basename='detailed')

urlpatterns = [
    path('', include(router.urls))
]

