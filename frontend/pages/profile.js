import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/profile/header';
import LongForm from '../components/profile/LongForm';
import Form from '../components/profile/Form';
import NavHeader from '../components/common/Header';
import { get } from '../components/utils/Api';
import { RefreshOrRedirect } from '../components/utils/AuthUtils';
import LinkButton from '../components/common/LinkButton';
import SectionTitle from '../components/profile/SectionTitle';
import RedirectLink from '../components/profile/RedirectLink';
import { parseJwt } from '../components/utils/CookieStorage';

const SkillsStyle = { margin: 'auto', marginTop: '15px' };
const InterestsStyle = { margin: 'auto', marginTop: '15px' };
const TalentsStyle = { margin: 'auto', marginTop: '15px' };

/**
 * View your profile page
 * @returns jsx
 */
function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [talents, setTalents] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');
  const [website, setWebsite] = useState('');
  const [special, setSpecial] = useState('');

  // router
  const router = useRouter();

  useEffect(() => {
    get(`auth/users/me/`)
      .then((userData) => {
        const userId = userData.id;

        if (!userId) return;

        setId(userId);

        get(`api/app/profile/${userId}`)
          .then((data) => {
            setUserName(data.first_name + ' ' + data.last_name);
            setRole(data.role);
            setBio(data.bio);
            setInterests(data.interests);
            setSkills(data.skills);
            setTalents(data.Talents);
          })
          .catch((e) => {
            console.error(e.message);
          });
      })
      .catch((e) => {
        console.error(e.message);

        RefreshOrRedirect(router);
      });
  }, []);

    if (!id) return;
    get(`api/app/companytouser/${id}`)
    .then((data) => {
        data.forEach(element => {
          setSpecial(element.id)
        });
      })
      .catch((e) => {
        console.error(e.message)
      })

    console.log(special)

    get(`api/company/CompanyProfile/${special}`)
      .then((data) => {
        console.log(data)
        setRole(data.role);
        setUserName(data.name);
        setBackground(data.background_info);
        setDescription(data.description);
        setWebsite(data.website);
      
      })
      .catch((e) => {
        console.error(e.message);
      });

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <NavHeader />
      </div>
      <div className="container max-w-2xl m-auto flex-col items-center justify-center px-2">
        <div className="bg-lighter p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">
          <div className="absolute top-0 left-0" style={{ margin: -15 }}>
            <LinkButton name="< Edit" link="/editprofile" title="Edit profile" top />
          </div>
          <Header name={userName} />
          {role !== 'Company' ? (
            <div>
              <Form formStyle={SkillsStyle} formTitle="Role" content={role} />
              <LongForm
                formTitle="Background"
                content={bio ?? '[Click edit to edit these fields]'}
              />
              <Form formStyle={SkillsStyle} formTitle="Skills" content={skills} />
              <Form formStyle={TalentsStyle} formTitle="Talents" content={talents} />
              <Form formStyle={InterestsStyle} formTitle="Interests" content={interests} />
            </div>
          ) : (
            <div>
              <Form formStyle={SkillsStyle} formTitle="Role" content={role} />
              <LongForm
                formTitle="Description"
                content={description ?? '[Click edit to edit these fields]'}
              />
              <LongForm
                formTitle="Background"
                content={background ?? '[Click edit to edit these fields]'}
              />
              <SectionTitle title="Website" />
              <RedirectLink message={website} href={website} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
