/**
 * Opportunity application template
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '/components/profile/header';
import NavHeader from '/components/common/Header';
import BackButton from '/components/common/BackButton';
import SubmitButton from '/components/common/SubmitButton';
import Form from '/components/profile/Form';
import ErrorMessage from '/components/common/ErrorMessage';
import TextArea from '/components/profile/TextArea';
import { get, post_form } from '/components/utils/Api';
import { RefreshOrRedirect } from '/components/utils/AuthUtils';
import { gotoParentPage } from '/components/utils/Nav';


const DETAILS_FIELD_NAME = 'Application Details';

/**
 * Template for opportunity application pages
 * @returns jsx
 */
const ApplicationTemplate = ({ opportunityId, opportunityName, opportunityType }) => {
  const [applicantId, setApplicantId] = useState('');
  const [details, setDetails] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const router = useRouter();
  let validCheck = true;

  const handleDetailsChange = useCallback((e) => {
    setDetailsError('');
    setDetails(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    console.debug('Submit button clicked');

    e.preventDefault();

    if (!applicantId) {
      console.error('Applicant ID is undefined.');

      validCheck = false;

      return;
    }

    if (!details) {
      setDetailsError(`${DETAILS_FIELD_NAME} cannot be empty.`);

      validCheck = false;

      return;
    }

    let formData = new FormData();

    formData.append('details', details);

    post_form(`api/${opportunityType}/${applicantId}/application/${opportunityId}/create`, formData)
      .then((res) => {
        console.debug('Application submitted successfully.');

        gotoParentPage(router);
      })
      .catch((e) => {
        console.error(e.message);

        setDetailsError(`There was an issue submitting your application. Please try again.`);
      });
  }, [applicantId, details]);

  useEffect(() => {
    get(`auth/users/me/`)
      .then((userData) => {
        setApplicantId(userData.id);
      })
      .catch((e) => {
        console.error(e.message);

        RefreshOrRedirect(router);
      });
  }, []);

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <NavHeader />
      </div>
      <div className="container m-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-lighter px-5 py-8 h-4/5 rounded-xl shadow-md text-main w-full relative">
          <div className="absolute top-0 left-0" style={{ margin: -15 }}>
            <BackButton name="Back" />
          </div>
          <Header name={opportunityName ? `Apply to ${opportunityName}` : ''} />
          <form className="mt-2" onSubmit={handleSubmit}>
            <Form content={`${DETAILS_FIELD_NAME}:`} />

            <TextArea
              name="details"
              action={handleDetailsChange}
              placeholder="Hi, I am interested in this opportunity!"
            ></TextArea>
            <ErrorMessage error={detailsError}></ErrorMessage>

            <SubmitButton name="Apply" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTemplate;
