import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { GlobalContext } from "../../store/context";
import db, { auth } from "../../store/server.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  signup: {
    fontFamily: "Poppins, sans-serif",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    margin: "auto",
    maxWidth: "1200px",
  },
  siForm: {
    width: "40%",
    margin: "auto",
    padding: "1rem",
    height: "80%",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    boxShadow: "0px 0px 10px 2px #ddd",
  },
  siMainForm: {
    width: "100%",
    // background:"#ff7200",
    "& form": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      "& input": {
        width: "90%",
        fontFamily: "Poppins, sans-serif",
        border: "none",
        padding: " .8rem",
        color: "#333",
        background: "#e1e1e1",
      },
      "& button": {
        width: "96%",
        padding: " .8rem",
        border: "none",
        background: "#ff7200",
      },
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const route = (path) => {
    navigate(`/${path}`);
  };

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
    setErrorMsg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        form.fullName === "" ||
        form.phoneNumber === "" ||
        form.email === "" ||
        form.password === "" ||
        form.confirmPassword === ""
      ) {
        setLoading(false);
        setErrorMsg("Please fill all the fields joor! abi ya mad ni?");
      } else if (form.password !== form.confirmPassword) {
        setLoading(false);
        setErrorMsg("Does the two both passwords look alike to you?? weyrey!");
      } else {
        // This is where the user is created with the email and password values
        createUserWithEmailAndPassword(auth, form.email, form.password)
          .then((user) => {
            console.log(user);
            setErrorMsg("User has been created! Vuuleesh");
            const new_user = {
              fullname: form.fullName,
              email: form.email,
              phone_number: form.phoneNumber,
              password: form.password,
              status: "online",
              uid: user.user.uid,
            };
            setDoc(doc(db, "users", form.email), new_user).then(() => {
              localStorage.setItem("Email", form.email);
              localStorage.setItem("CurrentUserId", user.user.uid);
            });
            setLoading(false);
            setForm({
              fullName: "",
              phoneNumber: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          })
          .then(() => {
            route("");
          })
          .catch((err) => {
            console.log(err.message);
            if (
              err.message ===
              "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
              setErrorMsg("You are just mAD. nOTHING MORE, NOTHING LESS.");
            }
            setLoading(false);
          });
      }
    } catch (err) {
      console.log("Last catch error>>>", err);
      setLoading(false);
    }
  };

  return (
    <div className={classes.signup}>
      <div className={classes.container}>
        <div className={classes.siForm}>
          <h1>Signup</h1>
          <div className={classes.siMainForm}>
            <form>
              <input
                onChange={handleInputChange}
                value={form.fullName}
                name="fullName"
                type="text"
                placeholder="Full Name"
              />
              <input
                onChange={handleInputChange}
                value={form.phoneNumber}
                name="phoneNumber"
                type="number"
                placeholder="Phone Number"
              />
              <input
                onChange={handleInputChange}
                value={form.email}
                name="email"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={handleInputChange}
                value={form.password}
                name="password"
                type="password"
                placeholder="Password"
              />
              <input
                onChange={handleInputChange}
                value={form.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Password"
              />
              {errorMsg && <p>{errorMsg}</p>}
              <button onClick={handleSubmit} type="submit">
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
