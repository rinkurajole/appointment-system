"""This module is defined for user model"""

from django.db import models
from django.core.validators import RegexValidator
from dj_amazatic.user.models import AbstractEmailUser, UserManager


class User(AbstractEmailUser):
    """
    This model User holds the
    information about the registering User
    """
    contact = models.CharField(
        validators=[RegexValidator(
            regex='^[0-9]{10}$',
            message='Length has to be 10',
            code='nomatch')], max_length=10)
