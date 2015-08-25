# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('password', models.CharField(verbose_name='password', max_length=128)),
                ('last_login', models.DateTimeField(null=True, verbose_name='last login', blank=True)),
                ('is_superuser', models.BooleanField(verbose_name='superuser status', default=False, help_text='Designates that this user has all permissions without explicitly assigning them.')),
                ('first_name', models.CharField(null=True, verbose_name='First Name', default=None, blank=True, max_length=30)),
                ('last_name', models.CharField(null=True, verbose_name='Last Name', default=None, blank=True, max_length=30)),
                ('email', models.EmailField(verbose_name='Email', db_index=True, unique=True, max_length=255)),
                ('is_staff', models.BooleanField(verbose_name='Staff Status', default=False, help_text='Designates whether the user can log into this admin site.')),
                ('is_active', models.BooleanField(verbose_name='active', default=True, help_text='Designates whether this user should be treated as active.  Unselect this instead of deleting accounts.')),
                ('date_joined', models.DateTimeField(verbose_name='date joined', default=django.utils.timezone.now)),
                ('contact', models.CharField(validators=[django.core.validators.RegexValidator(code='nomatch', message='Length has to be 10', regex='^[0-9]{10}$')], max_length=10)),
                ('groups', models.ManyToManyField(to='auth.Group', verbose_name='groups', help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_query_name='user', blank=True, related_name='user_set')),
                ('user_permissions', models.ManyToManyField(to='auth.Permission', verbose_name='user permissions', help_text='Specific permissions for this user.', related_query_name='user', blank=True, related_name='user_set')),
            ],
            options={
                'ordering': ['email'],
                'abstract': False,
            },
        ),
    ]
