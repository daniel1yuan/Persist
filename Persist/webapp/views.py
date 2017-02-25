from django.shortcuts import redirect,render
from django.http import Http404, JsonResponse, HttpResponseForbidden, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from webapp.models import User, Customer, Habit
from django.core import serializers

from models import Habit
import json
import os

# Create your views here.
def index(request):
  context = {
    'title': 'Persist'
  }
  if request.user.is_authenticated():
    return redirect("home")
  else:
    return render(request, 'webapp/landing.html', context)

def home(request):
  if request.user.is_authenticated():
    return render(request, 'webapp/home.html')
  else:
    return redirect("login_page")

def login_page(request):
  if request.user.is_authenticated():
    return redirect("home")
  context = {
    'title': 'Persist'
  }
  return render(request, 'webapp/login.html', context)

#Authentication Views
@csrf_exempt
def login_user(request):
  username = request.POST['username']
  password = request.POST['password']
  user = authenticate(username=username, password=password)
  if user is not None:
    login(request, user)
    return HttpResponse(json.dumps({"success": True}))
  else:
    return HttpResponse(json.dumps({"success": False}))

@csrf_exempt
def logout_user(request):
  logout(request)
  return HttpResponse(json.dumps({"success": True}))

@csrf_exempt
def add_user(request):
  username = request.POST['username']
  password = request.POST['password']
  user = User.objects.create_user(username=username, password=password)
  user.save()
  return HttpResponse(json.dumps({"success": True}))
  
def del_cur_user(request):
  if request.user.is_authenticated():
    user = request.user
    user.delete()
    return HttpResponse(json.dumps({"success": True}))
  else:
    return HttpResponse(json.dumps({"success": False}))

@csrf_exempt
def del_user(request):
  user = request.user
  #Check if the admin is logged on
  if user.is_authenticated() and user.has_perm('webapp'):
    username = request.POST['username']
    user = User.objects.get(username=username)
    user.delete()
    return HttpResponse(json.dumps({"success": True}))
  return HttpResponse(json.dumps({"success": False}))

def is_logged_in(request):
  if (request.user.is_authenticated()):
    return HttpResponse(json.dumps({"success": True, "logged_in": True}))
  else:
    return HttpResponse(json.dumps({"success": True, "logged_in": False}))
  return HttpResponse(json.dumps({"success": False}))

def get_habit(request):
  habit_id = int(request.POST['habit_id'])
  habit_obj = Habit.objects.get(id=habit_id)
  habit_serial = serializers.serialize('json', [habit_obj])
  #[1:-1] to remove brackets?
  return HttpResponse(habit_serial[1:-1], mimetype='application/json')
