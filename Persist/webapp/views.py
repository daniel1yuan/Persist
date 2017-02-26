from django.shortcuts import redirect,render
from django.http import Http404, JsonResponse, HttpResponseForbidden, HttpResponse
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
    habit_obj = Habit.objects.get(id=habit_id)
    habit_serial = serializers.serialize('json', [habit_obj])
    #[1:-1] to remove brackets?
    print habit_serial
    print "RETURNING HABIT"
    return HttpResponse(json.dumps(habit_serial[1:-1]), content_type='application/json')
    #return HttpResponse(json.dumps({"success": True}))
  except Habit.DoesNotExist:
    return HttpResponse(json.dumps({"pk": -1}))

def create_habit(request):
  name = request.POST['name']
  description = request.POST['description']
  monetary_amount = int(request.POST['monetary_amount'])
  end_date = request.POST['end_date']
  status = int(request.POST['success_status'])
  charity = int(request.POST['charity'])
  user = request.user
  if (not user.is_authenticated()):
    return HttpResponse(json.dumps({"success": False}))

  habit = Habit(name=name,description=description,monetary_amount=monetary_amount,end_date=end_date,status=status,charity=charity,user=user)
  habit.save()
  print user.customer.habits
  user.customer.habits += "," + str(habit.pk)
  print user.customer.habits
  user.customer.save()
  return HttpResponse(json.dumps({"success": True}))

def delete_habit(request):
  pk = request.POST['id']

def change_habit(request):
  pk = request.POST['id']
  habit = Habit.objects.get(pk=pk)
  if habit is None:
    return HttpResponse(json.dumps({"success": False})) 
  else:
    habit.name = request.POST['name']
    habit.description = request.POST['description']
    habit.monetary_amount = request.POST['monetary_amount']
    habit.end_date = request.POST['end_date']
    habit.status = request.POST['success_status']
    habit.charity = request.POST['charity']
    habit.save()
    return HttpResponse(json.dumps({"success": True}))

