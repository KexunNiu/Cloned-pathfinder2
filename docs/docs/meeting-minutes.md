# Meeting Minutes

## Meeting 0 - Client Introduction

### Details

**Date:** Jan 17, 2023 @2pm

**Location:** Google Meet/CSC Building

**Attendees:**

- **Funke Smith (client)**
- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Introduce team to client
- What is already implemented?
- Elicit project requirements
	- Executive summary
	- Project glossary
	- User stories
	- MoSCoW

### Minutes
**Introduce team to client:**

- Funke wishes to use Slack or Google Chats for communication instead of Discord

**What is already implemented?:**

- We should have access to documentation and source code from the previous iteration of the project
- 2 members of pathfinder-1 agreed to help us out with questions (Marc-André Haley <hmarcand@ualberta.ca>, Meilin Lyu <mlyu@ualberta.ca>)
- Username and password provided for the system
Funke was presented the application over video call but does not have access to a deployment herself

**Elicit project requirements:**

- Funke wants us to change the name of the project from 'skillcity-platform' to 'Pathfinder'. This is a must-have requirement
- Section should be called 'Opportunities' rather than 'Employment opportunities' as shown in the project description document. There will be multiple types of opportunities available (training, apprenticeships, jobs, scholarships, etc)
- The focus of this iteration of the project is mainly on allowing employers to add opportunities and allowing young people to search/filter the list of opportunities (look at 'Upcoming opportunities' section on uptree.ca)
- Funke wishes to add a courses section as they will be offering courses at some point. Vivek feels this should be in a separate section from the opportunities one but maybe there is a way to have them both in the same one? We will need to evaluate if this is a priority for this iteration of the project
- uptree.co, tallo.com and xello.world are similar products shown by Funke that we can use as references

### Action Items
- **Everyone:** Set up meeting to discuss planning for sprint 1
- **Fil:** Set up Slack/Google Chat for communication with client

---

## Meeting 1 - Sprint 1 Planning

### Details

**Date:** Jan 18, 2023 @9am

**Location:** Discord/CSC B-10

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Plan Sprint 1 and assign tasks:
	- Should we clone the pathfinder-1 repo and start work?
	- Set up MkDocs to generate docs using GitHub Pages. Docs must be stored as markdown files in the /docs folder in the main branch of your GitHub repository
	- Create 'Project Requirements' document. The team should probably work together on this
	- Create an early version of the 'Software Design' document (focusing on high-level architectural design)
	- Create 'Project Management' document
	Create 'Teamwork' document
	anything else?
- Create first round of user stories

### Minutes

**Plan sprint 1 and assign tasks:**

- Create lo-fi designs for functionality
- We need to create issues for each user story and add it to the GitHub project board
- Copy old UML diagram unless there's any design changes. The architecture design should not change too much from the last iteration
- Create story map for the next 5 sprints
- Vivek talked to the professor and determined we should clone the existing skillcity-platform repo and then push it to our new repo
- We will create epic (high-level) user stories for now and refine them before submitting documentation and starting development
- Wildcard is worth 5 percent of the grade for this sprint and is based on our relative performance compared to other teams
- We have decided roles for the team this sprint: Hank (scrum master/backend), Fil (product owner/frontend), John (frontend), Aryan (backend), Iris (frontend), Barry (backend). We may change the scrum master and product owner next sprint
- We have discussed who will work on each of the deliverables for sprint 1

**Create first round of user stories:**

- **Epic user story 1:** As a client, I want to be able to submit a form for an opportunity so that young people can view it later and apply
- **Epic user story 2:** As a client, I want to be able to view applications to an opportunity posting so that I can view details of applicants and take further action
- **(optional) Epic user story 2.1**: As a client, I want to be able to filter out applicants based on information in their application/profile so that I can find the best candidates for the opportunity
- **Epic user story 3:** As a young person, I want to be able to search/filter for opportunities so that I can select only opportunities that I'm interested in
- **Epic user story 4:** As a young person, I want to be able to explore possible career paths so that I can find something I am interested in
- **Epic user story 5:** As an admin, I want to be able to specify what fields are required to be filled out on a young persons/clients profile so that we can add new functionality later
- **Epic user story 6:** As an admin, I want to be able to edit information about an client/young person so that the admin can have an easy way to make/approve changes
- **Epic user story 7:** As Funke, I would like the project to be named 'Pathfinder' so that it has a relevant and recognizable name for all users

### Action Items
- **Everyone:** Clone repo and run it locally see if it works
- **Everyone:** Add Belbin team roles to 'Teamwork' document
- **Vivek:** Talk to the professor about cloning repo
- **Aryan:** Complete project plan
- **Fil:**  Estimate velocity for sprints 2-5
- **Iris:** Complete lo-fi user interface
- **John:** Complete project overview and add meeting minutes to doc
- **Barry:** Complete hi-fi software design
- **Hank:** Complete story map and team canvas

