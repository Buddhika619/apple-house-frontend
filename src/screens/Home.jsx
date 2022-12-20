import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import PostModel from '../components/PostModel'
import PostCard from '../components/PostCard'
import { approvedPosts } from '../actions/postActions'
import { useParams } from 'react-router-dom'

const Home = () => {
  //creating instance of queryClient
  const queryClient = useQueryClient()
  //hook open and close post model
  const [open, setOpen] = useState(false)
  // Get the user name from cache
  const data = queryClient.getQueryData(['userInfo']).name.split(' ')[0]
  //hook for get url parameters of search key
  const { keyword } = useParams()

  let searchkey = ''
  if (keyword) {
    searchkey = keyword
  }

  // Query hook to get post based on search key
  const {
    isLoading,
    isError,
    error,
    data: publicPost,
  } = useQuery(['publicPost', searchkey], approvedPosts)

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = publicPost
  }

  //function for open the post model
  const modelOpen = () => {
    setOpen(true)
  }

  //function for close the post  model
  const modelClose = () => {
    setOpen(false)
  }

  //post input lable text
  const post = `What is on your mind, ${data}?`

  return (
    <Box marginTop='5vh'>
      <Typography variant='h5' textAlign='center' gutterBottom>
        Apple House Forum
      </Typography>

      <Box display='none'>
        <PostModel
          open={open}
          handleClose={modelClose}
          sx={{ display: 'none' }}
        />
      </Box>

      <TextField fullWidth type='email' label={post} onClick={modelOpen} />

      {/* map though each post and passing data to postcard component */}
      {content.map((post, index) => (
        <Box margin='40px 0' key={index}>
          <PostCard
            userName={post.userName}
            title={post.title}
            text={post.text}
            numcomments={post.numcomments}
            status={post.status}
            id={post._id}
          />
        </Box>
      ))}
    </Box>
  )
}

export default Home
