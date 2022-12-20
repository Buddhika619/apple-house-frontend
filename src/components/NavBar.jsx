import { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import LogoutIcon from '@mui/icons-material/Logout'

import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import { useQuery } from 'react-query'
import { getUserProfile, logOut } from '../actions/userActions'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function NavBar() {

  // Hook for navigating to different routes within the app
  const navigate = useNavigate()

  // Hook for accessing the current route
  const {pathname} = useLocation()


  //hook for track search input field value
  const [keyword, setKeyword] = useState('')

  // Hook for executing actions when the component updates
  useEffect(() => {
    navigate(`/home/search/${keyword}`)
    if (keyword === '') {
      navigate('/home')
    }
  }, [keyword])

  // Hook for fetching data from an API and managing the loading and error states
  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useQuery('userInfo', getUserProfile)

   // Variable for storing the user information
  let content
  if (isLoading) {
  } else if (isError) {
    console.log(error)
  } else {
    content = userInfo
  }

  // Function for logging out
 const logout = () => {
    logOut()
    navigate('/')
 }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ background: '#757de8' }}>
        <Toolbar sx={{ mx: '2rem', background: '#757de8' }}>
          <Link to='/home'>
            <Typography variant='h6' noWrap component='div'>
              Apple House
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Box>
            {content && content.isAdmin && (
              <Link to='/admin'>
                <IconButton size='large' color='inherit'>
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Link>
            )}

            {content && (
              <Link to='/profile'>
                <IconButton size='large' color='inherit'>
                  <Badge>
                    <AccountCircle />
                  </Badge>
                </IconButton>
              </Link>
            )}

            {content && (
              <IconButton size='large' color='inherit' onClick={logout}>
                <Badge>
                  <LogoutIcon />
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
