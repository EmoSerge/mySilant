from django.db import models
from django.urls import reverse
# Create your models here.


class ModelOfMachine(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель машины')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель машины'
        verbose_name_plural = 'Модели машин'
    
    def __str__(self):
        return f'{self.title}'

    

class ModelOfEngine(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель двигателя')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'
        
    def __str__(self):
        return f'{self.title}'


class ModelOfTransmission(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель трансмиссии')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссий'

    def __str__(self):
        return f'{self.title}'


class ModelOfMainAxle(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель ведущего моста')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')
    
    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущих мостов'

    def __str__(self):
        return f'{self.title}'
    
    
class ModelOfSteeringAxle(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель управляемого моста')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')
    
    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемых мостов'
    
    def __str__(self):
        return f'{self.title}'
    
    
class TypeOfMaintenance(models.Model):
    title = models.CharField(max_length=128, verbose_name='Вид ТО')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')
    
    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Виды ТО'
    
    def __str__(self):
        return f'{self.title}'
    
    
class TypeOfFailure(models.Model):
    title = models.CharField(max_length=128, verbose_name='характер отказа')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')
    
    class Meta:
        verbose_name = 'Причина отказа'
        verbose_name_plural = 'Причины отказов'
    
    def __str__(self):
        return f'{self.title}'
    
    
class MethodOfRecovery(models.Model):
    title = models.CharField(max_length=128, verbose_name='Способ восстановления')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')
    
    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'
    
    def __str__(self):
        return f'{self.title}'
    