import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState, useContext } from "react";
import baby from "../assets/baby.jpeg";
import me from "../assets/me.jpg";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import db, { auth } from "../store/server.config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { GlobalContext } from "../store/context";
import { useParams } from "react-router-dom";
import moment from "moment";

const myStyles = makeStyles((theme) => ({
  sidebar: {
    flex: "1",
    background: "#f5f5f5",
    height: "100vh",
    padding: "0rem 0",
    borderRight: "1px #e1e1e1 solid",
  },
  container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
  },
  siHeader: {
    width: "100%",
    color: "#333",
    margin: "auto",
    padding: "5rem 2rem .6rem 2rem",
    borderBottom: "1px #e1e1e1 solid",
  },
  siChatList: {
    height: "100%",
    padding: ".4rem",
    overflowY: "scroll",
  },
  picture: {
    width: " 50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",

    "& img": {
      width: "100%",
    },
  },
  siChat: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ".4rem",
    borderBottom: "1px #e1e1e1 solid",
    padding: ".4rem 0",
    "& p": {
      fontSize: "12px",
    },
    cursor: "pointer",
  },
  nameMsg: {
    flex: "1",
    position: "relative",
    "& h4": {
      position: "relative",
    },
    "& p": {
      width: "170px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  timeRead: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sentIcon: {
    fontSize: "22px",
    color: "#555",
  },
  readIcon: {
    fontSize: "22px",
    color: "blue",
  },
  logout:{
      flex: "1",
      "& button": {
        border: "none",
        background:"#999",
        width:"100%",
        color: "white",
        padding: ".8rem ",
        fontSize:"14px"
      }
  },
  message_time: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

const Sidebar = () => {
  const classes = myStyles();
  const navigate = useNavigate();
  const [friends, setFriends] = useState();
  const { currentUser } = useContext(GlobalContext);
  const { id } = useParams();
  const [lastMessage, setLastMessage] = useState(null);

  const logout = () => {
    auth.signOut();
    localStorage.clear()
    navigate("/sign-in");
  };


  const fetchUsers = async () => {
    const local_email = localStorage.getItem("Email");
    const colRef = query(
      collection(db, "users"),
      where("email", "!=", local_email)
    );

    onSnapshot(colRef, (snapshot) => {
      console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFriends(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  const fetchLastMessage = () => {
    const currentUserId = localStorage.getItem("CurrentUserId")
      // if(id) {
      //   const docId = currentUserId > id ? `${currentUserId + id}` : `${id + currentUserId}`;
      //   const docRef = doc(db, "last_message", docId);
  
      // onSnapshot(docRef, snapshot => {
      //   console.log(snapshot.data())
      //   setLastMessage(snapshot.data())
      // })
      // }
      
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchLastMessage();
  }, [id])

  return (
    <div className={classes.sidebar}>
      <div className={classes.container}>
        <div className={classes.siHeader}>
          <h2 style={{fontSize: 18}} >Hi, {currentUser && currentUser.fullname}</h2>
          <h4>Chats</h4>
        </div>
        <div className={classes.siChatList}>
          {friends &&
            friends.map((friend) => (
              <div
                className={classes.siChat}
                key={friend.id}
                onClick={() => navigate(`/chat/${friend.uid}`)}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      background: friend.status === "online" ? "#59cc51" : "#ccc",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "0px",
                      zIndex: "30",
                    }}
                  ></div>
                  <div className={classes.picture}>
                    <img src="https://i.ibb.co/PzJKVyV/user-icon.png" alt="" />
                  </div>
                </div>
                <div className={classes.nameMsg}>
                  <h4>{friend.fullname}</h4>
                  <div className={classes.message_time}>
                  {/* <p>{friend.uid === id && truncateString(lastMessage?.message, 15)}</p> */}
                  {/* <p>{friend.uid === id && moment(lastMessage?.createdAt).format("hh:mm A")}</p> */}
                  </div>
                </div>
                <div className={classes.timeRead}>
                  
                  {friend.icon}
                </div>
              </div>
            ))}
        </div>
        <div className={classes.logout}>
            <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
