from django.contrib import admin

# Register your models here.
from django.contrib import admin
from storage.models import *

# Register your models here.
class ItemAdmin (admin.ModelAdmin):
    list_display = ['driver_id','time', 'pollution', 'AQI', 'temp', 'humid', 'flood', 'hr', 'meditation', 'medState', 'attention', 'attState', 'lat', 'lng', 'distance', 'duration', 'driverStatus', 'rest']
    list_filter = ()
    search_fields = ['driver_id','time', 'pollution', 'AQI', 'temp', 'humid', 'flood', 'hr', 'meditation', 'medState', 'attention', 'attState', 'lat', 'lng', 'distance', 'duration', 'driverStatus', 'rest']
    list_per_page = 25

admin.site.register(Item, ItemAdmin)