from django.urls import path, include

from . import views

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:user_id>/settings/', views.settings, name='settings'),
    path('<int:user_id>/game/', views.game, name='game'),
]

urlpatterns += staticfiles_urlpatterns()
