from django.contrib import admin

# Register your models here.
from django.contrib import admin
from storage.models import *

# Register your models here.
class ItemAdmin (admin.ModelAdmin):
    list_display = ['time', 'pollution', 'AQI','temp', 'humid', 'flood', 'hr', 'eeg', 'distance', 'duration']
    list_filter = ()
    search_fields = ['time', 'pollution', 'AQI', 'temp', 'humid', 'flood', 'hr', 'eeg', 'distance', 'duration']
    list_per_page = 25

admin.site.register(Item, ItemAdmin)