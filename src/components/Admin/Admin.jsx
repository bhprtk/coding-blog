import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';

function Admin(props) {
  useEffect(() => {
    const { pw } = props.match.params
    console.log("pw: ", process.env.pw)
  }, [])
  return (
    <div>
      <h1>
        Admin
      </h1>
    </div>
  )
}

export default withRouter(Admin)


