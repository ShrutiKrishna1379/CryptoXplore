import * as React from 'react';
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Carousel from "./Carousel";

function Banner() {
  
  return (
    <Box 
        component='div'
        sx={{
            backgroundImage: "url(./b15.jpg)",
            backgroundPosition:"center" ,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }} >
      <Container style={{height: 380,
            display: "flex",
            flexDirection: "column",
            paddingTop: 5,
            justifyContent: "space-around",}}>

        <Box component='div'
        sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        }}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color: "#88fff7",
            }}
          >
            𝙲𝚛𝚢𝚙𝚝𝚘𝚇𝚙𝚕𝚘𝚛𝚎
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
}

export default Banner;