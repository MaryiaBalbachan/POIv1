# POIv1
This project is for Assignment 2 submission for ent-web-dev module at WIT.
It's a basic web app with MongoDB that allows a user to register or login to 
view points of interests as well as add, edit and delete them.
The project includes joi input validation and sanitization of outputs to prevent cross-site scrip injection.
This project is also deployed on Heroku Server:  https://stationproject.herokuapp.com

It include 2 APIs: lifeboatstations and users with some basic unit tests.
Cookies are used to track sessions and hashing and salting of passwords is used to store user passwords.
