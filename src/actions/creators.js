const NEW_ALL_BLOGS = 'NEW_ALL_BLOGS'

export function newAllBlogs(allBlogs)  {
  return {
    type: NEW_ALL_BLOGS,
    blogs: allBlogs
  }
}