import React, { useEffect, useState, useCallback } from 'react'
import Header from '../components/common/Header'
import ListItem from '../components/common/BoardListItem'
import SearchBar from '../components/common/SearchBar'
import { get, post_form } from '../components/utils/Api'
import FormData from 'form-data'
import { useRouter } from 'next/router'
import { RefreshOrRedirect } from '../components/utils/AuthUtils'
import Pagination from '../components/common/Pagination'

/**
 * View a list of all mentor users
 * @returns jsx
 */
function DashboardList() {
  const [mentorsShown, setMentorsShown] = useState([])
  const [mentors, setMentors] = useState([])
  const [myId, setId] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)
  let formData = new FormData()

  const router = useRouter()

  useEffect(() => {
    if (search.length === 0) {
      if (mentors.length > 0) {
        setMentorsShown(mentors)
      }
    } else {
      // search bar
      const filteredList = mentors.filter((mentor) => {
        return mentor.user.toLowerCase().includes(search.toLowerCase())
      })
      setMentorsShown(filteredList)
    }
  }, [search])

  useEffect(() => {
    get(`auth/users/me/`)
      .then((userData) => {
        setId(userData.id)
        get(`api/mentor/mentors`)
          .then((data) => {
            setMentors(data)
            setMentorsShown(data)
          })
          .catch((e) => {
            console.error(e.message)
          })
      })
      .catch((e) => {
        console.error(e.message)
        RefreshOrRedirect(router)
      })
  }, [myId])

  const handleRequest = useCallback(
    (id) => (e) => {
      e.preventDefault()
      formData.append('Mentee', myId || 'NA')
      formData.append('Mentor', id || 'NA')
      formData.append('status', 'pending' || 'NA')
      post_form(`api/app/SendRequestToMentor`, formData)
        .then((response) => {
          console.log(response)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    [myId]
  )

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentMentors = mentorsShown.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <SearchBar setSearch={setSearch} />

      <div className="container max-w-1/3 h-full flex flex-col mx-auto items-center">
        {currentMentors.map((mentor) => (
          <ListItem
            key={mentor.user}
            type="Mentor"
            title={mentor.first_name + ' ' + mentor.last_name}
            description={mentor.bio}
            href={`/mentor/${mentor.id}`}
            action={handleRequest(mentor.id)}
            img={mentor.profile_picture ?? '../../defaultUser.png'}
          />
        ))}
        <Pagination totalPosts={mentorsShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
  )
}

export default DashboardList
