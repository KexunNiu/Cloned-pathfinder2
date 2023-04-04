import React from 'react'
import { useRouter } from 'next/router';
import NavHeader from '../components/common/Header'
import { useEffect, useState } from 'react'
import { DeleteButton, OutlinedButton, SolidButton, ViewButton } from '../components/common/Buttons';
import { get,getCurrentUser } from '../components/utils/Api'
import SearchBar from '../components/common/SearchBar'
import { JobCard, ScholarshipCard, CourseCard } from '../components/opportunities/display/OpportunityDisplay'
import Pagination from '../components/common/Pagination'

const OpportunityList = () => {
const [currentTab, setcurrentTab] = useState('job')
const [jobList, setjobList] = useState([])
const [courseList, setCourseList] = useState([])
const [scholarshipsList, setScholarshipsList] = useState([])
const [searchfield, setSearchfield] = useState('')
const [jobShown, setJobShown] = useState([])
const [courseShown, setCourseShown] = useState([])
const [scholarshipShown, setScholarshipShown] = useState([])
const [userId, setUserId] = useState('');
const [currentPage, setCurrentPage] = useState(1)
const [postsPerPage, setPostsPerPage] = useState(3)
const [selectedTags, setSelectedTags] = useState([])
const [tagJobList, setJobTagList] = useState(new Map())
const [tagScholarshipList, setTagScholarshipList] = useState(new Map())
const [tagCourseList, setTagCourseList] = useState(new Map())
const [tagsShown, setTagsShown] = useState([])
const updateScholarshipMap = (k,v) => {
    setTagScholarshipList(tagScholarshipList.set(k,v));
}
const updateCourseMap = (k,v) => {
    setTagCourseList(tagCourseList.set(k,v));
}
const updateJobMap = (k,v) => {
    setJobTagList(tagJobList.set(k,v));
}
const updateSelectedTags = (item) => {
    setSelectedTags(selectedTags => [...selectedTags, item]);
}
const updateRemoveSelectedTags = (item) => {
    const newList = selectedTags.filter((element) => element !== item);
    setSelectedTags(newList);
}
const selectedTagHasItem = (item) => {
    return selectedTags.includes(item);
}
const router = useRouter();
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentJob = jobShown.slice(firstPostIndex, lastPostIndex);
const currentScholarship = scholarshipShown.slice(firstPostIndex, lastPostIndex);
const currentCourse = courseShown.slice(firstPostIndex, lastPostIndex);


    useEffect(() => {
        get('api/courses/all-courses')
        .then((response) => {
            setCourseList(response)
            setCourseShown(response)
        })
        .catch((error) => {
            console.log("Error")
            console.error(error)
        });
        get('api/opportunity')
        .then((response) => {
            setjobList(response)
            setJobShown(response)
        })
        .catch((error) => {
            console.log("Error")
            console.error(error)
        });
        get('api/scholarships/all-scholarships')
        .then((response) => {
            setScholarshipsList(response)
            setScholarshipShown(response)
        })
        .catch((error) => {
            console.log("Error")
            console.error(error)
        });
        get('api/opportunity/get/tags/')
        .then((response) => {
            Object.keys(response.tag_list).map((key) => {
                updateJobMap(key, response.tag_list[key])
            })
        })
        .catch((error) => {
            console.log("Error")
            console.error(error)
        });
        get('api/scholarships/scholarship/get/tags/')
        .then((response) => {
            Object.keys(response.tag_list).map((key) => {
                updateScholarshipMap(key, response.tag_list[key])
            })
        })
        .catch((error) => {
            console.log("Error")
            console.error(error)
        });
        get('/api/courses/courses/get/tags/')
        .then((response) => {
            Object.keys(response.tag_list).map((key) => {
                updateCourseMap(key, response.tag_list[key])
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }, Object)

    // Fetch current user id from backend
    useEffect(() => {
        getCurrentUser((userData) => {
        setUserId(userData.id);
        }, router);
    }, []);
    useEffect(() => {
          // search bar
          if (currentTab === 'job'){
            const filteredList = jobList.filter((job) => {
                return (
                  job.job_description.toLowerCase().includes(searchfield.toLowerCase()) ||
                  job.job_title.toLowerCase().includes(searchfield.toLowerCase()) ||
                  job.company.name.toLowerCase().includes(searchfield.toLowerCase()) ||
                  job.job_skills.toLowerCase().includes(searchfield.toLowerCase()) ||
                  job.date_posted.slice(0,10).toLowerCase().includes(searchfield.toLowerCase())
                )
              })
              setJobShown(filteredList)
          } else if (currentTab === 'scholarship'){
            const filteredList = scholarshipsList.filter((scholarship) => {
                return (
                    // scholarship.company.name.toString().toLowerCase().includes(searchfield.toLowerCase()) ||
                    scholarship.description.toLowerCase().includes(searchfield.toLowerCase()) ||
                    scholarship.eligibility.toLowerCase().includes(searchfield.toLowerCase()) || 
                    scholarship.deadline.toLowerCase().includes(searchfield.toLowerCase()) ||
                    scholarship.link.toLowerCase().includes(searchfield.toLowerCase()) ||
                    scholarship.amount.toLowerCase().includes(searchfield.toLowerCase())
                )
              })
              setScholarshipShown(filteredList)
           } else if (currentTab === 'courses'){
            const filteredList = courseList.filter((course) => {
                return (
                    course.Course.toLowerCase().includes(searchfield.toLowerCase()) ||
                    course.Description.toLowerCase().includes(searchfield.toLowerCase())
                )
              })        
              setCourseShown(filteredList)
        }
      }, [searchfield,currentTab])
    useEffect(() => {
        if (currentTab==='job') {
            if (selectedTags.length===0) {
                setJobShown(jobList)
            } else {
                var filteredList = jobList  
                for (var t=0; t<selectedTags.length; t++) {
                    var utilList = new Array()  
                    const jl = new Set(tagJobList.get(selectedTags[t]))
                    for (var i = 0; i < filteredList.length; i++) {
                            if (jl.has(filteredList[i].id)) {
                                utilList.push(filteredList[i])
                        }   
                    }
                    filteredList = utilList
                }
                setJobShown(filteredList)
            }
        } else if (currentTab==='scholarship') {
            if (selectedTags.length===0) {
                setScholarshipShown(scholarshipsList)
            } else {
                var filteredList = scholarshipsList
                for (var t=0; t<selectedTags.length; t++) {
                    var utilList = new Array()
                    const jl = new Set(tagScholarshipList.get(selectedTags[t]))
                    for (var i = 0; i < filteredList.length; i++) {
                        if (jl.has(filteredList[i].id)) {
                            utilList.push(filteredList[i])
                        }
                    }
                    filteredList = utilList
                }
                setScholarshipShown(filteredList)
            }
        } else if (currentTab==='courses') {
            if (selectedTags.length===0) {
                setCourseShown(courseList)
            } else {
                var filteredList = courseList
                for (var t=0; t<selectedTags.length; t++) {
                    var utilList = new Array()
                    const jl = new Set(tagCourseList.get(selectedTags[t]))
                    for (var i = 0; i < filteredList.length; i++) {
                        if (jl.has(filteredList[i].id)) {
                            utilList.push(filteredList[i])
                        }
                    }
                    filteredList = utilList
                }
                setCourseShown(filteredList)
            }
        }
    }, [selectedTags, currentTab])
    useEffect(() => {
        if (currentTab==='job') {
            setTagsShown(tagJobList)
        } else if (currentTab==='scholarship') {
            setTagsShown(tagScholarshipList)
        } else if (currentTab==='courses') {
            setTagsShown(tagCourseList)
        }
    }, [currentTab])


  function changeState(state){
    setcurrentTab(state)
    setSelectedTags([])
    setCurrentPage(1)
  }

    function add_tag(tag) {
        updateSelectedTags(tag)
    }   

    function remove_tag(tag) {
        updateRemoveSelectedTags(tag)
    }

    const displayTags = () => {
        var renderList = new Array()
        for (let key of tagsShown.keys()) {
            if (selectedTagHasItem(key)==false) {
                renderList.push(
                    <OutlinedButton onClick={() => {add_tag(key)}}>{key}</OutlinedButton>
                )
            } else {
                renderList.push(
                    <SolidButton onClick={() => {remove_tag(key)}}>{key}</SolidButton>
                )
            }
        }
        return renderList
    }
  return (
    <div className="bg-primary min-h-screen flex flex-col">
        
        <div>
            <NavHeader />
        </div>
    
        <SearchBar setSearch={setSearchfield}></SearchBar>
        <div className="maingrid">
        
        <div className="grid1">
            {displayTags()}
        </div>
        <div className="grid2 container max-w-2xl flex-1 flex flex-col items-center px-2" >
            <div className="bg-lighter p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">
            <div className="place-items-center text-sm font-medium text-center text-gray-500 border-gray-200">
                <ul className="flex flex-wrap -mb-px">
                    <button aria-label="job Button" onClick={()=>{changeState('job');}}>
                        <li className="mr-2">
                            <a className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Jobs</a>
                        </li>
                    </button>
                    <button aria-label="Scholarship Button" onClick={()=>changeState('scholarship')}>
                        <li className="mr-2">
                            <a className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Scholarships</a>
                        </li>
                    </button>
                    <button aria-label="Courses Button" onClick={()=>changeState('courses')}>
                        <li className="mr-2">
                            <a className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Courses</a>
                        </li>
                    </button>
                    <button aria-label="Others Button" onClick={()=>changeState('others')}>
                        <li className="mr-2">
                            <a className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Others</a>
                        </li>
                    </button>
                </ul>
            </div>
                <div id="main" className="grid grid-rows-6 grid-flow-col"> 
                    <div>
                        {currentTab === 'job' ? (
                            <div> 
                            {
                                currentJob.map((job) => 
                                <JobCard
                                key={job.id}
                                userId={userId}
                                // TODO: Why is this field called `opportunity`?
                                jobObj={job}
                                showExpired={true}
                                /> )
                            }
                            <Pagination totalPosts={jobShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                            </div>
                        ) : currentTab === 'scholarship' ?(
                            <div> 
                            {
                                currentScholarship.map((scholarship) => 
                                <ScholarshipCard
                                key={scholarship.id}
                                userId={userId}
                                scholarshipObj={scholarship}
                                showExpired={true}
                                />                                
                                )
                            }
                            <Pagination totalPosts={scholarshipShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                            </div>
                        ) : currentTab === "courses" ?(
                            <div> 
                            {
                                currentCourse.map((courses) => 
                                <CourseCard
                                key={courses.id}
                                userId={userId}
                                courseObj={courses}
                                showExpired={true}
                                />     )
                            }
                            <Pagination totalPosts={courseShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                            </div>

                            ): null}
                    </div>
                </div> 
            </div>
            
        </div>
        </div>
    </div>
  );

} 


export default OpportunityList;