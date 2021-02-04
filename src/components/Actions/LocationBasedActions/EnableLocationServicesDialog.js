import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {
  onLocationServicesReady,
  areLocationPermissionsAccepted,
  removeGeoLocationListener,
} from '../../../utils/Location';
import LocationBasedActionDialog from './LocationBasedActionDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function EnableLocationServices(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [servicesEnabled, setServicesEnabled] = React.useState(null);

  useEffect(() => {
    areLocationPermissionsAccepted(setServicesEnabled);
    //
    // return () => {
    //     console.log("unmounting relay");
    //     client.off("message", messageHandler);
    // };
  }, []);

  const handleClose = () => {
    props.closeDialog();
    setOpen(false);
  };

  const enableServices = () => {
    onLocationServicesReady(setServicesEnabled);
    handleClose();
  };
  let dialog = null;
  if (servicesEnabled !== null) {
    if (servicesEnabled) {
      // onLocationServicesReady();
      dialog = (
        <LocationBasedActionDialog
          sensors={props.sensors}
          updateActions={props.updateActions}
          closeDialog={props.closeDialog}
        />
      );
    } else {
      removeGeoLocationListener();
      dialog = (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Location-Based Action</DialogTitle>
          <DialogContent dividers>
            When prompted, you must accept all asked permissions in order for
            the location services of this app to work. Otherwise this feature
            will remain disabled.
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={enableServices}
              color="primary"
            >
              Enable Location Services
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
  return <div className={classes.root}>{dialog}</div>;
}
