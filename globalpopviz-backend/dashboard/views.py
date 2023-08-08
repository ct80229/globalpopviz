from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Country, PopulationGrowthTotal, PopulationGrowthPercent
from django.db.models import Sum
from django.shortcuts import render

@require_GET
def global_population(request):
    try:
        year = request.GET.get('year', 2022)
        population_data = PopulationGrowthTotal.objects.filter(year=year).values('country__name', 'population')
        return JsonResponse({'population_data': list(population_data)})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_GET
def country_population(request, country_name):
    try:
        country = Country.objects.get(name=country_name)
        population = PopulationGrowthTotal.objects.filter(country=country, year=2022).values('population').first()
        if population:
            return JsonResponse({'population': population['population']})
        else:
            return JsonResponse({'error': 'Country not found'}, status=404)
    except Country.DoesNotExist:
        return JsonResponse({'error': 'Country not found'}, status=404)

@require_GET
def population_growth(request, country_name):
    try:
        country = Country.objects.get(name=country_name)
        growth_data = PopulationGrowthPercent.objects.filter(country=country).values('year', 'percent_change')
        return JsonResponse({'growth_data': list(growth_data)})
    except Country.DoesNotExist:
        return JsonResponse({'error': 'Country not found'}, status=404)
    
def dashboard(request):
    return render(request, 'dashboard.html')
