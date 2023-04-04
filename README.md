# Pathfinder-2



[![Running tests](https://github.com/UAlberta-CMPUT401/pathfinder-2/actions/workflows/testing.yaml/badge.svg)](https://github.com/UAlberta-CMPUT401/pathfinder-2/actions/workflows/testing.yaml)
[![Deploy static](https://github.com/UAlberta-CMPUT401/pathfinder-2/actions/workflows/deploy.yaml/badge.svg)](https://github.com/UAlberta-CMPUT401/pathfinder-2/actions/workflows/deploy.yaml)
[![Publish docs via GitHub Pages](https://github.com/UAlberta-CMPUT401/pathfinder-2/actions/workflows/docs.yaml/badge.svg)](https://github.com/UAlberta-CMPUT401/pathfinder-2/actions/workflows/docs.yaml)


Pathfinder ver. 2 (Skillcity Institute) [CSL] is a platform designed to:
- allow clients to post opportunities (training, apprenticeships, jobs, scholarships, etc)
- connect young people/students to activities and opportunities within the city


## Contributors

**Fall 2022**:
- Andrew Li
- Marc-Andre Haley
- Meilin Lyu
- Rahul Singh Bains
- Aryan Malik
- Simiao Zheng

**Winter 2023**:
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao


## License

TBD (closed sourced?)

---


## Links

**Documentation:** [here](https://ualberta-cmput401.github.io/pathfinder-2/)

**Screencast:** [here](https://drive.google.com/file/d/1532NTUHdeYldKoHBajZINTS4dRElZuAH/view?usp=sharing)

**Frontend deployment:** [here](http://[2605:fd00:4:1001:f816:3eff:fe0d:f6c0]:3000/)

**Backend deployment:** [here](http://[2605:fd00:4:1001:f816:3eff:fe0d:f6c0]:8000/)

**API Docs:** [here](http://[2605:fd00:4:1001:f816:3eff:fe0d:f6c0]:8000/docs/)

**Figma:** [here](https://www.figma.com/file/JATWlEXNHDl2tlzTDhrFnK/SkillCity?node-id=2%3A2)

---

# Next.js-Django Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Support me on GitHub](https://img.shields.io/badge/Support-GitHub-ff69b4)](https://github.com/sponsors/Zeyu-Li)

Boilerplate for a Next.js Django app

## Requirements

- nvm
- node
- yarn
- Docker
- Docker-compose
- Make
- next
- cypress

### Running Locally

To run development locally from scratch run `make init` then do `make up` if it is not running already. (If you are on Windows, you may also need to add aliases to C:\Windows\System32\drivers\etc\hosts (see `make hosts`)). Now everything should be running on [platform.pathfinder.test](http://platform.pathfinder.test/) if you did the previous steps correctly. To stop the containers do `make down`

## Frontend

Next.js app with BEM SCSS using JS (TS is overkill for frontend and unit tests are meaningless till at least MVP)

See [platform.pathfinder.test](http://platform.pathfinder.test/) if you added to /etc/hosts (if you are on windows see Windows)

![front.png](./front.png)

---

### Dependencies

To add dependencies, do `make frontend-add package=<named-of-package>`

### Development

To run development first install dependencies with `make init` then do `make up`

## Backend

See [api.platform.pathfinder.test](api.platform.pathfinder.test/) if you added to /etc/hosts (if you are on Windows you may also need to add aliases to C:\Windows\System32\drivers\etc\hosts)

Django backend with logger, email, unit tests

### Testing

When testing email use [mail.platform.pathfinder.test](mail.next-django-template.test) to get the mailhog client to catch mail

### Admin

If you want to make a superuser do `make createsuperuser` and that will create an admin with login credentials of the following:

Username: admin
Password: admin

---

### Add App

To add an app to the backend, do `make new-app app=<named-of-app>`

⚠ When starting a new app you might get errors inf they are not installed locally, in which case comment out dependencies in INSTALLED_APPS in `settings.py`

### Dependencies

To add dependencies, do `make backend-add package=<named-of-package>`

### Migrations

If you change or create model entities, you will need to generate migrations for the DB. Simply run `make migrations` or `make migrations name=migration-name app=app-name` for a named migration where app-name will corresponding to the app where the model was changed. If you do not do this, then your entity changes will not be reflected in the database.

### API documentation

The API documentation can be seen at /swagger/ for swagger version

## DevOps

Docker, Docker-compose, Makefiles, Traefik for proxy handling

To start off do `make init` or do `make up` if you are starting it up again

To bring the services down do `make down`

## Testing

Unit testing for backend and cypress testing for e2e. To run e2e do `make e2e` (unfortunately this does not work on WSL)
Django unit tests can be run using `make unit` and front end tests can be run with `make unit-f`

## TODOS

Here are a list of things you need to do once you decide to use this template

- change constants in frontend/components/constants/constants for front end defaults
- change .env.local to your personal settings
- Change traefik.yml and /etc/hosts for new alias domains
- Auth with JWT: [django-rest-framework-simplejwt.readthedocs.io/en/latest](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
- Cron jobs for backend: [gutsytechster.wordpress.com/2019/06/24/how-to-setup-a-cron-job-in-django](https://gutsytechster.wordpress.com/2019/06/24/how-to-setup-a-cron-job-in-django/)

### Recommendations

- use [djoser](https://djoser.readthedocs.io/en/latest/getting_started.html) for fast django auth
- set up CI/CD for testing

## Development Workflow

### Branches

Main should be the production env while dev branch is pre-production. Any other feature or bug can be added as a new branch in the format of project name followed by the ticket number (ie NDT-00401)

### PRs

PRs likewise should have project name followed by the ticket number and optionally include the epic it is a part of. In addition a description should be included

Example: NDT-00401(MVP): Finished frontend as part of the MVP

Where MVP is the current epic

### Support

With inspiration from [github.com/vintasoftware/django-react-boilerplate](https://github.com/vintasoftware/django-react-boilerplate)
