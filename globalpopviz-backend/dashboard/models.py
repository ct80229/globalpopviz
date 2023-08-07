from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)

class PopulationGrowthTotal(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    year = models.PositiveIntegerField()
    population = models.PositiveIntegerField()

class PopulationGrowthPercent(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    year = models.PositiveIntegerField()
    percent_change = models.FloatField()
