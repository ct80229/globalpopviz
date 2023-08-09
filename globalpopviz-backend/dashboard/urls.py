from django.urls import path, include
from . import views

urlpatterns = [
    path('api/population/', views.global_population, name='population_data'),
    path('', views.dashboard, name='dashboard'),
    path('api/population-graph/', views.population_graph_data, name='population_graph_data'),
]
