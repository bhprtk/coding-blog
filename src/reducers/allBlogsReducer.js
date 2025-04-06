const allBlogs = (state = null, action) => {
  switch (action.type) {
    case 'NEW_ALL_BLOGS':
      const newState = Object.assign(
        {},
        state,
        action.blogs
      )
      return newState
    default:
      return state
  }
}

export default allBlogs