from django.contrib import admin
from .models import Groep, SubGroep, Transactie

# Register your models here.
class TransactieAdmin(admin.ModelAdmin):
    list_display = ('naam','type','datum','bedrag')

class GroepAdmin(admin.ModelAdmin):
    list_display= ('naam','beschrijving','icoon')

class SubGroepAdmin(admin.ModelAdmin):
    list_display=  ('naam', 'beschrijving')

admin.site.register(Transactie, TransactieAdmin)
admin.site.register(Groep, GroepAdmin)
admin.site.register(SubGroep, SubGroepAdmin)