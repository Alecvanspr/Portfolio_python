from django.contrib import admin
from django.urls import include, path
from django.views import View
import re
from polls import views

urlpatterns = [
    path("Producten/", views.homeScreen , name="home"),
    path("Producten/add", views.addProduct, name="Product toevoegen"),
    path("Producten/CreateProduct", views.CreateProduct, name="CreateProduct"),
    path("Producten/product/<value>", views.productPagina, name="product"),
    path("Winkelmandje", views.Winkelmandje, name="Winkelmandje"),
    path("logout", views.logoutUser, name="logout"),
    path("login", views.loginUser, name="login"),
    path("loginValidate", views.LoginValidate, name="log in valitation"),
    path("register",views.Register, name="register"),
    path("registerValidate", views.RegisterUser, name="Register User"),
    path("profile", views.Profile, name="User Profile"),
    path("winkelmandje", views.Winkelmandje, name="Winkelmandje"),
    path("Producten/AddToChart", views.addToWinkelmandje, name="Voeg aan winkelmandje toe"),
    path("winkelmandje/afrekenen", views.afrekenen, name="afrekenen"),
    path("winkelmandje/placeOrder", views.addToDatabase, name="Het in de database voeren van de bestelling"),
    path("winkelmandje/remove/<id>/<aantal>",views.deleteFromWinkelmandje, name="Verwijderd van het winkelmandje"),
    path("bestellingen", views.redirectBestellingen, name="Dit is de redirect naar de bestellingen"),
    path("bestellingen/filter=<filter>", views.Bestellingen , name="Bestellingen"),
    path("bestelling/<id>", views.bestelling, name="Dit is de individuele bestelling"),
    path("downloadfactuur/<id>",views.downloadFactuur, name="Dit is voor het downlaoden van een factuur"),
    path("medewerker",views.werknemerDashboard, name=""),

]