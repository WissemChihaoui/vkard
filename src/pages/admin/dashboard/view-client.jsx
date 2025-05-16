import React from 'react'
import ClientsDetailsView from '../../../sections/admin/clients/views/clients-details-view'
import { useParams } from '../../../routes/hooks'
import { useGetClient } from '../../../actions/users'

export default function Page() {
  const { id } = useParams()

  const { userData } = useGetClient(id)

  console.log(userData)

  return (
    <ClientsDetailsView user={userData}/>
  )
}
