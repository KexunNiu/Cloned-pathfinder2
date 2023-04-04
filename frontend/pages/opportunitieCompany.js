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
      get(`api/activities/activity/approved/${userId}`)
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
          opportunity.name.toLowerCase().includes(searchfield.toLowerCase()) ||
          opportunity.description.toLowerCase().includes(searchfield.toLowerCase())
        )
      })
      setOpportunityListShown(filteredList)
    }
  }, [searchfield])

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentOpportunities = opportunityListShown.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <SearchBar setSearch={setSearchfield} />

      <div className="container max-2xl h-full flex flex-col mx-auto items-center">
        {currentOpportunities.map((opportunity) => (
          <ListItem
            key={opportunity.name}
            header="Activity Details"
            type="Activity"
            opportunityType="activity"
            title={opportunity.name}
            link={opportunity.link}
            date={formatDate(opportunity.date_posted)}
            deadline={formatDate(opportunity.deadline)}
            description={opportunity.description}
            href={`/opportunity/${opportunity.id}`}
            img={
              opportunity.activity_picture ?? '../../defaultOpp.png'
            }
          />
        ))}
        <Pagination totalPosts={opportunityListShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
  )
}

export default OpportunityList