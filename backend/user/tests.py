from django.test import TestCase, Client
from django.contrib.auth.models import User
import json

class UserViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_add_user(self):
        post_data = {
            "username": "testuser",
            "password": "testpassword",
            "email": "testuser@user.com",
            "firstname": "Test",
            "surname": "User",
            "phone_number": "1234567890",
        }
        response = self.client.post("/user/add/", json.dumps(post_data), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "New user is added")
        self.assertTrue(User.objects.filter(username="testuser").exists())

    def test_login_user(self):
        User.objects.create_user(username="testuser", password="testpassword")
        post_data = {
            "username": "testuser",
            "password": "testpassword",
        }
        response = self.client.post("/user/login/", json.dumps(post_data), content_type="application/json")
        self.assertEqual(response.status_code, 200)







