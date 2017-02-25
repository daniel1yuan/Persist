from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^home/$', views.home, name='home'),
  url(r'^login/$', views.login_user, name='login'),
  url(r'^logout/$', views.logout_user, name='logout'),
]
