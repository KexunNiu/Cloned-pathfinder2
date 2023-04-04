# Project Requirements

## Executive Summary

This project aims to create a web platform for the Skillcity institute. The web platform would help young people build their career pathways to the future. School students will use this web platform to create their profiles containing their talents, skills, interests, background, courses and micro-credentials. They should be able to find their mentors, connect with companies, and explore activities and scholarships through this platform. The users would be young people(i.e. regular users), mentors, companies and an administrator.

## Project Glossary
- **Activities** - Activities available to users, can earn users badges.

- **Admin** - Website administrator that has access to the admin dashboard in order to manage users, mentors and companies.

- **Company** - A company account that can create opportunities and can reach out to a regular user.

- **E-portfolio** - The user profile description that includes talents, skills, interests, background, courses, and micro-credentials.

- **Mentor** - Can also be a regular user, just requires a field of isMentor on DB user table. Can have a one to many relation with regular user.

- **Scholarships** - scholarship details that can be explored by the user.

- **Regular user** A person who can have a mentor and has access to user opportunities.

- **User** - Any user who can log in to the platform, including both regular users and companies.

## User Stories
### US 1.01 - Sign up (3 pts)
> **As** a regular user, **I want** to sign up with my email address, **so that** I can create an account on the platform.

Note: cannot use OAuth since some schools do not have access to G Suit or equivalent 

> **Acceptance Tests**

> 1. Regular users can sign up with a valid email address, password and name at minimum.
> 2. Regular users can not signup with an invalid email address.
> 3. Regular user’s profile is created after signup.
> 4. Regular users can not sign up with an invalid password.
> 5. Regular users can not sign up with an invalid username.


### US 1.02 - Sign In (2 pts)
> **As** a user, **I want** to sign in with my authenticated email address and password, **so that** I can access my account and the web platform’s functionalities. And I am able to reset my password.

Note: cannot use OAuth since some schools do not have access to G Suit or equivalent.

> **Acceptance Tests**

> 1. Users can sign in with the correct credentials.
> 2. Users can not sign in with the correct email address and invalid password.
> 3. Users can not sign in with an incorrect email address.
> 4. Users can not access the web platform’s functionalities without signing in.

### US 1.03 - Reset Password (5 pts)
> **As** a User, **I want** to reset my password with my email, **so that** I can access my account if I forget my password.

> **Acceptance Tests**

> 1. Users can request to reset their passwords from sign in page with their emails.
> 2. Users are able to receive an email with a link to reset the password after submitting the request.
> 3. Users can enter a new password from the reset password page.
> 4. Password only accepted if it is 8-20 characters long.

### US 2.01 - Edit regular user profile (5 pts)
> **As** a regular user, **I want** to edit my profile **so that** I can update my skills, interests, background, courses and E-portfolio.

> **Acceptance Tests**

> 1. Regular users can edit their skills, interests, background, courses, pictures and E-portfolios on their own profiles.
> 2. Users can not change anything on another regular user’s profile.
> 3. Profile field edit can not be empty.

### US 2.02 - Edit company profile (5 pts)
> **As** a company user, **I want** to have a profile and be able to edit it, **so that** I can show information about the company to other users.

> **Acceptance Tests**

> 1. Companies can edit their bio, picture and opportunities on their profiles.
> 2. Companies can not change anything on another company’s profile.
> 3. Company names and types are accepted only if they are 8-20 characters long, non-empty and don’t contain invalid characters
> 4. Company link is accepted only if it is valid.


### US 2.12 - Badges (2 pts)
> **As** a user, **I want** to have badges on my profile **so that** I can show my accomplishments and skills.

> **Acceptance Tests**

> 1. Users can earn badges by completing activities.
> 2. Badges are shown on the user's profile.
> 3. Test with doing an activity.
> 4. Test with completing an activity.


### US 3.01 - Request a mentor (3 pts)
> **As** a regular user, **I want** to request a mentor of my choosing, **so that** I can safely connect with them. 

> **Acceptance Tests**

> 1. Regular users can view a list of mentors based on interest.
> 2. Users can request to connect with a mentor.

### US 3.02 - Follow Companies (1 pts)
> **As** a regular user, **I want** to follow companies which interest me **so that** I can learn more about them.

> **Acceptance Tests**

> 1. Regular users can search/view all the companies.
> 2. Regular users can follow the company they are choosing.
> 3. Regular users can see a list of companies they are following.

### US 4.01 - Explore scholarships (3 pts)
> **As** a regular user, **I want** to see scholarships that are available and relevant to me **so that** I can apply to them.

> **Acceptance Tests**

> 1. Regular users can see a list of available scholarships relevant to their interests.
> 2. Regular users can apply for the scholarships they are interested in.

### US 4.02 - Explore Activities (3 pts)
> **As** a regular user, **I want** to see activities that are available and relevant to me so I can learn new skills.

> **Acceptance Tests**

> 1. Regular users can see a list of available activities relevant to their interests.
> 2. Regular users can apply for the activities they are interested in.
> 3. Regular users can view the details of each of the activities.

### US 5.01 - Apply to be a company (3 pts)
> **As** a company, **I want** to submit a joining request **so that** I can have a company account on the platform.

