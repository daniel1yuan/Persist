from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

import django.utils
import datetime

class Customer(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  habits = models.TextField(null=True)

# Create your models here.
class Habit(models.Model):
	name = models.CharField(max_length = 20)
	description = models.TextField()
	monetary_amount = models.IntegerField(default = 0)
	start_date = models.DateField(default = django.utils.timezone.now)
	end_date =  models.DateField(blank = True)
	status = models.IntegerField(default = 0)
	charity = models.IntegerField(default = 0)
	customer = models.ForeignKey("Customer", on_delete = models.CASCADE, null = True)


