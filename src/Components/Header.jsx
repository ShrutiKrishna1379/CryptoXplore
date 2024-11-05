import * as React from 'react';
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from './Authentication/AuthModal';
import UserSidebar from "./Authentication/UserSidebar";


const useStyles ={
  title: {
    flex: 1,
    color: "#08d0ff",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {

  const { currency, setCurrency, user } = CryptoState();

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <main>
      <AppBar  position="static" style={{backgroundColor: "#010219"}}>
        <Container >
          <Toolbar>
            <Typography
              onClick={() => navigate('/')}
              variant="h5"
              style={useStyles.title}
            >
              𝖢𝗋𝗒𝗉𝗍𝗈𝖷𝗉𝗅𝗈𝗋𝖾
            </Typography>
           
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}

          </Toolbar>
        </Container>
      </AppBar>
      </main>
    </ThemeProvider>
  )
}

export default Header;
