import React, { useState } from 'react';
import { AppBar, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { SubjectOutlined } from '@material-ui/icons';
import GamepadIcon from '@mui/icons-material/Gamepad';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Create from '../pages/Create';

const useStyles = makeStyles((theme) => ({
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3),
    },
    drawer: {
        width: 240,
    },
    drawerPaper: {
        width: 240,
    },
    root: {
        display: 'flex',
    },
    active: {
        background: '#f4f4f4',
    },
    title: {
        padding: theme.spacing(2),
    },
    appbar: {
        width: 'calc(100% - 240px)',
    },
    toolbar: theme.mixins.toolbar,
    topButton: {
        flexGrow: 1,
    }
}));

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

export default function Layout({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const tabMenu = [
        {
            text: 'CRUD operation',
            icon: <SubjectOutlined color="secondary" />,
            path: '/',
        },
        {
            text: 'Typography',
            icon: <GamepadIcon color="secondary" />,
            path: '/typography',
        },
        {
            text: 'Button',
            icon: <GamepadIcon color="secondary" />,
            path: '/button',
        },
        {
            text: 'Icon',
            icon: <GamepadIcon color="secondary" />,
            path: '/icon',
        },
        {
            text: 'Custom Style',
            icon: <GamepadIcon color="secondary" />,
            path: '/custom-style',
        },
    ];
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className={classes.root}>
                <AppBar className={classes.appbar}>
                    <Toolbar>
                        <Typography className={classes.topButton}>
                            <FormatListBulletedIcon />
                        </Typography>
                        <Typography>
                            <Button onClick={handleOpen}>
                                <AddIcon />
                            </Button>
                        </Typography>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={style}>
                                <Create handleClose={handleClose} />
                                {/* <Button onClick={handleClose}><ClearIcon /></Button> */}
                            </Box>
                        </Modal>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div>
                        <Typography variant="h5" className={classes.title}>
                            Material UI 
                        </Typography>
                    </div>
                    <List>
                        {tabMenu.map((menu) => (
                            <ListItem
                                button
                                key={menu.text}
                                onClick={() => history.push(menu.path)}
                                className={location.pathname === menu.path ? classes.active : null}
                            >
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText primary={menu.text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <div className={classes.page}>
                    <div className={classes.toolbar}></div>
                    {children}
                </div>
            </div>
        </>
    );
}
