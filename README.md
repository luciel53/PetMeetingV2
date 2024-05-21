# PetMeeting

![Logo](src/assets/images/logo.png)


PetMeeting is a tool to help cats' breeders to find a breeder. The goal is to facilitate the genetic selection and the races devlopment.

## Front-end Technologies/Installation

### React

I chose to use React to its ability to create dynamic, responsive applications. Also, we can find a lot of documentation on React. I really take pleasure to use it.

To install React and create a new project:

```
$ yarn create react-app PetMeetingV2
```

Then go to the project and start the application:

```
cd PetMeetingV2 && yarn start
```

### React-router

To manage the routes and links, we use React-Router.
To install it:

```
yarn add react-router-dom
```


### TailwindCSS

we chose tailwindcss because it saves us time and allows us to customise it to suit our needs.

To install it:

```
yarn add tailwindcss
```

Create a new `tailwind.config.js` with:

```
npx tailwindcss init
```

Install the plugin Tailwind CSS animated:

```
npm i tailwindcss-animated
```

Then add the plugin to your tailwind.config.js file:

```
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require('tailwindcss-animated')
  ],
}
```

install Axios to manage http requests:
```
npm install axios
```

## Back-end Technologies/Installation

### Django & Python

I've Chosen to use Django, because it offers a lot of features and there are a lot of resources. Also, it uses Python that is a technology with which I have affinities.

to install Python:

```
sudo apt-get install python3
```
In the root directory, create a `back-end` directory, then:
```
cd back-end
```
Install Django:
```
pip install django
```
And create Django project:
```
django-admin startproject PetMeetingBackEnd
```

Install Django Rest Framework:
```
pip install djangorestframework django-cors-headers
```
Go to the directory created:
```
cd PetMeetingBackEnd
```

Create a new Django application:
```
python manage.py startapp petmeeting
```

In the following file, add these lines:
```
cd petmeetingbackend/settings.py
```
```
INSTALLED_APPS = [
    # ...
    # 👇 Add here your installed app's
    'rest_framework',
    'corsheaders',
    'PetmeetingBackEnd',
]

MIDDLEWARE = [
    # ...
    # 👇 Add this line here
    'corsheaders.middleware.CorsMiddleware',
    # Add above line just before this line 👇
    'django.middleware.common.CommonMiddleware',
]

# 👇 Add this line here
CORS_ORIGIN_ALLOW_ALL = True
```

## Usage
to run the project, start the back end by:
```python manage.py runserver```

then, start the front-end by:
```yarn start```



## Contact
Lucie Leroty - l.leroty.pro@gmail.com
