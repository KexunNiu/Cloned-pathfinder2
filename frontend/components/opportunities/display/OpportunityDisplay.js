import CONSTANTS from "../../constants/constants";
import Link from 'next/link';
import { SolidPill } from "../../common/Pills";
import { faCheck, faXmark, faPaperPlane, faUpRightFromSquare, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SolidButton } from "../../common/Buttons";
import { ReadonlyForm } from "../../common/Forms";
import { formatTimeInterval, formatDate, removeUrlProtocol, formatCurrency} from '../../utils/Formatting';
import { host } from '../../utils/Api';
import { get } from '/components/utils/Api';

const ApplyButton = ({type,id})=>{
    var link = ""
    if (type === "job"){
        link = `/opportunity/${id}/apply`;
    } else if (type === "scholarship"){
        link = `/scholarship/${id}/apply`;
    }
    return (
        <Link href={link}>
          <SolidButton className="bg-secondaryDark hover:bg-secondary cursor-not-allowed">
          <FontAwesomeIcon icon={faPaperPlane} />
          Apply
          </SolidButton>
        </Link>
      );
}


/**
 * A pill component that shows how many much time is left before the application deadline.
 * @param deadline The application deadline.
 */
const DeadlinePill = ({ deadline }) => {
    return (
      <SolidPill className="absolute top-0 right-0 m-6 italic border bg-white text-errorDark border-errorDark" title={formatDate(deadline)}>
        <FontAwesomeIcon icon={faStopwatch} />
        <span>
          Expires
          <time dateTime={deadline}>{formatTimeInterval(deadline)}</time>
        </span>
      </SolidPill>
    );
}


/**
 * A component that displays the company name and opportunity link.
 * @param company The company object.
 * @param opportunityLink An external link for the opportunity.
 */
const CompanyInfo = ({ company, opportunityLink }) => {
    return (
      <div className="flex flex-row gap-2 items-center italic text-gray-500">
        {/* TODO: Remove fallback text for company.name once endpoints are modified to return company objects instead of company ids */}
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
 * A pill component that shows whether the opportunity has been approved. This will only be shown to company users if they are viewing their own opportunity.
 * @param isPostByCurrentUser Whether the current user is the company user who posted the opportunity.
 * @param isApproved Whether the opportunity has been approved.
 */
const ApprovedPill = ({isApproved }) => {
  
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

const DisplayCard = ({  
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
    showExpired = false,
    additionalFieldsMap,
    type    
}) =>{

    return (
        <div className="relative bg-white m-8 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 w-full sm:mx-auto sm:max-w-xl sm:rounded-lg sm:px-10">

        <div className="flex flex-col gap-6 mx-auto">
            <img className="w-full sm:rounded-lg" src={picture} alt="Opportunity picture" />
            <DeadlinePill deadline={deadline} />
            <div className="flex flex-row items-center justify-between">
            <div>
                <h3 className="mb-2 text-2xl font-bold">{title}</h3>
                <CompanyInfo company={company} opportunityLink={link} />
            </div>
            <ApprovedPill isApproved={isApproved} />
            </div>
            <div className="flex flex-col gap-6 divide-y divide-gray-300/50">
            <div className="flex flex-col gap-6">
                <p>{description}</p>
                <AdditionalDetailsSection additionalFieldsMap={additionalFieldsMap} />
            </div>
            <div className="flex flex-row gap-6 pt-8 text-base font-semibold">
                <ApplyButton type={type} id={id}/>
            </div>
            </div>
            <div className="flex flex-row justify-between">
            <PostedDateLabel datePosted={datePosted} />
            </div>
        </div>
        </div>
    );
}
    

const JobCard = ({ userId, jobObj, showExpired }) => (
    <DisplayCard
      userId={userId}
      id={jobObj.id}
      // TODO: Why is this field named weird?
      title={jobObj.job_title}
      // TODO: Why is this field named weird?
      description={jobObj.job_description}
      company={jobObj.company}
      // TODO: Workaround. Why do jobs not have a link field like other opportunities?
      link={''}
      picture={jobObj.job_picture ? host + jobObj.job_picture : `../../${CONSTANTS.DEFAULT_JOB_IMAGE}`}
      isApproved={jobObj.isApproved}
      datePosted={jobObj.date_posted}
      showExpired={showExpired}
      additionalFieldsMap={{
        // TODO: Why is this field named weird?
        'Skills': jobObj.job_skills,
      }}
      type="job"
      />
  );
  
  
  const ScholarshipCard = ({ userId, scholarshipObj, showExpired }) => (
    <DisplayCard
      userId={userId}
      id={scholarshipObj.id}
      title={scholarshipObj.name}
      description={scholarshipObj.description}
      company={scholarshipObj.company}
      link={scholarshipObj.link}
      picture={scholarshipObj.scholarship_picture ? host + scholarshipObj.scholarship_picture : `../../${CONSTANTS.DEFAULT_SCHOLARSHIP_IMAGE}`}
      isApproved={scholarshipObj.isApproved}
      // TODO: Implement datePosted for this model on the backend
      // datePosted={scholarshipObj.date_posted}
      deadline={scholarshipObj.deadline}
      showExpired={showExpired}
      additionalFieldsMap={{
        'Amount': formatCurrency(scholarshipObj.amount),
        'Eligibility': scholarshipObj.eligibility,
      }}
      type="scholarship"
       />
  );
  
  
  const CourseCard = ({ userId, courseObj, showExpired }) => (
    <DisplayCard
      userId={userId}
      id={courseObj.id}
      title={courseObj.Course}
      description={courseObj.Description}
      picture={courseObj.picture ? host + courseObj.picture : `../../${CONSTANTS.DEFAULT_JOB_IMAGE}`}
      showExpired={showExpired}
      type="course"
       />
  );

export { JobCard, ScholarshipCard, CourseCard };