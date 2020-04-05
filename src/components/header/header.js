import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useGlobal, useDispatch } from 'reactn'
import Footer from '../footer/footer'

import clsx from 'clsx'
import useTheme from '@material-ui/styles/useTheme'
import { Drawer, AppBar, Toolbar, List, Divider, ListItem, ListItemIcon, ListItemText, Typography, MenuItem, Menu, makeStyles } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

import { indexPage, searchPage, faqPage, recPage, adminPage } from '../../config/front-routes'
import { fullLogo, fullLogoGif, fullLogoDark, fullLogoDarkGif } from '../../config/theming/images'

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
            width: `calc(100% - ${drawerWidth}px)`,
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
        height: "40px"
    },
    ListItem: {
        width: "100vw",
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
        }
    },
    ListItemText: {
        fontSize: ".8rem!important"
    },
    drawerOpen: {
        width: "100vw",
        '& $ListItemText': {
            whiteSpace: "pre-wrap"
        },
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
        },
        overflowX: "hidden"
    },
    drawerClose: {
        overflowX: 'hidden',
        width: 0,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
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
        {
            text: "Discord sunucumuza katılın!",
            link: process.env.REACT_APP_DISCORD_LINK,
            show: process.env.REACT_APP_DISCORD_LINK ? true : false,
            icon: <FontAwesomeIcon icon={faDiscord} size="2x" />
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

    const handleDrawerOpen = () => {
        setOpen(true);
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
                    {menuItems.map((item, index) => item.show ?
                        (
                            <NavLink exact to={item.link} onClick={handleDrawerClose} activeStyle={{ backgroundColor: theme.palette.background.level2 }} key={item.text}>
                                <ListItem className={classes.ListItem} button style={{ backgroundColor: "inherit" }}>
                                    <ListItemIcon style={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
                                    <ListItemText className={classes.ListItemText}><Typography variant="body2">{item.text}</Typography></ListItemText>
                                </ListItem>
                            </NavLink>
                        )
                        :
                        "")}
                </List>
                {
                    menuItems2.length
                        ?
                        <>
                            <Divider />
                            <List>
                                {menuItems2.map((item, index) => {
                                    if (item.show)
                                        return (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.text}>
                                                <ListItem button className={classes.ListItem}>
                                                    <ListItemIcon style={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
                                                    <ListItemText
                                                        className={clsx(classes.ListItemText, {
                                                            [classes.ListItemTextOpen]: open,
                                                            [classes.ListItemTextClose]: !open,
                                                        })}>
                                                        <Typography variant="body2">
                                                            {item.text}
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </a>
                                        )
                                    else return ""
                                })}
                            </List>
                        </>
                        :
                        ""
                }
                <Divider />
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
                                aria-label={userInfo.username}
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