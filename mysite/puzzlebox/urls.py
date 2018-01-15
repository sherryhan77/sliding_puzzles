from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include

from . import views

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout,name='logout'),
    url(r'^admin/',admin.site.urls),
    path('', views.index, name='index'),
    path('<int:user_id>/settings/', views.settings, name='settings'),
    path('<int:user_id>/game/', views.game, name='game'),
]

urlpatterns += staticfiles_urlpatterns()
