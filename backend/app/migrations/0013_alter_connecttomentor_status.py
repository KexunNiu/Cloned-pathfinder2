# Generated by Django 4.0.5 on 2023-03-25 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_alter_connecttomentor_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connecttomentor',
            name='status',
            field=models.CharField(choices=[('accepted', 'accepted'), ('pending', 'pending')], max_length=8),
        ),
    ]
