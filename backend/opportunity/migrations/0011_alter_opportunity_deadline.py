# Generated by Django 4.0.5 on 2023-04-03 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('opportunity', '0010_opportunityapplication_recommend'),
    ]

    operations = [
        migrations.AlterField(
            model_name='opportunity',
            name='deadline',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]