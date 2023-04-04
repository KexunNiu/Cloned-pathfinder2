import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faPaperPlane, faUpRightFromSquare, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { SolidButton, DeleteButton, EditButton, ViewButton } from '../common/Buttons';
import { SolidPill } from '../common/Pills';
import { ConfirmationModal, DetailsModal } from '../common/Modals';
import { ReadonlyForm } from '../common/Forms';
import { formatTimeInterval, formatDate, removeUrlProtocol, formatCurrency } from '../utils/Formatting';
import { isTsInPast, searchFields } from '../utils/General';
import { host, del } from '../utils/Api';
import CONSTANTS from '../constants/constants';


/**
 * A component that displays the company name and opportunity link.
 * @param company The company object.
 * @param opportunityLink An external link for the opportunity.
 */
const CompanyInfo = ({ company, opportunityLink }) => {
  return (
    <div className="flex flex-row gap-2 items-center italic text-gray-500">
      <h4>{company?.name ?? 'No company provided'}</h4>
      {opportunityLink && <>
        •
        <a className="flex flex-row gap-2 items-center" href={opportunityLink}>
          {removeUrlProtocol(opportunityLink)}
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </a>
      </>}
    </div>
  );
};


/**
 * A component that displays additional fields for an opportunity. This is only shown if the opportunity has additional fields.
 * @param additionalFieldsMap A map of additional fields for the opportunity.
 */
const AdditionalDetailsSection = ({ additionalFieldsMap }) => {
  if (!additionalFieldsMap) return null;

  return (
    <div className="flex flex-col gap-6 p-6 text-base bg-lighter rounded-lg">
      <ReadonlyForm fieldMap={additionalFieldsMap} />
    </div>
  );
};


/**
 * A pill component that shows how many much time is left before the application deadline.
 * @param deadline The application deadline.
 */
const DeadlinePill = ({ deadline }) => {
  if (!deadline) return null;

  return (
    <SolidPill className="absolute top-0 right-0 m-6 italic border bg-white text-errorDark border-errorDark" title={formatDate(deadline)}>
      <FontAwesomeIcon icon={faStopwatch} />
      <span>
        Expires
        <time dateTime={deadline}>{formatTimeInterval(deadline)}</time>
      </span>
    </SolidPill>
  );
};


/**
 * A component that displays the creation date of the opportunity.
 * @param datePosted The date the opportunity was posted.
 */
const PostedDateLabel = ({ datePosted }) => {
  return (
    <span className="text-right italic text-gray-500" title={formatDate(datePosted)}>
      Posted
      <time dateTime={datePosted}>{formatTimeInterval(datePosted)}</time>
    </span>
  );
};


/**
 * A pill component that shows whether the opportunity has been approved. This will only be shown to company users if they are viewing their own opportunity.
 * @param isPostByCurrentUser Whether the current user is the company user who posted the opportunity.
 * @param isApproved Whether the opportunity has been approved.
 */
const ApprovedPill = ({ isPostByCurrentUser, isApproved }) => {
  if (!isPostByCurrentUser) return null;

  if (isApproved) {
    return (
      <SolidPill className="absolute top-0 left-0 m-6 italic bg-info">
        <FontAwesomeIcon icon={faCheck} />
        Approved
      </SolidPill>
    );
  }

  return (
    <SolidPill className="absolute top-0 left-0 m-6 italic bg-error">
      <FontAwesomeIcon icon={faXmark} />
      Unapproved
    </SolidPill>
  );
};


/**
 * Returns the buttons to display on the card based on the current user and the opportunity.
 * @param isPostByCurrentUser Whether the current user is the one who posted the opportunity.
 * @param application The application object.
 * @param onDeletePostButtonClick The function to call when the delete post button is clicked.
 * @param onEditPostButtonClick The function to call when the edit post button is clicked.
 * @param onDeleteApplicationButtonClick The function to call when the delete application button is clicked.
 * @param onViewApplicationButtonClick The function to call when the view application button is clicked.
 * @param onApplyButtonClick The function to call when the apply button is clicked.
 * @returns The buttons to display on the card.
 */
