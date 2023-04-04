import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '/components/utils/Api';
import ApplicationTemplate from '/components/opportunities/applications/ApplicationTemplate';
import { replaceWith404Page } from '/components/utils/Nav';


const OPPORTUNITY_TYPE = 'courses';


/**
 * Page for applying to an activity
 * @returns jsx
 */
function CoursesApplicationPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { id: coursesId } = router.query;

  useEffect(() => {
    if (!coursesId) {
      return;
    };

    get(`api/${OPPORTUNITY_TYPE}/all-courses/`)
      .then((data) => {
        // TODO: This is really bad. The frontend shouldn't have access to this information. This endpoint needs to updated such that it only returns an opportunity if one of the following is true:
        // 1. the opportunity is not approved but we are a company
        // 2. the opportunity is approved
        console.log(data)
        data.map((item)=>{
          if (item.id == coursesId){
            setName(data.Course);
          }
      })

      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [coursesId]);

  return (
    // This will return an error because backend does not support applying to courses (TODO)
    <ApplicationTemplate opportunityId={coursesId} opportunityName={name} opportunityType={OPPORTUNITY_TYPE} />
  );
}

export default CoursesApplicationPage;
