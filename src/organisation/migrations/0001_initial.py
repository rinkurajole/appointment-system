# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LocationContact',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('office_contact', models.CharField(validators=[django.core.validators.RegexValidator(code='nomatch', message='Length has to be 14', regex='\\+?\\d[\\d -]{8,12}\\d')], max_length=14)),
                ('office_email', models.EmailField(unique=True, max_length=30)),
                ('personal_contact', models.CharField(validators=[django.core.validators.RegexValidator(code='nomatch', message='Length has to be 10', regex='^[0-9]{10}$')], max_length=10)),
                ('personal_email', models.EmailField(unique=True, max_length=30)),
                ('address', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Organisation',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('name', models.CharField(validators=[django.core.validators.RegexValidator('^[a-zA-Z]([a-zA-Z0-9]|[- @\\.#&!])*$', message='Only standard names are allowed.')], unique=True, max_length=50)),
                ('date_of_registration', models.DateTimeField(default=datetime.datetime(2015, 8, 25, 14, 36, 33, 991929))),
            ],
        ),
        migrations.CreateModel(
            name='OrganisationLocation',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('no_of_services', models.CharField(max_length=3)),
                ('organisation', models.ForeignKey(to='organisation.Organisation')),
            ],
        ),
        migrations.AddField(
            model_name='locationcontact',
            name='location',
            field=models.ForeignKey(to='organisation.OrganisationLocation'),
        ),
        migrations.AlterUniqueTogether(
            name='organisationlocation',
            unique_together=set([('organisation', 'name')]),
        ),
    ]
