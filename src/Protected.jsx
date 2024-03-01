import React from 'react'
import { useUserContext } from './Contexts/UserContext'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {

    const {user} = useUserContext()
    console.log(user)

  return (
       user ? <Outlet/> : null || <Navigate to={'log-in'}/> 
  )
}

export default Protected