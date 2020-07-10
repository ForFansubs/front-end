import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useGlobal, useDispatch, useEffect } from 'reactn'
import Footer from '../footer/footer'

import clsx from 'clsx'
import useTheme from '@material-ui/styles/useTheme'
import { Drawer, AppBar, Toolbar, List, Divider, ListItem, ListItemIcon, ListItemText, Typography, MenuItem, Menu, makeStyles, Box } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoonIcon from '@material-ui/icons/NightsStay'
import SunIcon from '@material-ui/icons/WbSunny'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { indexPage, searchPage, faqPage, recPage, adminPage } from '../../config/front-routes'
import { fullLogo, fullLogoGif, fullLogoDark, fullLogoDarkGif } from '../../config/theming/images'
import ExtraPagesList from '../../pages/extra-pages/index'
import SecondMenuItems from '../../config/drawer_items'

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
    root: {
        overflowX: "hidden",
        [theme.breakpoints.up('sm')]: {
            overflowX: "initial",
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: 0,
        [theme.breakpoints.up('sm')]: {
            width: `100%`,
        }
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            marginRight: 10,
        },
        marginRight: 36,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    SidePanel: {
        backgroundColor: theme.palette.background.level1
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
        height: "46px"
    },
    ListItem: {
        width: "100vw",
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
        },
        transition: "none",
        '&:hover': {
            backgroundColor: theme.palette.background.paper
        }
    },
    ListItemText: {
        fontSize: ".8rem!important"
    },
    ListItemIcon: {
        display: "contents",
        color: theme.palette.grey["500"],
        '& svg': {
            color: theme.palette.grey["500"]
        },
    },
    iconContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: theme.spacing(10) + 1,
    },
    shortText: {
        display: "none",
        whiteSpace: "pre-wrap",
        textAlign: "center",
        fontSize: "0.7rem",
        color: theme.palette.grey["500"]
    },
    Active: {
        backgroundColor: theme.palette.background.paper,
        '& $shortText': {
            color: theme.palette.text.primary
        },
        '& $ListItemIcon': {
            color: theme.palette.text.primary,
            '& svg': {
                color: theme.palette.text.primary
            }
        }
    },
    RightBox: {
        display: "flex"
    },
    secondary: {
        '&:hover': {
            backgroundColor: theme.palette.background.paper
        }
    },
    drawerOpen: {
        width: "100vw",
        '& $ListItemText': {
            whiteSpace: "pre-wrap"
        },
        '& $iconContainer': {
            alignItems: "initial",
            width: `${theme.spacing(6)}px`,
            maxWidth: `${theme.spacing(6)}px`,
            minWidth: `${theme.spacing(6)}px`
        },
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
        },
        overflowX: "hidden",
        '& $Active': {
            '& $ListItem': {
                backgroundColor: theme.palette.background.paper
            }
        }
    },
    drawerClose: {
        '& $ListItem': {
            padding: `${theme.spacing(1)}px 0`
        },
        '& $iconContainer': {
            padding: `${theme.spacing(1)}px ${theme.spacing(0)}px`
        },
        '& $shortText': {
            display: "block"
        },
        '& $ListItemText': {
            display: "none"
        },
        overflowX: 'hidden',
        width: 0,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(10) + 1,
        },
        [theme.breakpoints.down('xs')]: {
            borderRight: 0
        }
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    snsButton: {
        margin: "16px"
    },
    hide: {
        display: "none"
    },
    footerDisplay: {
        display: "block"
    }
}))

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    // eslint-disable-next-line
    const [, setShowModal] = useGlobal('showModal')
    const [userInfo] = useGlobal('user')
    const [usertheme] = useGlobal('theme')
    const [isAdmin] = useGlobal('isAdmin')
    const logoutHandler = useDispatch("logoutHandler")
    const setUserTheme = useDispatch('setTheme')
    const [anchorEl, setAnchorEl] = useState(null)
    const profileMenu = Boolean(anchorEl);

    const [open, setOpen] = React.useState(false);
    const [menuItems, setMenuItems] = React.useState([
        {
            text: "Ana sayfa",
            shortText: "Ana Sayfa",
            link: indexPage,
            show: true,
            icon: <HomeIcon />
        },
        {
            text: "İçerik ara",
            shortText: "Ara",
            link: searchPage,
            show: true,
            icon: <SearchIcon />
        },
        {
            text: "Sıkça Sorulan Sorular",
            shortText: "SSS",
            link: faqPage,
            show: process.env.REACT_APP_SSS_PAGE === "true" ? true : false,
            icon: <InfoIcon />
        },
        {
            text: "Ekip Alımları",
            link: recPage,
            show: true,
            icon: <h2>EA</h2>
        }
    ])

    useEffect(() => {
        if (ExtraPagesList.length) {
            const newMenus = []

            ExtraPagesList.map(({ PageUrl, PageTitle, PageShortTitle, PageIcon }) => {
                newMenus.push({
                    text: PageTitle,
                    shortText: PageShortTitle ? PageShortTitle : "",
                    link: PageUrl,
                    icon: PageIcon ? PageIcon : "",
                    show: true
                })
            })

            setMenuItems(state => [
                ...state, ...newMenus
            ])
        }
    }, [])

    const [menuItems2] = React.useState(SecondMenuItems)

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

    const handleDrawerState = () => {
        setOpen(state => !state);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function SidePanel() {
        return (
            <>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map(item => item.show ?
                        (
                            <NavLink exact to={item.link} onClick={handleDrawerClose} activeClassName={classes.Active} key={item.text}>
                                <ListItem className={classes.ListItem} button>
                                    <Box className={classes.iconContainer}>
                                        <ListItemIcon className={classes.ListItemIcon}>{item.icon}</ListItemIcon>
                                        <Typography variant="subtitle2" className={classes.shortText}>{item.shortText || item.text}</Typography>
                                    </Box>
                                    <ListItemText className={classes.ListItemText}><Typography variant="body2">{item.text}</Typography></ListItemText>
                                </ListItem>
                            </NavLink>
                        )
                        :
                        "")}
                </List>
                <Divider />
                {
                    menuItems2.length ?
                        <>
                            <List>
                                {menuItems2.map(item => (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={classes.secondary} key={item.title}>
                                        <ListItem className={classes.ListItem} button style={{ backgroundColor: "inherit" }}>
                                            <Box className={classes.iconContainer}>
                                                <ListItemIcon className={classes.ListItemIcon}>{item.icon}</ListItemIcon>
                                                <Typography variant="subtitle2" className={classes.shortText}>{item.short_title}</Typography>
                                            </Box>
                                            <ListItemText className={classes.ListItemText}><Typography variant="body2">{item.title}</Typography></ListItemText>
                                        </ListItem>
                                    </a>
                                ))}
                            </List>
                            <Divider />
                        </>
                        :
                        ""
                }

                <div className={clsx(classes.hide, {
                    [classes.footerDisplay]: open,
                })}>
                    <Footer />
                </div>
            </>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar
                color="default"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open/close drawer"
                        onClick={handleDrawerState}
                        edge="start"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.logoContainer}>
                        <Link to={indexPage} style={{ display: "flex" }}>
                            {
                                process.env.REACT_APP_HEADER_LOGO_TYPE === "gif" && fullLogoGif !== null && fullLogoDarkGif !== null ?
                                    <img title="Site logo" loading="lazy" className={classes.logo} src={usertheme === "dark" ? fullLogoGif : fullLogoDarkGif} alt="Site Logo" />
                                    :
                                    <img title="Site logo" loading="lazy" className={classes.logo} src={usertheme === "dark" ? fullLogo : fullLogoDark} alt="Site Logo" />
                            }
                        </Link>
                    </div>
                    <div className={classes.RightBox}>
                        {
                            usertheme === "dark"
                                ?
                                <IconButton onClick={() => setUserTheme("light")}><SunIcon style={{ height: "25px" }} /></IconButton>
                                :
                                <IconButton onClick={() => setUserTheme("dark")}><MoonIcon style={{ height: "25px" }} /></IconButton>
                        }
                        {userInfo.success ?
                            <IconButton
                                aria-label={userInfo.username}
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="default"
                            >
                                {userInfo.avatar ?
                                    <img title={`${userInfo.username} avatar`} loading="lazy" src={userInfo.avatar} style={{ height: "24px" }} alt={`${userInfo.username} avatar`} aria-labelledby={`${userInfo.username} avatar`} />
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
                            </div>
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
                    paper: clsx(classes.SidePanel, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <SidePanel />
            </Drawer>
        </div >
    );
}