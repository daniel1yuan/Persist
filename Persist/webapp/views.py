import json
from django.shortcuts import render
from django.core import serializers

from models import Habit

# Create your views here.
def index(request):
  return render(request, 'webapp/landing.html')
def get_habit(request):
  habit_id = int(request.POST['habit_id'])
  habit_obj = Habit.objects.get(id=habit_id)
  habit_serial = serializers.serialize('json', [habit_obj])
  #[1:-1] to remove brackets?
  return HttpResponse(habit_serial[1:-1], mimetype='application/json')


