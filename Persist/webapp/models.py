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
  #start_date = models.DateTimeField(auto_now=True)
  #last_clicked = models.DateTimeField(default = django.utils.timezone.now)
  #end_date =  models.DateTimeField(null = True)
  start_date = models.IntegerField(default = 0)
  last_clicked = models.IntegerField(default = 0)
  end_date = models.IntegerField(default = 0)
  
  status = models.IntegerField(default = 0)
  charity = models.IntegerField(default = 0)
  user = models.ForeignKey(User, on_delete = models.CASCADE, null = True)

