import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'task', label: 'Task', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

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

export default function TableData({ newnote, handleDelete }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteRow = id => {
        handleDelete(id);
    };

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
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newnote
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map(column => {
                                                if (column.id === 'actions') {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <IconButton
                                                                aria-label="delete"
                                                                onClick={() => handleDeleteRow(row.id)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                aria-label="update"
                                                                onClick={handleOpen}
                                                            >
                                                                <AutorenewIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    );
                                                } else {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={newnote.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
            </Paper>
        </>
    );
}
