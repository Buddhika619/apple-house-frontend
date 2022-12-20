import axios from 'axios'

//fetching approved posts from the server
export const approvedPosts = async (queryObj) => {
  const keyword = queryObj.queryKey[1]
  console.log(keyword)
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const { data } = await axios.get(`/api/posts?keyword=${keyword}`, config)

  return data
}

//fetching allpost for admin
export const getallPosts = async () => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const { data } = await axios.get(`/api/posts/filter?filter=date`, config)

  return data
}


//creating new post
export const createPost = async (post) => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  return await axios.post(`/api/posts`, post, config)
}

//updates statues of the post-reject/approved
export const updatePost = async (post) => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  return await axios.put(
    `/api/posts/${post.id}?status=${post.status}`,
    {},
    config
  )
}

//feedback for rejected post
export const rejectFeedback = async (feedback) => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  if (feedback.feedback) {
    return await axios.post(
      `/api/posts/${feedback.id}/feedback`,
      feedback,
      config
    )
  }
}

//delete posts
export const deletePostAdmin = async (id) => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  return await axios.delete(`/api/posts/${id}`, config)
}


//fetch posts belongs to user
export const getUserPosts = async () => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const { data } = await axios.get(`/api/posts/userpost`, config)

  return data
}

//fetch post by bost ID
export const getSinglePost = async (queryObj) => {
  const id = queryObj.queryKey[1]

  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const { data } = await axios.get(`/api/posts/${id}`, config)

  return data
}

//commenting on posts
export const postComment = async (comment) => {
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  return await axios.post(`/api/posts/${comment.id}/comment`, comment, config)
}
