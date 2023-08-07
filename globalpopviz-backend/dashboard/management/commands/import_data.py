import csv
import os
from django.core.management.base import BaseCommand
from dashboard.models import Country, PopulationGrowthTotal, PopulationGrowthPercent

class Command(BaseCommand):
    help = 'Import data from CSV files.'

    def handle(self, *args, **kwargs):
        #get base directory
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        #paths to csv files
        total_csv_file = os.path.join(base_dir, 'data', 'POPULATION_CHANGE_TOTAL.csv')
        percent_csv_file = os.path.join(base_dir, 'data', 'POPULATION_GROWTH_PERCENT.csv')

        # process POPULATION_CHANGE_TOTAL.csv
        with open(total_csv_file, 'r') as total_file:
            total_reader = csv.reader(total_file)
            headers = next(total_reader)
            for row in total_reader:
                country_name = row[0]
                country, created = Country.objects.get_or_create(name=country_name)
                for idx, population in enumerate(row[1:]):
                    year = headers[idx + 1]
                    PopulationGrowthTotal.objects.create(country=country, year=year, population=population)

        # process POPULATION_GROWTH_PERCENT.csv
        with open(percent_csv_file, 'r') as percent_file:
            percent_reader = csv.reader(percent_file)
            headers = next(percent_reader)
            for row in percent_reader:
                country_name = row[0]
                country, created = Country.objects.get_or_create(name=country_name)
                for idx, percent_change in enumerate(row[1:]):
                    year = headers[idx + 1]
                    # handle empty or non-numeric percent_change values
                    try:
                        percent_change = float(percent_change)
                    except ValueError:
                        percent_change = 0.0 #set to default value if not in csv
                    PopulationGrowthPercent.objects.create(country=country, year=year, percent_change=percent_change)

        self.stdout.write(self.style.SUCCESS('Data imported successfully.'))
