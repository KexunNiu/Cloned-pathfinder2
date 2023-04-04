import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '/components/utils/Api';
import ApplicationTemplate from '/components/opportunities/applications/ApplicationTemplate';
import { replaceWith404Page } from '/components/utils/Nav';
import { getCurrentUser } from '/components/utils/Api';


const OPPORTUNITY_TYPE = 'scholarships';


/**
 * Page for applying to a scholarship
 * @returns jsx
 */
function ScholarshipApplicationPage() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  const router = useRouter();
  const { id: opportunityId } = router.query;


  // Fetch current user id from backend
  useEffect(() => {
    getCurrentUser(({ id }) => setUserId(id), router);
  }, []);


  // Fetch scholarship details from backend
  useEffect(() => {
    if (!opportunityId || !userId) return;

    get(`api/${OPPORTUNITY_TYPE}/scholarship/approved/${opportunityId}/${userId}`)
      .then((data) => {
        console.debug(data);

        setName(data.name);

        // Application should not exist already
        if (data.application) throw new Error('Application already exists');
      })
      .catch((e) => {
        console.error(e.message);

        replaceWith404Page(router);
      });
  }, [opportunityId, userId]);


  return <ApplicationTemplate opportunityId={opportunityId} opportunityName={name} opportunityType={OPPORTUNITY_TYPE} />;
}

export default ScholarshipApplicationPage;
