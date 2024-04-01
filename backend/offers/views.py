from django.shortcuts import render
from django.http import JsonResponse
from .models import CatOffer, RACE_CHOICES, SEX_CHOICES, LOCATION_CHOICES, BLOOD_CHOICES, EYECOLOR_CHOICES
import json
import os
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def catOffer_view(request):
    if request.method == 'POST':
        # Recover the json data
        data = json.loads(request.body)

        # extract form data from json
        name = data.get('name')
        race = data.get('race')
        price = data.get('price')
        sex = data.get('sex')
        id_num = data.get('id_num')
        location = data.get('location')
        blood = data.get('blood')
        diseases_tests = data.get('diseases_tests')
        eye_color = data.get('eye_color')
        fur_color = data.get('fur_color')
        age = data.get('age')
        qualities = data.get('qualities')
        flaws = data.get('flaws')
        free_descriptive_text = data.get('free_descriptive_text')
        #get uploaded file
        picture = request.FILES.get('picture')

        # Error form data
        if not name or not race or not price or not sex or not location or not diseases_tests or not age:
            return JsonResponse({'error': 'Ce champs est obligatoire.'}, status=400)

        # create an instance of CatOffer model with form data
        offer = CatOffer.objects.create(name=name,
                                        price=price,
                                        sex=sex,
                                        race=race,
                                        location=location,
                                        blood=blood,
                                        diseases_tests=diseases_tests,
                                        id_num=id_num,
                                        eye_color=eye_color,
                                        fur_color=fur_color,
                                        age=age,
                                        qualities=qualities,
                                        flaws=flaws,
                                        free_descriptive_text=free_descriptive_text,
                                        picture=picture,
                                        )

        if picture:
            # define the image register path
            picture_name = picture.name
            picture_path = os.path.join(settings.MEDIA_ROOT, 'cat_offer_pictures', picture_name)
    
            print(picture_path)

        # save offer in the database
        offer.save()

        # answer to the request with a json success message
        return JsonResponse({'success': True})

    return JsonResponse({'error': 'Only POST requests are allowed'})

def get_form_data(request):
    # get the data from the database
    races = [race[1] for race in RACE_CHOICES]
    sexe = [sex[1] for sex in SEX_CHOICES]
    locations = [location[1] for location in LOCATION_CHOICES]
    bloodtype = [blood[1] for blood in BLOOD_CHOICES]
    eye_color = [eyecolor[1] for eyecolor in EYECOLOR_CHOICES]

    return JsonResponse({
        'races': races,
        'sexe': sexe,
        'locations': locations,
        'bloodtype': bloodtype,
        'eye_color': eye_color,
        })

def get_all_offers(request):
    offers = CatOffer.objects.all()
    # serialize the offers data
    serialized_all_offers = []
    for offer in offers:
        serialized_offers = {'name': offer.name,
                                'price': offer.price,
                                'sex': offer.sex,
                                'race': offer.race,
                                'location': offer.location,
                                'blood': offer.blood,
                                'diseases_tests': offer.diseases_tests,
                                'id_num': offer.id_num,
                                'eye_color': offer.eye_color,
                                'fur_color': offer.fur_color,
                                'age': offer.age,
                                'qualities': offer.qualities,
                                'flaws': offer.flaws,
                                'free_descriptive_text': offer.free_descriptive_text,
                                }
        # check if picture is not none before access its url
        if offer.picture:
            serialized_offers['picture'] = offer.picture.url
        else:
            serialized_offers['picture'] = None

        serialized_all_offers.append(serialized_offers)

    return JsonResponse({'offers': serialized_all_offers})
