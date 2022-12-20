import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import React from 'react'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'

const PostCard = ({ userName, title, text, numcomments,  id }) => {

  // link to the post detail page
  let postLink = `/post/${id}`
  
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box >
          <Box >
            <h3 variant='h5' margin='10px'>
              {title}
            </h3>
          </Box>
          <Box>
            <Typography fontSize='0.8rem' marginTop='-25px'>@{userName}</Typography>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box fontSize='1.2rem' marginBottom='10px'>
          <Typography>{text}</Typography>
        </Box>
        <Link to={postLink}>
          <Box color='blue'>
            <Typography>comments: {numcomments}</Typography>
          </Box>
        </Link>
      </AccordionDetails>
    </Accordion>
  )
}

export default PostCard
