import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import TimerIcon from '@material-ui/icons/Timer';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import TimerActionDialog from './TimerActions/TimerActionDialog';
import SensorBasedActionDialog from './SensorBasedActions/SensorBasedActionDialog';
import CloseIcon from '@material-ui/icons/Close';
import EnableLocationServices from './LocationBasedActions/EnableLocationServicesDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  action: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function OpenIconSpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const selectTimerAction = () => {
    setSelectedAction('timerAction');
  };

  const selectSensorBasedAction = () => {
    setSelectedAction('sensorBasedAction');
  };

  const selectLocationBasedAction = () => {
    setSelectedAction('locationBasedAction');
  };

  const closeDialog = () => {
    setSelectedAction(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let dialog = null;
  switch (selectedAction) {
    case 'timerAction':
      dialog = (
        <TimerActionDialog
          sensors={props.sensors}
          updateActions={props.updateActions}
          closeDialog={closeDialog}
        />
      );
      break;
    case 'sensorBasedAction':
      dialog = (
        <SensorBasedActionDialog
          sensors={props.sensors}
          updateActions={props.updateActions}
          closeDialog={closeDialog}
        />
      );
      break;
    case 'locationBasedAction':
      dialog = (
        <EnableLocationServices
          closeDialog={closeDialog}
          sensors={props.sensors}
          updateActions={props.updateActions}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          className={classes.action}
          icon={<BlurCircularIcon />}
          tooltipTitle={'Sensor Based'}
          onClick={selectSensorBasedAction}
        />
        <SpeedDialAction
          className={classes.action}
          icon={<EditLocationIcon />}
          tooltipTitle={'Location Based'}
          onClick={selectLocationBasedAction}
        />
        <SpeedDialAction
          className={classes.action}
          icon={<TimerIcon />}
          tooltipTitle={'Time Based'}
          onClick={selectTimerAction}
        />
        {dialog}
      </SpeedDial>
    </div>
  );
}
