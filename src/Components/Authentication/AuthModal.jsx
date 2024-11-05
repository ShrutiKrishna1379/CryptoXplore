import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from "./Login";
import Signup from './Signup';
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const useStyles = {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
      bgcolor: '#232324',
      color: "grey",
      boxShadow: 24,
      p: 4,
    },
    google: {
      padding: 2,
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      gap: 2,
      fontSize: 20,
    },
  };
  

export default function AuthModal() {
  const [open, setOpen] = useState(false);

  const { setAlert } = CryptoState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("Sign-in successful:", res);
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        // return;
      });
  };



  return (
    <Box>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#08d0ff",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={useStyles.modal}
        open={open}
        onClose={handleClose}
        // closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        // slotProps={{
        //   backdrop: {
        //     timeout: 500,
        //   },
        // }}
      >
        <Fade in={open}>
        <Box sx={useStyles.paper } style={{ borderRadius:10 }}>
        <AppBar position="static" 
        style={{ backgroundColor: "transparent",
                color: "white",
              }}>
          <Tabs
            value={value}
            onChange={handleChange}
            // indicatorColor="secondary"
            // textColor="inherit"
            variant="fullWidth"
            // aria-label="full width tabs example"
            style={{ borderRadius:10 }}
          >
            <Tab label="Login"  />
            <Tab label="Sign Up" />
          </Tabs>
        </AppBar>
        <Box>
   
        </Box>
        {value === 0 && <Login handleClose={handleClose} />}
        {value === 1 && <Signup handleClose={handleClose} />}
        <Box sx={useStyles.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none", background: "#068acc",}}
                onClick= {signInWithGoogle}
              />
        </Box>

        </Box>
        </Fade>
      </Modal>
    </Box>
  );
}