const ButtonsSection = ({ isPostByCurrentUser, application, onDeletePostButtonClick, onEditPostButtonClick, onDeleteApplicationButtonClick, onViewApplicationButtonClick, onApplyButtonClick }) => {
  if (isPostByCurrentUser) {
    return (
      <>
        <DeleteButton text="Delete Post" onClick={onDeletePostButtonClick} />
        <EditButton text="Edit Post" onClick={onEditPostButtonClick} />
      </>
    );
  } else if (application) {
    return (
      <>
        <DeleteButton text="Delete Application" onClick={onDeleteApplicationButtonClick} />
        <ViewButton text="View Application" onClick={onViewApplicationButtonClick} />
      </>
    );
  }

  return (
    <SolidButton className="bg-secondaryDark hover:bg-secondary" onClick={onApplyButtonClick}>
      <FontAwesomeIcon icon={faPaperPlane} />
      Apply
    </SolidButton>
  );
};


/**
 * A modal for confirming the deletion of an application.
 * @param applicationDeleteEndpoint The URL of the DELETE endpoint used to delete the application.
 * @param isOpen Whether the modal is open.
 * @param onCloseClick The function to call when the close button is clicked.
 * @param onSuccess The function to call after the application is successfully deleted.
 */
const DeleteApplicationConfirmationModal = ({ applicationDeleteEndpoint, isOpen, onCloseClick, onSuccess }) => {
  const errorMsg = 'There was an issue deleting the application. Please try again.';

  const [showErrorMsg, setShowErrorMsg] = useState(false);


  return (
    <ConfirmationModal
      title="Delete Application?"
      errorMsg={showErrorMsg ? errorMsg : ''}
      isOpen={isOpen}
      onCloseClick={() => {
        // Hide error messages when the modal is closed, then call the provided callback
        setShowErrorMsg(false);
        onCloseClick();
      }}
      onConfirmClick={() => {
        if (!applicationDeleteEndpoint) {
          setShowErrorMsg(true);

          return;
        };

        del(applicationDeleteEndpoint)
          .then(response => {
            // If successful, hide any error messages and called the provided callback
            setShowErrorMsg(false);
            onSuccess();
          })
          .catch(e => {
            console.error(e);

            setShowErrorMsg(true);
          });
      }}>
      Are you sure you want to delete this application?
    </ConfirmationModal>
  );
};


/**
 * A modal for displaying the details of an application.
 * @param dateApplied The date the application was submitted.
 * @param details The details of the application.
 * @param isOpen Whether the modal is open.
 * @param onCloseClick The function to call when the close button is clicked.
 * @returns
 */
const ApplicationDetailsModal = ({ dateApplied, details, isOpen, onCloseClick }) => {
  if (!dateApplied | !details) return null;

  {/* TODO: Change this into an EditModel that allows us to view and edit fields as well */ }
  return (
    <DetailsModal
      title="Application Details"
      fieldMap={{
        'Application Date': formatDate(dateApplied),
        'Details': details,
      }}
      isOpen={isOpen}
      onCloseClick={onCloseClick} />
  );
};


/**
 * A card component that displays the details of any opportunity.
 * @param userId The id of the current user.
 * @param id The id of the opportunity.
 * @param title The title of the opportunity. If not provided, we will display a default value.
 * @param description The description of the opportunity. If not provided, we will display a default value.
 * @param company The company object.
 * @param link An external link for the opportunity.
 * @param picture The picture for the opportunity.
 * @param isApproved Whether the opportunity has been approved.
 * @param datePosted The date the opportunity was posted. If not provided, we will display a default value.
 * @param deadline The date the opportunity expires. If not provided, we will display a default value.
 * @param initialApplication The application object (if it exists).
 * @param showExpired Whether to show expired opportunities or not. Defaults to false.
 * @param additionalFieldsMap A map of additional fields to display. The key is the label for a field and it's value is the value. Different opportunity types have different additional fields so this allows us to display them all with one component.
 * @param searchText Optional search text from the parent component. If provided, we will search fields for the opportunity and hide the card if the search text is not found.
 * @returns
 */