---

## Meeting 2 - Sprint 1 Project Meeting

### Details

**Date:** Jan 25, 2023 @9am, 8pm

**Location:** CSC B-10, Discord

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup
	- PR #1 is ready for review
	- PR #2 is ready for review
	- Renamed some terms in the glossary
- Create refined user stories
	- Break down
	- Estimate
	- Write acceptance tests
- Prioritize user stories using MoSCow


### Minutes

**Standup**

- We are looking at prioritizing user stories and breaking them down further in this meeting
- John has renamed some things in the glossary (skillcity-platform to pathfinder, client/company to organization, and regular user to young person). If we all agree with these names we should try to be consistent with them throughout the app and documentation so things don't get confusing
- Fil asked if story points should be connected to hours. Ildahr says they should be based on a story's relative difficulty compared to other stories
- Vivek says we should be using self-hosted runners instead of GitHub ones. Aryan said he could make this change as he has experience with CI/CD
- Fil was working on coming up epic user stories
- Aryan asked if we need to create a project plan for all sprints or just the first one. Vivek says we can change it later but we need to have a rough plan for all sprints right now
- Barry has drafted sequence diagrams and will add more to them when we get more details about the user stories
- Iris is prototyping design and will be able to finish soon. She is also waiting for more details about the user stories
- Vivek set up the project board so we can add user stories and ask him for permission if it doesn't work
- John is waiting on a PR review for project setup. Vivek says we need to communicate more to avoid delays
- Hank finished the story map and is working on the team canvas. Team canvas needs to be redone because we need to focus more on the team and less on the project. The team canvas needs to have our individual strengths and weaknesses. The story map should have all the sprints and should have specific user story numbers when we decide on our final stories


**Create refined user stories**

- Epic US 1: Opportunity Posting:
	- US 1.01: Make form in frontend (3 pts)
		- AC 1: All required fields are present
		- AC 2: Make sure fields follow format
		- AC 3: Display an error message when backend sends an error code
	- US 1.02: Connect form to API (1 pts)
		- AC 1: Submit button sends request to backend
	- US 1.03: Backend fields need to be stored for a opportunity (1 pts)
		- AC 1: Covers all the required fields for an opportunity
	- US 1.04: Adding backend logic in Django (2 pts)
		- AC 1: Connection with the database is successful
		- AC 2: Successfully responds back status code 200 when the opportunity object is stored correctly in the database
		- AC 3: 400 status code when the frontend gives a bad request
		- AC 4: 500 status code when something goes wrong in the backend service
- Epic US 2: View Opportunity Applications
	- US 2.01: Make list view in frontend for applicants who have applied to their opportunity (3 pts)
		- AC 1: List view shows all application for the specific opportunity
		- AC 2: Each list item shows details about the applicant
		- AC 3: Only organizations are allowed to view this page
	- US 2.02: Make page for applicant description (2 pts)
		- AC 1: Show accurate young person’s details and contact info
	- US 2.03: Fetch user information from backend for applicant description (Backend) (1 pts)
		- AC 1: Make sure frontend display correct information as backend
		- AC 2: Display an error message when backend sends an error code
	- US 2.04: Get names of applicants with specific details to be shown on the list page who have applied to that particular opportunity (Backend) (1 pts)
		- AC 1: Make sure frontend display correct information as backend
		- AC 2: Display an error message when backend sends an error code
	- US 2.05: Filter Opportunity Applications from young people based on information in their application/profile (2 pts)
		- AC 1: Show an indicator if young person meets the requirement
- Epic US 3: Search/Filter Opportunities
	- US 3.01: Make list view and sections in frontend for opportunities (3 pts)
		- AC 1: List view shows all application for the specific opportunity
		- AC 2: Each list item shows details about the opportunity description
	- US 3.02: Make search and tags bar in frontend to filter users interests (5 pts)
		- AC 1: Empty search bar show the entire lists of opportunities
		- AC 2: Search bar should filter based on any text in all opportunities
		- AC 3: Opportunities should be filtered according to the tags selected
	- US 3.03: Fetch tags information from backend (2 pts)
		- AC 1: Make sure frontend display correct information as backend
		- AC 2: Display an error message when backend sends an error code
	- US 3.04: Fetch list information from backend (1 pts)
		- AC 1: Make sure frontend display correct information as backend
		- AC 2: Display an error message when backend sends an error code
- Epic US 4: Explore Career Paths
	- US 4.01: Spike - Research career path recommendations functionality (3 pts)
