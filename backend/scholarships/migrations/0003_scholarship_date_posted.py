# Generated by Django 4.0.5 on 2023-03-23 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scholarships', '0002_scholarshipapplication_recommend'),
    ]

    operations = [
        migrations.AddField(
            model_name='scholarship',
            name='date_posted',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
