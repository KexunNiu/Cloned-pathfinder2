from django.apps import AppConfig


class MentorConfig(AppConfig):
    name = 'mentor'

    def ready(self):
        import mentor.signals