- Epic US 5: Profile Field Customization
	- US 5.01: Spike - Research the functionality to edit the opportunity fields required in Django admin panel (3 pts)
- Epic US 6: Edit User Profiles
	- US 6.01: Spike - Research user profile editing functionality (3 pts)
- Epic US 7: Change Site Name
	- US 7.01: Rename ‘Skillcity’ to ‘Pathfinder’ in source code and docs (1 pts)
- Epic US 8: Manage Opportunities as an Organization
	- US 8.01: Make list view in frontend for opportunities that are created by an organization (3 pts)
		- AC 1: List view shows all opportunities that an organization has created
	- AC 2: Each list item shows details about the opportunity
		- AC 3: Only organizations are allowed to view this page
	- AC 4: Clicking on a manage button in the list redirect to the 'manage opportunity' page
		- AC 5: Clicking on the delete button in the list deletes Opportunities can be deleted by clicking on a button
	- US 8.02: Fetch opportunity list from backend (Backend) (1 pts)
		- AC 1: Make sure frontend display correct information as backend
		- AC 2: Display an error message when backend sends an error code


**Prioritize user stories using MoSCow**

- Must Have
	- US 1.01
	- US 1.02
	- US 1.03
	- US 1.04
	- US 2.01
	- US 2.02
	- US 2.03
	- US 2.04
	- US 2.05
	- US 3.01
	- US 3.04
	- US 4.01
	- US 5.01
	- US 6.01
	- US 7.01
- Should Have
	- US 8.01
	- US 8.02
- Could Have
	- US 3.02
	- US 3.03
- Won't Have
	- Chat functionality between users
	- Add separate courses section


### Action Items
- **Everyone:** Break down epic user stories, estimate them, and create acceptance tests
- **Everyone:** Tell Hank our individual weaknesses and strengths so he can use them to create the team canvas
- **Someone:** Merge PR #1
- **Someone:** Merge PR #5
- **Aryan:** Complete project plan and create task to switch to self-hosted workflow runners in the future
- **Fil:** Estimate velocity for sprints 2-5 and add user story for young person to apply to an opportunity
- **Iris:** Complete lo-fi user interface
- **John:** Add detailed user stories to project overview and add these meeting minutes to mkdocs
- **Barry:** Complete hi-fi software design
- **Hank:** Add user story numbers to the project map. Add strengths and weaknesses of team members to the team canvas

---

## Meeting 3 - Sprint 1 Demo

### Details

**Date:** Jan 30, 2023 @9am

**Location:** CSC B-10/Discord

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup


### Minutes

**Standup**

- Fil said we had a meeting to refine user stories, acceptance criteria, and estimate them. We created tickets in GitHub and added Belbin roles
- Hank worked on the story map and team canvas
- Aryan created the project planning map
- Iris worked on the lo-fi UI design. Everything is based on the user stories
- John did the project overview docs and the meeting minutes
- Barry worked on the sequence diagram and reviewed the existing high-level architecture docs


### Action Items
- **Everyone:** Learn how to build and deploy the project locally
- **Everyone:** Schedule meetings to discuss work for next sprint

---

## Meeting 4 - Sprint 2 Planning

### Details

**Date:** Jan 31, 2023 @8pm

**Location:** Discord

**Attendees:**

- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Plan Sprint 2 and assign tasks:
  - Define scrum roles for sprint 2 (scrum master and product owner)
  - Decide who will be scrum master and who will be the product owner for sprint 2
  - Assign spikes
  - Look at what tasks are currently assigned for sprint 2
  - Schedule meeting with Funke
  - Update meeting minutes
  - Update story map
  - Update project plan & add tasks from sprint 3
  - Create stories for applying for opportunities as a young person
  - Update project overview with new stories
  - Reestimate velocity
  - Update Github Issues for Sprint 3 so that they match the story map and project plan, have relevant states, milestones, labels and assignees


### Minutes

**Plan Sprint 2 and assign tasks**

- Fil will be the product owner
- John will be the scrum master
- Barry will do spike [US 6.01] - Research user profile editing functionality
- Barry will do spike [US 5.01] - Research functionality to customize required/available user profile fields in Django admin panel
- Hank will do spike [US 4.01] - Research career path recommendations functionality
- Fil will schedule a client meeting with Funke
- We will create stories for opportunity application as a young person after our meeting with Funke
- Iris will make sure the Github issues for sprint 3 are updated so that they match the story map and project plan, have relevant states, milestones, labels and assignees
- John will update project overview with new stories
- Fil will reestimate the sprint velocity
- We discussed the user stories scheduled for this sprint and assigned them all, as well as 3 spikes which we decided to prioritize


