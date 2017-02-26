from django.shortcuts import redirect,render
from django.http import Http404, JsonResponse, HttpResponseForbidden, HttpResponse
from django.contrib.auth import authenticate, login, logout
from webapp.models import User, Customer, Habit
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from django.utils import timezone
from datetime import datetime
from webapp.helper import habits_arr, arr_str
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

def logout_user(request):
  logout(request)
  return HttpResponse(json.dumps({"success": True}))

@csrf_exempt
def add_user(request):
  username = request.POST['username']
  password = request.POST['password']
  user = User.objects.create_user(username=username, password=password)
  customer = Customer(user=user, habits="")
  customer.save()
  user.save()
  return HttpResponse(json.dumps({"success": True}))
  
def del_cur_user(request):
  if request.user.is_authenticated():
    user = request.user
    user.delete()
    return HttpResponse(json.dumps({"success": True}))
  else:
    return HttpResponse(json.dumps({"success": False}))

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
  try:
    habit_obj = Habit.objects.get(pk=habit_id)
    habit_serial = serializers.serialize('json', [habit_obj])
    #[1:-1] to remove brackets?
    return HttpResponse(json.dumps(habit_serial[1:-1]), content_type='application/json')
  except Habit.DoesNotExist:
    return HttpResponse(json.dumps({"pk": -1}))

def create_habit(request):
  name = request.POST['name']
  description = request.POST['description']
  monetary_amount = int(request.POST['monetary_amount'])
  end_date = int((request.POST['end_date']))/(1000.0)
  start_date = (datetime.utcnow()-datetime(1970,1,1)).total_seconds()
  last_clicked = (datetime.utcnow()-datetime(1970,1,1)).total_seconds()
  print end_date
  status = int(request.POST['success_status'])
  charity = int(request.POST['charity'])
  user = request.user
  if (not user.is_authenticated()):
    return HttpResponse(json.dumps({"success": False}))
  habit = Habit(name=name,description=description,monetary_amount=monetary_amount,end_date=end_date,status=status,charity=charity,user=user,start_date=start_date,last_clicked=last_clicked)
  habit.save()
  user.customer.habits += "," + str(habit.pk)
  user.customer.save()
  return HttpResponse(json.dumps({"success": True,"pk":habit.pk}))

def delete_habit(request):
  user = request.user
  customer = user.customer
  pk = request.POST['id']
  habit = Habit.objects.get(pk=pk)

  habits = habits_arr(customer.habits)
  index = habits.index(int(pk))
  del(habits[index])
  customer.habits = arr_str(habits)
  customer.save()
  habit.delete()
  return HttpResponse(json.dumps({"success": True}))

def change_habit(request):
  pk = request.POST['id']
  habit = Habit.objects.get(pk=pk)
  if habit is None:
    return HttpResponse(json.dumps({"success": False})) 
  else:
    try:
      habit.name = request.POST['name']
    except:
      habit.name = habit.name
    try:
      habit.description = request.POST['description']
    except:
      habit.description = habit.description
    try:
      habit.monetary_amount = request.POST['monetary_amount']
    except:
      habit.monetary_amount = habit.monetary_amount
    try:
      habit.end_date = int((request.POST['end_date']))/(1000.0) 
    except:
      habit.end_date = int((request.POST['end_date']))/(1000.0)
    try:
      habit.status = request.POST['success_status']
    except:
      habit.status = habit.status
    try:
      habit.charity = request.POST['charity']
    except:
      habit.charity = habit.charity
    habit.save()
    return HttpResponse(json.dumps({"success": True}))

def get_all_habits(request):
  if request.user.is_authenticated():
    habits = habits_arr(request.user.customer.habits)
    json_dict = {}
    for idx in habits:
      cur_habit = Habit.objects.get(pk=idx)
      cur_serial = serializers.serialize('json',[cur_habit])[1:-1]
      json_dict[idx] = cur_serial
    return HttpResponse(json.dumps(json_dict))
  else:
    return HttpResponse(json.dumps({"success": False}))
