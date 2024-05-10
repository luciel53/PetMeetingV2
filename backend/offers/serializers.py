def serialize_offer(offer):
    serialized_offer = {
        'name': offer.name,
        'date_posted': offer.date_posted,
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
        'user': offer.user.username if offer.user else None,  # Assurez-vous que l'utilisateur existe
    }

    # Ajoutez les URL des images s'il y en a
    picture_urls = {}
    if offer.picture:
        picture_urls['picture'] = offer.picture.url
    if offer.picture2:
        picture_urls['picture2'] = offer.picture2.url
    if offer.picture3:
        picture_urls['picture3'] = offer.picture3.url

    serialized_offer.update(picture_urls)
    return serialized_offer
