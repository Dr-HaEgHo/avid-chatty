import React, { useEffect, useContext, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../store/context";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import db from "../store/server.config";

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.6em',
      background:"#ff720000"
    },
    '*::-webkit-scrollbar-track': {
      // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#ff720099',
      borderRadius:"20px"
      // outline: '1px solid slategrey'
    }
  },
  no_chat_box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chatBody: {
    overflowY: "scroll",
  }  ,
  own: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  no_own: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  msg_body: {
    padding: 10,
  },
  me: {
    background: "#ff7200",
    margin: "10px 0px",
    padding: 10,
    borderRadius: 4,
    maxWidth: 300,
    color: "#fff",
  },
  friend: {
    background: "#337180",
    margin: "10px 0px",
    padding: 10,
    borderRadius: 4,
    maxWidth: 300,
    color: "#fff",
  },
}));

const ChatBox = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { currentUser } = useContext(GlobalContext);
  const [messages, setMessages] = useState(null);
  const scrollref = useRef();

  const currentUserId = localStorage.getItem("CurrentUserId");

  const getMessages = async () => {
    const docId =
      currentUserId > id ? `${currentUserId + id}` : `${id + currentUserId}`;

    const q = query(
      collection(db, "messages", docId, "chat"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getMessages();
  }, [id]);

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={classes.chatBody} >
      <div className={classes.msg_body}>
        {messages && (
          <>
            {messages.length ? (
              <div>
                {messages.map((msg) => (
                  <div
                    className={msg.from === currentUserId ? classes.own : classes.no_own}
                    ref={scrollref}
                  >
                    <div>
                      <p
                        className={
                          msg.from === currentUserId
                            ? classes.me
                            : classes.friend
                        }
                      >
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={classes.no_chat_box}>
                <p>No Chats Yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
