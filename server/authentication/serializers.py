from rest_framework import serializers
from authentication.models import User
from .models import *


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role',
                  'first_name', 'last_name', 'email_verified', ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=24, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name',
                  'last_name', 'password', 'role']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')

        if not username.isalnum():
            raise serializers.ValidationError(
                'The username should only contain alphanumeric characters')
        return attrs

    def create(self, validated_data):
        # return User.objects.create_user(**validated_data)
        created_user = User.objects.create_user(**validated_data)
        if created_user.role == 'project_owner':
            project_owner = ProjectOwner.objects.create(
                project_owner=created_user)
        if created_user.role == 'reviewer':
            reviewer = Reviewer.objects.create(reviewer=created_user)
        if created_user.role == 'manager':
            manager = Manager.objects.create(manager=created_user)
        if created_user.role == 'coordinator':
            coordinator = Coordinator.objects.create(coordinator=created_user)

        return created_user


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=24, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'token']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')

        user = authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')

        return User.objects.create_user(**validated_data)

#         return super().validate(attrs)

# #


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']
