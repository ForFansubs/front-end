import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useGlobal, useDispatch } from 'reactn'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import InfoIcon from '@material-ui/icons/Info'
import BookIcon from '@material-ui/icons/Book'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { indexPage, searchPage, faqPage, mosLink, adminPage } from '../../config/front-routes'
import { fullLogo } from '../../config/theming/images'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.level2,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        color: theme.palette.text.primary,
        [theme.breakpoints.down('sm')]: {
            marginRight: 10,
        },
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: theme.palette.background.level1,
        color: theme.palette.text.primary
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        backgroundColor: theme.palette.background.level1,
        color: theme.palette.text.primary
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logoContainer: {
        display: "flex",
        flexGrow: 1
    },
    logo: {
        height: "40px"
    },
    active: {
        backgroundColor: theme.palette.background.paper
    },
    ListItemText: {
        fontSize: ".8rem!important"
    }
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    // eslint-disable-next-line
    const [showModal, setShowModal] = useGlobal('showModal')
    const [userInfo] = useGlobal('user')
    const [isAdmin] = useGlobal('isAdmin')
    const logoutHandler = useDispatch("logoutHandler")
    const [anchorEl, setAnchorEl] = useState(null)
    const profileMenu = Boolean(anchorEl);

    const [open, setOpen] = React.useState(false);
    const [menuItems] = React.useState([
        {
            text: "Ana sayfa",
            link: indexPage,
            icon: <HomeIcon />
        },
        {
            text: "Anime ara",
            link: searchPage,
            icon: <SearchIcon />
        },
        {
            text: "Sıkça Sorulan Sorular",
            link: faqPage,
            icon: <InfoIcon />
        }
    ])
    const [menuItems2] = React.useState([
        {
            text: "Manga Oku",
            link: mosLink,
            icon: <BookIcon />
        }
    ])

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleLogoutButton() {
        logoutHandler();
        setAnchorEl(null);
    }

    function handleLoginRegisterButtons(type) {
        setAnchorEl(null)
        setShowModal(type)
    }

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="primary"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={indexPage} className={classes.logoContainer}>
                        <img className={classes.logo} src={fullLogo} alt="Site Logo" />
                    </Link>
                    <div>
                        {userInfo.success ?
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="default"
                            >
                                <img src={userInfo.avatar} style={{ height: "25px" }} alt={`${userInfo.username} avatar`} aria-labelledby={`${userInfo.username} avatar`} />
                            </IconButton>
                            :
                            <IconButton
                                aria-label="account menus"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="default"
                            >
                                <AccountCircle />
                            </IconButton>
                        }
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={profileMenu}
                            onClose={handleClose}
                        >
                            {userInfo.success
                                ?
                                <div>
                                    {isAdmin ?
                                        <a href={adminPage} target="_blank" rel="noopener noreferrer">
                                            <MenuItem>Admin paneli</MenuItem>
                                        </a> : ""}
                                    <MenuItem onClick={handleLogoutButton}>Çıkış yap</MenuItem>
                                </div>
                                :
                                <div>
                                    <MenuItem onClick={() => handleLoginRegisterButtons("login")}>Giriş yap</MenuItem>
                                    <MenuItem onClick={() => handleLoginRegisterButtons("register")}>Kayıt ol</MenuItem>
                                </div>
                            }
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose} style={{ color: theme.palette.text.primary }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <NavLink exact to={item.link} onClick={() => setTimeout(handleDrawerClose, 300)} activeClassName={classes.active} key={item.text}>
                            <ListItem button style={{ backgroundColor: "inherit" }}>
                                <ListItemIcon style={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
                                <ListItemText className={classes.ListItemText}><Typography variant="body2">{item.text}</Typography></ListItemText>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                <Divider />
                <List>
                    {menuItems2.map((item, index) => (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.text}>
                            <ListItem button>
                                <ListItemIcon style={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
                                <ListItemText className={classes.ListItemText}><Typography variant="body2">{item.text}</Typography></ListItemText>
                            </ListItem>
                        </a>
                    ))}
                </List>
            </Drawer>
        </div >
    );
}