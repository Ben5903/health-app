
from django.contrib import admin
from django.urls import include, path
from user import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
]