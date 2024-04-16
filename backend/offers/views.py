from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import CatOffer, RACE_CHOICES, SEX_CHOICES, LOCATION_CHOICES, BLOOD_CHOICES, EYECOLOR_CHOICES
import json
import os
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from django.contrib.auth.decorators import login_required
import uuid
from rest_framework.views import APIView
from .serializers import serialize_offer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes


@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_offer(request, offerId):
    user = request.user
    # to delete an offer
    if request.method != 'DELETE':
        return HttpResponseNotAllowed(['DELETE'])

    if request.method == 'DELETE':
        if not offerId:
            return JsonResponse({'error': 'Offer ID is required to delete'}, status=400)

        try:
            # get the offer
            offer = CatOffer.objects.get(pk=offerId)

        except CatOffer.DoesNotExist:
            return JsonResponse({'error': 'Offer not found'}, status=404)

        # check if the author is the owner of the offer
        if offer.user != user:
            return JsonResponse({'error': 'You are not the owner of the offer'}, status=403)

        # Delete the offer
        offer.delete()
        return JsonResponse({'success': 'The offer has been successfully deleted'})



@csrf_exempt
def catOffer_view(request):
    user = None
    # check if token is included in the request
    if 'HTTP_AUTHORIZATION' in request.META:
        # obtain the jwt token of the authorization header
        token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
        # create an instance of JWTAuthentication
        print("salouteee", token)
        jwt_authentication = JWTAuthentication()
        try:
            # validate and decode jwt token to obtain the user
            user, _ = jwt_authentication.authenticate(request)
            print("coucou", user)
        except:
            # if token not valid, throw an error
            return JsonResponse({'error': 'Invalid JWT token'}, status=401)
    # else:
    #     # if token not in request, throw an error
    #     return JsonResponse({'error': 'JWT token is missing'}, status=401)

    if request.method == 'POST':
        print(1)
        # extract form data from json
        name = request.POST.get('name')
        race = request.POST.get('race')
        price = request.POST.get('price')
        sex = request.POST.get('sex')
        id_num = request.POST.get('id_num')
        location = request.POST.get('location')
        blood = request.POST.get('blood')
        diseases_tests = request.POST.get('diseases_tests')
        eye_color = request.POST.get('eye_color')
        fur_color = request.POST.get('fur_color')
        age = request.POST.get('age')
        qualities = request.POST.get('qualities')
        flaws = request.POST.get('flaws')
        free_descriptive_text = request.POST.get('free_descriptive_text')
        print(2)

        # Error form data
        if not name or not race or not sex or not location or not diseases_tests or not age:
            return JsonResponse({'error': 'Ce champs est obligatoire.'}, status=400)

        # create an instance of CatOffer model with form data
        print(3)
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
                                        user=user
                                        )
        print(4)
        # Recover the files
        picture = request.FILES.get('picture')
        picture2 = request.FILES.get('picture2')
        picture3 = request.FILES.get('picture3')

        if picture:
            # generate unique file name
            picture_name = str(uuid.uuid4()) + picture.name
            print(picture_name)
            # save the pic in the good directory
            offer.picture.save(picture_name, picture)
        if picture2:
            # generate unique file name
            picture2_name = str(uuid.uuid4()) + picture2.name
            print(picture2_name)
            # save the pic in the good directory
            offer.picture2.save(picture2_name, picture2)
        if picture3:
            # generate unique file name
            picture3_name = str(uuid.uuid4()) + picture3.name
            print(picture3_name)
            # save the pic in the good directory
            offer.picture3.save(picture3_name, picture3)

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
                            'id': offer.id,
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
                            'user': offer.user.username if offer.user else None,
                            'user_id': offer.user.id if offer.user else None,
                            }
        #dictionary to store images url
        picture_urls = {}

        # check if picture is not none before access its url
        if offer.picture or offer.picture2 or offer.picture3:

            # check each image and add its url to dict
            if offer.picture:
                picture_urls['picture'] = offer.picture.url
            if offer.picture2:
                picture_urls['picture2'] = offer.picture2.url
            if offer.picture3:
                picture_urls['picture3'] = offer.picture3.url
            # add dict of images urls to serialized_offer
            serialized_offers.update(picture_urls)
        else:
            #if no images, exclude 'picture' key from serialized_offers
            serialized_offers = {key: value for key, value in serialized_offers.items() if key != 'picture'}

        serialized_all_offers.append(serialized_offers)

    return JsonResponse({'offers': serialized_all_offers})

def get_user_offers(request, user_id):
    offersByUser = CatOffer.objects.filter(user_id=user_id)
    serialized_offers = [serialize_offer(offer) for offer in offersByUser]
    return JsonResponse({'offers': serialized_offers})
