// import * as React from 'react';
// import Button from '@mui/material/Button';
// import {  styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';



// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// export default function CustomizedDialogs() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open dialog
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Modal title
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//           </Typography>
//           <Typography gutterBottom>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
//             Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
//           </Typography>
//           <Typography gutterBottom>
//             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
//             magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
//             ullamcorper nulla non metus auctor fringilla.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Save changes
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// }

// import React, { useState } from 'react';
// import Typography from '@material-ui/core/Typography';
// import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
// import SendIcon from '@mui/icons-material/Send';
// import TextField from '@mui/material/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


// const useStyles = makeStyles({
//   field: {
//     marginTop: '20px !important',
//     marginBottom: '20px !important',
//     display: 'block',
//   },
//   radioGroup: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   submit: {
//     color: 'black',
//     '&:hover': {
//       background: '#000',
//       color: 'white'
//     },
//   },
//   sendIcon: {
//     '&.animate': {
//       animation: '$bounceOutRight 3s',
//       color: 'black'
//     }
//   },
//   '@keyframes bounceOutRight': {
//     '0%': {
//       transform: 'translateX(0)'
//     },
//     '100%': {
//       transform: 'translateX(50px)',
//       opacity: 0
//     }
//   }
// });

// export default function Create({ handleClose, open }) {
//   const classes = useStyles();
//   const [title, setTitle] = useState('');
//   const [titleError, setTitleError] = useState(false);
//   const [task, setTask] = useState('');
//   const [taskError, setTaskError] = useState(false);
//   const [status, setStatus] = useState('new');
//   const [submitting, setSubmitting] = useState(false);
//   const history = useHistory()


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTitleError(false);
//     setTaskError(false);
//     if (title === '') {
//       setTitleError(true);
//     }
//     if (task === '') {
//       setTaskError(true);
//     }
//     if (title && task) {
//       // setSubmitting(true);
//       setTimeout(() => {
//         fetch('http://localhost:8080/notes', {
//           method: 'POST',
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify({ title, task, status })
//         }).then(() => {
//           handleClose();
//         }).catch(err => {
//           console.error('Error while submitting:', err);
//         }).finally(() => {
//           setSubmitting(false);
//         });
//       }, 1500);
//     }
//   };

//   return (
//     <>
//       <Container>
//         <Typography
//           variant='h6'
//           color='textSecondary'
//           component='h2'
//           gutterBottom
//         >
//           Create a New Task
//         </Typography>
//         <form noValidate autoComplete='off' onSubmit={handleSubmit}>
//           <TextField
//             className={classes.field}
//             label="Title"
//             variant='outlined'
//             color='secondary'
//             fullWidth
//             required
//             onChange={(e) => setTitle(e.target.value)}
//             error={titleError}
//           />
//           <TextField
//             className={classes.field}
//             label="Task"
//             variant='outlined'
//             color='secondary'
//             fullWidth
//             required
//             multiline
//             rows={4}
//             onChange={(e) => setTask(e.target.value)}
//             error={taskError}
//           />
//           <FormControl component="fieldset" className={classes.field}>
//             <FormLabel component="legend">Status</FormLabel>
//             <RadioGroup row value={status} onChange={(e) => setStatus(e.target.value)}>
//               <div className={classes.radioGroup}>
//                 <FormControlLabel value="new" control={<Radio />} label="New" />
//                 <FormControlLabel value="pending" control={<Radio />} label="Pending" disabled />
//               </div>
//               <div className={classes.radioGroup}>
//                 <FormControlLabel value="done" control={<Radio />} label="Done" disabled />
//                 <FormControlLabel value="cancel" control={<Radio />} label="Cancel" disabled />
//               </div>
//             </RadioGroup>
//           </FormControl>

//           <Button
//             type="submit"
//             className={classes.submit}
//             endIcon={<SendIcon className={`${classes.sendIcon} ${submitting ? 'animate' : ''}`} />}
//           >
//             Submit
//           </Button>
//         </form>
//       </Container>
//       {/* <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="child-dialog-title"
//           aria-describedby="child-dialog-description"
//         >
//           <DialogTitle id="child-dialog-title">Create Task</DialogTitle>
//           <CloseIcon
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: 'absolute',
//               right: 13,
//               top: 15,
//               color: (theme) => theme.palette.grey[500],
//               cursor: 'pointer'
//             }}
//           />
//           <DialogContent dividers>
//             <TextField
//               className={classes.field}
//               label="Title"
//               variant="outlined"
//               color="secondary"
//               fullWidth
//               required
//               // value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               error={titleError}
//             />
//             <TextField
//               className={classes.field}
//               label="Task"
//               variant="outlined"
//               color="secondary"
//               fullWidth
//               required
//               multiline
//               minRows={4}
//               // value={task}
//               onChange={(e) => setTask(e.target.value)}
//               error={taskError}
//             />
//             <FormControl component="fieldset" className={classes.field}>
//               <FormLabel component="legend">Status</FormLabel>
//               <RadioGroup row value={status} onChange={(e) => setStatus(e.target.value)}>
//                 <div className={classes.radioGroup}>
//                   <FormControlLabel value="new" control={<Radio />} label="New" />
//                   <FormControlLabel value="pending" control={<Radio />} label="Pending" disabled />
//                 </div>
//                 <div className={classes.radioGroup}>
//                   <FormControlLabel value="done" control={<Radio />} label="Done" disabled />
//                   <FormControlLabel value="cancel" control={<Radio />} label="Cancel" disabled />
//                 </div>
//               </RadioGroup>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={handleSubmit}
//               endIcon={<SendIcon className={`${classes.sendIcon} ${submitting ? 'animate' : ''}`} />}
//             >
//               Submit
//             </Button>

//           </DialogActions>
//         </Dialog >
//       </form> */}
//     </>

//   );
// }
