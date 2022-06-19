# Generated by Django 4.0.3 on 2022-06-18 10:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('polls', '0002_product_image_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='DownloadLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tijd', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RenameField(
            model_name='bestelling',
            old_name='datum',
            new_name='factuur_Datum',
        ),
        migrations.AddField(
            model_name='bestelling',
            name='betaald',
            field=models.BooleanField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bestelling',
            name='lever_Datum',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='bestelling',
            name='besteller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Gebruiker',
        ),
    ]
