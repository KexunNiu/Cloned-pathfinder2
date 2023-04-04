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
import { get, post_form } from '../components/utils/Api'
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
  const [file,setFile] = useState([])
  const [date, setDate] = useState('')
  const [website, setWebsite] = useState('')
  const [websiteError, setWebsiteError] = useState('')
  const FormStyle = { width: '100%',height:'50px' }
  const FormStyle1 = { width: '100%',height:'100px'}
  // router
  const router = useRouter()
  let validCheck = false
  //error message handle
  const handleOpportunityTitleChange = useCallback((e) => {
    //empty string when there is no error
    setOpportunityTitleError('')
    setOpportunityTitle(e.target.value)
  }, [])
 
  const handleWebsitechange = useCallback((e) => {
    setWebsiteError('')
    setWebsite(e.target.value)
  }, [])
  const handleOpportunityDescriptionChange = useCallback((e) => {
    setOpportunityDescriptionError('')
    setOpportunityDescription(e.target.value)
  },[])

  const handleOpportunitySkillsChange = useCallback((e) => {
    setOpportunitySkillsError('')
    setOpportunitySkills(e.target.value)
  },[])

  const handleDateChange = useCallback((e) => {
    setDate(e.target.value);
  },[])

  const handleFilechange = useCallback((e) => {
    setFile(e.target.files[0])
  },[])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const isTitleEmpty = opportunityTitle.length === 0
    const isDescriptionEmpty = opportunityDescription.length === 0
    const isSkillEmpty = opportunitySkills.length === 0
    const isWebsiteEmpty = website.length === 0
    validCheck = true
    const webwww = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

    if (!website.match(webwww)) {
      setWebsiteError('Website is not valid')
      validCheck = false
    }
    if (isWebsiteEmpty) {
      setWebsiteError('*Empty website')
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

  // //get the company name for header
  // useEffect(() => {
  //   get(`auth/users/me/`)
  //     .then((userData) => {
  //       setId(userData.id)
  //       get(`api/app/profile/${userData.id}`)
  //         .then((data) => {
  //           setUserName(data.first_name + ' ' + data.last_name)
  //           console.log(`${id}`)
  //            })
  //         .catch((e) => {
  //           console.error(e.message)
  //         })
  //     })
  //     .catch((e) => {
  //       console.error(e.message)
  //       RefreshOrRedirect(router)
  //     })
  // }, [userName, id])

  


  const onClickHandler = () => {
    console.log(opportunityTitle)
    console.log(opportunityDescription)
    console.log(opportunitySkills)
    console.log(file)
    console.log(website)
    let formData = new FormData()
      formData.append('job_title', opportunityTitle)
      formData.append('job_description', opportunityDescription)
      formData.append('job_skills', opportunitySkills)
      const webReg = /(http(s)?:\/\/.)/g
      if (!website.match(webReg)){
        website = 'https://' + website
      }
      formData.append('link',website)
      formData.append('opportunity_picture',file)
      formData.append('deadline',date)
 
    post_form(`api/opportunity/create`,  formData)
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
          <Header name="Create a New Job Post" />
          <form onSubmit={handleSubmit}>
            <Form formStyle={SkillsStyle} content="Info:" />
            
            <input
                      type="text"
                      name="Job Title"
                      style={FormStyle}
                      onChange={handleOpportunityTitleChange}
                      placeholder="Job title"
                    />
              <ErrorMessage error={opportunityTitleError}></ErrorMessage>    
           
            <Form formStyle={SkillsStyle} content="Description:" />
            
            <input
                      type="text"
                      name="bio"
                      placeholder="Job description"
                      style={FormStyle}
                      onChange={handleOpportunityDescriptionChange}
                    />
                <ErrorMessage error={opportunityDescriptionError}></ErrorMessage>


              
                
              <Form formStyle={SkillsStyle} content="More" />
              
              <input
                      type="text"
                      name="bio"
                      placeholder="Skills"
                      style={FormStyle1}
                      onChange={handleOpportunitySkillsChange}
                  
                    />
                <ErrorMessage error={opportunitySkillsError}></ErrorMessage>


            <Form formStyle={SkillsStyle} content='Website *' />
              <div >
                 <input 
                      type='text' name='company-website' id='company-website' 
                      onChange={handleWebsitechange }
                      placeholder='www.example.com'/>
                </div> 
                <ErrorMessage error={websiteError}></ErrorMessage>

              <Form formStyle={SkillsStyle} content='Deadline *'/>
                  <input type="datetime-local" id="start" name="trip-start"
                  value={date}
                  onChange={handleDateChange}
                  min={getCurrentDateTime()} max="2070-12-31"
                  />

                <Form formStyle={SkillsStyle} content='Image' />
            <input
                      type='file'
                      name='Job Title'
                      style={FormStyle}
                      onChange={handleFilechange}

                    />
                    
                <div className="absolute top-0 left-0" style={{ margin: -15 }}>
                </div>
                <button onClick={onClickHandler}> <SubmitButton name="Create"/> </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
