from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^home/$', views.home, name='home'),
  url(r'^login/$', views.login_page, name='login_page'),
  url(r'^_auth/$', views.is_logged_in, name='auth'),
  url(r'^_login/$', views.login_user, name='login'),
  url(r'^_logout/$', views.logout_user, name='logout'),
  url(r'^_adduser/$', views.add_user, name='add_user'),
  url(r'^_del_cur_user/$', views.del_cur_user, name='del_cur_user'),
  url(r'^_deluser/$', views.del_user, name='deluser'),  
  url(r'^_get_habit/$', views.get_habit, name='get_habit'),
  url(r'^_create_habit/$', views.create_habit, name='create_habit'),
  url(r'^_change_habit/$', views.change_habit, name='change_habit'),
]
