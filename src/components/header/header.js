import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useGlobal, useDispatch, useEffect } from 'reactn'
import { useTranslation } from "react-i18next";
import Footer from '../footer/footer'

import { useStyles } from './styles'
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
import { fullLogo, fullLogoDark } from '../../config/theming/images'
import ExtraPagesList from '../../pages/extra-pages/index'
import SecondMenuItems from '../../config/drawer_items'

export default function MiniDrawer() {
    const { t } = useTranslation('components');
    const [settings] = useGlobal('settings')
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
    const [menuItems, setMenuItems] = React.useState([])

    useEffect(() => {
        setMenuItems([
            {
                text: t('header.index.default'),
                shortText: t('header.index.short'),
                link: indexPage,
                show: true,
                icon: <HomeIcon />
            },
            {
                text: t('header.search.default'),
                shortText: t('header.search.short'),
                link: searchPage,
                show: true,
                icon: <SearchIcon />
            },
            {
                text: t('header.faq.default'),
                shortText: t('header.faq.short'),
                link: faqPage,
                show: process.env.REACT_APP_SSS_PAGE === "true" ? true : false,
                icon: <InfoIcon />
            },
            {
                text: t('header.recruitment.default'),
                shortText: t('header.recruitment.short'),
                link: recPage,
                show: true,
                icon: <h2>{t('header.recruitment.logo')}</h2>
            }
        ])
    }, [settings.language])

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
                            <img title="Site logo" loading="lazy" className={classes.logo} src={usertheme === "dark" ? fullLogo : fullLogoDark} alt="Site Logo" />
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