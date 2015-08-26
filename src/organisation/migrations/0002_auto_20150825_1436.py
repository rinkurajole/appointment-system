# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organisation',
            name='date_of_registration',
            field=models.DateTimeField(default=datetime.datetime(2015, 8, 25, 14, 36, 44, 112326)),
        ),
    ]
