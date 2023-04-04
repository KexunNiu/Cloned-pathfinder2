# Generated by Django 4.0.5 on 2023-03-05 22:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Companyapplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('background', models.CharField(max_length=300)),
                ('Company_email', models.EmailField(max_length=100)),
                ('website', models.URLField(max_length=100)),
                ('status', models.CharField(blank=True, choices=[('accepted', 'accepted'), ('pending', 'pending')], max_length=8)),
                ('description', models.CharField(blank=True, max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='CompanyProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, null=True)),
                ('info', models.TextField(blank=True, null=True)),
                ('role', models.CharField(default='Company', editable=False, max_length=20)),
                ('description', models.TextField(blank=True, null=True)),
                ('email', models.EmailField(max_length=100, null=True)),
                ('background_info', models.TextField(blank=True, null=True)),
                ('website', models.URLField(blank=True, max_length=100, null=True)),
                ('CompaniesList', models.ManyToManyField(blank=True, related_name='Companies', to=settings.AUTH_USER_MODEL)),
                ('Marked_Connections', models.ManyToManyField(blank=True, related_name='MarkedConnections', to=settings.AUTH_USER_MODEL)),
                ('company_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='Company_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ConnecttoCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('accepted', 'accepted'), ('pending', 'pending')], default='accepted', max_length=8)),
                ('Company_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_to_User', to='company.companyprofile')),
                ('User_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='User_to_company', to='app.userprofile')),
            ],
            options={
                'verbose_name_plural': 'ConnectToCompany-Request',
            },
        ),
    ]