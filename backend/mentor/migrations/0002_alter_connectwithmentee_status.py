# Generated by Django 4.0.5 on 2023-03-05 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentor', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connectwithmentee',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('accepted', 'accepted')], max_length=8),
        ),
    ]
