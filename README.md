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

Inside the petmeeting directory, in the views.py, add this lines:

```
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Welcome to PetMeeting!'})
```

In `urls.py` in the `PetMeetingBackEnd` directory, add this lines:
```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('petmeeting/', include('petmeeting.url'))
]
```
Inside the `petmeeting` directory, create the `urls.py` file and add these lines:
```
cd petmeeting
```
```
touch urls.py
```
```
chmod u+x urls.py
```

```
from django.urls import path
from . import views

urlpatterns = [
    path('welcome/', views.welcome, name='welcome'),
]
```

## Usage


## Structure of the project



## Contact

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
