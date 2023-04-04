import React from 'react';
import NavHeader from '../components/common/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get, getCurrentUser } from '../components/utils/Api';
import SearchBar from '../components/common/SearchBar';
import { JobCard, ScholarshipCard, ActivityCard } from '../components/opportunities/OpportunityCards';


/**
 * Reconstruct an application object from individual fields in the response
 */
const toApplicationObj = ({ id, details, date_applied }) => {
  return {
    id: id,
    details: details,
    date_applied: date_applied,
  };
};


/**
 * View a list of all opportunity applications for a user
 * @returns jsx
 */
function OpportunityApplicationList() {
  const [userId, setUserId] = useState('');
  const [jobApplicationList, setJobApplicationList] = useState([]);
  const [scholarshipApplicationList, setScholarshipApplicationList] = useState([]);
  const [activityApplicationList, setActivityApplicationList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const router = useRouter();


  // Fetch current user id from backend
  useEffect(() => {
    getCurrentUser(({ id }) => setUserId(id), router);
  }, []);


  // Fetch current user role from backend
  useEffect(() => {
    if (!userId) return;

    get(`api/company/applications-list/${userId}`)
      .then((data) => {
        console.log(data);
        console.debug(data);

        if (!data) return;

        setJobApplicationList(data.job_postings);
        setScholarshipApplicationList(data.scholarships);
        setActivityApplicationList(data.activities);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [userId]);


  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <NavHeader />
      </div>

      <SearchBar setSearch={setSearchText} />

      <div className="container max-2xl h-full flex flex-col mx-auto items-center">
        {jobApplicationList.map((applicationResponse) => (
          <JobCard
            key={applicationResponse.id}
            userId={userId}
            // TODO: Why is this field called `opportunity`?
            jobObj={applicationResponse.opportunity}
            application={toApplicationObj(applicationResponse)}
            showExpired={true}
            searchText={searchText} />
        ))}

        {scholarshipApplicationList.map((applicationResponse) => (
          <ScholarshipCard
            key={applicationResponse.id}
            userId={userId}
            scholarshipObj={applicationResponse.scholarship}
            application={toApplicationObj(applicationResponse)}
            showExpired={true}
            searchText={searchText} />
        ))}

        {activityApplicationList.map((applicationResponse) => (
          <ActivityCard
            key={applicationResponse.id}
            userId={userId}
            activityObj={applicationResponse.activity}
            application={toApplicationObj(applicationResponse)}
            showExpired={true}
            searchText={searchText} />
        ))}
      </div>
    </div>
  );
}


export default OpportunityApplicationList;
