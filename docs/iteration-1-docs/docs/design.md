# Software Design

This page includes a short description of the overall architecture style of the system, its high-level system components, and their logical (what data they exchange) and control (how they invoke each other) dependencies. Mostly described using diagrams.

## Architecture Diagram

A NextJS-Django stack built on Docker and hosted on Cybera. The frontend will be statically built, the django server will be running on a separate container. The server will be running the business and persistence layers. The DB is postgres and will be a docker volume attached to the Django container. In addition emails will be sent through [Sendgrid](https://sendgrid.com/). The frontend will communicate with the backend using REST in JSON (header + body) format. 

![Arch](https://user-images.githubusercontent.com/34993025/196225758-6a9c2718-0148-4e6e-a7f6-5fc573fcc4e7.png)

## UML Class Diagram

This is an ER diagram of the app. There are two main types of accounts, Admin and User. User can follow 0 or many companies. They also have attributes attached to the user and can be extended upon like a mentor. Users can also have badges. Admin manages users, activities and scholarships.

[![UML](https://user-images.githubusercontent.com/34993025/196001244-f85e81a4-945f-4d51-bca5-6fc24089e3cb.png)](https://user-images.githubusercontent.com/34993025/196001244-f85e81a4-945f-4d51-bca5-6fc24089e3cb.png)

## Sequence Diagrams

Multiple sequence diagrams depicting the most important scenarios. There is a diagram for each major user: regular user, admin and company.

[![Sequence](https://user-images.githubusercontent.com/34993025/196001134-495edbd7-e498-4bb1-b364-82aaae3a3624.png)](https://user-images.githubusercontent.com/34993025/196001134-495edbd7-e498-4bb1-b364-82aaae3a3624.png)

## Low-Fidelity User interface

Low-fidelity wireframe of the initial concept. The first image is the landing page. The next is the actual platform where users can use the app to navigate and explore all sorts of items/events. 

[![Low-Fidelity User interface1](https://user-images.githubusercontent.com/34993025/195177837-24fd9520-7f1f-4243-bea8-b1782bc527cb.png)](https://user-images.githubusercontent.com/34993025/195177837-24fd9520-7f1f-4243-bea8-b1782bc527cb.png)

[![Low-Fidelity User interface2](https://user-images.githubusercontent.com/34993025/195176728-680cfea0-eae9-4684-b979-fd3548e55156.png)](https://user-images.githubusercontent.com/34993025/195176728-680cfea0-eae9-4684-b979-fd3548e55156.png)

## Technology List
### Backend
#### Django
High level Python web framework: https://www.djangoproject.com/

#### django rest framework
Toolkit for building Web APIs in django. Also provides api test functionality.: https://www.django-rest-framework.org/

#### djoser
Provides a set of Django Rest Framework views to handle basic authentication actions: https://pypi.org/project/djoser/

#### Sendgrid
Email delivery platform: https://sendgrid.com/

#### Swagger
Provides tools for api documentation: https://swagger.io/

***

### Database
#### SQLite
Lightweight database that is suitable for development: https://www.sqlite.org/index.html

#### PostgreSQL
Powerful, open source object-relational database system, suitable for production: https://www.postgresql.org/

***
 
### Frontend
#### Tailwind
Tailwind is a class based css framework: https://tailwindcss.com/

#### Jest
Jest is a testing framework for the frontend: https://jestjs.io/

#### Cypress
Cypress is an e2e testing framework: https://www.cypress.io/

#### NextJS
A react framework meant to be SSR but has options for static builds: https://nextjs.org/

***

### Deployment
#### Cybera
Not-for-profit corporation responsible for the operation of Alberta's Optical Regional Advanced Network: https://www.cybera.ca/

***

### DevOps
#### Docker
Docker is an container application to isolate and deploy applications: https://www.docker.com/

#### Docker compose
Extends Docker for running multi-container applications: https://docs.docker.com/compose/

#### traefik
Manages container networks: https://traefik.io/



