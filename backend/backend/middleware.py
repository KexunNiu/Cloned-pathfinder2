import zoneinfo
from django.utils import timezone


# Set the current timezone so that datetimes are displayed correctly in the Django admin panel. In the backend, datetimes are still stored in UTC.
class TimezoneMiddleware:
	def __init__(self, get_response):
		self.get_response = get_response


	def __call__(self, request):
		timezone.activate(zoneinfo.ZoneInfo('America/Edmonton'))

		return self.get_response(request)
