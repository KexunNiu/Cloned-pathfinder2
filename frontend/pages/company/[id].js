import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get } from '../../components/utils/Api';
import LongForm from '../../components/profile/LongForm';
import SectionTitle from '../../components/profile/SectionTitle';
import NavHeader from '../../components/common/Header';
import BackButton from '../../components/common/BackButton';
import RedirectLink from '../../components/profile/RedirectLink';
import Header from '../../components/profile/header';
import DetailModal from '../../components/common/DetailModal';

const CompanyStyle = { margin: 'auto', marginTop: '15px' };

/**
 * View company details page
 * Company users cannot see this page
 * @returns jsx
 */
function CompanyPage() {
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () =>
      await get(`api/company/CompanyProfile/${id}`)
        .then((data) => {
          setName(data.name);
          setBackground(data.background_info);
          setDescription(data.description);
          setWebsite(data.website);
        })
        .catch((e) => {
          console.error(e.message);
        });

    if (id) getData();
  }, [id]);

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
          <Header name={`${name} (Company)`} />
          {/* Clients doesnt want young person to directly connect to the company */}
          {/* <DetailModal modalTitle={name} name="William" email="william@gmail.com" number="1-234-567-8910" /> */}
          <LongForm formStyle={CompanyStyle} formTitle="Background" content={background} />
          <LongForm formStyle={CompanyStyle} formTitle="Description" content={description} />
          <SectionTitle title="Website" />
          <RedirectLink message={website} href={website} />
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;
