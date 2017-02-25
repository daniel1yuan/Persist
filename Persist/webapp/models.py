from __future__ import unicode_literals

from django.db import models

import django.utils

import datetime

# Create your models here.

class User(models.Model):
	username = models.CharField(max_length = 20)
	pass

class Habit(models.Model):
	name = models.CharField(max_length = 20)
	description = models.TextField()
	monetary_amount = models.IntegerField(default = 0)
	start_date = models.DateField(default = django.utils.timezone.now)
	end_date =  models.DateField(blank = True)
	status = models.IntegerField(default = 0)
	charity = models.IntegerField(default = 0)
	user = models.ForeignKey('User', on_delete = models.CASCADE, null = True)


