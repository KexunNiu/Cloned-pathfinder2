import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import ListItem from '../components/common/BoardListItems'
import SearchBar from '../components/common/SearchBar'
import { get } from '../components/utils/Api'
import {formatCurrency} from '../components/utils/Formatting';
import Pagination from '../components/common/Pagination'

/**
 * View a list of all scholarships
 * @returns jsx
 */

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([])
  const [scholarshipsShown, setscholarshipsShown] = useState([])
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
    get(`api/scholarships/scholarship/approved/${userId}`)
      .then((data) => {
        console.log(data)

        setScholarships(data)
        setscholarshipsShown(data)
      })
      .catch((e) => {
        console.error(e.message)
      })
    })
  }, [])

  useEffect(() => {
    if (searchfield.length === 0) {
      if (scholarships.length > 0) {
        setscholarshipsShown(scholarships)
      }
    } else {
      // search bar
      const filteredList = scholarships.filter((scholarship) => {
        return (
          scholarship.name.toLowerCase().includes(searchfield.toLowerCase()) ||
          scholarship.description.toLowerCase().includes(searchfield.toLowerCase())
        )
      })
      setscholarshipsShown(filteredList)
    }
  }, [searchfield])

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentScholarships = scholarshipsShown.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <SearchBar setSearch={setSearchfield} />

      <div className="container max-2xl h-full flex flex-col mx-auto items-center">
        {currentScholarships.map((scholarship) => (
          <ListItem
            key={scholarship.name}
            header={scholarship.name}
            type="Scholarship"
            opportunityType="scholarship"
            title={scholarship.name}
            deadline={formatDate(scholarship.deadline)}
            amount={formatCurrency(scholarship.amount)}
            date={formatDate(scholarship.date_posted)}
            description={scholarship.description}
            eligibility={scholarship.eligibility}
            link={scholarship.link}
            href={`/scholarship/${scholarship.id}`}
            img={
              scholarship.scholarship_picture ?? '../../defaultSch.png'
            }
          />
        ))}
        <Pagination totalPosts={scholarshipsShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
    
  )
}

export default ScholarshipList
