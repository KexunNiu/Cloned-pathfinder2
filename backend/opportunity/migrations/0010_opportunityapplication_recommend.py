# Generated by Django 4.0.5 on 2023-03-26 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('opportunity', '0009_rename_description_opportunity_job_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='opportunityapplication',
            name='recommend',
            field=models.BooleanField(default=False),
        ),
    ]
