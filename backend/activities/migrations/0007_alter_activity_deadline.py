# Generated by Django 4.0.5 on 2023-04-02 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0006_alter_activity_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='deadline',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
