import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '../../components/utils/Api';
import NavHeader from '../../components/common/Header';
import Header from '../../components/profile/header';
import RedirectLink from '../../components/profile/RedirectLink';
import Form from '../../components/profile/Form';
import LongForm from '../../components/profile/LongForm';
import SectionTitle from '../../components/profile/SectionTitle';
import BackButton from '../../components/common/BackButton';
import LinkButton from '../../components/common/LinkButton';
import { replaceWith404Page } from '../../components/utils/Nav';
import { getCurrentUser } from '../../components/utils/Api';
import {  setRole, getRole } from '../../components/utils/CookieStorage';


const OPPORTUNITY_TYPE = 'scholarships';


/**
 * View scholarship details page
 * @returns jsx
 */
function ScholarshipViewPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [deadline, setDeadline] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [amount, setAmount] = useState(0);
  const [application, setApplication] = useState(true);
  const [userId, setUserId] = useState('');

  const router = useRouter();
  const { id } = router.query;
  const role = getRole();


  // Fetch current user id from backend
  useEffect(() => {
    getCurrentUser(({ id }) => setUserId(id), router);
    console.log(id);
  }, []);


  // Fetch scholarship details from backend
  useEffect(() => {
    if (!id || !userId) return;

    get(`api/${OPPORTUNITY_TYPE}/scholarship/approved/${id}/${userId}`)
      .then((data) => {
        console.debug(data);

        setName(data.name);
        setDescription(data.description);
        setImage(data.scholarship_picture);
        setEligibility(data.eligibility);
        setDeadline(data.deadline);
        setLink(data.link);
        setAmount(data.amount);
        setImage(data.scholarship_picture);
        setApplication(data.application);
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
          {image ? <img className='w-2/3 h-64 ml-10' src={image} alt="scholarship picture" /> : <img className='w-2/3 h-64 ml-10' src={'../../defaultSch.png'} alt="scholarship picture" />}
          <LongForm formTitle="Description" content={description} />
          <Form formTitle="Eligibility" content={eligibility} />
          <Form formTitle="Scholarship Amount" content={amount} />
          <Form formTitle="Deadline" content={deadline} />
          <SectionTitle title="Get Involved!" />
          <RedirectLink message={link} href={link} />
          {role != 'Company' ? (
          <LinkButton name={application ? 'Applied' : 'Apply'} link={`${router.asPath}/apply`} disabled={!!application} />
  ):null} </div> 
      </div>
    </div>
  );
}

export default ScholarshipViewPage;
