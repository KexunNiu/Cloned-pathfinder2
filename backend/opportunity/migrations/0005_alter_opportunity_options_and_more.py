# Generated by Django 4.0.5 on 2023-03-25 20:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('opportunity', '0004_opportunity_deadline'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='opportunity',
            options={'verbose_name': 'Job', 'verbose_name_plural': 'Jobs'},
        ),
        migrations.AlterModelOptions(
            name='opportunityapplication',
            options={'verbose_name': 'Job Application', 'verbose_name_plural': 'Job Applications'},
        ),
        migrations.AlterModelOptions(
            name='opportunitytags',
            options={'verbose_name': 'Job Tag', 'verbose_name_plural': 'Job Tags'},
        ),
    ]
