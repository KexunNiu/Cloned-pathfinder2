import React, { useEffect, useState } from 'react';
import Header from '../components/profile/header';

import BoardItems from '../components/common/BoardItems';
import { get, post, refreshAccessToken } from '../components/utils/Api';

import NavHeader from '../components/common/Header';
import { useRouter } from 'next/router';
import { RefreshOrRedirect } from '../components/utils/AuthUtils';

/**
 * View the dashboard.
 * Include two scholarships, two opportunities, and two companies(If regular user log in).
 * Can redirect the lists By Clicking "View All".
 * @returns jsx
 */
function Dashboard() {
  const [userName, setUserName] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [id, setId] = useState('');
  const [role, setRole] = useState('');

  const router = useRouter();


  useEffect(() => {
    const getData = async () => {
      get(`auth/users/me/`)
        .then((userData) => {
          const userId = userData.id;

            if (!userId) return;

            setId(userId);

            get(`api/app/profile/${userId}`)
              .then((data) => {
                setRole(data.role);
                setUserName(userId);
              })
              .catch((e) => {
                console.error(e.message);
              });
          get(`api/activities/activity/approved/${id}`)
            .then((data) => {
              setOpportunities(data);
            })
            .catch((e) => {
              console.error(e.message);
            });

            get(`api/courses/all-courses`)
            .then((data) => {
              setCourses(data);
            })
            .catch((e) => {
              console.error(e.message);
            })

            get(`api/company/Company-users`)
            .then((data) => {
              setCompanies(data);
            })
            .catch((e) => {
              console.error(e.message);
            });

          get(`api/scholarships/scholarship/approved/${id}`)
            .then((data) => {
              setScholarships(data);
              console.log(data);
            })
            .catch((e) => {
              console.error(e.message);
            });


          get(`/api/opportunity/jobs/approved/${id}`)
            .then((data) => {
              setJobs(data);
              console.log(data);
            })
            .catch((e) => {
              console.error(e.message);
            });


          
        })
        .catch((e) => {
          console.error(e.message);

          RefreshOrRedirect(router);
        });
    };

    if (router) getData();
  }, [router, id]);


  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <NavHeader />
      </div>
      <div className="container m-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-lighter p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">
          <Header name="Dashboard" />
          {role === 'Company' ? (
            <>
          <BoardItems
            category="Explore Scholarships"
            items={scholarships}
            href="/scholarships"
            item="/scholarship"
          />
          <BoardItems
            category="Explore Activities"
            items={opportunities}
            href="/opportunitieCompany"
            item="/opportunity"
          />
         
          <BoardItems
            category="Explore Jobs"
            items={jobs}
            href="/jobs"
            item="/job"
          />
          </>
          ) : null}
          {role !== 'Company' ? (
            <>
            <BoardItems
            category="Explore Opportunities"
            items={opportunities.concat(courses).concat(scholarships)}
            href="/opportunities"
            item="/opportunity"
          />
           <BoardItems
              category="Explore Companies"
              items={companies}
              href="/companies"
              item="/company"
            />
          </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