> **Acceptance Tests**

> 1. Companies can submit a joining request.
> 2. Companies can not log in to the platform before the joining request is approved by admins.

### US 5.02 - Apply to be a mentor (2 pts)
> **As** a regular user, **I want** to submit a request for being a mentor **so that** I can be approved to be a mentor on the platform.

> **Acceptance Tests**

> 1. Regular users can submit a request to be a mentor.
> 2. Regular users can not be a mentor without submitting the request.

### US 7.01 - Set up profile structures (1 pts)
> **As** an admin, **I want** to be able to set up profile structures, **so that** I can moderate user profiles.

> **Acceptance Tests**

> 1. Admin can add a field to the profiles.
> 2. Admin can delete a field to the profiles.

### US 7.02 - Handle company request (1 pts)
> **As** an admin, **I want** be able to accept or reject company profile request, **so that** I can choose what companies can have access to the platform.

> **Acceptance Tests**

> 1. Admin can accept or reject requests from companies.

### US 7.03 - Handle mentor request (1 pts)
> **As** an admin, **I want** to be able to accept or reject the requests for being a mentor, **so that** I can decide which users could be mentors

> **Acceptance Tests**

> 1. Admin can accept or reject requests for being a mentor.

### US 7.04 - Match mentors and mentees (2 pts)
> **As** an admin, **I want** to be able to match mentors and mentees based on mentees’ requests **so that** regular users can safely connect with mentors.

> **Acceptance Tests**

> 1. Admin can receive mentees’ requests when they request a specific mentor.
> 2. Admin can assign mentors to mentees based on their requests and interests.

### US 7.05 - Manage activities (1 pts)
> **As** an admin, **I want** to be able to add, remove and edit activities **so that** I can moderate the activities.

> **Acceptance Tests**

> 1. Admin can add activities.
> 2. Admin can delete activities.
> 3. Admin can delete activities.

### US 7.06 - Manage Scholarships (1 pts)
> **As** an admin, **I want** to be able to add, remove and edit scholarships **so that** I can moderate the scholarships.

> **Acceptance Tests**

> 1. Admin can add scholarships.
> 2. Admin can delete scholarships.
> 3. Admin can edit the scholarships.

## MoSCoW
### Must Have
* US 1.01 - Sign Up
* US 1.02 - Sign In
* US 1.03 - Reset Password
* US 2.01 - Edit regular user profile
* US 7.01 - Set up profile structure

### Should Have
* US 3.01 - Request a mentor
* US 5.02 - Apply to be a mentor
* US 7.03 - Handle mentor request
* US 7.04 - Match mentee and mentor

### Could Have
* US 2.02 - Edit company profile
* US 2.11 - Badges
* US 3.02 - Follow Companies
* US 4.01 - Explore Scholarships
* US 4.02 - Explore Activities
* US 5.01 - Apply to a company
* US 7.02 - Handle company request
* US 7.05 - Manage activities
* US 7.06 - Manage scholarships

### Won't Have
* Chat Functionality 
* Carrer Goal Tracker

## Similar Products
* [STEMfolio by CEE-STEM:](https://www.cast.org/our-work/projects/cee-stem-careers-opportunity-youth#.XjsosRNKh0s)
    - Provide young people from traditional schools a way to discover the relevant career pathways.
    - We can refer to its e-portfolio to see a good way for user to demonstrate their skills.
    
* [Tallo.com](https://tallo.com/)
    - Tallo is an end-to-end ecosystem for students, job seekers, and customers.
    - Client wants an app very similat to this but have the opportunity list from country = Canada. Tallo is US based.
    - Tallo offers a similar service that we are trying to provide in terms of Profile Strucure and Managing a user's carrer goals. We can get Idea on how to effective Manage activities related to user's carrer goals and give a user a all in one place to manage his carrer goals. We can get idea related to Profile Strucutre and Carrer Managing Dashbaord.

## Open-source Projects
* [Vutuv](https://github.com/vutuv/vutuv)
    - Vutuv is a free and fast career network. More focused on the exchange of contact information and the rating of skills. The networking for people.
    - We can refer to the User Interface of the profile of a regular user to see what kind of fields are used in profile.
* [Diaspora](https://diasporafoundation.org/)
    - Diaspora pioneered the concept of aspects, which means you can organise your contacts according to their role in your life
    - We can refer to their Dashboard Structure and functioanlities

## Technical Resources
### Backend: Django
  * [Django Documentation](https://docs.djangoproject.com/en/4.1/intro/tutorial01/)
 
### Deployment: Docker + Docker-compose + GitHub Actions
  * [Docker](https://docs.docker.com/)
  * [GitHub Actions](https://docs.github.com/en/actions)

### Frontend: Next.js
  * [Next Documentation](https://nextjs.org/)

### Infrastructure: Cybera
  * [Cybera Website](https://www.cybera.ca/)
### Testing: Cyress, Jest
* [Jest](https://jestjs.io/) for Unit tests
* [Cypress](https://www.cypress.io/) for e2e/integration 
* Note that [Django](https://docs.djangoproject.com/en/4.1/topics/testing/overview/) has unit tests built in
