import React from 'react'
import { useQuery } from 'react-query'
import { Navigate, Outlet } from 'react-router-dom'
import { getUserProfile } from '../actions/userActions'

const PrivateRoute = () => {

   // Query hook to get the user's profile
  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useQuery('userInfo', getUserProfile)

  // Get the user info from local storage
  let local = JSON.parse(localStorage.getItem('userinfo')) 

  let content
  if(local) {
    if (isLoading) {
        return <h5>Loading....</h5>
      } else if (isError) {
       console.log(error)
      }else{
        content = userInfo
      }
  }else{
    return <Navigate to='/' />
  }
  
  // If the user is logged in, render the outlet component
  // Otherwise, navigate to the '/'
  return content ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
