Released 02.06.2023

- Flavourify (frontend) - https://github.com/hejs22/flavourify

== Version overview
First major version of Flavourify brings these functionalities:

==== Recipes
- Admin can add, modify and remove dish recipes
- Every user can read any recipe and add it to menu
- For anyone needing inspiration, new section with proposed recipes was added
- Recipes can be filtered by tag or dish name

==== Tags
- Admin can add, modify and remove dish tags
- Every user can filter dishes by available tags

==== Accounts
- User can create account, sign in, change profile picture, username and password
- Admin can manage roles, list and delete users

==== Menus
- Users can add their favourite dishes to menu
- After adding recipes to menu, users can see summarized list of ingredients
- Users can change order of dishes in their menu or remove them

==== Other features
- Connection status is constantly monitored and user can access that information
- Application can be converted to android apk

=== Deployment
Frontend is deployed on Netlify https://flavourify.netlify.app

=== Dependencies
List of dependencies compatible with 1.0.0 version of Flavourify

    "@capacitor/android": "4.6.3",
    "@capacitor/core": "^4.6.3",
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@hello-pangea/dnd": "^16.2.0",
    "@hookform/resolvers": "^3.1.0",
    "@mui/icons-material": "^5.11.0",
    "@mui/lab": "^5.0.0-alpha.120",
    "@mui/material": "^5.11.8",
    "@tanstack/react-query": "^4.24.9",
    "@types/node": "^16.18.12",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@use-gesture/react": "^10.2.26",
    "axios": "^1.3.2",
    "browser-image-compression": "^2.0.0",
    "jwt-decode": "^3.1.2",
    "notistack": "^3.0.1",
    "prettier": "^2.8.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.43.9",
    "react-router": "^6.8.1",
    "react-router-dom": "^6.8.1",
    "react-scripts": "5.0.1",
    "react-spring": "^9.7.1",
    "swiper": "^9.2.2",
    "web-vitals": "^2.1.4",
    "yup": "^1.1.1"

==== Tests

1) Unit tests

Frontend uses *jest* and *react-testing-library* for tests, which are run automatically on each build thanks to configured github actions workflow. To manually run tests with coverage report, run "*npm test -- --coverage --watchAll*"

2) UATs

All functionalities have been checked manually by users, including:

- Creating, editing, removing, filtering and displaying dish recipes
- Adding recipes to menu, changing order, displaying, calculating ingredients
- Creating, editing, removing and displaying tags
- Signing up, signing in
- Filtering, displaying, removing users and changing their role
- Changing username, password and profile picture