# Generated by Django 4.0.3 on 2022-05-31 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_description',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
