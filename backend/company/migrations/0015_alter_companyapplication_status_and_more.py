# Generated by Django 4.0.5 on 2023-03-26 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0014_alter_companyapplication_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyapplication',
            name='status',
            field=models.CharField(blank=True, choices=[('pending', 'pending'), ('accepted', 'accepted')], max_length=8),
        ),
        migrations.AlterField(
            model_name='connecttocompany',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('accepted', 'accepted')], default='accepted', max_length=8),
        ),
    ]
