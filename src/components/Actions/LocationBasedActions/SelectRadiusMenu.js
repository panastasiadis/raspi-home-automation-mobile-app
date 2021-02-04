import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

export default function CustomizedSelects(props) {
  const classes = useStyles();
  const [radius, setRadius] = React.useState('');

  const handleInput = (event) => {
    setRadius(event.target.value);
    props.selectRadius(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.margin} focused>
        <InputLabel required htmlFor="demo-customized-textbox">
          Radius in meters (Minimum: 100)
        </InputLabel>
        <BootstrapInput
          type="number"
          id="demo-customized-textbox"
          value={radius}
          onChange={handleInput}
        />
      </FormControl>
    </div>
  );
}
