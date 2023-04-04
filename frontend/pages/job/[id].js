import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '../../components/utils/Api';
import NavHeader from '../../components/common/Header';
import Header from '../../components/profile/header';
import Form from '../../components/profile/Form';
import LongForm from '../../components/profile/LongForm';
import SectionTitle from '../../components/profile/SectionTitle';
import BackButton from '../../components/common/BackButton';
import LinkButton from '../../components/common/LinkButton';
import { replaceWith404Page } from '../../components/utils/Nav';
import { getCurrentUser } from '../../components/utils/Api';
import RedirectLink from '../../components/profile/RedirectLink';
import {  setRole, getRole } from '../../components/utils/CookieStorage';
// TODO: This should be changed to 'jobs' once the backend is updated
const OPPORTUNITY_TYPE = 'opportunity';


/**
 * View job details page
 * @returns jsx
 */
function JobViewPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [application, setApplication] = useState(true);
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();
  const [link, setLink] = useState('');
  const { id } = router.query;
  const role = getRole();


  // Fetch current user id from backend
  useEffect(() => {
    getCurrentUser(({ id }) => setUserId(id), router);
  }, []);


  // Fetch job details from backend
  useEffect(() => {
    if (!id || !userId) return;

    get(`api/${OPPORTUNITY_TYPE}/jobs/approved/${id}/${userId}`)
      .then((data) => {
        console.debug(data);
        console.log('role',role)
        setName(data.job_title);
        setDescription(data.job_description);
        setSkills(data.job_skills);
        setDatePosted(data.date_posted);
        setImage(data.opportunity_picture);
        setApplication(data.application);
        setLink(data.link)
      })
      .catch((e) => {
        console.error(e.message);

        replaceWith404Page(router);
      });
  }, [id, userId]);


  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <NavHeader />
      </div>
      <div className="container m-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-lighter px-5 py-8 h-4/5 rounded-xl shadow-md text-main w-full relative">
          <div className="absolute top-0 left-0" style={{ margin: -15 }}>
            <BackButton />
          </div>
          <Header name={`${name}`} />
           {image ? <img className='w-2/3 h-64 ml-10' src={image} /> : <img className='w-2/3 h-64 ml-10' src={'../../defaultJob.png'} />} 
          <LongForm formTitle="Description" content={description} />
          <Form formTitle="Skills" content={skills} />
          <Form formTitle="Date Posted" content={datePosted} />
          <SectionTitle title="Get Involved!" />
          <RedirectLink message={link} href={link} /> 
          {role != 'Company' ? (
          <LinkButton name={application ? 'Applied' : 'Apply'} link={`${router.asPath}/apply`} disabled={!!application} />
  ):null}
          </div>
      </div>
    </div>
  );
}

export default JobViewPage;
