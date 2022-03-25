Hallo mario

Bij het maken van deze website heb ik gebruik gemaakt van de volgende bronnen
https://code.visualstudio.com/docs/python/tutorial-django 
https://ordinarycoders.com/blog/article/django-models

Om het project te draaien moet je de volgende line gebruiken
python manage.py runserver 

Hierin staat een duidelijke uitwerking over het maken van de site

Hoeronder een overzicht van de belangrijkste classes die nodig zijn voor het werken met de website

#polls/urls.py
HIerin komt het pad te staan naar de bezoekbare paginas.

#polls/views.py
Dit is vergelijkbaar met de controller in C#

#polls/Models.py
Hierin worden de models gemaakt.
Bij het maken van een model moet je deze (zodra je deze wil gebruiken) een migration uitvoeren.
Je kan een migration maken van alle classes door gebruik te maken van de volgende line
Python  manage.py makemigrations {{Naam van het mapje waar het in zit}}
Daarna moet je:
Python manage.py migrate {{Naam van het mapje waar het inzit}}

Het model moet je ook toevoegen in de admin.py. Anders kan je deze niet inzien

#Een adminpanelmaken
door het gebruik van
python manage.py createsuperuser
kan je een email en een wachtwoord aanmaken, hier heb je dan een snel overzicht van de database en de andere gegevens


