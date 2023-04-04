import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import ListItem from '../components/common/BoardListItems'
import SearchBar from '../components/common/SearchBar'
import { get } from '../components/utils/Api'
import Pagination from '../components/common/Pagination'

/**
 * View a list of all opportunities
 * @returns jsx
 */
function OpportunityList() {
  const [opportunities, setOpportunities] = useState([])
  const [opportunityListShown, setOpportunityListShown] = useState([])
  const [searchfield, setSearchfield] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(4)
  const [id, setId] = useState('')
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString('en-US',{
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

 
  useEffect(() => {
    get(`auth/users/me/`)
    .then((user) => {
      const userId = user.id
      if(!userId) return;
      setId(userId);
    get(`/api/opportunity/jobs/approved/${userId}`)
      .then((data) => {
        setOpportunities(data)
        setOpportunityListShown(data)
        console.log(data)
      })
      .catch((e) => {
        console.error(e.message)
      })
    })
  }, [])

  useEffect(() => {
    if (searchfield.length === 0) {
      if (opportunities.length > 0) {
        setOpportunityListShown(opportunities)
      }
    } else {
      // search bar
      const filteredList = opportunities.filter((opportunity) => {
        return (
          opportunity.job_title.toLowerCase().includes(searchfield.toLowerCase()) ||
          opportunity.job_description.toLowerCase().includes(searchfield.toLowerCase())
        )
      })
      setOpportunityListShown(filteredList)
    }
  }, [searchfield])
  
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentJobs = opportunityListShown.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <SearchBar setSearch={setSearchfield} />

      <div className="container max-2xl h-full flex flex-col mx-auto items-center">
        {currentJobs.map((opportunity) => (
          <ListItem
            key={opportunity.job_title}
            type="Job"
            header="Job Details"
            opportunityType="job"
            title={opportunity.job_title}
            description={opportunity.job_description}
            skills={opportunity.job_skills}
            link={opportunity.link}
            deadline={formatDate(opportunity.deadline)}
            date={formatDate(opportunity.date_posted)}
            href={`/opportunity/${opportunity.id}`}
            img={
              opportunity.opportunity_picture ?? '../../defaultOpp.png'
            }
          />
        ))}
        <Pagination totalPosts={opportunityListShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
  )
}

export default OpportunityList
