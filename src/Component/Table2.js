import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import {
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
        border: (notes) => {
            if (notes.status === 'new') {
                return '2px dotted green';
            }
            if (notes.status === 'pending') {
                return '2px dotted red';
            }
            if (notes.status === 'cancel') {
                return '2px solid red';
            }
            if (notes.status === 'done') {
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
    },
    updateiconbtn: {
        color:'green',
        '&:hover':{
            backgroundColor:'green',
            color:'white'
        }
    },
    deleteiconbtn: {
        color:'red',
        '&:hover':{
            backgroundColor:'red',
            color:'white'
        }
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


export default function Table2() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [task, setTask] = useState('');
    const [taskError, setTaskError] = useState(false);
    const [status, setStatus] = useState('new');
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/notes')
            .then(res => res.json())
            .then(data => setNotes(data))
        // .catch(err => console.log(err.message))
    })

    const handleDelete = async (id) => {
        await fetch('http://localhost:8080/notes/' + id, {
            method: 'DELETE'
        })
        const newNotes = notes.filter(notes => notes.id !== id)
        setNotes(newNotes)
    }
    const handleOpen = (id) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setCurrentNoteId(id);
            setTitle(noteToEdit.title);
            setTask(noteToEdit.task);
            setStatus(noteToEdit.status);
            setOpen(true);
        }
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
            fetch(`http://localhost:8080/notes/${currentNoteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, task, status })
            })
                .then(() => {
                    const updatedNotes = notes.map(note => {
                        if (note.id === currentNoteId) {
                            return { ...note, title, task, status };
                        }
                        return note;
                    });
                    setNotes(updatedNotes);
                    handleClose();
                })
                .catch(error => console.error('Error updating note:', error));
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                        >ID</TableCell>
                        <TableCell
                            align="center"
                        >Title</TableCell>
                        <TableCell
                        align="center"
                        >Task</TableCell>
                        <TableCell
                            align="center"
                        >Status</TableCell>
                        <TableCell
                            align="center"
                        >Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notes.map((notes, key) => (

                        <TableRow
                            key={notes.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                align="center"
                            >{key + 1}</TableCell>
                            <TableCell
                                align="center"
                            >{notes.title}</TableCell>
                            <TableCell
                                align="center"
                            >{notes.task}</TableCell>
                            <TableCell
                                align="center"
                            >{notes.status}</TableCell>
                            <TableCell
                                align="center"
                            >
                                <IconButton className={classes.deleteiconbtn} onClick={() => handleDelete(notes.id)}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                                <IconButton className={classes.updateiconbtn} onClick={() => handleOpen(notes.id)}>
                                    <AutorenewIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
        </TableContainer>
    );
}