# Generated by Django 4.0.5 on 2023-03-23 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0004_activity_date_posted'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='deadline',
            field=models.DateField(blank=True, null=True),
        ),
    ]
