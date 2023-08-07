from django.contrib import admin
from .models import Country, PopulationGrowthTotal, PopulationGrowthPercent

admin.site.register(Country)
admin.site.register(PopulationGrowthTotal)
admin.site.register(PopulationGrowthPercent)