const BaseOpportunityCard = ({
  userId,
  id,
  title = 'No title provided',
  description = 'No description provided',
  company,
  link,
  picture,
  isApproved,
  datePosted = 'Unknown post date',
  deadline = 'Unknown deadline',
  initialApplication,
  showExpired = false,
  additionalFieldsMap,
  searchText = '',
  applicationDeleteEndpoint
}) => {
  const [isPostVisible, setIsPostVisible] = useState(false);
  const [isPostByCurrentUser, setIsPostByCurrentUser] = useState(false);
  const [isApplicationDetailsModalOpen, setIsApplicationDetailsModalOpen] = useState(false);
  const [isApplicationDeleteModalOpen, setIsApplicationDeleteModalOpen] = useState(false);

  // Make state vars for certain props so we can re-render the component instantly if the user makes changes instead of having to fetch data again from the server
  const [application, setApplication] = useState(initialApplication);


  const handleDeletePostButtonClick = () => {
    // TODO: This should open a confirmation modal
  };


  const handleDeletePostConfirmButtonClick = () => {
    // TODO: Call endpoint here to delete the post
  };


  const handleEditPostButtonClick = () => {
    // TODO: Implement edit post functionality
  };


  const handleDeleteApplicationButtonClick = () => {
    setIsApplicationDeleteModalOpen(true);
  };


  const handleDeleteApplicationSuccess = () => {
    // Close the dialog and remove application details from the card
    setIsApplicationDeleteModalOpen(false);
    setApplication(null);
  };


  const handleViewApplicationButtonClick = () => {
    setIsApplicationDetailsModalOpen(true);
  };


  const handleApplyButtonClick = () => {
    // TODO: This should open a confirmation modal or redirect to the application form page
  };


  /**
   * Check whether the opportunity should be visible or not. This is based on whether the opportunity is expired, whether we are showing expired posts, and whether the search text is found in any of the opportunity fields.
   */
  useEffect(() => {
    const shouldPostBeVisible = application && (showExpired || !isTsInPast(deadline));
    let isMatchFound = true;

    // Don't bother searching if the post is expired
    if (shouldPostBeVisible) {
      const additionalFieldValues = additionalFieldsMap ? Object.values(additionalFieldsMap) : [];

      isMatchFound = searchFields(searchText, [title, description, company?.name, ...additionalFieldValues]);
    }

    setIsPostVisible(shouldPostBeVisible && isMatchFound);
  }, [application, showExpired, deadline, searchText, additionalFieldsMap]);


  /**
   * Check whether the current user is the one who posted the opportunity.
   */
  useEffect(() => {
    if (!userId || !company?.id) return;

    setIsPostByCurrentUser(userId === company.id);
  }, [userId, id]);


  // Return null if the post is not visible
  if (!isPostVisible) return null;


  return (
    <div className="relative bg-white m-8 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 w-full sm:mx-auto sm:max-w-xl sm:rounded-lg sm:px-10">
      <DeleteApplicationConfirmationModal
        applicationDeleteEndpoint={applicationDeleteEndpoint}
        isOpen={isApplicationDeleteModalOpen}
        onCloseClick={() => setIsApplicationDeleteModalOpen(false)}
        onSuccess={handleDeleteApplicationSuccess}
      />
      <ApplicationDetailsModal
        dateApplied={application?.date_applied}
        details={application?.details}
        isOpen={isApplicationDetailsModalOpen}
        onCloseClick={() => setIsApplicationDetailsModalOpen(false)}
      />

      <div className="flex flex-col gap-6 mx-auto">
        <img className="w-full sm:rounded-lg" src={picture} alt="Opportunity picture" />
        <DeadlinePill deadline={deadline} />
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="mb-2 text-2xl font-bold">{title}</h3>
            <CompanyInfo company={company} opportunityLink={link} />
          </div>
          <ApprovedPill isPostByCurrentUser={isPostByCurrentUser} isApproved={isApproved} />
        </div>
        <div className="flex flex-col gap-6 divide-y divide-gray-300/50">
          <div className="flex flex-col gap-6">
            <p>{description}</p>
            <AdditionalDetailsSection additionalFieldsMap={additionalFieldsMap} />
          </div>
          <div className="flex flex-row gap-6 pt-8 text-base font-semibold">
            <ButtonsSection
              isPostByCurrentUser={isPostByCurrentUser}
              application={application}
              onDeletePostButtonClick={handleDeletePostButtonClick}
              onEditPostButtonClick={handleEditPostButtonClick}
              onDeleteApplicationButtonClick={handleDeleteApplicationButtonClick}
              onViewApplicationButtonClick={handleViewApplicationButtonClick}
              onApplyButtonClick={handleApplyButtonClick} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <PostedDateLabel datePosted={datePosted} />
        </div>
      </div>
    </div>
  );
};


