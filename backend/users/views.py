from firebase_admin import auth
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import load_model, mediapipe_detection, extract_keypoints
import mediapipe as mp
import cv2
import numpy as np
from django.http import JsonResponse

@api_view(['POST'])
def verify_token(request):
    token = request.headers.get('Authorization').split(' ')[1]  # Extract token from 'Bearer <token>'
    try:
        # Verify the Firebase token
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']

        return JsonResponse({'status': 'success', 'uid': uid})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
    
model = load_model()
mp_holistic = mp.solutions.holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

sequences = {}

@csrf_exempt
def predict_action(request):
    if request.method == 'POST' and request.FILES.get('frame'):
        session_id = request.POST.get('session_id', 'default')  # Use session_id to track user
        if session_id not in sequences:
            sequences[session_id] = []  # Initialize a new sequence

        try:
            # Process the uploaded frame
            file = request.FILES['frame']
            file_bytes = np.frombuffer(file.read(), np.uint8)
            frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
            if frame is None:
                return JsonResponse({"error": "Invalid image format."}, status=400)

            # Extract keypoints
            _, results = mediapipe_detection(frame, mp_holistic)
            keypoints = extract_keypoints(results)

            # Append keypoints to the user's sequence
            sequences[session_id].append(keypoints)
            sequences[session_id] = sequences[session_id][-30:]  # Keep last 30 frames

            # If sequence is complete, make a prediction
            if len(sequences[session_id]) == 30:
                res = model.predict(np.expand_dims(sequences[session_id], axis=0))[0]
                predicted_action = int(np.argmax(res))
                predicted_label = ['Hello', 'Bye', 'Good_morning'][predicted_action]
                confidence = [float(c) for c in res]

                # Reset the sequence after prediction
                sequences[session_id] = []

                return JsonResponse({
                    "predicted_action": predicted_action,
                    "predicted_label": predicted_label,
                    "confidence": confidence
                })

            return JsonResponse({"message": f"Frames received: {len(sequences[session_id])}"}, status=200)

        except Exception as e:
            return JsonResponse({"error": f"Internal server error: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request. Please upload a valid image and session_id."}, status=400)
