import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    makeStyles,
    Modal,
    Typography,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
    test: {
        border: (newnote) => {
            if (newnote.status === 'new') {
                return '2px dotted green';
            }
            if (newnote.status === 'pending') {
                return '2px dotted red';
            }
            if (newnote.status === 'cancel') {
                return '2px solid red';
            }
            if (newnote.status === 'done') {
                return '2px solid green';
            }
            return 'none';
        }
    },
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const TaskCard = ({ newnote, handleDelete }) => {
    const classes = useStyles(newnote);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [task, setTask] = useState('');
    const [taskError, setTaskError] = useState(false);
    const [status, setStatus] = useState('new');

    const handleOpen = () => {
        setTitle(newnote.title);
        setTask(newnote.task);
        setStatus(newnote.status);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setTaskError(false);

        if (title.trim() === '') {
            setTitleError(true);
        }
        if (task.trim() === '') {
            setTaskError(true);
        }

        if (title.trim() && task.trim()) {
            fetch(`http://localhost:8080/notes/${newnote.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, task, status })
            })
                .then(() => {
                    handleClose();
                })
                .catch(error => console.error('Error updating note:', error));
        }
    };

    return (
        <div>
            <Card elevation={1} className={classes.test}>
                <CardHeader
                    action={
                        <>
                            <IconButton onClick={() => handleDelete(newnote.id)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                            <IconButton onClick={handleOpen}>
                                <AutorenewIcon />
                            </IconButton>
                        </>
                    }
                    title={newnote.title}
                    subheader={newnote.status}
                />
                <CardContent>
                    <Typography variant='body2' color="textSecondary">
                        {newnote.task}
                    </Typography>
                </CardContent>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <Container>
                        <Typography
                            variant='h6'
                            color='textSecondary'
                            component='h2'
                            gutterBottom
                        >
                            Update Task
                        </Typography>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                            <TextField
                                className={classes.field}
                                label="Title"
                                variant='outlined'
                                color='secondary'
                                fullWidth
                                required
                                value={title}
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
                                minRows={4}
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                error={taskError}
                            />
                            <FormControl component="fieldset" className={classes.field}>
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup row value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <div className={classes.radioGroup}>
                                        <FormControlLabel value="new" control={<Radio />} label="New" />
                                        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                                    </div>
                                    <div className={classes.radioGroup}>
                                        <FormControlLabel value="done" control={<Radio />} label="Done" />
                                        <FormControlLabel value="cancel" control={<Radio />} label="Cancel" />
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
                </Box>
            </Modal>
        </div>
    );
};

export default TaskCard;
