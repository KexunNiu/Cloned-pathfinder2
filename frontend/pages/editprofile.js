import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import FormField from '../components/profile/FormField'
import Button from '../components/common/SubmitButton'
import BackButton from '../components/common/BackButton'
import Checkbox from '../components/common/Checkbox'
import { put } from '../components/utils/Api'
import FormData from 'form-data'
import { get } from '../components/utils/Api'
import Header from '../components/common/Header'
import { RefreshOrRedirect } from '../components/utils/AuthUtils'
import Modal from '../components/profile/Modal'
import { parseJwt } from '../components/utils/CookieStorage'

/**
 * Edit profile page
 * Include three lists for regular users.
 * Course, mentor, and company for Yong People Users.
 * Course, mentee, and company for Mentor Users.
 * @returns jsx
 */
export default function EditProfileForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [id, setId] = useState('')
  const [bio, setBio] = useState('')
  const [mentor, setMentor] = useState(false)
  const [interests, setInterests] = useState('')
  const [skills, setSkills] = useState('')
  const [talents, setTalents] = useState('')
  const [role, setRole] = useState('')
  const [courseData, setCoursedata] = useState([])
  const [mentorData, setMentorData] = useState([])
  const [menteeData, setMenteeData] = useState([])
  const [companyData, setCompanyData] = useState([])
  const [followerData, setfollowerData] = useState([])
  const [background, setBackground] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [special, setSpecial] = useState('')
  // const id = parseJwt().user_id

  const router = useRouter()
  let formData = new FormData()
  const NameStyle = { width: '100%' }
  const FormStyle = { width: '100%' }
  let isMentor = false
  if (role == 'Mentor') {
    isMentor = true
  }

  useEffect(() => {
    get(`auth/users/me/`)
      .then((userData) => {
        setId(userData.id)
        get(`api/app/profile/${userData.id}`)
          .then((data) => {
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setUserName(data.user)
            setRole(data.role)
            setBio(data.bio)
            setInterests(data.interests)
            setSkills(data.skills)
            setMentorData(JSON.stringify(data.MentorsList))
            setMenteeData(JSON.stringify(data.MenteeList))
            setCompanyData(JSON.stringify(data.CompanyFollowerList))
            setfollowerData(JSON.stringify(data.followerData))
          })
          .catch((e) => {
            console.error(e.message)
          })
      })
      .catch((e) => {
        console.error(e.message)
        RefreshOrRedirect(router)
      })

      
    
  }, [router, id])


  get(`api/app/companytouser/${id}`)
      .then((data) => {
          data.forEach(element => {
            setSpecial(element.id)
          });
        })
        .catch((e) => {
          console.error(e.message)
        })
      console.log('special',special)
  
  useEffect(() => {
      get(`api/company/CompanyProfile/${special}`)
      .then((data) => {
        console.log('commmmmmmmm')
     
        setUserName(data.name)
        setRole(data.role)
        setBackground(data.background_info)
        setDescription(data.description)
        setWebsite(data.website)
        setfollowerData(JSON.stringify(data.Marked_Connections))
      })
      .catch((e) => {
        console.error(e.message)
      })
    }, [router, special])
  

  const handleFirstNameChange = useCallback((e) => {
    setFirstName(e.target.value)
  }, [])
  const handleLastNameChange = useCallback((e) => {
    setLastName(e.target.value)
  }, [])
  const handleUserNameChange = useCallback((event) => {
    setUserName(event.target.value)
  }, [])

  const handleBackgroundChange = useCallback((event) => {
    setBackground(event.target.value)
  }, [])

  const handleDescriptionChange = useCallback((event) => {
    setDescription(event.target.value)
  }, [])

  const handleWebsiteChange = useCallback((event) => {
    setWebsite(event.target.value)
  }, [])

  const handleBiosChange = useCallback((event) => {
    setBio(event.target.value)
  }, [])

  const handleIsMentorChange = useCallback((event) => {
    setMentor(event.target.checked)
  }, [])

  const handleInterestsChange = useCallback((event) => {
    setInterests(event.target.value)
  }, [])

  const handleSkillsChange = useCallback((event) => {
    setSkills(event.target.value)
  }, [])

  const handleTalentsChange = useCallback((event) => {
    setTalents(event.target.value)
  }, [])

  /**
   * handles submit edit profile
   */
  const handleEditProfile = useCallback(
    async (e) => {
      e.preventDefault()
      if (bio) {
        formData.append('bio', bio )
      }
      if (skills) {
        formData.append('skills', skills )
      }
      if (interests) {
        formData.append('interests', interests )
      }
      if (talents) {
        formData.append('Talents', talents )
      }
      if (role) {
        formData.append('MakeMeMentor', mentor)
      }
      if (firstName) {
        formData.append('first_name', firstName )
      }
      if (lastName) {
        formData.append('last_name', lastName )
      }

      put(`api/app/profile/${id}`, formData)
        .then(() => {
          router.push('/profile')
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    [ bio, mentor, talents, skills, interests, role, firstName, lastName]
  )

  /**
   * handles submit edit profile for company users
   */
  const handleCompanyEditProfile = useCallback(
    async (e) => {
      e.preventDefault()
      console.log('username',userName)
      console.log('nackground',background)
      if (userName) {
        formData.append('name', userName)
      }
      if (background) {
        formData.append('background_info', background)
      }
      if (description) {
        formData.append('description', description)
      }
      if (website) {
        formData.append('website', website)
      }
      formData.append('company_user', id)
     
      put(`api/company/CompanyProfile/${special}`, formData)
        .then(() => {
          router.push('/profile')
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    [userName, background, description, website]
  )

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <Header />
      </div>
      <div className="container m-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-lighter px-5 py-8 h-4/5 rounded-xl shadow-md text-main w-full relative">
          <div className="absolute top-0 left-0" style={{ margin: -15 }}>
            <BackButton name="Back" />
          </div>
          {role !== 'Company' ? (
            <form onSubmit={handleEditProfile}>
              <h1 className="mb-8 text-3xl text-center">Edit Your Profile</h1>
              {role === 'User/YoungPeople' ? (
                <div>
                  <Modal
                    buttonTitle="View Course List"
                    modalTitle="Course List"
                    listType="course"
                  />
                  <Modal
                    buttonTitle="View Mentor List"
                    modalTitle="Mentor List"
                    listType="mentor"
                    mentorList={mentorData}
                  />
                  <Modal
                    buttonTitle="View Company List"
                    modalTitle="Company List"
                    listType="company"
                    companyList={companyData}
                  />
                </div>
              ) : role === 'Mentor' ? (
                <div>
                  <Modal
                    buttonTitle="View Course List"
                    modalTitle="Course List"
                    listType="course"
                  />
                  <Modal
                    buttonTitle="View Mentee List"
                    modalTitle="Mentee List"
                    listType="mentee"
                    menteeList={menteeData}
                  />
                  <Modal
                    buttonTitle="View Company List"
                    modalTitle="Company List"
                    listType="company"
                    companyList={companyData}
                  />
                </div>
              ) : (
                <div>
                  <Modal
                    buttonTitle="View Follower List"
                    modalTitle="Follower List"
                    listType="follower"
                    followerList={followerData}
                  />
                </div>
              )}
              <FormField
                text="username"
                placeholder={userName}
                style={NameStyle}
                readOnly
                cursor-none
              />

              <FormField
                text="First Name"
                name="first_name"
                action={handleFirstNameChange}
                placeholder="First Name"
                style={FormStyle}
                value={firstName}
              />

              <FormField
                text="Last Name"
                name="last_name"
                action={handleLastNameChange}
                placeholder="Last Name"
                style={FormStyle}
                value={lastName}
              />

              <FormField
                type="text"
                name="bio"
                action={handleBiosChange}
                placeholder="Background"
                style={FormStyle}
                value={bio}
              />

              <FormField
                type="text"
                name="skills"
                action={handleSkillsChange}
                placeholder="Skills"
                style={FormStyle}
                value={skills}
              />

              <FormField
                type="text"
                name="talents"
                action={handleTalentsChange}
                placeholder="Talents"
                style={FormStyle}
                value={talents}
              />

              <FormField
                type="text"
                name="interests"
                action={handleInterestsChange}
                placeholder="Interests"
                style={FormStyle}
                value={interests}
              />
              <Checkbox
                onChange={handleIsMentorChange}
                isDisabled={isMentor}
                value={mentor}
                message="Make Me Mentor"
              />
              <Button name="Confirm" />
            </form>
          ) : (
            <form onSubmit={handleCompanyEditProfile}>
              <h1 className="mb-8 text-3xl text-center">Edit Your Profile</h1>
              <div>
                <Modal
                  buttonTitle="View Follower List"
                  modalTitle="Follower List"
                  listType="follower"
                  followerList={followerData}
                />
              </div>

              <FormField
                type="text"
                name="name"
                action={handleUserNameChange}
                placeholder="Company Name"
                style={FormStyle}
                value={userName}
              />

              <FormField
                type="text"
                name="background_info"
                action={handleBackgroundChange}
                placeholder="Background"
                style={FormStyle}
                value={background}
              />

              <FormField
                type="text"
                name="description"
                action={handleDescriptionChange}
                placeholder="Description"
                style={FormStyle}
                value={description}
              />

              <FormField
                type="text"
                name="website"
                action={handleWebsiteChange}
                placeholder="Website"
                style={FormStyle}
                value={website}
              />

              <Button name="Confirm" />
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
