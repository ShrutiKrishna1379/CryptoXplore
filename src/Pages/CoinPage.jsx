import * as React from 'react';
import Button from '@mui/material/Button';
import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../Config/api";
import { numberWithCommas } from "../Components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
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

  const removeFromWatchlist = async () => {
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


  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        alignItems: { xs: "center" },
      }}
    >
      <Box
        component="div"
        sx={{
          width: { md: "35%", xs: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 1,
          borderRight: { md: "2px solid grey" },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 5,
            marginTop: 5,
           }}
        />
        <Box
          component="div"
          sx={{
            fontWeight: "bold",
            marginBottom: 5,
            fontFamily: "Montserrat",
          }}
        >
          <Typography variant="h3">{coin?.name}</Typography>
        </Box>
        <Box
          component="div"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 5,
            paddingBottom: 2,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          <Typography
            variant="subtitle1"
            dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            alignSelf: "start",
            padding: 5,
            paddingTop: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: { sm: "space-around", xs: "center" },
            alignItems: { xs: "center" },
          }}
        >
          <Box sx={{ display: "flex", marginBottom: 2, flexDirection: "row" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
              Rank:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Montserrat", marginLeft: 1 }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", marginBottom: 2, flexDirection: "row" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
              Current Price:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Montserrat", marginLeft: 1 }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", marginBottom: 2, flexDirection: "row" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
              Market Cap:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Montserrat", marginLeft: 1 }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Box>

          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#078dfa",
                color: 'black',
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}

        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;

