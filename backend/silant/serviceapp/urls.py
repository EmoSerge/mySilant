from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.SimpleRouter()

router.register(r'machine', MachineViewSet, basename='machine')
router.register(r'to', TOViewSet, basename='to')
router.register(r'complaints', ComplaintsViewSet, basename='complaints')
router.register(r'detailed', DetailTO, basename='detailto')

router.register(r'technic', ModelOfTechnicViewSet, basename='technic')
router.register(r'modelOfEngine', ModelOfEngineViewSet, basename='modelOfEngine')
router.register(r'modelOfTransmission', ModelOfTransmissionViewSet, basename='modelOfTransmission')
router.register(r'modelOfMainBridge', ModelOfMainBridgeViewSet, basename='modelOfMainBridge')
router.register(r'modelOfSteerableBridge', ModelOfSteerableBridgeViewSet, basename='modelOfSteerableBridge')
router.register(r'typeOfTO', TypeofTOViewSet, basename='typeOfMaintenance')
router.register(r'failureType', FailureTypeViewSet, basename='failureType')
router.register(r'recoveryMethod', RecoveryMethodViewSet, basename='recoveryMethod')

urlpatterns = [
    path('', include(router.urls))
]