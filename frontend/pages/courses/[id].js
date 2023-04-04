import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '../../components/utils/Api';
import NavHeader from '../../components/common/Header';
import Header from '../../components/profile/header';
import SectionTitle from '../../components/profile/SectionTitle';
import SectionText from '../../components/profile/SectionText';
import BackButton from '../../components/common/BackButton';
import LinkButton from '../../components/common/LinkButton';
import { replaceWith404Page } from '../../components/utils/Nav';


/**
 * View courses details page
 * @returns jsx
 */
function CoursesViewPage() {
  const [course, setCourse] = useState([]);
  const [description, setDescription] = useState([]);

  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [hasUserApplied, setHasUserApplied] = useState(true);
  const router = useRouter();
  const { id } = router.query;


  // Fetch current user id from backend
  useEffect(() => {
    get(`auth/users/me/`)
      .then((data) => {
        setUserId(data?.id);
      });
  }, []);


  // Fetch current user role from backend
  useEffect(() => {
    if (!userId) return;

    get(`api/app/profile/${userId}`)
      .then((data) => {
        setUserRole(data?.role);
      });
  }, [userId]);


  // Fetch activity details from backend
  useEffect(() => {
    if (!id || !userRole) return;
    get(`api/courses/all-courses`)
      .then((data) => {
        data.map((item)=>{
            if (item.id == id){
                setCourse(item.Course)
                setDescription(item.Description)
            }
        })
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [id, userRole]);

  // Fetch a list of applications from backend
  // TODO: This is really inefficient. There should be a backend endpoint that returns whether a user has applied to a particular opportunity or not
  useEffect(() => {
    if (!id || !userId) return;
    get(`api/courses/all-courses`)
      .then((data) => {
        // Loose equality comparison used intentionally here
        const applications = data?.filter((item,index) => item.id == id && index.id == userId);
        if (!applications || !applications.length) {
          setHasUserApplied(false);

          return;
        }

        setHasUserApplied(true);
      })
      .catch((e) => {
        console.error(e.message);
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
          <Header name={`${course}`} />
          <SectionTitle title="Course"/>
          <SectionText text={course} />
          <SectionTitle title="Description"/>
          <SectionText text={description} />
          <SectionTitle text="Apply here!" />
          {/* <LinkButton name={hasUserApplied ? 'Applied' : 'Apply'} link={`${router.asPath}/apply`} disabled={hasUserApplied} /> */}
        </div>
      </div>
    </div>
  );
}

export default CoursesViewPage;
