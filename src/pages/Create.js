import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  field: {
    marginTop: '20px !important',
    marginBottom: '20px !important',
    display: 'block',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  }
});

export default function Create({handleClose}) {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [task, setTask] = useState('');
  const [taskError, setTaskError] = useState(false);
  const [status, setStatus] = useState('new');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose()
    setTitleError(false);
    setTaskError(false);
    if (title === '') {
      setTitleError(true);
    }
    if (task === '') {
      setTaskError(true);
    }
    if (title && task) {
      fetch('http://localhost:8080/notes', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, task, status })
      }).then(() => history.push('/'));
    }
  };

  return (
    <Container>
      <Typography
        variant='h6'
        color='textSecondary'
        component='h2'
        gutterBottom
      >
        Create a New Task
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="Title"
          variant='outlined'
          color='secondary'
          fullWidth
          required
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
        />
        <TextField
          className={classes.field}
          label="Task"
          variant='outlined'
          color='secondary'
          fullWidth
          required
          multiline
          rows={4}
          onChange={(e) => setTask(e.target.value)}
          error={taskError}
        />
        <FormControl component="fieldset" className={classes.field}>
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup row value={status} onChange={(e) => setStatus(e.target.value)}>
            <div className={classes.radioGroup}>
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="pending" control={<Radio />} label="Pending" disabled />
            </div>
            <div className={classes.radioGroup}>
              <FormControlLabel value="done" control={<Radio />} label="Done" disabled />
              <FormControlLabel value="cancel" control={<Radio />} label="Cancel" disabled />
            </div>
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color='primary'
          variant='contained'
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
