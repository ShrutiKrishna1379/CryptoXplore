import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
} from "@mui/material";
// import { styled } from '@mui/system';
import SelectButton from "./SelectButton";
import { chartDays } from "../Config/data";
import { CryptoState } from "../CryptoContext";
import { Box } from "@mui/system";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);


  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  
  return (
    <Box
      component="div"
      sx={{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        padding: 4,
        '@media (max-width: 960px)': {
          width: "100%",
          marginTop: 0,
          padding: 5,
          paddingTop: 0,
          
        }
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main style={{ width: "100%" }}>
          {!historicData | flag === false ? (
            <CircularProgress
              style={{ color: "#0890ffe7" }}
              size={200}
              thickness={1}
            />
          ) : (
            <>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "600px", 
                }}
              >
                <Line
                  data={{
                    labels: historicData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [
                      {
                        data: historicData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#078dfa",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  marginTop: 2,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
                ))}
              </Box>
            </>
          )}
        </main>
      </ThemeProvider>
    </Box>
  );
};

export default CoinInfo;

