const currentUser = (state = {}, action) => {
  if(action.type === 'UPDATE_CURRENT_USER') {
    const { currentUser } = action
    return currentUser
  } else {
    return state
  }
}

export default currentUser

