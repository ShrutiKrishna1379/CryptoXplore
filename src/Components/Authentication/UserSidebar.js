import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

const useStyles = {
    container: {
      width: 400,
      padding: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "monospace",
    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
    },
    logout: {
      height: "8%",
      width: "100%",
      backgroundColor: "#078dfa",
      marginTop: 20,
    },
    picture: {
      width: 100,
      height: 100,
      cursor: "pointer",
      backgroundColor: "#078dfa",
      objectFit: "contain",
    },
    watchlist: {
      flex: 1,
      width: "100%",
      backgroundColor: "grey",
      borderRadius: 10,
      padding: 1,
      paddingTop: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      overflowY: "scroll",
    },
    coin: {
      padding: 2,
      borderRadius: 5,
      color: "black",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#078dfa",
      boxShadow: "0 0 3px black",
    },
  };

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();
  //console.log(watchlist, coins);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    // toggleDrawer();
    setState({ ...state, right: false });
  };
  
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };


  return (
    <Box>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Stack direction="row" spacing={2}>
            <Avatar 
                onClick={toggleDrawer(anchor, true)}
                style={{
                  height: 38,
                  width: 38,
                  marginLeft: 15,
                  cursor: "pointer",
                  backgroundColor: "#078dfa",
                }}
                alt={user.displayName || user.email} 
                src={user.photoURL}
             />
          </Stack>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            
            <Box sx={useStyles.container}>
              <Box style={useStyles.profile}>
                <Avatar
                  style={useStyles.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <Box sx={useStyles.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <Box key={coin.id}  sx={useStyles.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="20"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </Box>
                      );
                    else return <></>;
                  })}
                </Box>
              </Box>
              <Button
                variant="contained"
                style={useStyles.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
            </Box>

          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}