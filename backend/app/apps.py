from django.apps import AppConfig


class AccountsConfig(AppConfig):
    name = 'app'

    def ready(self):
        import app.signals
