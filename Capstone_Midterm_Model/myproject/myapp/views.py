from django.shortcuts import render

from django.http import JsonResponse
from .model import predict

def predict_view(request):
    if request.method == 'POST':
        data = request.POST.get('input_data')
        prediction = predict([data])  # Adjust according to model requirements
        return JsonResponse({'prediction': prediction.tolist()})
    return JsonResponse({'error': 'Invalid request'}, status=400)



# Create your views here.
