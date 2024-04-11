
from utils import db 
from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=10)
    email = models.CharField(max_length=25)
    
    def __str__(self):
        return f'{self.firstname} {self.surname}'
    
class QuestionnaireResponse(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    question1 = models.CharField(max_length=255)
    question2 = models.CharField(max_length=255)
    question3 = models.CharField(max_length=255)
    question4 = models.CharField(max_length=255)

    def __str__(self):
        return f'Responses for {self.user.username}'


users_collection = db['users']
responses_collection = db['responses']




