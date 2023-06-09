# Generated by Django 4.0.5 on 2023-04-02 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0019_alter_companyapplication_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyapplication',
            name='status',
            field=models.CharField(blank=True, choices=[('accepted', 'accepted'), ('pending', 'pending')], max_length=8),
        ),
        migrations.AlterField(
            model_name='connecttocompany',
            name='status',
            field=models.CharField(choices=[('accepted', 'accepted'), ('pending', 'pending')], default='accepted', max_length=8),
        ),
    ]
