from django.urls import path
from numpy import delete

from . import todoViews
from . import views

#De eerste is de naam die je moet invullen
#Door het gebruik van de <> kan je een variable invullen op de plaats van de naam
urlpatterns = [
    #overig
    path("",views.homeScreen, name="home"),
    path("home", views.home, name="home"),
    path("home/<name>", views.hello_there, name="hello_there"),
    path("Variabelen/<Variabel1>&<Variabel2>&<Variabel3>",views.PaginaMetVariabelen,name="paginaMetVariabelen"),
    path("Lijst", views.PaginaMetLijst , name="home"),
    #Gegevens voor het inloggen
        path("login",todoViews.LoginHome, name="login"),
        path("loginUser", todoViews.Login, name="Logging in"),
        path("register", todoViews.signup, name="register"),
    #Dit is allemaal nodig voor het todo scherm
        path("todo", todoViews.homeMethod, name="home"),
        path("todo/succes", todoViews.succes, name="Succes"),

        #delete
        path("todo/delete/", todoViews.notFound,name="notFound"),
        path("todo/delete/<place>", todoViews.delete, name='delete'),
        path("todo/deleteConfirm", todoViews.deleteConfirm, name='delete Confirmed'),

        #Edit
        path("todo/edit", todoViews.notFound, name="notfound"),
        path("todo/edit/<place>", todoViews.edit, name='edit'),
        path("todo/EditItem", todoViews.EditItem, name="Edit Item"),

        #Add
        path("todo/additem", todoViews.addItem, name="Voeg item toe"),
        path("todo/add",todoViews.add, name="add"),
]