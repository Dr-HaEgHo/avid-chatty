import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react'
import baby from '../assets/baby.jpeg'
import me from '../assets/me.jpg'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import db, { auth } from '../store/server.config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const myStyles = makeStyles(theme => ({
    sidebar: {
        flex: "1",
        background: "#f5f5f5",
        height: "100vh",
        padding: "3rem 0",
        borderRight: "1px #e1e1e1 solid"
    },
    siHeader: {
        width: "100%",
        color: "#333",
        margin: "auto",
        padding: ".6rem 2rem",
        borderBottom:"1px #e1e1e1 solid"
    },
    siChatList: {
        height: "400px",
        padding: ".4rem",
    },
    picture: {
        width: " 50px",
        height: "50px",
        borderRadius: "50%",
        overflow: "hidden",
        position:"relative",
        
        "& img": {
            width: "100%",
                
        }
    },
    siChat: {
        display: "flex",
        alignItems:"center",
        justifyContent:"space-between",
        gap: ".4rem",
        borderBottom: "1px #e1e1e1 solid",
        padding:".4rem 0",
        "& p": {
            fontSize:"12px",
        }
    },
    nameMsg: {
        flex: "1",
        position:"relative",
        "& h4": {
            position: "relative",
            
        },
        "& p": {
            width: "170px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow:"ellipsis"
        }
    },
    timeRead: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "spaxe-between",
        
    },
    sentIcon: {
        fontSize: "22px",
        color:"#555"
    },
    readIcon: {
        fontSize: "22px",
        color:"blue",
    },

}))



const Sidebar = () => {
    const classes = myStyles();
    const navigate = useNavigate();
    const [friends, setFriends] = useState()
    // const friends = [
    //     {id: 1, status:"offline", icon:<Icon  className={classes.sentIcon} icon="bi:check" />, image:me, name: "Kelly Owoju", lastMessage:"Did you remember to add googls Analytics to the app?", readState: "unread"},
    //     {id: 2, status:"offline", icon:<Icon  className={classes.sentIcon} icon="bi:check-all" />, image:me, name: "Kenny Abiona", lastMessage:"Guy! why you no tell me say gas don finish ?", readState: "unseen"},
    //     {id: 3, status:"online", icon:<Icon  className={classes.sentIcon} icon="bi:check" />, image:me, name: "James Awogbuyi", lastMessage:"I just got one job at a foreign company, really cool", readState: "delivered"},
    //     {id: 4, status:"online", icon:<Icon  className={classes.readIcon} icon="bi:check-all" />, image:baby, name: "Lola Mi ❤️❤️", lastMessage:"Baby mi, I have just finished from work, I miss you so much 🥰😉🥰", readState: "read"},
    //     {id: 5, status:"offline", icon:<Icon  className={classes.sentIcon} icon="bi:check" />, image:me, name: "Mommy", lastMessage:"God will bless you In Jesus Name", readState: "unread"},
    //     {id: 6, status:"online", icon:<Icon  className={classes.sentIcon} icon="bi:check" />, image:me, name: "Employer", lastMessage:"Please append your signature on the offer letter and send back by the end of today, Thank you ", readState: "unread"},
    // ]



     const logout = () => {
        auth.signOut();
        navigate("/sign-up")
    }

    const [read, setRead] = useState("seen");

    const fetchUsers = async () => {
        const local_email = localStorage.getItem("Email")
        const colRef = query(collection(db, "users"), where("email", "!=", local_email))

        onSnapshot(colRef, (snapshot) => {
            console.log(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            setFriends(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

  return (
      <div className={classes.sidebar}>
          <div className={classes.container}>
              <div className={classes.siHeader}>
                  <h1>Chats</h1>
              </div>
              <div className={classes.siChatList}>
                  {
                      friends && friends.map(friend => (
                          <div className={classes.siChat} key={friend.id}>
                              <div style={{
                                  position: "relative"
                              }}>
                                  <div style={{
                                      width: "12px",
                                      height: "12px",
                                      background: friend.status === "online" ? "green" : "red",
                                      borderRadius: "50%",
                                      position:"absolute",
                                      top: "0px",
                                    //   right:"0px",
                                      zIndex:"30"
                                  }}></div>
                                  <div className={classes.picture}>
                                    <img src={friend.image} alt="" />
                                  </div>
                              </div>
                              <div className={classes.nameMsg} >
                                  <h4>{friend.fullname}</h4>
                                  <p>{friend.lastMessage}</p>
                              </div>
                              <div className={classes.timeRead}>
                                  <p>17:62 PM</p>
                                  {friend.icon}
                              </div>
                          </div>
                      ))
                  }
              </div>
              <button onClick={() => logout()}>Logout</button> 
          </div>
    </div>
  )
}

export default Sidebar;