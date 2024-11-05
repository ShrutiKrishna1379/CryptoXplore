import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { CryptoState } from "../CryptoContext";

const Aalert = () => {
  const { alert, setAlert } = CryptoState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity={alert.type}
          variant="filled"
          elevation={10}
        >
           {alert.message}
        </Alert>
      </Snackbar>
  );
};

export default Aalert;