from rest_framework import serializers
from .models import UserProfile, QuestionnaireResponse
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'firstname', 'surname', 'phone_number', 'email']

class QuestionnaireResponseSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = QuestionnaireResponse
        fields = ['user', 'question1', 'question2', 'question3', 'question4']