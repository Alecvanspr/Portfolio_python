from django.urls import path

from . import todoViews
from . import views

#De eerste is de naam die je moet invullen
#Door het gebruik van de <> kan je een variable invullen op de plaats van de naam
urlpatterns = [
    path("",views.home, name="home"),
    path("home", views.home, name="home"),
    path("home/<name>", views.hello_there, name="hello_there"),
    path("Variabelen/<Variabel1>&<Variabel2>&<Variabel3>",views.PaginaMetVariabelen,name="paginaMetVariabelen"),
    path("Lijst", views.PaginaMetLijst , name="home"),
    path("todo", todoViews.home, name="home") 
]