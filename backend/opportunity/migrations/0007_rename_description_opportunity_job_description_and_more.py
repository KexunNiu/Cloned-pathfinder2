# Generated by Django 4.0.5 on 2023-03-25 20:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('opportunity', '0006_rename_job_description_opportunity_description_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='opportunity',
            old_name='description',
            new_name='job_description',
        ),
        migrations.RenameField(
            model_name='opportunity',
            old_name='skills',
            new_name='job_skills',
        ),
        migrations.RenameField(
            model_name='opportunity',
            old_name='name',
            new_name='job_title',
        ),
    ]
