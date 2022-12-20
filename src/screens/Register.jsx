import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../actions/userActions'

function Register() {
  // hook for manage navigation within the application
  const navigate = useNavigate()
  //create instance of queryClient for managing queries and their data in the application
  const queryClient = useQueryClient()
  //hook for handling form validation and submission
  const { register, handleSubmit } = useForm()

  // Declare loginMutation object for performing the login mutation using the useMutation hook
  const registerMutaion = useMutation(registerUser, {
    // When the mutation is successful, set the login data in the query cache and navigate to the home page
    onSuccess: (data) => {
      queryClient.setQueryData('login', data)
      toast.success(`Hi ${data.name}!`)
      navigate('/')
    },
    // When the mutation fails, display an error message using toast
    onError: (error) => {
      toast.error(error.response.data)
      console.log(error)
    },
  })

   // Define the onSubmit function
  const onSubmit = (data) => {
    registerMutaion.mutate(data)
  }

   // Define the registerRedirect function to navigate to the register page
  const loginRedirect = () => {
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        height='50vh'
        display='grid'
        justifyContent='center'
        alignItems='center'
        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
      >
        <TextField
          fullWidth
          variant='filled'
          type='name'
          label='name'
          sx={{ gridColumn: 'span 4' }}
          {...register('name', { required: true })}
        />
        <TextField
          fullWidth
          variant='filled'
          type='email'
          label='Email'
          sx={{ gridColumn: 'span 4' }}
          {...register('email', { required: true })}
        />
        <TextField
          fullWidth
          variant='filled'
          type='password'
          label='password(must be at least 6 characters)'
          {...register('password', { required: true, minLength: 6 })}
          sx={{ gridColumn: 'span 4' }}
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
          Register
        </Button>
        <Button
          onClick={loginRedirect}
          variant='text'
          sx={{ px: 5, fontColor: 'black' }}
        >
          Already have a account? Login
        </Button>
      </Box>
    </form>
  )
}

export default Register
