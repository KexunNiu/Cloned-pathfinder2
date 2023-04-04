# Generated by Django 4.0.5 on 2023-03-05 22:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app', '0001_initial'),
        ('company', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='CompanyFollowerList',
            field=models.ManyToManyField(blank=True, related_name='Followers', to='company.companyprofile'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='MenteeList',
            field=models.ManyToManyField(blank=True, related_name='Mentees', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='MentorsList',
            field=models.ManyToManyField(blank=True, related_name='Mentor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='connecttomentor',
            name='Mentee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Mentee_to_mentor', to='app.userprofile'),
        ),
        migrations.AddField(
            model_name='connecttomentor',
            name='Mentor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Mentor_To_mentee', to='app.userprofile'),
        ),
        migrations.CreateModel(
            name='RegularUser',
            fields=[
            ],
            options={
                'verbose_name_plural': 'RegularUser',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('app.userprofile',),
        ),
        migrations.CreateModel(
            name='RequestToBeMentor',
            fields=[
            ],
            options={
                'verbose_name_plural': 'MakeMentor--Request',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('app.userprofile',),
        ),
    ]
