from django.urls import path
from .views import verify_token, predict_action

urlpatterns = [
    path('verify-token/', verify_token, name='verify-token'),
    path('predict-action/', predict_action, name='predict-action'),  
]
