from enum import unique
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.db import models
from django.conf import settings
from helpers.models import TrackingModel
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import jwt
from datetime import datetime, timedelta
# Create your models here.


class MyUserManager(BaseUserManager):
    def _create_user(self, username, first_name, last_name, email, password, role="owner", ** extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')

        if not role:
            role = "owner"

        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, first_name=first_name,
                          last_name=last_name, role=role, **extra_fields)

        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_user(self, username, first_name, last_name, email, password, role, ** extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('email_verified', False)
        return self._create_user(username, first_name, last_name, email, password, role, **extra_fields)

    def create_superuser(self, username, first_name, last_name, email, password, role="admin", ** extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, first_name, last_name, email, password, role, ** extra_fields)


class User(AbstractBaseUser, PermissionsMixin, TrackingModel):

    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    first_name = models.CharField(_('first name'), max_length=150, blank=False)
    last_name = models.CharField(_('last name'), max_length=150, blank=False)
    ## define the list of possible roles
    role_choices = ["project_owner", "admin", "manager",
                    "reviewer", 'implementer', 'coordinator']
    role = models.CharField(
        max_length=25, choices=[(role, role) for role in role_choices], default="project_owner")
    email = models.EmailField(_('email address'), blank=True, unique=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    email_verified = models.BooleanField(
        _('email_verified'),
        default=False,
        help_text=_(
            'Designates whether this user email is verified or not.'
        ),
    )
    objects = MyUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    ROLE_FIELD = 'role'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'role']

    @property
    def token(self):
        token = jwt.encode(
            {'email': self.email, 'username': self.username, 'first_name': self.first_name, 'last_name': self.last_name, 'role': self.role, 'exp': datetime.utcnow() + timedelta(hours=24)}, 'secret', algorithm='HS256')
        return token


class ProjectOwner(models.Model):
    project_owner = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.project_owner.first_name + self.project_owner.last_name


class Reviewer(models.Model):
    reviewer = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)


class Manager(models.Model):
    manager = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)


class Coordinator(models.Model):
    coordinator = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)


class Implementer(models.Model):
    implementer = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
