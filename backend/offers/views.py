from django.shortcuts import render
from django.http import JsonResponse
from .models import CatOffer
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def catOffer_view(request):
    if request.method == 'POST':
        # Recover the json data
        data = json.loads(request.body)

        # extract form data from json
        name = data.get('name')
        price = data.get('price')
        sex = data.get('sex')
        location = data.get('location')
        blood = data.get('blood')
        diseases_tests = data.get('diseases_tests')
        eye_color = data.get('eye_color')
        fur_color = data.get('fur_color')
        age = data.get('age')
        qualities = data.get('qualities')
        flaws = data.get('flaws')
        free_descriptive_text = data.get('free_descriptive_text')

        # Validate form data
        if not name or not price or not sex or not location or not diseases_tests or not age:
            return JsonResponse({'error': 'Ce champs est obligatoire.'}, status=400)

        # create an instance of Contact model with form data
        offer = CatOffer.objects.create(name=name,
                                        price=price,
                                        sex=sex,
                                        location=location,
                                        blood=blood,
                                        diseases_tests=diseases_tests,
                                        eye_color=eye_color,
                                        fur_color=fur_color,
                                        age=age,
                                        qualities=qualities,
                                        flaws=flaws,
                                        free_descriptive_text=free_descriptive_text,
                                        )

        # answer to the request with a json success message
        return JsonResponse({'success': True})

    return JsonResponse({'error': 'Only POST requests are allowed'})
