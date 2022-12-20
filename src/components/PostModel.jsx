import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { Box, TextField, TextareaAutosize } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../actions/postActions'

export default function PostModel({ handleClose, open }) {
  // Hook to navigate between routes
  const navigate = useNavigate()

  // Hook to access the query client to invalidate queries
  const queryClient = useQueryClient()

  // Get the user info from the cache
  const userInfo = queryClient.getQueryData(['userInfo'])

  // Hook to handle form state and validation - react form
  const { register, handleSubmit,reset  } = useForm({
    defaultValues: {
      title: '',
      text: ''
    }
  })

   // Hook to handle the create post mutation
  const postCreateMutation = useMutation(createPost, {
    onSuccess: () => {
      // Invalidate the publicPost query to refresh the data
      queryClient.invalidateQueries('publicPost')
    
      if (userInfo.isAdmin) {
        toast.success('Post submitted!')
        handleClose()
      } else {
        toast.success('post send for admin approval')
        handleClose()
      }
      navigate('/home')
    },

    onError: (error) => {
      toast.error(error.response.data)
    },
  })

  // Function to handle form submission
  const onSubmit = (data) => {
    postCreateMutation.mutate(data)
    reset()
  }

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Create A Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              height='30vh'
              display='grid'
              justifyContent='center'
              alignItems='center'
            >
              <TextField
              
                type='text'
                label='Title'
                style={{ fontSize: '0.1rem' }}
                {...register('title', { required: true })}
              />

              <TextareaAutosize
                maxRows={10}
                variant='filled'
                aria-label='maximum height'
                placeholder='Post Body'
               
                style={{ width: 500, height: 150, fontSize: '1rem' }}
                {...register('text', { required: true })}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <Button type='submit' variant='contained' sx={{ px: 5 }}>
                Submit
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
