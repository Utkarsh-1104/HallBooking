/* eslint-disable react/prop-types */
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Popup(props) {
  return (
    <div>
      <Snackbar open={props.state} autoHideDuration={5000} onClose={props.handleClose} >
        <Alert
          onClose={props.handleClose}
          severity={props.event}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
