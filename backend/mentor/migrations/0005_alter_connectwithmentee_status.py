# Generated by Django 4.0.5 on 2023-03-18 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentor', '0004_alter_connectwithmentee_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connectwithmentee',
            name='status',
            field=models.CharField(choices=[('accepted', 'accepted'), ('pending', 'pending')], max_length=8),
        ),
    ]