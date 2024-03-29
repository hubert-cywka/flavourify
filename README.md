
# Flavourify, v1.0.0 [![Netlify Status](https://api.netlify.com/api/v1/badges/c478081a-aa2a-4b14-a125-58d619c74cfa/deploy-status)](https://app.netlify.com/sites/flavourify/deploys)
Currently deployed at [flavourify.netlify.app](https://flavourify.netlify.app).

![sign-in.png](/.github/media/sign-in.png)

Recipe book app that caters to users' needs (actually, mine needs) by providing a convenient way to maintain collection of recipes. This app also incorporates a user system with JWT, refresh tokens, roles.
One of the app's standout features is the option to create menus. 

Users can plan their meals by selecting recipes from available ones. The app then calculates the required ingredients, streamlining the grocery shopping process.

The app was built using React and TypeScript, utilizing popular libraries such as Material UI, React Query, and React Hook Form for enhanced functionality and user experience. Its Mobile First Design ensures a seamless mobile viewing experience, and thanks to Capacitor, it can be easily converted into a mobile app.

Backend is implemented with usage of Java + Spring Boot.

## Built with
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)


## Features
### What can user do?
- create account and sign in ✅
- change password, nickname and profile picture ✅
- browse recipes available in application ✅
- filter recipes by name, cuisine, type of dish etc. ✅
- add recipes to their biweekly menu ✅
- delete, reorder recipes from menu ✅
- calculate sum of ingredients needed for one specific dish or whole menu ✅
- download app on mobile (apk will be added soon) ✅

### What can admin do?
- everything user can do ✅
- add new recipes via user-friendly form, this includes adding name, tags, recipe steps, image, ingredients ✅
- modify available recipes, delete old ones ✅
- add new dish tags, including `cuisine`, `course`, `diet` and `other` categories ✅
- modify previously added tags, deleting them (this does not allow dishes with those tags) ✅
- browse list of users, changing their role to admin or user, deleting their accounts ✅
- filter users by nickname or email ✅

### Other features
- both JWT and refresh token are used for authentication and authorization ✅
- server status is constantly monitored and displayed to user ✅
- protected access to routes ✅
- global handling of 500, 403 and 401 errors ✅

### Additional things I did
- Automated CI / CD using GitHub Actions, tests are run automatically and if they are successful app is deployed ✅
- Configured development environment (linters, global imports, envs) ✅

## Videos
[Editing dishes, browsing, managing menu](https://user-images.githubusercontent.com/98762890/236290278-e1565e3c-2223-461b-99df-efe14fbc7c28.webm) \
[Settings panel, editing tags, users](https://user-images.githubusercontent.com/98762890/236290300-62d4bbae-4580-4d46-9a60-5538e7dd78a3.webm) \
[Signing up, signing in](https://user-images.githubusercontent.com/98762890/236290307-a01dab8d-1c5a-43c2-bf27-d59af55ee078.webm)

## Gallery

![swipe-again.png](/.github/media/swipe-again.png)
![added-to-menu.png](/.github/media/added-to-menu.png)
![ingredients.png](/.github/media/ingredients.png)
![oops.png](/.github/media/oops.png)
![update-tag.png](/.github/media/update-tag.png)
![delete-tag.png](/.github/media/delete-tag.png)
![no-connection.png](/.github/media/no-connection.png)
![Menu](https://user-images.githubusercontent.com/98762890/236291765-0026e2b9-7b24-430c-9247-97307514db98.png)
![Dish Card Front](https://user-images.githubusercontent.com/98762890/236291771-03dcf1e4-9f0e-41a6-b9bd-04c7e8341112.png)
![Looking for dish](https://user-images.githubusercontent.com/98762890/236291773-12bb9922-e23f-42c8-95ef-ea14dc49c9c7.png)
![Profile](https://user-images.githubusercontent.com/98762890/236291775-d1ad8579-d386-4967-b42a-7d426f5dea43.png)
![Menu Calculator](https://user-images.githubusercontent.com/98762890/236291777-ba2643b7-e4a5-42e4-b289-ce2178bd686c.png)
![sign-up.png](/.github/media/sign-up.png)

## Installation
Just run `npm install` and then `npm run`. Your app should be available at `localhost:3000`.

## Other commands
`npm run test-coverage` - runs unit tests and displays code coverage.

## Config
You can change backend url by setting `REACT_APP_PROD_API_URL` env. I could release openAPI in the future.
