# Generated by Django 4.0.5 on 2023-04-02 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentor', '0020_alter_connectwithmentee_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connectwithmentee',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('accepted', 'accepted')], max_length=8),
        ),
    ]
