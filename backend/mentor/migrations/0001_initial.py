# Generated by Django 4.0.5 on 2023-03-05 22:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mentor',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('app.userprofile',),
        ),
        migrations.CreateModel(
            name='ConnectWithMentee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('accepted', 'accepted'), ('pending', 'pending')], max_length=8)),
                ('Mentee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Mentee_Reply', to='app.userprofile')),
                ('Mentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Mentor_Connect_request', to='app.userprofile')),
            ],
            options={
                'verbose_name': 'ConnectToMentee-Request',
            },
        ),
    ]
