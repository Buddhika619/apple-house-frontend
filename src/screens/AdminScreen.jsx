import React, { useEffect, useRef } from 'react'
import { Box, Button, Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

import Header from '../components/Header'
import { useState } from 'react'
import { GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deletePostAdmin,
  getallPosts,
  rejectFeedback,
  updatePost,
} from '../actions/postActions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminScreen = () => {
  // hook to track of the selected rows of the data grid
  const [selectionModel, setSelectionModel] = useState([])
  //creating instance of queryClient
  const queryClient = useQueryClient()
  // Hook to navigate between routes
  const navigate = useNavigate()

  //hook for track of userInfo
  const user = useRef()
  user.current = queryClient.getQueryData('userInfo')

  //if user is not an admin redirect back to home
  useEffect(() => {
    if (!user.current.isAdmin) {
      navigate('/home')
    }
  }, [navigate])

  // Query hook to get the all posts
  const {
    isLoading,
    isError,
    error,
    data: posts,
  } = useQuery('allPost', getallPosts)

  // Hook to handle the approve post mutation
  const approvePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      // Invalidate the allPost query to refresh the data
      queryClient.invalidateQueries('allPost')
      toast.success('Post Approved!')
    },

    onError: (error) => {
      toast.error(error.response.data)
    },
  })

  // Hook to handle the reject post mutation
  const rejectPostMutaion = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('allPost')
      toast.success('Post Rejected!')
    },

    onError: (error) => {
      toast.error(error.response.data)
    },
  })

  // Hook to handle the feedback when rejecting a post
  const rejectFeedbackMutation = useMutation(rejectFeedback, {
    onSuccess: () => {
      queryClient.invalidateQueries('allPost')
      toast.success('Feedback submitted!')
    },

    onError: (error) => {
      toast.error(error.response.data)
    },
  })

  //hook to handle post delete mutation
  const deletePostMutation = useMutation(deletePostAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries('allPost')
      toast.success('Post Removed!')
    },

    onError: (error) => {
      toast.error(error.response.data)
    },
  })

  //define function to navigate to a single post
  const view = (id) => {
    navigate(`/post/${id}`)
  }

  //define function to approve a post
  const approve = (id) => {
    setSelectionModel([])
    approvePostMutation.mutate({ id: id, status: 'approved' })
  }

  //define function to reject a post and give feedback
  const reject = (id) => {
    let feedback = prompt('Reason for refection?', '')
    rejectFeedbackMutation.mutate({ id: id, feedback: feedback })
    rejectPostMutaion.mutate({ id: id, status: 'rejected' })
  }

  //define function for delete posts
  const deletePost = (id) => {
    if (window.confirm('Are you sure?')) {
      deletePostMutation.mutate(id)
    }
  }

  //store results from useQuery
  let content
  if (isLoading) {
    return <p>Loading</p>
  } else if (isError) {
    return <p>{error.message}</p>
  } else {
    content = posts
  }

  //data grid columns
  const columns = [
    {
      field: 'id',
      headerName: 'Post ID',
      flex: 1,
    },

    {
      field: 'name',
      headerName: 'User Name',
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Post Title',
      flex: 1,
    },
    //render custom coloumn based on the cell value
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) =>
        params.value === 'pending' ? (
          <Chip label='pending' color='info' size='small' variant='outlined' />
        ) : params.value === 'approved' ? (
          <Chip
            label='approved'
            color='success'
            size='small'
            variant='outlined'
          />
        ) : (
          <Chip
            label='rejected'
            color='error'
            size='small'
            variant='outlined'
          />
        ),
    },

    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
  ]

  //generating datagrid rows with query data
  let rows = content?.map((content, index) => ({
    id: content._id,
    name: content.userName,
    status: content.status,
    title: content.title,
    createdAt: new Date(content.createdAt).toString().slice(0, 25),
  }))

  //using custom toolbar component of datagrid to add custom function to the data grid
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />

        {/* display the view button if only one cell has selected */}
        {selectionModel.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => view(selectionModel[0])}
          >
            <RemoveRedEyeIcon fontSize='small' />
            <span className='px-2'>View</span>
          </Button>
        )}

        {/* display the approve button if only one cell has selected */}
        {selectionModel.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => approve(selectionModel[0])}
          >
            <ThumbUpOffAltIcon fontSize='small' />
            <span className='px-2'>Approve</span>
          </Button>
        )}

        {/* display the  reject button if only one cell has selected */}
        {selectionModel.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => reject(selectionModel[0])}
          >
            <ThumbDownOffAltIcon fontSize='small' />
            <span className='px-2'>Reject</span>
          </Button>
        )}

        {/* display the delete button if only one cell has selected */}
        {selectionModel.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='text'
            onClick={() => deletePost(selectionModel[0])}
          >
            <DeleteOutlineIcon fontSize='small' />
            <span className='px-2'>Delete</span>
          </Button>
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <Box m='20px'>
      <Header title='Admin' subtitle='Post Managing Module' />
{/* data grid styles */}
      <Box
        m='40px 0 0 0'
        height='60vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 'none',
            background: '#757de8',
            color: '#fff',
          },
          '& .MuiDataGrid-virtualScroller': {},
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
          },
        }}
      >
        {/* data grid */}
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          pageSize={8}
          onSelectionModelChange={(selection) => {
            setSelectionModel(selection)
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Box>
  )
}

export default AdminScreen
