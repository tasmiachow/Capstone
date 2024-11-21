from firebase_admin import auth
from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['POST'])
def verify_token(request):
    token = request.headers.get('Authorization').split(' ')[1]  # Extract token from 'Bearer <token>'
    try:
        # Verify the Firebase token
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        
        # Optionally, retrieve or create the user in the Django database
        # For example, get or create a user by Firebase UID.
        # User.objects.get_or_create(firebase_uid=uid)

        return JsonResponse({'status': 'success', 'uid': uid})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
