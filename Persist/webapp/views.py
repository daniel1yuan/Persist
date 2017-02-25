from django.shortcuts import render
from django.shortcuts import redirect
from django.http import Http404, JsonResponse, HttpResponseForbidden, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout

import json
import os

# Create your views here.
def index(request):
  context = {
    'title': 'Persist'
  }
  return render(request, 'webapp/landing.html', context)

def home(request):
  if request.user.is_authenticated():
    return render(request, 'webapp/home.html')
  else:
    return render(request, 'webapp/login.html')

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
  return HttpResponse(json.dumps({"success": False}))
