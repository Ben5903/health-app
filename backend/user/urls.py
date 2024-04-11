from django.urls import path
from .views import index, add_user, login_user, list_users, submit_responses, profile, UserProfileList, QuestionnaireResponseList

urlpatterns = [
    path('', index),
    path('add/', add_user),
    path('list/', list_users),
    path('submit/', submit_responses),
    path('login/', login_user, name='login_user'),
    path('userprofiles/', profile, name='profile'),
    path('questionnaireresponses/', QuestionnaireResponseList.as_view()),
    
  ]





