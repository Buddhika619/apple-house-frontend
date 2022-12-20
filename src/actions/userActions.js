import axios from 'axios'

//log in to the application
export const login = async (user) => {
  const { data } = await axios.post(`/api/users/login`, user)
  localStorage.setItem('userinfo', JSON.stringify(data))
  return data
}

//register as a new user
export const registerUser = async (user) => {
  const { data } = await axios.post(`/api/users`, user)
  localStorage.setItem('userinfo', JSON.stringify(data))
  return data
}

//getting user  details
export const getUserProfile = async () => {
  const user = JSON.parse(localStorage.getItem('userinfo'))

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const { data } = await axios.get(`/api/users/userinfo`, config)
  return data
}

//log out from the application
export const logOut = async () => {
  localStorage.removeItem('userinfo')
}
