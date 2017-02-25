# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-25 03:47
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Habit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('description', models.TextField()),
                ('monetary_amount', models.IntegerField(default=0)),
                ('start_date', models.DateField(default=datetime.date(2017, 2, 24))),
                ('end_date', models.DateField(blank=True)),
                ('status', models.IntegerField(default=0)),
                ('charity', models.IntegerField(default=0)),
            ],
        ),
    ]