### Action Items
- **Everyone:** Discuss stories for opportunity application as a young person in next meeting
- **Aryan:** Update project plan & and add tasks from sprint 3, work on #6 - Update workflows to use self-hosted runners (https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/6), work on #2 - Fix automated frontend testing workflow (https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/2)
- **Filippo:** Will be the product owner, schedule a sprint 1 demo with the team and Funke this week, re-estimate velocity of the current sprint, and work on US 2.02
- **Iris:** Update github issues for Sprint 3, do US 1.01, and do US 1.02
- **John:** Will be the scrum master, upload meeting minutes to mkdocs, update the project overview with new stories, and do US 2.01
- **Kexun:** Barry will do spikes US 6.01 and US 5.01, and do US 1.04
- **Wenhao:** Will update the story map, do spike US 4.01, and do US 1.03

---

## Meeting 5 - Sprint 1 Client Demo

### Details

**Date:** Feb 3, 2023 @5pm

**Location:** Google Meet

**Attendees:**

- **Funke Smith (client)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Demo sprint 1 progress:
  - Epic user stories
  - Lo-fi user interface


### Minutes

**Demo sprint 1 progress**

- Hank briefly went over the UML and sequence diagrams. He described the lo-fi user interface we currently have
- Funke does not want organizations to have direct access to the list of applicants/applications. There are privacy concerns and organizations are likely not going to be the contact point. Opportunities are going to be created by organizations in partnership with Skillcity so a Skillcity admin will be the contact point for all applications. Instead, young people will be able to fill out a form to indicate they are interested in an opportunity. A Skillcity admin will be able to review the applications and perform the appropriate actions. In the future, functionality may be added to let organizations be the contact point.
- In the final product, Funke would like notifications to appear in the admin panel on certain events (ex. when young people apply for opportunities)
- Admins should have the ability to view user's profiles, restrict what they can see, create new opportunities, edit opportunities, view opportunity applications, etc. This can likely be done using the existing Django Admin dashboard so we don't need to create brand new interface for admins
- Funke screenshared Magnet Careers and ALES to demonstrate similar functionality for career exploration and said that we should create accounts on these sites so that we can use them and better understand what she wants
- Regarding career exploration functionality, Funke wishes to have links that go to other sites and possible integrations with similar companies that provide career information
- Funke says we should envision the product from her point of view to determine what functionalities we need for the system. We are asking too many specific details and need to focus more on the end goal of the product. We are focusing too much on specific details and less on the end goal of the product. We should also be asking more questions in Slack for clarification


### Action Items
- **Everyone:** Create accounts for reference sites to see how their pages work

---

## Meeting 6 - Sprint 2 Project Meeting

### Details

**Date:** Feb 6, 2023 @9am

**Location:** CSC B-10

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup
- Create user stories for apply to opportunities as a young person


### Minutes

**Standup**

- We need to create stories for the new opportunity application epic today
- We are going to pull US 2.01 and 2.02 out of sprint 2 for now as Funke indicated in our last meeting that she didn't necessarily want this functionality. We may pull these in again as this functionality still needs to be present in the admin panel
- We are going to all run the project locally so we can look at what is already implemented and pull in new stories if applicable

**Create user stories for apply to opportunities as a young person**

