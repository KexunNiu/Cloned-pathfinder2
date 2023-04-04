# Project Requirements
## Executive Summary

This project aims to build on an existing web platform created for the [Skillcity Institute](https://www.skillcity.ca/). The web platform would help young people build their career pathways for the future. This project will allow organizations to create and manage postings for various opportunities that they provide. Young people will be able to view, search, and filter these opportunities, apply for them if applicable, and connect with the organizations offering them. Administrators will be able to customize the fields available on users' profiles. The users of this website would be young people (i.e. regular users), mentors, companies, and administrators.



## Project Glossary
- **Activities:** Activities available to users, can earn users badges.

- **Admin:** A website administrator that has access to the admin dashboard. Admins can manage users and add content to the site.

- **E-portfolio:** The name for a young person's user profile. This includes includes talents, skills, interests, background, courses, and micro-credentials.

- **Opportunity:** A posting for an opportunity (training, apprenticeship, job, scholarship, etc.) that can be created by organizations and viewed by young people.

- **Organization (formerly 'company'):** An account type for organizations (companies, non-profits, etc.). Organizations will be able to create opportunities and reach out to young people.

- **Pathfinder (formerly 'skillcity-platform'):** The name of the web platform as requested by the client.

- **Mentor:** A young person that has applied to be a mentor and approved by an admin. Mentors have the `isMentor` field set to true in the DB user table and can have a one-to-many relationship with other young people.

- **User:** Any user who can log in to the platform, including young people, mentors, and organizations. Note that this does not include admins as they are not end users of the project.

- **Young person/people (formerly 'regular user'):** An account type for students and other young people interesting in building their career paths. Young people can follow mentors and can view/apply for opportunities listed by organizations.



## User Stories
### Epic 1 - Post Opportunities as an Organization
#### US 1.01 - [FRONTEND] Make form for creating a new opportunity (3 pts)
> As an **organization**, I want to fill out a form to create an new opportunity posting so that I can provide opportunities to young people

**Acceptance Tests:**

1. All required fields are present
2. Make sure fields are properly validated (ex. required fields, correct types, etc.)
3. The form can only be accessed by organizations

#### US 1.02 - [FRONTEND] Connect opportunity creation form to API (1 pts)
> As an **organization**, I want the submit button on the form to send my opportunity posting to the server so that my opportunity posting will be saved

**Acceptance Tests:**

1. Submit button sends request to backend with the form data
2. Display an error message when the backend responds with an error code

#### US 1.03 - [BACKEND] Fields need to be stored for a opportunity (1 pts)
> As an **organization**, I want an opportunity object to exist in the database so that it is possible to save my opportunity posting

**Acceptance Tests:**

1. A model is created for an opportunity that has all required fields

#### US 1.04 - [BACKEND] Adding logic for opportunity creation to Django (2 pts)
> As an **organization**, I want an API to exist for opportunity creation so that I can create new opportunity postings

**Acceptance Tests:**

1. Connection with the database is successful
2. The backend returns status code 200/201 when the opportunity object is stored correctly in the database
3. The backend returns status code 400 when the frontend sends a bad request
4. The backend returns status code 500 when something goes wrong in the backend service

### Epic 2 - View Opportunity Applications as an Organization
#### US 2.01 - [FRONTEND] Make list view for opportunity applications (3 pts)
> As an **organization**, I want to view a list of opportunity applications so that I can compare and contact applicants

**Acceptance Tests:**

1. A new page is created
2. The list view shows all applications for the given opportunity
3. Each list item shows details about the applicant
4. The page can only be accessed by organizations

#### US 2.02 - [FRONTEND] Make page/popup for details about a specific opportunity application (2 pts)
> As an **organization**, I want to view details of an opportunity application so that I can view the applicant’s profile and contact them

**Acceptance Tests:**

1. A new page/popup is created
2. The page/popup includes all relevant details and contact info from the applicant's profile
3. Only organizations are allowed to view this page/popup

#### US 2.03 - [BACKEND] Fetch list of applications and user details from the backend for applicant description (1 pts)
> As an **organization**, I want an API to exist for for fetching a list of applications so that I can view them in a list

**Acceptance Tests:**

1. The frontend displays all information from the backend correctly
2. An error message is shown when the backend sends an error code

#### US 2.04 - [FRONTEND] Implement a filter for opportunity applications based on information in the applicant's application/profile (2 pts)
> As an **organization**, I want a badge to be shown on an application if it meets certain criteria so that I can determine the best applicants for that opportunity

**Acceptance Tests:**

1. An indicator is shown if the applicant meets the specified requirements
2. An indicator is not shown if the applicant does not meet the specified requirements


### Epic 3 - Search/Filter Opportunities as a User
#### US 3.01 - [FRONTEND] Make page with list view and categories for opportunities (3 pts)
> As a **user**, I want to view a list of available opportunities so that I can find something that interests me

**Acceptance Tests:**

1. The list view shows all available opportunities
2. Each list item shows details about the opportunity
3. A tab/navigation bar is present to filter opportunities by category
4. All users are allowed to view this page

#### US 3.02 - [FRONTEND] Add search and filter/tag functionality to opportunity list page (5 pts)
> As a **user**, I want to filter and search for available opportunities based on my own criteria so that I can find something that interests me

**Acceptance Tests:**

1. The entire list of opportunities is shown when the search bar is empty
2. The list of opportunities should be filtered based on the tags selected
3. The list of opportunities should be filtered based on the search bar text

#### US 3.03 - [BACKEND] Fetch opportunity tags information from backend (2 pts)
> As a **user**, I want tags/topics for opportunities to be returned from the server so that I can filter opportunities

**Acceptance Tests:**

1. The frontend displays all information from the backend correctly
2. An error message is shown when the backend sends an error code

#### US 3.04 - [BACKEND] Fetch opportunity list from backend (1 pts)
> As a **user**, I want the list of available opportunities to be returned from the server so that I can view them

**Acceptance Tests:**

1. The frontend displays all information from the backend correctly
2. An error message is shown when the backend sends an error code


#### US 3.05 - [FRONTEND] As a company user, I can delete each of the opportunity created by my own (2 pts)
> As an **organization**, I want to delete opportunity posts created by myself

**Acceptance Tests:**

1. A delete button should be displayed and work properly


#### US 3.06 - [FRONTEND] Every time when filling each fields of the opportunity form, there should be indication showing that which ones are necessary (1 pts)
> As a **young person**, I want to know which fields are required

**Acceptance Tests:**

1. The error message should be displayed when there is an empty field


#### US 3.07 - [FRONTEND] Create tags for activity and scholarships (3 pts)
> As an **organization** I want to add the tags so that I can add tags for a opportunities

**Acceptance Tests:**

1. local run
2. pass all tests
3. peer review


#### US 3.08 - [FRONTEND] Create a modal to view details of regular users (1 pts)
> As an **organization**, I want to view the detailed information of each regular user.

**Acceptance Tests:**

1. Popup modal should be displayed with the user information correctly.


#### US 3.09 - [FRONTEND] As a company user, I can edit each of the opportunity created by my own (2 pts)
> As an **organization**, each opportunity created by my own can be edited later

**Acceptance Tests:**

1. Connect with api endpoints correctly.


#### US 3.10 - [FRONTEND] Make page with list view and categories for opportunities for a young person (3 pts)
> As a **young person**, I want to view a list of available opportunities so that I can find something that interests me

**Acceptance Tests:**

1. The list view shows all available opportunities
2. Each list item shows details about the opportunity
3. A tab/navigation bar is present to filter opportunities by category
4. Young person are allowed to view this page


### Epic 4 - Explore Career Paths
#### US 4.01 - [SPIKE] Research career path recommendations functionality (3 pts)
> As a **dev**, I want to research possible functionality for a career path recommendation tool so that I can determine what the client envisions and what is feasible to implement

**Acceptance Tests:**

1. Client's wants/needs are determined for this feature
2. Possible implementation options are researched
3. New stories are created, prioritized, and estimated for implementation of this functionality if it is in scope


### Epic 5 - Profile Field Customization as an Admin
#### US 5.01 - [SPIKE] Research functionality to customize required/available user profile fields in Django admin panel (3 pts)
> As a **dev**, I want to research profile field customization functionality for admins so that I can determine what the client envisions and what is feasible to implement

**Acceptance Tests:**

1. Client's wants/needs are determined for this feature
2. Possible implementation options are researched
3. New stories are created, prioritized, and estimated for implementation of this functionality if it is in scope


### Epic 6 - Edit User Profiles as an Admin
#### US 6.01 - [SPIKE] Research user profile editing functionality (3 pts)
> As a **dev**, I want to research profile editing functionality for admins so that I can determine what the client envisions and what is feasible to implement

**Acceptance Tests:**

1. Client's wants/needs are determined for this feature
2. Possible implementation options are researched
3. New stories are created, prioritized, and estimated for implementation of this functionality if it is in scope


### Epic 7 - Change Site Name
#### US 7.01 - Rename ‘Skillcity Platform’ to ‘Pathfinder’ in source code and docs (1 pts)
> As a **dev**, I want to rename the project from 'SkillCity Platform' to 'Pathfinder' so that the app has a consistent and recognizable name

**Acceptance Tests:**

1. Client's wants/needs are determined for this feature
2. Possible implementation options are researched
3. New stories are created, prioritized, and estimated for implementation of this functionality if it is in scope


### Epic 8 - Manage Opportunities as an Organization
#### US 8.01 - [FRONTEND] Make page with list view for opportunities created by the current organization (3 pts)
> As an **organization**, I want to view a list of opportunities I have created so that I can edit, remove, or view applications for them

**Acceptance Tests:**

1. The list view shows all opportunities that an organization has created
2. Each list item shows details about the opportunity
3. Only organizations are allowed to view this page
4. A 'manage' button exists and clicking on it redirects to the 'manage opportunity' page
5. A 'delete' button exists and clicking on it shows a confirmation dialog before deleting the opportunity

#### US 8.02 - [BACKEND] Fetch opportunity list for current organization from backend (1 pts)
> As an **organization**, I want the opportunity list to be returned from the server so that I can view them

**Acceptance Tests:**

1. Make sure frontend display correct information as backend
2. Display an error message when backend sends an error code

#### US 8.03 - [BACKEND] Delete opportunity from backend (1 pts)
> As an **organization**, I want to be able to delete an opportunity that I have created so that expired opportunities are no longer shown in the list

**Acceptance Tests:**

1. Connection with the database is successful
2. The backend returns status code 204 when the opportunity object is deleted from the database successfully
3. The backend returns status code 400 when the frontend sends a bad request
4. The backend returns status code 500 when something goes wrong in the backend service

#### US 8.05 - [BACKEND] Search bar on user list should work properly (1 pts)
> As an **organization**, I want to use the search bar to search the users displayed on user list.

**Acceptance Tests:**

1. The result should be consistent with the input.
2. The whole list should be displayed when there is no input.


### Epic 9 - Apply to Opportunities as a Young Person
#### US 9.01 - [FRONTEND] Make form for applying to an opportunity (3 pts)
> As a **young person**, I want to fill out a form to apply to an opportunity posting so that I can be connected with organizations

**Acceptance Tests:**

1. All required fields are present
2. Make sure fields are properly validated (ex. required fields, correct types, etc.)
3. The existing contact button is removed (we don't want young people to be able to contact organizations directly)
4. The form can only be accessed by young people

#### US 9.02 - [FRONTEND] Connect opportunity application form to API (1 pts)
> As a **young person**, I want the submit button on the form to send my opportunity application to the server so that my opportunity application will be saved

**Acceptance Tests:**

1. Submit button sends request to backend with the form data
2. Display an error message when the backend responds with an error code

#### US 9.03 - [BACKEND] Fields need to be stored for an opportunity application (1 pts)
> As a **young person**, I want an opportunity application object to exist in the database so that it is possible to save my opportunity application

**Acceptance Tests:**

1. A model is created for an opportunity application that has all required fields

#### US 9.04 - [BACKEND] Adding logic for opportunity application to Django (2 pts)
> As a **young person**, I want an API to exist for opportunity application so that I can apply to opportunity postings

**Acceptance Tests:**

1. Connection with the database is successful
2. The backend returns status code 200/201 when the opportunity application object is stored correctly in the database
3. The backend returns status code 400 when the frontend sends a bad request
4. The backend returns status code 500 when something goes wrong in the backend service


### Epic 10 - Pagination support for lists
#### US 10.01 - [BACKEND] Add pagination logic for all lists in backend (2 pts)
> As a **user** I want endpoints to exist so that I can view a subset of entries at a time in the frontend

**Acceptance Tests:**

1. The pagination results implementation is done in backend for all endpoints that require pagination
2. Don't implement for posts page for company users


#### US 10.02 - [FRONTEND] Add pagination views for lists in frontend (3 pts)
> As a **user** I want UI controls to exist so that I can navigate between pages of limited results

**Acceptance Tests:**

1. The pagination results implementation is done in frontend for all pages that require pagination
2. Don't implement for posts page for company users


### Epic 11 - View Opportunity Applications as a Young Person
#### US 11.01 - [FRONTEND] Make page with list view for opportunity application created by the current young person (3 pts)
> As a **young person**, I want to view a list of opportunity applications I have created so that I can edit, remove, or view them

**Acceptance Tests:**

1. The list view shows all opportunity applications that a young person has created
2. Each list item shows details about the opportunity application
3. Only young people are allowed to view this page


#### US 11.02 - [FRONTEND] Add edit functionality to opportunity application list page (2 pts)
> As a **young person**, I want to be able to edit my application for an opportunity so that I can add new information or fix issues

**Acceptance Tests:**

1. An 'Edit' button exists for each opportunity application
2. The edit button redirects to an 'edit application' page or opens a popup where the user can edit the application
3. The edit page has all the fields that are required for creating an application (just details)
4. Fields are validated properly (required, etc.)
5. The edit button sends changes to the backend when clicked


#### US 11.03 - [FRONTEND] Add delete functionality to opportunity application list page (2 pts)
> As a **young person**, I want to be able to delete my application for an opportunity if I am no longer interested in it

**Acceptance Tests:**

1. A 'Delete' button exists for each opportunity application
2. The delete button shows a confirmation dialog before deleting the application
3. The confirmation dialog button sends changes to the backend when clicked



## MoSCoW
### Must Have
- [US 1.01 - Make form for creating a new opportunity](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/28)
- [US 1.02 - Connect opportunity creation form to API](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/29)
- [US 1.03 - Fields need to be stored for a opportunity](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/30)
- [US 1.04 - Adding logic for opportunity creation to Django](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/31)
- [US 2.01 - Make list view for opportunity applications](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/39)
- [US 2.02 - Make page/popup for details about a specific opportunity application](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/40)
- [US 2.03 - Fetch list of applications and user details from the backend for applicant description](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/41)
- [US 2.04 - Implement a filter for opportunity applications based on information in the applicant's application/profile](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/42)
- [US 3.01 - Make page with list view and categories for opportunities](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/45)
- [US 3.04 - Fetch opportunity list from backend](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/48)
- [US 3.05 - As a company user, I can delete each of the opportunity created by my own](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/100)
- [US 3.06 - Every time when filling each fields of the opportunity form, there should be indication showing that which ones are necessary](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/101)
- [US 3.07 - Create tags for activity and scholarships](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/135)
- [US 3.08 - Create a modal to view details of regular users](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/110)
- [US 3.09 - As a company user, I can edit each of the opportunity created by my own](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/99)
- [US 3.10 - Make page with list view and categories for opportunities for a young person](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/153)
- [US 4.01 - Research career path recommendations functionality](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/50)
- [US 5.01 - Research functionality to customize required/available user profile fields in Django admin panel](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/52)
- [US 6.01 - Research user profile editing functionality](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/54)
- [US 7.01 - Rename ‘Skillcity Platform’ to ‘Pathfinder’ in source code and docs](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/55)
- [US 8.05 - Search bar on user list should work properly](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/121)
- [US 9.01 - Make form for applying to an opportunity](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/68)
- [US 9.02 - Connect opportunity application form to API](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/69)
- [US 9.03 - Fields need to be stored for an opportunity application](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/70)
- [US 9.04 - Adding logic for opportunity application to Django](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/71)

### Should Have
- [US 8.01 - Make page with list view for opportunities created by the current organization](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/57)
- [US 8.02 - Fetch opportunity list for current organization from backend](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/58)

### Could Have
- [US 3.02 - Add search and filter/tag functionality to opportunity list page](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/46)
- [US 3.03 - Fetch opportunity tags information from backend](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/47)
- [US 10.01 - Add pagination logic for all lists in backend](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/211)
- [US 10.02 - Add pagination views for lists in frontend](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/212)
- [US 11.01 - Make page with list view for opportunity application created by the current young person](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/190)
- [US 11.02 - Add edit functionality to opportunity application list page](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/191)
- [US 11.03 - Add delete functionality to opportunity application list page](https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/192)

### Won't Have
- Chat functionality between users
- Separate section for courses



## Similar Products
- [STEMfolio by CEE-STEM:](https://www.cast.org/our-work/projects/cee-stem-careers-opportunity-youth)
	- Provides young people from traditional schools a way to discover career pathways.
	- We can refer to their e-portfolio to see a good way for user to demonstrate their skills.
- [Tallo.com](https://tallo.com/)
	- Tallo is an end-to-end ecosystem for students, job seekers, and customers.
	- Client wants an app very similar to this but have the opportunity list from country = Canada.
	- Tallo is based out of the US.
	- Tallo offers a similar service that we are trying to provide in terms of profile structure and managing a user's career goals. We can get ideas on how to effectively manage activities related to a user's career goals and give users an all-in-one place to manage their career goals.
- [uptree.co](https://uptree.co/)
	- Uptree is a career network for students and young professionals.
	- Uptree is based out of the UK.
	- Uptree has pages for listing and filtering opportunities that we can use as reference.
- [xello.world](https://xello.world/)
	- Xello is a career exploration platform for students and young professionals.
	- Xello has a user friendly interface. We can use it fas reference for the e-portfolio page and the career path page.
- [Magnet Careers](https://magnet.today/)
	- Magnet careers is a platform that connects Canadians to opportunities (grants, subsidies, exports, trade programs, and unique recruiting opportunities).
	- We can use this as a reference for the opportunity list page.



## Open-source Projects
- [Vutuv](https://github.com/vutuv/vutuv)
	- Vutuv is a free and fast career network. More focused on the exchange of contact information and the rating of skills.
	- We can use Vutuv as a reference when designing the profile page for users.
- [Diaspora](https://diasporafoundation.org/)
	- Diaspora pioneered the concept of aspects, which means you can organize your contacts according to their role in your life
	- We can refer to their dashboard structure



## Technical Resources
### Backend: Django
- [Django](https://docs.djangoproject.com/en/4.1/intro/tutorial01/)

### Deployment: Docker + Docker-compose + GitHub Actions
- [Docker](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

### Frontend: Next.js
- [Next.js](https://nextjs.org/)

### Infrastructure: Cybera
- [Cybera](https://www.cybera.ca/)

### Testing: Cyress, Jest
- [Jest](https://jestjs.io/) for Unit tests
- [Cypress](https://www.cypress.io/) for e2e/integration
- Note that [Django](https://docs.djangoproject.com/en/4.1/topics/testing/overview/) has unit tests built in
