# Generated by Django 4.0.5 on 2023-03-25 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_connecttomentor_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connecttomentor',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('accepted', 'accepted')], max_length=8),
        ),
    ]
