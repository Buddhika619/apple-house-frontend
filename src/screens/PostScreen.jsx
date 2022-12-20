import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getSinglePost, postComment } from '../actions/postActions'
import { useParams } from 'react-router-dom'
import { Button, TextareaAutosize } from '@mui/material'
import { toast } from 'react-toastify'

const PostScreen = () => {
  //create instance of queryClient for managing queries and their data in the application
  const queryClient = useQueryClient()

  //hook for manage comment value
  const [comment, setComment] = useState('')

  // Declare id variable for accessing the id parameter in the URL
  const { id } = useParams()

  //query for fetching a single post by its id
  const {
    isLoading,
    isError,
    error,
    data: post,
  } = useQuery(['singlePost', id], getSinglePost)

  //performing the postComment mutation using the useMutation hook
  const commentPostMutation = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('singlePost')
      toast.success('Comment submitted!')
    },

    onError: (error) => {
      toast.error(error.response.data)
    },
  })

  // Define the submitComment function to be called when the comment form is submitted
  const submitComment = (e) => {
    e.preventDefault()
    setComment('')
    commentPostMutation.mutate({ id: id, comment: comment })
  }

  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = post
  }

  //converting data string into a JS date instance
  const date = new Date(content.createdAt).toString().slice(0, 25)

  return (
    <Box sx={{ width: '100%', maxWidth: 900, marginTop: '5vh' }}>
      <Typography variant='h3' gutterBottom>
        {content.title}
      </Typography>

      <Typography variant='h6' gutterBottom>
        {content.text}
      </Typography>

      <Typography variant='body2' gutterBottom>
        @{content.userName} <br /> {date}
      </Typography>

      <Typography variant='h5' margin='25px 0'>
        Comments ({content.numcomments})
      </Typography>

      <form onSubmit={submitComment}>
        <TextareaAutosize
          aria-label='empty textarea'
          placeholder='Empty'
          variant='h4'
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: '100%', height: 50, fontSize: '1rem' }}
        />

        <Button variant='contained' type='submit'>
          Submit
        </Button>
      </form>
      {console.log(content.comments)}

      {/* map through comments */}
      {content.comments?.map((comment, index) => (
        <Box marginTop='20px'>
          <Typography key={index} variant='body1' gutterBottom>
            {comment.comment}
          </Typography>
          <Typography variant='body2' gutterBottom>
            @{comment.name} <br />{' '}
            {new Date(comment.createdAt).toString().slice(0, 25)}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
export default PostScreen
