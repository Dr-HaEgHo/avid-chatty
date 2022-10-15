import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RightSide from '../components/RightSide';
import Sidebar from '../components/Sidebar';
import { auth } from '../store/server.config';

const myStyles = makeStyles(theme => ({
    home: {
        width: "100%",
        display: "flex",
        height: "100vh",
    },
})
)

const Home = () => {
    const classes = myStyles();
    const navigate = useNavigate()

    const logout = () => {
        auth.signOut();
        navigate("/sign-up")
    }

  return (
      <div className={classes.home}>
          <Sidebar />
          <RightSide/>
        
      </div>
  )
}

export default Home;