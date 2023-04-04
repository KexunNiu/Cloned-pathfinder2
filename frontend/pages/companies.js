import React, { useEffect, useState, useCallback } from 'react'
import Header from '../components/common/Header'
import ListItem from '../components/common/BoardListItem'
import SearchBar from '../components/common/SearchBar'
import { get, post_form } from '../components/utils/Api'
import FormData from 'form-data'
import { parseJwt } from '../components/utils/CookieStorage'
import Pagination from '../components/common/Pagination'

/**
 * View a list of all companies
 * Company user cannot see this page
 * @returns jsx
 */
function CompaniesList() {
  const [companyListShown, setCompanyListShown] = useState([])
  const [companyList, setCompanyList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)
  const [searchfield, setSearchfield] = useState('')
  const myId = parseJwt().user_id
  let formData = new FormData()

  useEffect(() => {
    get(`api/company/Company-users`)
      .then((data) => {
        setCompanyList(data)
        setCompanyListShown(data)
      })
      .catch((e) => {
        console.error(e.message)
      })
  }, [])

  useEffect(() => {
    if (searchfield.length === 0) {
      if (companyList.length > 0) {
        setCompanyListShown(companyList)
      }
    } else {
      // search bar
      const filteredList = companyList.filter((company) => {
        return (
          company.companyName.toLowerCase().includes(searchfield.toLowerCase()) ||
          company.title.toLowerCase().includes(searchfield.toLowerCase()) ||
          company.description.toLowerCase().includes(searchfield.toLowerCase())
        )
      })
      setCompanyListShown(filteredList)
    }
  }, [searchfield])

  const handleRequest = useCallback(
    (id) => (e) => {
      e.preventDefault()
      formData.append('User_name', myId || 'NA')
      formData.append('Company_name', id || 'NA')
      formData.append('status', 'accepted' || 'NA')
      post_form(`api/company/SendRequestToCompany`, formData)
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
  const currentPosts = companyListShown.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <SearchBar setSearch={setSearchfield} />

      <div className="container max-2xl h-full flex flex-col mx-auto items-center">
        {currentPosts.map((company) => (
          <ListItem
            key={company.name}
            type="Company"
            title={company.name}
            description={company.description}
            href={`/company/${company.id}`}
            action={handleRequest(company.id)}
            img={'../../defaultUser.png'}
          />
        ))}
        <Pagination totalPosts={companyList.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
  )
}

export default CompaniesList
