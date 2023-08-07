from django.urls import path, include
from . import views

urlpatterns = [
    path('api/population/', views.global_population, name='population_data'),
    path('', views.dashboard, name='dashboard'),
]