- Epic 9 - Apply to Opportunities as a Young Person
  - US 9.01 - [FRONTEND] Make form for applying to an opportunity (3 pts)
    - > As a **young person**, I want to fill out a form to apply to an opportunity posting so that I can be connected with organizations
    - **Acceptance Tests:**
  		1. All required fields are present
  		2. Make sure fields are properly validated (ex. required fields, correct types, etc.)
  		3. The existing contact button is removed (we don't want young people to be able to contact organizations directly)
  		4. The form can only be accessed by young people

- US 9.02 - [FRONTEND] Connect opportunity application form to API (1 pts)
  - > As an **young person**, I want the submit button on the form to send my opportunity application to the server so that my opportunity application will be saved
  - **Acceptance Tests:**
    1. Submit button sends request to backend with the form data
    2. Display an error message when the backend responds with an error code

- US 9.03 - [BACKEND] Fields need to be stored for an opportunity application (1 pts)
  - > As an young person, I want an opportunity application object to exist in the database so that it is possible to save my opportunity application
  - **Acceptance Tests:**
    1. A model is created for an opportunity application that has all required fields

- US 9.04 - [BACKEND] Adding logic for opportunity application to Django (2 pts)
  - > As an young person, I want an API to exist for opportunity application so that I can apply to opportunity postings
  - **Acceptance Tests:**
    1. Connection with the database is successful
    2. The backend returns status code 200/201 when the opportunity application object is stored correctly in the database
    3. The backend returns status code 400 when the frontend sends a bad request
    4. The backend returns status code 500 when something goes wrong in the backend service


### Action Items
- **Everyone:** Create accounts for reference sites to see how their pages work
- **Everyone:** Run project locally
- **Everyone:** Create GitHub issues for all tasks so that we can keep track of our sprint velocity and currently assigned work

---

## Meeting 7 - Sprint 2 Standup

### Details

**Date:** Feb 7, 2023 @5pm

**Location:** Discord

**Attendees:**

- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Prioritize stories for epic 9 using MoSCow
- Discuss blocked tickets in sprint


### Minutes

**Prioritize stories for epic 9 using MoSCow**

- We discussed the stories under epic 9 and decided they are all must-have features
- Hank updated the relevant user stories on GitHub

**Discuss blocked tickets in sprint**
- Fil was assigned US 7.01 as this is a must-have feature and should be easy to implement
- John was assigned task #6 (Update workflows to use self-hosted runners) to work on with Aryan


### Action Items
- None

---

## Meeting 8 - Sprint 3 Planning

### Details

**Date:** Feb 11, 2023 @3pm

**Location:** Discord

**Attendees:**

- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup
  - Status of spikes
  - GitHub issues for documentation tasks
  - Which tickets to include next sprint


### Minutes

**Standup**

- Hank was unable to finish his spike (US 4.01) this sprint so we are moving it to sprint 3
- Barry has finished spike US 5.01 and determined that the functionality for allowing admins to add arbitrary fields to user profiles is too complicated and not important enough to implement
- Barry has finished spike US 6.01 and determined that the relevant functionality is already available if we use the Django admin panel. If we need to add additional admin editing functionality we can create tickets at that time
- Everyone has added GitHub issues for the tasks assigned to them this sprint
- We discussed which tickets to include for sprint 3 and who will be working on what


### Action Items
- **Fil:** Assigned US 3.01 and will ask Funke if we want to combine scholarships in the opportunities tab
- **John:** Assigned US 9.01 and US 9.02
- **Aryan:** Assigned US 3.03 and US 3.04
- **Iris:** Assigned US 8.01 and US 8.02
- **Barry:** Assigned US 9.04, and will work together with Hank on US 2.04
- **Hank:** Assigned US 4.01, US 9.03, and will work together with Barry on US 2.04

---

## Meeting 9 - Sprint 2 Demo

### Details

**Date:** Feb 13, 2023 @9am

**Location:** CSC B-10/Discord

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup


### Minutes

**Standup**

- Barry added backend tests and fixed bugs in backend
- Hank updated the user story map and explored functionality about exploring career paths
- Iris created opportunity creation API and view opportunity view
- Fil changed name from ‘skillcity’ to ‘pathfinder’ and estimated sprint velocity
- John updated meeting minutes and project overview, and also setup Cybera self-hosted runners
- Aryan fixed frontend testing workflow and updated the project plan


### Action Items
- **Someone:** Fix authentication token error when logout
- **Someone:** Implement deployment
- **Iris:** Add asterisk to the required fields when creating opportunities and fix 404 errors in opportunity page

---

## Meeting 10 - Sprint 2 Client Demo

### Details

**Date:** Feb 22, 2023 @4:30pm

**Location:** Google Meet

**Attendees:**

- **Funke Smith (client)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Demo work from sprint 2
- Ask questions about opportunities


### Minutes

**Demo work from sprint 2**

- Iris showed the job creation functionality as an organization

**Ask questions about opportunities**
- Funke says we can post different types of opportunities (work experience, networking, job shadowing, scholarships, etc.)
- Opportunities can be 'created' by admins or 'posted' by companies. Opportunities need to be approved by admins before the post will show up on the opportunities list page
- Iris asked about recommended opportunities and what the criteria should be for recommending opportunities for specific users. Funke says this functionality will probably use AI and we can add fields as needed to a user's profile to facilitate this. We can use Tallo as an example
- Opportunities are not just job-focused. Opportunities include many different things. Funke is open to discussing how exactly to organize the UI for the opportunity pages but agrees with the idea of having multiple tabs on the opportunity list page for different types of opportunities.
- When creating opportunities as an organization, Funke agrees that we should have a way to select the type of opportunity we want to create such that different fields can be filled out for each type of opportunity
- Iris showed our lo-fi user interface design and we discussed how we removed the contact button from users' profiles after feedback from the last sprint. Funke is interested in having this functionality but it should not give out contact details for users. John suggested potentially having an in-app messaging solution in the future so that messages can be monitored and restricted as needed. This is out-of-scope for now so we will just not shared users' contact information
- We should keep the user list functionality but look into what information is displayed because it could be a privacy concern. This is not a huge deal at the moment and the profile viewing functionality is an essential part of the application


### Action Items
- **Everyone:** Schedule a meeting to discuss creating more user stories based on feedback from Funke
- **Iris:** Rename job to opportunity on opportunity listing page, etc.

---

## Meeting 11 - Sprint 3 Standup

### Details

**Date:** Feb 22, 2023 @6pm

**Location:** Discord

**Attendees:**

- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Assign sprint 3 tasks
  - Add link to API docs for sprint 2 (Interfaces (APIs, modules, etc.) are well defined and documented)
  - Update storymap for sprint 3 (Storymap clearly represents the current state of the project)
  - Update project plan for sprint 3 (Project plan is updated to reflect the current state of the project and Sprint 4 tasks are included in the project plan)
  - Reestimate velocity for sprints 4 and 5 (Velocity is re-estimated for Sprints 4 and 5)
  - Update GitHub Issues for sprint 4 (Detailed Github Issues for Sprint 4 correspond with the storymap and project plan, have relevant states, milestones, labels and assignees)
  - Update meeting minutes for sprint 3 (Meeting minutes exist for all meetings and include all required information)
  - Update project overview for sprint 3
  - Update scrum roles in teamwork.md for sprint 2 (Scrum roles are defined for the sprint)
  - Update scrum roles in teamwork.md for sprint 3 (Scrum roles are defined for the sprint)
  - Create a task for deployment?
  - What authentication bugfix was Vivek talking about?
  - Make fields required for opportunity creation form
  - Do we need a medium-fidelity UI prototype?


### Minutes

**Assign sprint 3 tasks**

- We discussed how to split up the tasks for sprint 3


### Action Items
- **Everyone:** Schedule a meeting to discuss creating more user stories based on feedback from Funke and create GitHub Issues for your assigned tickets
- **John:** Update meeting minutes for sprint 3, update project overview for sprint 3, and ask Vivek if we need a medium-fi UI prototype
- **Aryan:** Update project plan for sprint 3 and research setting up a deployment
- **Iris:** Will be scrum master. Add link to API docs for sprint 2, make fields required for opportunity creation form, and fix authentication bug that Vivek brought up
- **Barry:** Will be product owner. Update GitHub Issues for sprint 4
- **Hank:** Update storymap for sprint 3
- **Fil:** Reestimate velocity for sprints 4 and 5, update scrum roles in teamwork.md for sprint 2, and update scrum roles in teamwork.md for sprint 3

---

## Meeting 12 - Sprint 3 Project Meeting

### Details

**Date:** Feb 27, 2023 @9am

**Location:** CSC B-10

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup


### Minutes

**Assign sprint 3 tasks**

- Iris worked on the opportunity creation page. Iris is waiting on backend work to finish for the opportunity list page so she can complete it. Vivek says the alignment of arrows on one of the pages should be fixed
- Barry finished some backend work for creating, updating, and deleting opportunities but did not push his work yet. Ildar says we should be using GitHub flow and merging our work more often so we don't end up with so much branch divergence
- Hank worked on the backend logic with Barry and will push his changes to GitHub later. Hank will be working on the backend logic for the opportunity application form. Hank will update the user story map
- Fil is working on the opportunity list page that has tabs and filtering for different types of opportunities. He will also reestimate sprint velocities
- John is going to work on meeting minutes, project overview, and 2 tickets for creating the opportunity creation form and connecting it to the backend
- Vivek says we should make sure to make our UI accessible and fix all the issues from sprint 2 like the authentication bugs
- Vivek says we will be marked based on our individual contributions this sprint
- Aryan is working on backend functionality for opportunity tags


### Action Items
**Everyone:** Push our code more often and finish our tasks for this sprint
**Barry:** Push code after class
**Hank:** Push code after class

---

## Meeting 13 - Sprint 3 Project Meeting

### Details

**Date:** Feb 28, 2023 @8pm

**Location:** Discord

**Attendees:**

- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu

**Agenda:**

- Standup
  - Missing GitHub issues for tasks
  - No user-enterable fields in the backend for opportunity application?
  - John created an issue for a bug. Pull out of this sprint?
  - What is US 3.08 for?
  - John waiting on user stories details for US 3.04, 3.05, 3.07, and 3.08 to add to project overview
  - What is the status of spike US 4.01?
  - Create bug ticket for removing Activity object and old /opportunities page
  Add alt tag to img tags in html


### Minutes

**Standup**

- Aryan will work on fixing errors in the console because this is something Vivek asked us to do
- Iris and Barry are working on creating different types of opportunities in backend and frontend
- Barry added functionality for approving opportunities after they have been posted. John thinks we should add a user story for this ticket and assign it to someone next sprint since there is still frontend work to do
- Fil is confused about what is implemented so far for the backend of the opportunity list page. Iris says the search bar functionality implemented by the previous team is also broken
- Fil says the OpportunityList page can be accessed by a user which shouldn't be allowed
- We are still missing github issues for tasks. Make sure to update github issues starting from meeting 11
- John asked if we should wait to merge bug fix #111 until the next sprint. We decided to include it because it fixes some of the console errors which we need to fix this sprint anyway
- Iris says the frontend has no authentication so we should create a ticket for this so we can fix it
- Some existing functions are broken like the api/app/profile/${id} API call. This is contributing to the console errors which we need to fix this sprint


### Action Items
- **Everyone:** Schedule a meeting to discuss creating more user stories based on feedback from Funke
- **John:** Wait till next sprint to fix bug. Add alt text to html for frontend tickets
- **Aryan:** Create GitHub issues for tasks. Fix warnings in browser console
- **Iris:** Create GitHub issues for tasks. Add user story description, acceptance criteria, and story points to US 3.04, 3.05, 3.07, and 3.08. Add alt text to html for frontend tickets. Message Hank about spike
- **Barry:** Create GitHub issues for tasks. Add 'details' text field for opportunity application to backend
- **Hank:** Create GitHub issues for tasks
- **Fil:** Create GitHub issues for tasks. Fil is now going to work on the authentication bug. Add alt text to html for frontend tickets

---

## Meeting 14 - Sprint 3 Demo

### Details

**Date:** Mar 6, 2023 @9am

**Location:** CSC B-10

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup


### Minutes

**Standup**

- Barry worked on the backend for opportunity application functionality
- Iris fixed the issue with authentication, details for user list, fixed the calendar issue, add user list popup modal, add scholarships and activity list with modal, add backend endpoints for scholarship/activity, delete put post, add tag for approval, fixed the search bar, button deletable
- Hank finished US 7.03 and 7.04 which dealt with the backend functionality for opportunities
- Aryan worked on updating the project map and fetching the opportunity tag list from the backend. He set up the backend but encountered a lot of issues which took time to resolve
- Fil worked on US 3.10 and was blocked by migration issues so he couldn't finish connecting the opportunity filter page to the backend. He also added alt text to images
- Iris demoed the authentication fix, working search bar on the user list page, details popup for the user list page, scholarship details popup, admin approval functionality for opportunities, and opportunity filter page with categories for different opportunities
- Vivek says we should move the close button to the center on the opportunity details popup
- Vivek says the popup form for creating an opportunity is not very user friendly because the user has to scroll all the way down to click the button
- Hank demoed his backend work for the opportunity tags functionality
- Iris demoed the Swagger API docs for the backend
- Vivek says we should be making a prototype in Figma to show how we came up with the user design. Aryan says there is an existing Figma file we can build on
- Vivek says we should have all of our user stories done in sprint 4 since sprint 5 is for finishing touches


### Action Items
- **Everyone:** Schedule sprint 4 planning meeting
- **Everyone:** Schedule demo meeting with Funke

---

## Meeting 15 - Sprint 4 Planning

### Details

**Date:** Mar 8, 2023 @4:30pm

**Location:** Discord

**Attendees:**

- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu

**Agenda:**

- Standup
  - Assign product owner and scrum master
  - Status of spike US 4.01 (https://github.com/UAlberta-CMPUT401/pathfinder-2/issues/50)?
  - Create GitHub issues for documentation tasks
  - Which tickets to include next sprint
- Create GitHub tickets for new bugs, tasks, and user stories
  - [Vivek] Create Figma prototype
  - [Rubric] Update story map for sprint 4
  - [Rubric] Update project plan for sprint 4
  - [Rubric] Reestimate velocity for sprint 5
  - [Rubric] Update GitHub Issues for sprint 5
  - [Rubric] Update scrum roles for sprint 4
  - [Rubric] Update meeting minutes for sprint 4
  - [Rubric] Update project overview for sprint 4 (update MoSCow also)
  - US 2.01 - Make list view for opportunity applications
  - US 2.02 - Make page/popup for details about a specific opportunity application
  - US 2.04 - Implement a filter for opportunity applications based on information in the applicant's application/profile
  - US 3.02 - Add search and filter/tag functionality to opportunity list page
  - US 3.03 - Fetch opportunity tags information from backend
  - [John] Company view page is broken
  - [John] Remove old opportunity functionality
  - [John] Fix opportunity naming
  - [John] Update job endpoint so it has the same fields as activity and scholarship
  - [John] Update opportunity GET endpoints to only return opportunities that the user is allowed to access
  - [John] Add an endpoint to return whether a user has applied to an opportunity
  - [John] Change edit button on profile page to a back button and create a new edit button for consistency
  - [John] After login, redirect to the dashboard instead of the edit profile page?
  - [John] Add links to signup pages so that users can switch between company and user signup if they clicked the wrong button
  - [Fil] Fields on the company signup page should be required?
  - [John] Company signup page no longer works
  - [John] baseUrl shouldn't be hardcoded in ActivityView.js, ScholarshipView.js, and opportunityView.js


### Minutes

**Standup**

- John will be the scrum master
- Aryan will be the product owner
- Still unsure about the status of spike US 4.01

**Create GitHub tickets for new bugs, tasks, and user stories**

- John will check with Vivek whether we need to complete the Figma prototype this sprint or not
- Aryan will update GitHub issues for sprint 5
- Iris will work on US 2.01, US 2.02, US 2.04, #183 (Fix opportunity naming), #184 (Update job endpoint so it has the same fields as activity and scholarship), #188 (baseUrl shouldn’t be hardcoded in ActivityView.js, ScholarshipView.js, and opportunityView.js)
- Aryan will work on US 3.02, US 3.03, #182 (Add pagination for lists)
- Fil will work on #180 (Company view page is broken), #181 (Remove old opportunity functionality)
- John will work on #185 (Update opportunity GET endpoints to only return opportunities that the user is allowed to access)
- Barry will work on #185 (Update opportunity GET endpoints to only return opportunities that the user is allowed to access), #186 (Add an endpoint to return whether a user has applied to an opportunity)
- Hank will work on #187 (Company signup page no longer works)


### Action Items
- **Fil:** #180 (Company view page is broken), #181 (Remove old opportunity functionality), Update scrum roles for sprint 4, Reestimate velocity for sprint 5
- **John:** Ask Vivek if we actually need to do Figma prototype this sprint, Look at opportunity application functionality to make sure it still works, #185 (Update opportunity GET endpoints to only return opportunities that the user is allowed to access), Update project overview for sprint 4, Update meeting minutes for sprint 4, Create epic for young person application list page and draft user stories
- **Aryan:** Aryan will be the product owner, US 3.02, US 3.03, Update project plan sprint 4, #182 (Add pagination for lists)
- **Iris:** US 2.01, US 2.02, US 2.04, #183 (Fix opportunity naming), #184 (Update job endpoint so it has the same fields as activity and scholarship), #188 (baseUrl shouldn’t be hardcoded in ActivityView.js, ScholarshipView.js, and opportunityView.js)
- **Barry:** #185 (Update opportunity GET endpoints to only return opportunities that the user is allowed to access), #186 (Add an endpoint to return whether a user has applied to an opportunity), set meeting with Funke to demo progress
- **Hank:** #187 (Company signup page no longer works), Update story map for sprint 4

---

## Meeting 16 - Sprint 4 Project Meeting

### Details

**Date:** Mar 13, 2023 @9am

**Location:** CSC B-10

**Attendees:**

- **Vivek Malhotra (TA)**
- Aryan Kalwani
- Filippo Ciandy
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Standup


### Minutes

**Standup**

- Iris fixed some issues with posts. She added one more page to the dashboard for opportunities. She is going to add image fields to some of the models this sprint.
- Barry implemented backend endpoints that only return approved opportunities rather than all of them for security reasons.
- Hank fixed some bugs related to US 3.07. Certain models can now only be updated by admin users.
- Fil is working on the dashboard. He combined sections on the dashboard page. He fixed issues on the scholarship view page and with course creation functionality on the admin panel.
- Aryan is working on pagination. He finished the backend but is still working on the frontend. He will implement tag functionality this sprint.
- John fixed links to API documentation screenshots, updated meeting minutes and project overview, and is currently working on adding a new page that shows opportunities that the user has applied to.


### Action Items
- None

---

## Meeting 17 - Sprint 4 Client Demo

### Details

**Date:** Mar 14, 2023 @5pm

**Location:** Google Meet

**Attendees:**

- **Funke Smith (client)**
- Aryan Kalwani
- Iris Du
- John Goodliff
- Kexun Niu
- Wenhao Cao

**Agenda:**

- Demo work from sprint 3


### Minutes

**Demo work from sprint 3**

- Iris demoed the UI for company users. She showed how companies can create different types of opportunities and approve them as an admin.
- John demoed the UI for young people. John showed how young people can view opportunities on the new filtered opportunities page and apply to them.
- Funke is not sure what feedback she can give as we are showing individual parts of the app rather than the whole thing.
- Funke is asking how easy it will be to change terms, language, and other text used in the app. There is currently lots of text that is worded in a weird way that we should review and change. Aryan says we can have a meeting to discuss everything that is not named correctly so that we can fix these items in sprint 5.


### Action Items
- **Everyone:** Create a ticket to review text used in the app
- **Aryan:** Set up another demo meeting with Funke after sprint 4 to review the whole app
