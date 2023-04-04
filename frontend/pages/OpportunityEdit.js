import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import ErrorMessage from '../components/common/ErrorMessage'
import NavHeader from '../components/common/Header'
import LinkButton from '../components/common/LinkButton'
import Header from '../components/profile/header'
import Form from '../components/profile/Form'
import Link from 'next/link'
import SubmitButton from '../components/common/SubmitButton'
import FormField from '../components/profile/FormField'
import { get, post_form, put} from '../components/utils/Api'
import { RefreshOrRedirect } from '../components/utils/AuthUtils'
import { getCurrentDateTime } from '../components/utils/General'
import BackButton from '../components/common/BackButton'

const SkillsStyle = { margin: 'auto', marginTop: '15px' }
/**
 * View your form page
 * @returns jsx
 */

//This is a form creation page for company users to create jop posts
function ProfilePage() {
  const [opportunityTitle, setOpportunityTitle] = useState('')
  // error message variables
  const [opportunityTitleError, setOpportunityTitleError] = useState('')
  const [opportunityDescription, setOpportunityDescription] = useState('')
  const [opportunityDescriptionError, setOpportunityDescriptionError] = useState('')
  const [opportunitySkills, setOpportunitySkills] = useState('')
  const [opportunitySkillsError, setOpportunitySkillsError] = useState()
  const [userName, setUserName] = useState('')
  const [id, setId] = useState('')
  const [date, setDate] = useState('')
  const [file,setFile] = useState([])
  const [showFile, setShowFile] = useState([])
  const [website, setWebsite] = useState('')
  const [websiteError, setWebsiteError] = useState('')
  const FormStyle = { width: '100%',height:'50px' }
  const FormStyle1 = { width: '100%',height:'100px'}
  
 
  // router
  const router = useRouter()
  const jdata = router.query;
  let validCheck = false
  //error message handle
  const handleOpportunityTitleChange = useCallback((e) => {
    //empty string when there is no error
    setOpportunityTitleError('')
    setOpportunityTitle(e.target.value)
  }, [])

  const handleOpportunityDescriptionChange = useCallback((e) => {
    setOpportunityDescriptionError('')
    setOpportunityDescription(e.target.value)
  },[])

  const handleWebsiteChange = useCallback((e) => {
    setWebsiteError('')
    setWebsite(e.target.value)
  },[])

  const handleDateChange = useCallback((e) => {
      setDate(e.target.value)
  }, [])


  const handleFilechange = useCallback((e) => {
    // setFileError('')
    setFile(e.target.files[0])
  },[])

  const handleOpportunitySkillsChange = useCallback((e) => {
    setOpportunitySkillsError('')
    setOpportunitySkills(e.target.value)
  },[])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const isTitleEmpty = opportunityTitle.length === 0
    const isDescriptionEmpty = opportunityDescription.length === 0
    const isSkillEmpty = opportunitySkills.length === 0
    const webwww = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    
    validCheck = true
    if (!website.match(webwww)) {
      setWebsiteError('Website is not valid')
      validCheck = false
    }
    if (isTitleEmpty) {
      //displsy error message if there is no title
      setOpportunityTitleError("*Empty title")
      validCheck = false
    }
    if (isDescriptionEmpty) {
      setOpportunityDescriptionError("*Empty description")
      validCheck = false
    }
    if (isSkillEmpty) {
      setOpportunitySkillsError("*Empty skills")
      validCheck = false
    }
  })

  //get the company name for header
  useEffect(() => {
    get(`auth/users/me/`)
      .then((userData) => {
        setId(userData.id)
        get(`api/app/profile/${userData.id}`)
          .then((data) => {
            setUserName(data.first_name + ' ' + data.last_name)
             })
          .catch((e) => {
            console.error(e.message)
          })
      })
      .catch((e) => {
        console.error(e.message)
        RefreshOrRedirect(router)
      })
  }, [userName, id])

  useEffect(() => {
    get(`api/opportunity/${jdata.id}`)
    .then((data) => {
        setOpportunityTitle(data.job_title)
        setOpportunityDescription(data.job_description)
        setOpportunitySkills(data.job_skills)
        setWebsite(data.link)
        setDate(data.deadline)
        setShowFile(data.opportunity_picture)
        console.log(jdata)
        console.log('ssss')
        console.log(website)
       
    })
    .catch((e)  => {
        console.error(e.message)
    })
  },[])

  


  const onClickHandler = () => {
    console.log(opportunityTitle)
    console.log(opportunityDescription)
    console.log(opportunitySkills)
    let formData = new FormData()
      formData.append('job_title', opportunityTitle)
      formData.append('job_description', opportunityDescription)
      formData.append('job_skills', opportunitySkills)
      formData.append('deadline', date)
      if (file.length != 0 ) {
        formData.append('opportunity_picture', file)
      }
      const webReg = /(http(s)?:\/\/.)/g
      if (!website.match(webReg)){
        website = 'https://' + website
      }
      formData.append('link',website)
 
      put(`api/opportunity/${jdata.id}/`,  formData)
    .then((res) => {
      console.log(res.data)
      router.push('/OpportunityList')
    })
    .catch((e)=>{
      console.log(e)
    })
    

  };

 
  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <NavHeader />
      </div>
      
      <div className="container max-w-2xl m-auto flex-col items-center justify-center px-2">
        <div className="bg-lighter p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">
       
          <div className="absolute top-0 left-0" style={{ margin: -15 }}>
                <BackButton name="Back" />
          </div>
          <Header name="Edit Job Post" />
          <form onSubmit={handleSubmit}>
            <Form formStyle={SkillsStyle} content="Title:" />
            
            <input
                      type="text"
                      name="Job Title"
                      style={FormStyle}
                      onChange={handleOpportunityTitleChange}
                      value={opportunityTitle}
                    
                    />
                    
           
            <Form formStyle={SkillsStyle} content="Description:" />
            
            <input
                      type="text"
                      name="bio"
                      value={opportunityDescription}
                     
                      style={FormStyle}
                      onChange={handleOpportunityDescriptionChange}
                     
                    />
                
              <Form formStyle={SkillsStyle} content="Skills" />
              
              <input
                      type="text"
                      name="bio"
                      value={opportunitySkills}
                      style={FormStyle1}
                      onChange={handleOpportunitySkillsChange}
                   
                    />

              <Form formStyle={SkillsStyle} content="Website *" />
              <div>
                <input
                  type='text'
                   name='company-website' 
                   id='company-website'
                  onChange={handleWebsiteChange}
                  value={website}
                  />
                  <ErrorMessage error={websiteError}></ErrorMessage>
              </div>
                    
              <Form formStyle={SkillsStyle} content="Deadline *" />
              <div>
                <input type="datetime-local" id="start" name="trip-start"
                  value={date}
                  onChange={handleDateChange}
                  min={getCurrentDateTime()} max="2070-12-31"
                  />
                </div>

                <Form formStyle={SkillsStyle} content='Image' />
                <a target="_blank" rel="noopener noreferrer" href={showFile} className="inline-flex items-center justify-center p-2 text-base font-medium text-gray-500 rounded-lg bg-sky-200 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-sky-200 dark:hover:bg-sky-500 dark:hover:text-white">
                    <span className="w-full">existing image</span>
                    <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                   
                </a> 
            <input
                      type='file'
                      name='Job Title'
                      style={FormStyle}
                      onChange={handleFilechange}

                    />
                <div className="absolute top-0 left-0" style={{ margin: -15 }}>
                </div>
                <button onClick={onClickHandler}> <SubmitButton name="Confirm Changes "/> </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
