import { makeStyles } from "@material-ui/core";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import db from "../store/server.config";
import moment from "moment/moment";
import { GlobalContext } from "../store/context";
import ChatBox from "./ChatBox";

const myStyles = makeStyles((theme) => ({
  rightSide: {
    flex: "3",
    height: "100vh",
    background: "#f5f5f5",
  },
  container: {
    height: "100%",
  },
  rsChatMessages: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position:"relative",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    background: "#ccc",
    position: "sticky",
    top:"0px"
  },
  header_image: {
    width: 50,
    height: 50,
  },
  header_name: {
    marginLeft: 10,
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
  },
  text_input: {
    outline: "none",
    border: "none",
    background: "rgba(0, 0, 0, 0.3)",
    width: "90%",
    margin: "auto",
    padding: ".8rem",
  },
  btn: {
    width: "10%",
    height: 40,
    background: "#ff7200cc",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    transition: ".2s ease all",
    "&:active": {
      background: "#ff7200",
    }
  },
  form: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  no_chat_body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  },
  no_chat_text: {
    fontSize: 30
  }
}));

const RightSide = () => {

  const classes = myStyles();
  const { id } = useParams();
  const [currentChatUserData, setCurrentChatUserData] = useState(null);
  const [text, setText] = useState("");
  const { currentUser } = useContext(GlobalContext);

  const getCurrentChat = async () => {
    const q = query(collection(db, "users"), where("uid", "==", id));

    await getDocs(q).then((document) => {
      console.log(document.docs.map((doc) => doc.data()));
      setCurrentChatUserData(document.docs.map((doc) => doc.data()));
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (text === "") {
      alert("I am empty");
    } else {
      // alert(currentUser.uid);

      const messageData = {
      message: text,
      createdAt: moment(new Date()).format("MMM DD YYYY, hh:mm:ss A"),
      from: currentUser.uid,
      to: id,
      status: "unread",
      participants: [currentUser.uid, id],
    };

    const docId = currentUser.uid > id ? `${currentUser.uid + id}` : `${id + currentUser.uid}`;
    addDoc(collection(db, "messages", docId, "chat"), messageData);
    setText("");
    
    }
    };
    

    useEffect(() => {
      getCurrentChat();
    }, [id]);

  return (
    <div className={classes.rightSide}>
      <div className={classes.container}>
        <div className={classes.rsChatMessages}>
          {currentChatUserData ? (
            <>
              {currentChatUserData &&
                currentChatUserData.map((data) => (
                  <header key={data.uid} className={classes.header}>
                    <img
                      src="https://i.ibb.co/PzJKVyV/user-icon.png"
                      className={classes.header_image}
                    />
                    <p className={classes.header_name}>{data.fullname}</p>
                  </header>
                ))}

              <ChatBox />

              <footer className={classes.footer}>
                <form className={classes.form}>
                  <input
                    className={classes.text_input}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button
                    className={classes.btn}
                    onClick={(e) => sendMessage(e)}
                  >
                    Send
                  </button>
                </form>
              </footer>
            </>
          ) : (
            <div className={classes.no_chat_body}>
              <p className={classes.no_chat_text}>Select a chat to start a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default RightSide;