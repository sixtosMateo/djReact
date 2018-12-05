from django.contrib import admin
from django.urls import path, include


# for auth and registration we didnt do much for the backend add to the urls
 # and change the settings at the bottom
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('articles.api.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))

]
