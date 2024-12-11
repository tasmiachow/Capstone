from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_action, name='predict_action'),
]