# Generated by Django 4.0.5 on 2023-04-02 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0009_alter_activity_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='deadline',
            field=models.DateField(blank=True, null=True),
        ),
    ]
