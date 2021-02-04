import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import SelectSensorMenu from '../common/SelectSensorMenu';
import SelectCommandMenu from '../common/SelectCommandMenu';
import SelectRadiusMenu from './SelectRadiusMenu';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { backendApiUrl } from '../../../utils/Config';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
  picker: {
    padding: theme.spacing(1),
  },
  cancelButton: {
    marginRight: theme.spacing(1),
  },
  label: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    // textAlign: "center",
    color: 'white',
    borderRadius: '10px',
  },
}));
export default function TimerActionDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selectedSensor, setSelectedSensor] = React.useState('');
  const sensorRef = useRef(selectedSensor);
  const [selectedCommand, setSelectedCommand] = React.useState('');
  const [selectedRadius, setSelectedRadius] = React.useState('');
  const [clearEntries, setClearedEntries] = React.useState(null);

  const [status, setStatus] = React.useState({ message: null, color: null });
  const [loading, setLoading] = React.useState(false);
  // console.log(selectedDate, selectedSensor, selectedRecurrence);

  const handleClose = () => {
    props.closeDialog();
    setOpen(false);
    setStatus({ message: null, color: null });
    setSelectedSensor('');
    setSelectedCommand('');
    setSelectedRadius('');
    setClearedEntries('null');
  };

  const addAction = () => {
    setStatus({ message: null, color: null });
    setLoading(true);
    axios
      .post(backendApiUrl.server + 'api/locationBasedActions', {
        sensorType: selectedSensor.type,
        sensorName: selectedSensor.name,
        deviceId: selectedSensor.deviceId,
        roomName: selectedSensor.room,
        command: selectedCommand,
        commandTopic: selectedSensor.commandTopic,
        registrationDate: Date.now(),
        radius: selectedRadius,
      })
      .then((response) => {
        // console.log(response.data)
        props.updateActions(response.data._id);
        setLoading(false);
        setStatus({ message: 'Action added successfully', color: 'green' });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
          setStatus({ message: error.response.data.message, color: 'red' });
        }
        setLoading(false);
      });
  };

  if (selectedSensor !== sensorRef.current) {
    setSelectedCommand('');
    sensorRef.current = selectedSensor;
    setClearedEntries(Math.random());
  }

  return (
    <div className={classes.root}>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Location-Based Action</DialogTitle>
        <DialogContent dividers>
          <div className={classes.picker}>
            <SelectSensorMenu
              sensors={props.sensors}
              isCommandSensor={true}
              selectSensor={setSelectedSensor}
            />
          </div>
          {selectedSensor === '' ? null : (
            <div className={classes.picker}>
              <SelectCommandMenu
                type={selectedSensor.type}
                selectCommand={setSelectedCommand}
                clearEntries={clearEntries}
              />
            </div>
          )}
          <SelectRadiusMenu selectRadius={setSelectedRadius} />
          {status.message && (
            <>
              <small style={{ color: status.color }}>{status.message}</small>
              <br />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {loading === true ? (
            <CircularProgress />
          ) : (
            <div>
              <Button
                className={classes.cancelButton}
                variant="contained"
                onClick={handleClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={addAction} color="primary">
                Add Action
              </Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
