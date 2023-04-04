# Generated by Django 4.0.5 on 2023-03-05 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ConnectToMentor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('accepted', 'accepted'), ('pending', 'pending')], max_length=8)),
            ],
            options={
                'verbose_name_plural': 'ConnectToMentor-Request',
            },
        ),
        migrations.CreateModel(
            name='userProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_picture')),
                ('bio', models.TextField(blank=True, null=True)),
                ('Talents', models.TextField(blank=True, null=True)),
                ('background', models.TextField(blank=True, null=True)),
                ('MakeMeMentor', models.BooleanField(default=False)),
                ('role', models.CharField(choices=[('User/YoungPeople', 'User/YoungPeople'), ('Mentor', 'Mentor'), ('Company', 'Company')], default='User/YoungPeople', max_length=20)),
                ('interests', models.CharField(blank=True, max_length=240, null=True)),
                ('skills', models.CharField(blank=True, max_length=120, null=True)),
                ('first_name', models.CharField(blank=True, max_length=30)),
                ('last_name', models.CharField(blank=True, max_length=30)),
            ],
            options={
                'verbose_name_plural': 'AllUsers',
            },
        ),
    ]