from django.shortcuts import render

# Create your views here.
def index(request):
	context = {
		"title": "test"
	}
  return render(request, 'webapp/landing.html', context)
