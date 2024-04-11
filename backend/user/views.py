from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from .models import UserProfile, users_collection
import json
from bson import ObjectId
import logging
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from .models import responses_collection
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth import login as django_login
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile, QuestionnaireResponse
from .serializers import UserProfileSerializer, QuestionnaireResponseSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class MongoUser:
    def __init__(self, user_data):
        self.username = user_data['username']
        self.password = user_data['password']
        self.is_authenticated = True
        self.is_active = True 

logger = logging.getLogger(__name__)

def index(request):
    return HttpResponse("<h1> App is running..</h1>")

@csrf_exempt
def add_user(request):
    if request.method != 'POST':
        return HttpResponse("Invalid request method")

    data = json.loads(request.body.decode('utf-8'))
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return HttpResponse("Username and password are required")

    if User.objects.filter(username=username).exists():
        return HttpResponse("A user with this username already exists")

    user = User.objects.create_user(
        username=username,
        password=password,
        email=data.get("email", ""),
        first_name=data.get("firstname", ""),
        last_name=data.get("surname", ""),
    )
    user.save()

    users_collection.insert_one({
        "username": username,
        "password": user.password,
        "email": data.get("email", ""),
        "firstname": data.get("firstname", ""),
        "surname": data.get("surname", ""),
        "phone_number": data.get("phone_number", ""),
    })

    return HttpResponse("New user is added")

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        logger.info(f"Received login request for username: {username} with password: {password}")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            # user exists in Django, login successful
            logger.info(f"User {username} authenticated successfully")

            # log the hashed password stored in the database
            logger.debug(f"Hashed password in database: {user.password}")

            # log the hashed version of the provided password
            provided_password_hash = make_password(password)
            logger.debug(f"Hashed password from input: {provided_password_hash}")

            # verify the provided password against the stored hashed password
            if check_password(password, user.password):
                # Passwords match, login successful
                django_login(request, user)
                return JsonResponse({'success': True})
            else:
                # passwords do not match
                logger.error(f"Password provided for user {username} does not match the stored password")
                return JsonResponse({'success': False, 'error': 'Invalid username or password'})
        else:
            # user does not exist in Django or password does not match
            logger.error(f"Failed login attempt for username: {username}")
            return JsonResponse({'success': False, 'error': 'Invalid username or password'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    user_profile = UserProfile.objects.get(user=user)
    return JsonResponse({
        'first_name': user.firstname,
        'last_name': user.lastname,
        'username': user.username,
        'email': user.email,
        'phone_number': user_profile.phone_number,  
    })


def list_users(request):
    users = users_collection.find()  # Retrieve all users from MongoDB
    users_list = list(users)  # Convert Cursor to list
    # Convert list of MongoDB objects to list of dictionaries
    users_dict = [{k: (str(v) if isinstance(v, ObjectId) else v) for k, v in user.items()} for user in users_list]
    return JsonResponse(users_dict, safe=False)


@csrf_exempt
def submit_responses(request):
    data = json.loads(request.body)
    data['userId'] = ObjectId(data['userId'])  # convert userId to ObjectId

    # Get the user
    user = User.objects.get(id=data['userId'])

    # Store the user with the responses
    data['user'] = user
    responses_collection.insert_one(data)

    return JsonResponse({"message": "Success"}, status=201)

   
class UserProfileList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    
    def get(self, request):
        profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(profiles, many=True)
        return Response(serializer.data)

class QuestionnaireResponseList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        responses = QuestionnaireResponse.objects.all()
        serializer = QuestionnaireResponseSerializer(responses, many=True)
        return Response(serializer.data)