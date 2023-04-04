import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import ErrorMessage from '../components/common/ErrorMessage'
import NavHeader from '../components/common/Header'
import LinkButton from '../components/common/LinkButton'
import Header from '../components/profile/header'
import Form from '../components/profile/Form'
import DatePicker from '../components/common/DatePicker'
import Link from 'next/link'
import SubmitButton from '../components/common/SubmitButton'
import FormField from '../components/profile/FormField'
import { get, post_form, put } from '../components/utils/Api'
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
  const [showFile, setShowFile] = useState([])
  const [DateError, setDateError] = useState('')
  const [EliError, setEliError] = useState('')
  const [Eli, setEli] = useState('')
  const [opportunityDescription, setOpportunityDescription] = useState('')
  const [opportunityDescriptionError, setOpportunityDescriptionError] = useState('')
  const [opportunitySkills, setOpportunitySkills] = useState('')
  const [opportunitySkillsError, setOpportunitySkillsError] = useState()

  const [website, setWebsite] = useState('')
  const [websiteError, setWebsiteError] = useState('')

  const [amount, setAmount] = useState('')
  const [amountError,setAmountError] = useState('')

  const [file,setFile] = useState([])
  const [fileError,setFileError] = useState([])
  const [userName, setUserName] = useState('')
  const [id, setId] = useState('')
  const FormStyle = { width: '100%',height:'50px' }
  const FormStyle1 = { width: '100%',height:'100px'}
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  

  // router
  const router = useRouter()
  const sdata = router.query;
  let validCheck = false
  //error message handle

  const handleDateChange = useCallback((e) => {
    setDate(e.target.value);
    }, [])
  //
  const handleEligibilityChange = useCallback((e) => {
    //empty string when there is no error
    setEliError('')
    setEli(e.target.value)
  }, [])
  //
  const handleDescriptionChange = useCallback((e) => {
    setOpportunityDescriptionError('')
    setOpportunityDescription(e.target.value)
  },[])
  //
  const handleNameChange = useCallback((e) => {
    setOpportunitySkillsError('')
    setOpportunitySkills(e.target.value)
  },[])
//
  const handleWebsitechange = useCallback((e) => {
    setWebsiteError('')
    setWebsite(e.target.value)
  },[])
//
  const handleAmountchange = useCallback((e) => {
    setAmountError('')
    setAmount(Math.round((e.target.value).replace(/[^\d]/g, '')))
  },[])

  const handleFilechange = useCallback((e) => {
    setFileError('')
    setFile(e.target.files[0])
  },[])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const isTitleEmpty = opportunityTitle.length === 0
    const isDescriptionEmpty = opportunityDescription.length === 0
    const isSkillEmpty = opportunitySkills === 0
    const webReg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g 
    const webwww = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    
    validCheck = true
    if ((!website.match(webwww))){
      setWebsiteError('Website is not valid.')
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
    get(`api/scholarships/scholarship/${sdata.id}`)
    .then((data) => {
        setAmount(data.amount)
        setEli(data.eligibility)
        setDate(data.deadline)
        setOpportunityDescription(data.description)
        setOpportunitySkills(data.name)
        setWebsite(data.link)
        setShowFile(data.scholarship_picture)
    })
    .catch((e)  => {
        console.error(e.message)
    })
  },[])

  


  const onClickHandler = () => {
    
    console.log(opportunityDescription)
    console.log(Eli)
    console.log("amount: "+ amount)
    console.log(website)
    console.log(file)
    console.log(date)
    let formData = new FormData()
      formData.append('amount', amount)
      formData.append('company', {id})
      formData.append('deadline', date)
      formData.append('description', opportunityDescription)
      formData.append('eligibility', Eli)
     
      formData.append('link', website)
      formData.append('name', opportunitySkills)
      
      if (file.length != 0 ) {
        formData.append('scholarship_picture',file)
      }
      put(`api/scholarships/scholarship/${sdata.id}`,  formData)
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
          <Header name='Edit Scholarship Post' />
          <form onSubmit={handleSubmit}>
            <Form formStyle={SkillsStyle} content='Name *' />
            <input
                      type='text'
                      name='Job Title'
                      value={opportunitySkills}
                      style={FormStyle}
                      onChange={handleNameChange }
                      
                  
                    />
                    
           
            <Form formStyle={SkillsStyle} content='Description *' />
            
            <input
                      type='text'
                      name='bio'
                      value={opportunityDescription}
                      style={FormStyle}
                      onChange={handleDescriptionChange}
                   
                    />
                
              <Form formStyle={SkillsStyle} content='Eligibility *' />
              
              <input
                      type='text'
                      name='bio'
                      value={Eli}
                      style={FormStyle1}
                      onChange={handleEligibilityChange}
                   
                    />
              <Form formStyle={SkillsStyle} content='Deadline *' />
              <label></label>

              <input type="datetime-local" id="start" name="trip-start"
                  value={date}
                  onChange={handleDateChange}
                  min={getCurrentDateTime()} max="2070-12-31"/>
              
              <Form formStyle={SkillsStyle} content='Website *' />
              <div >
                 
                  <input 
                      type='text' name='company-website' id='company-website' 
                      onChange={handleWebsitechange }
                      value={website}/>
                </div> 
                <ErrorMessage error={websiteError}></ErrorMessage>

                <Form formStyle={SkillsStyle} content='Amount * '/>
              <div >
                
                  <input 
                      type='text' name='company-website' id='company-website' 
                      onChange = {handleAmountchange}
                      placeholder={amount}
                      value={amount}/>
                </div> 
                <Form formStyle={SkillsStyle} content='Image ' />
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

                    
                    
                <div className='absolute top-0 left-0' style={{ margin: -15 }}>
                </div>
                <button onClick={onClickHandler}> <SubmitButton name='Confirm'/> </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
