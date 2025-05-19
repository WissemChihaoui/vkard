import React from 'react'
import ProfilePageView from '../../sections/user/views/profile-page-view'
import { useParams } from '../../routes/hooks'
import { useGetProfile } from '../../actions/cards';

export default function Page() {
  const { id } = useParams();

  console.log(id)

  const { profile } = useGetProfile(id)
  return (
    <ProfilePageView profile={profile}/>
  )
}
