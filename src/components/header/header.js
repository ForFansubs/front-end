import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useGlobal, useDispatch } from 'reactn'

import clsx from 'clsx'
import useTheme from '@material-ui/styles/useTheme'
import makeStyles from '@material-ui/styles/makeStyles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
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

import { indexPage, searchPage, faqPage, recPage, adminPage } from '../../config/front-routes'
import { fullLogo, fullLogoGif, fullLogoDark, fullLogoDarkGif } from '../../config/theming/images'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `100%`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            marginRight: 10,
        },
        marginRight: 36,
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
    ListItemText: {
        fontSize: ".8rem!important"
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    }
}))

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    // eslint-disable-next-line
    const [showModal, setShowModal] = useGlobal('showModal')
    const [userInfo] = useGlobal('user')
    const [usertheme] = useGlobal('theme')
    const [isAdmin] = useGlobal('isAdmin')
    const logoutHandler = useDispatch("logoutHandler")
    const setUserTheme = useDispatch('setTheme')
    const [anchorEl, setAnchorEl] = useState(null)
    const profileMenu = Boolean(anchorEl);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const [open, setOpen] = React.useState(false);
    const [menuItems] = React.useState([
        {
            text: "Ana sayfa",
            link: indexPage,
            show: true,
            icon: <HomeIcon />
        },
        {
            text: "Anime ara",
            link: searchPage,
            show: true,
            icon: <SearchIcon />
        },
        {
            text: "Sıkça Sorulan Sorular",
            link: faqPage,
            show: process.env.REACT_APP_SSS_PAGE_TEXT ? true : false,
            icon: <InfoIcon />
        },
        {
            text: "Ekip Alımları",
            link: recPage,
            show: true,
            icon: <h2>EA</h2>
        }
    ])
    const [menuItems2] = React.useState([
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

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    function SidePanel() {
        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    {menuItems.map((item, index) => item.show ?
                        (
                            <NavLink exact to={item.link} onClick={handleDrawerClose} activeStyle={{ backgroundColor: theme.palette.background.level2 }} key={item.text}>
                                <ListItem button style={{ backgroundColor: "inherit" }}>
                                    <ListItemIcon style={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
                                    <ListItemText className={classes.ListItemText}><Typography variant="body2">{item.text}</Typography></ListItemText>
                                </ListItem>
                            </NavLink>
                        )
                        :
                        "")}
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
            </div>
        )
    }

    return (
        <div className={classes.root}>
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
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={indexPage} className={classes.logoContainer}>
                        {
                            process.env.REACT_APP_HEADER_LOGO_TYPE === "gif" && fullLogoGif !== null && fullLogoDarkGif !== null ?
                                <img title="Site logo" loading="lazy" className={classes.logo} src={usertheme === "dark" ? fullLogoGif : fullLogoDarkGif} alt="Site Logo" />
                                :
                                <img title="Site logo" loading="lazy" className={classes.logo} src={usertheme === "dark" ? fullLogo : fullLogoDark} alt="Site Logo" />
                        }
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
                                {userInfo.avatar ?
                                    <img title={`${userInfo.username} avatar`} loading="lazy" src={userInfo.avatar} style={{ height: "25px" }} alt={`${userInfo.username} avatar`} aria-labelledby={`${userInfo.username} avatar`} />
                                    :
                                    <AccountCircle title={`${userInfo.username} avatar`} alt={`${userInfo.username} avatar`} aria-labelledby={`${userInfo.username} avatar`} />}
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
                            <div>
                                {userInfo.success
                                    ?
                                    isAdmin ?
                                        <>
                                            <a href={adminPage} target="_blank" rel="noopener noreferrer">
                                                <MenuItem>Admin paneli</MenuItem>
                                            </a>
                                            <MenuItem onClick={handleLogoutButton}>Çıkış yap</MenuItem>
                                        </>
                                        :
                                        <MenuItem onClick={handleLogoutButton}>Çıkış yap</MenuItem>
                                    :
                                    <>
                                        <MenuItem onClick={() => handleLoginRegisterButtons("login")}>Giriş yap</MenuItem>
                                        <MenuItem onClick={() => handleLoginRegisterButtons("register")}>Kayıt ol</MenuItem>
                                    </>
                                }
                                <Divider />
                                {
                                    usertheme === "dark"
                                        ?
                                        <MenuItem onClick={() => setUserTheme("light")}><span role="img" title="güneş" aria-labelledby="güneş">🌞</span> Gündüz Modu</MenuItem>
                                        :
                                        <MenuItem onClick={() => setUserTheme("dark")}><span role="img" title="ay" aria-labelledby="ay">🌙</span> Gece Modu</MenuItem>
                                }
                            </div>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                hysteresis={0.01}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
            >
                <SidePanel />
            </SwipeableDrawer>
        </div >
    );
}