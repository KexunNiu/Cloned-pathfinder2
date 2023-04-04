import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { get } from '../../components/utils/Api'
import NavHeader from '../../components/common/Header'
import BackButton from '../../components/common/BackButton'
import Header from '../../components/profile/header'
import Form from '../../components/itemsDetail/Form'
import LongForm from '../../components/profile/LongForm'
import DetailModal from '../../components/common/DetailModal'

const SkillsStyle = { margin: 'auto', marginTop: '15px' }
const InterestsStyle = { margin: 'auto', marginTop: '15px' }
const TalentsStyle = { margin: 'auto', marginTop: '15px' }

/**
 * View mentor details page
 * @returns jsx
 */
function Mentor() {
    const [userName, setUserName] = useState('')
    const [bio, setBio] = useState('')
    const [role, setRole] = useState('')
    const [interests, setInterests] = useState('')
    const [skills, setSkills] = useState('')
    const [talents, setTalents] = useState('')
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getData = async () =>
            await get(`api/app/profile/${id}`)
                .then((data) => {
                    setUserName(data.first_name + ' ' + data.last_name)
                    setRole(data.role)
                    setBio(data.bio)
                    setInterests(data.interests)
                    setSkills(data.skills)
                    setTalents(data.Talents)
                })
                .catch((e) => {
                    console.error(e.message)
                })
        getData()
    }, [id])

    return (
        <div className="bg-primary min-h-screen flex flex-col">
            <div>
                <NavHeader />
            </div>
            <div className="container m-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-lighter px-5 py-8 h-4/5 rounded-xl shadow-md text-main w-full relative">
                    <div className="absolute top-0 left-0" style={{ margin: -15 }}>
                        <BackButton name="Back" />
                    </div>
                    <Header name={`${userName}`} />
                    <DetailModal modalTitle={userName} name="William" email="william@gmail.com" number="1-234-567-8910" />
                    <div className="mt-10 ml-10">
                        <img src="example.png" layout="fill" alt="example picture" />
                    </div>
                    <Form formStyle={SkillsStyle} formTitle="Role" content={role} />
                    <LongForm formTitle="Background" content={bio} />
                    <Form formStyle={SkillsStyle} formTitle="Skills" content={skills} />
                    <Form formStyle={TalentsStyle} formTitle="Talents" content={talents} />
                    <Form formStyle={InterestsStyle} formTitle="Interests" content={interests} />
                </div>
            </div>
        </div>
    )
}

export default Mentor
