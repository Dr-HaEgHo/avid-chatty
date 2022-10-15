import { makeStyles } from '@material-ui/core';
import React from 'react'


const myStyles = makeStyles(theme => ({
    rightSide: {
        flex: "3",
        height: "100vh",
        background: "#f5f5f5"
    }
}))

const RightSide = () => {

    const classes = myStyles()

  return (
    <div className={classes.rightSide}>
          <div className={classes.container}>
              <div className={classes.rsChatMessages}>
                  
              </div>
              <button onClick={() => logout()}>Logout</button> 
          </div>
    </div>
  )
}

export default RightSide;