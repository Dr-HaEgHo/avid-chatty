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

const myStyles = makeStyles((theme) => ({
  sidebar: {
    flex: "1",
    background: "#f5f5f5",
    height: "100vh",
    padding: "3rem 0",
    borderRight: "1px #e1e1e1 solid",
  },
  siHeader: {
    width: "100%",
    color: "#333",
    margin: "auto",
    padding: ".6rem 2rem",
    borderBottom: "1px #e1e1e1 solid",
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
    justifyContent: "spaxe-between",
  },
  sentIcon: {
    fontSize: "22px",
    color: "#555",
  },
  readIcon: {
    fontSize: "22px",
    color: "blue",
  },
}));

const Sidebar = () => {
  const classes = myStyles();
  const navigate = useNavigate();
  const [friends, setFriends] = useState();
  const { currentUser } = useContext(GlobalContext);

  const logout = () => {
    auth.signOut();
    localStorage.clear()
    navigate("/sign-up");
  };

  const [read, setRead] = useState("seen");


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

  useEffect(() => {
    fetchUsers();
  }, []);

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
                      background: friend.status === "online" ? "green" : "red",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "0px",
                      //   right:"0px",
                      zIndex: "30",
                    }}
                  ></div>
                  <div className={classes.picture}>
                    <img src="https://i.ibb.co/PzJKVyV/user-icon.png" alt="" />
                  </div>
                </div>
                <div className={classes.nameMsg}>
                  <h4>{friend.fullname}</h4>
                  <p>{friend.lastMessage}</p>
                </div>
                <div className={classes.timeRead}>
                  <p>17:62 PM</p>
                  {friend.icon}
                </div>
              </div>
            ))}
        </div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