const JobCard = ({ userId, jobObj, application, showExpired, searchText }) => (
  <BaseOpportunityCard
    userId={userId}
    id={jobObj.id}
    // TODO: Why is this field named weird?
    title={jobObj.job_title}
    // TODO: Why is this field named weird?
    description={jobObj.job_description}
    company={jobObj.company}
    link={jobObj.link}
    picture={jobObj.job_picture ? host + jobObj.job_picture : `../../${CONSTANTS.DEFAULT_JOB_IMAGE}`}
    isApproved={jobObj.isApproved}
    datePosted={jobObj.date_posted}
    deadline={jobObj.deadline}
    initialApplication={application}
    showExpired={showExpired}
    additionalFieldsMap={{
      // TODO: Why is this field named weird?
      'Skills': jobObj.job_skills,
    }}
    searchText={searchText}
    applicationDeleteEndpoint={application && `api/opportunity/application/${application.id}/`} />
);


const ScholarshipCard = ({ userId, scholarshipObj, application, showExpired, searchText }) => (
  <BaseOpportunityCard
    userId={userId}
    id={scholarshipObj.id}
    title={scholarshipObj.name}
    description={scholarshipObj.description}
    company={scholarshipObj.company}
    link={scholarshipObj.link}
    picture={scholarshipObj.scholarship_picture ? host + scholarshipObj.scholarship_picture : `../../${CONSTANTS.DEFAULT_SCHOLARSHIP_IMAGE}`}
    isApproved={scholarshipObj.isApproved}
    datePosted={console.log(scholarshipObj.date_posted) && scholarshipObj.date_posted}
    deadline={scholarshipObj.deadline}
    initialApplication={application}
    showExpired={showExpired}
    additionalFieldsMap={{
      'Amount': formatCurrency(scholarshipObj.amount),
      'Eligibility': scholarshipObj.eligibility,
    }}
    searchText={searchText}
    applicationDeleteEndpoint={application && `api/scholarships/application/${application.id}/`} />
);


const ActivityCard = ({ userId, activityObj, application, showExpired, searchText }) => (
  <BaseOpportunityCard
    userId={userId}
    id={activityObj.id}
    title={activityObj.name}
    description={activityObj.description}
    company={activityObj.company}
    link={activityObj.link}
    picture={activityObj.activity_picture ? host + activityObj.activity_picture : `../../${CONSTANTS.DEFAULT_ACTIVITY_IMAGE}`}
    isApproved={activityObj.isApproved}
    datePosted={activityObj.date_posted}
    deadline={activityObj.deadline}
    initialApplication={application}
    showExpired={showExpired}
    searchText={searchText}
    applicationDeleteEndpoint={application && `api/activities/application/${application.id}/`} />
);


export { JobCard, ScholarshipCard, ActivityCard };
