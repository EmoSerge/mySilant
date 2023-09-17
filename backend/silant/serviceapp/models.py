from django.db import models
from django.urls import reverse
from accountapp.models import User


class ModelOfTechnic(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель'
        verbose_name_plural = 'Модели'

    def __str__(self):
        return f'{self.title}'

    def get_absolute_url(self):
        return reverse("model_detail", kwargs={"pk": self.pk, "title": self.title})


class ModelOfEngine(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель двигателя')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = "Модели двигателей"

    def __str__(self):
        return f'{self.title}'


class ModelOfTransmission(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель трансмиссии')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = "Модели трансмиссий"

    def __str__(self):
        return f'{self.title}'


class ModelOfMainBridge(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель ведущего моста')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = "Модели ведущих мостов"

    def __str__(self):
        return f'{self.title}'


class ModelOfSteerableBridge(models.Model):
    title = models.CharField(max_length=128, verbose_name='Модель управляемого моста')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = "Модели управляемых мостов"

    def __str__(self):
        return f'{self.title}'


class TypeOfTO(models.Model):
    title = models.CharField(max_length=128, verbose_name='Вид ТО')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = "Виды ТО"

    def __str__(self):
        return f'{self.title}'


class FailureType(models.Model):
    title = models.CharField(max_length=128, verbose_name='Характер отказа')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Вид поломки'
        verbose_name_plural = "Виды поломок"

    def __str__(self):
        return f'{self.title}'


class RecoveryMethod(models.Model):
    title = models.CharField(max_length=128, verbose_name='Способ восстановления')
    slug = models.SlugField(max_length=128, verbose_name='Название', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        verbose_name = 'Способ ремонта'
        verbose_name_plural = "Способы ремонта"

    def __str__(self):
        return f'{self.title}'


class Machine(models.Model):
    factoryNumberOfMachine = models.CharField(unique=True, primary_key=True, max_length=128,
                                              verbose_name='Зав. № машины')
    modelOfMachine = models.ForeignKey(ModelOfTechnic, verbose_name='Модель техники',
                                       related_name='ModelOfTechnic', on_delete=models.CASCADE)
    modelOfEngine = models.ForeignKey(ModelOfEngine, verbose_name='Модель двигателя',
                                      related_name='ModelOfEngine', on_delete=models.CASCADE)
    factoryNumberOfEngine = models.CharField(max_length=128, verbose_name='Зав. № двигателя')
    modelOfTransmission = models.ForeignKey(ModelOfTransmission, verbose_name='Модель трансмиссии',
                                            related_name='ModelOfTransmission', on_delete=models.CASCADE)
    factoryNumberOfTransmission = models.CharField(max_length=128, verbose_name='Зав. № трансмиссии')
    modelOfMainBridge = models.ForeignKey(ModelOfMainBridge, verbose_name='Модель ведущего моста',
                                          related_name='ModelofMainBridge', on_delete=models.CASCADE)
    factoryNumberOfMainBridge = models.CharField(max_length=128, verbose_name='Зав. № ведущего моста')
    modelOfSteerableBridge = models.ForeignKey(ModelOfSteerableBridge, verbose_name='Модель управляемого моста',
                                               related_name='ModelOfSteerableBridge', on_delete=models.CASCADE)
    factoryNumberOfSteerableBridge = models.CharField(max_length=128, verbose_name='Зав. № управляемого моста')
    contract = models.CharField(max_length=128, verbose_name='Договор поставки №, дата')
    dateOfShipment = models.DateField(verbose_name='Дата отгрузки с завода')
    consumer = models.CharField(max_length=128, verbose_name='Грузополучатель')
    operationAddress = models.CharField(max_length=128, verbose_name='Адрес поставки')
    options = models.TextField(verbose_name='Доп. опции', blank=True)
    client = models.ForeignKey(User, verbose_name='Клиент', related_name='client', on_delete=models.CASCADE)
    serviceCompany = models.ForeignKey(User, verbose_name='Сервисная компания', related_name='ServiceCompany',
                                       on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = "Машины"
        ordering = ['-dateOfShipment']

    def __str__(self):
        return self.factoryNumberOfMachine


class TO(models.Model):
    typeOfTO = models.ForeignKey(TypeOfTO, verbose_name='Вид ТО', related_name='TypeofTO', on_delete=models.CASCADE)
    dateOfTO = models.DateField(verbose_name='Дата проведения ТО')
    operatingTime = models.IntegerField(verbose_name='Наработка, м/час')
    numberOrderWork = models.CharField(max_length=128, verbose_name='№ заказ-наряда')
    dateOrderWork = models.DateField(verbose_name='Дата заказ-наряда')
    maintenanceServiceCompany = models.ForeignKey(User, verbose_name='Организация, проводившая ТО',
                                                  related_name='companyTO', on_delete=models.CASCADE)
    machine = models.ForeignKey(Machine, verbose_name='Машина', related_name='machine', on_delete=models.CASCADE)
    serviceCompany = models.ForeignKey(User, verbose_name='Сервисная компания',
                                       related_name='serviceCompany', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Техническое Обслуживание'
        verbose_name_plural = 'Техническое Обслуживание'
        ordering = ['-dateOfTO']

    def __str__(self):
        return f'{self.pk}'


class Complaints(models.Model):
    dateOfFailure = models.DateField(verbose_name='Дата отказа')
    operatingTime = models.IntegerField(verbose_name='Наработка, м/час')
    nodeOfFailure = models.ForeignKey(FailureType, verbose_name='Узел отказа', related_name='nodeoffailure',
                                      on_delete=models.CASCADE)
    descriptionOfFailure = models.CharField(max_length=128, verbose_name='Описание отказа')
    recoveryMethod = models.ForeignKey(RecoveryMethod, verbose_name='Способ восстановления',
                                       related_name='recoverymethod', on_delete=models.CASCADE)
    usedSpareParts = models.CharField(max_length=128, verbose_name='Используемые запасные части', blank=True)
    dateOfRecovery = models.DateField(verbose_name='Дата восстановления')
    downtimeOfMachine = models.IntegerField(verbose_name='Время простоя', blank=True)
    machine = models.ForeignKey(Machine, verbose_name='Машина', related_name='complaints_machine',
                                on_delete=models.CASCADE)
    serviceCompany = models.ForeignKey(User, verbose_name='Сервисная компания',
                                       related_name='complaints_serviceCompany', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'
        ordering = ['-dateOfFailure']

    def __str__(self):
        return f'{self.pk}'

    def save(self, *args, **kwargs):
        _days = (self.dateOfRecovery - self.dateOfFailure)
        self.downtimeOfMachine = _days.total_seconds() // (24 * 3600)

        super(Complaints, self).save(*args, **kwargs)


