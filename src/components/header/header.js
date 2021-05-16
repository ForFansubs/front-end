import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import Footer from "../footer/footer";

import { useStyles } from "./styles";
import clsx from "clsx";
import useTheme from "@material-ui/styles/useTheme";
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    MenuItem,
    Menu,
    Box,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoonIcon from "@material-ui/icons/Brightness2";
import SunIcon from "@material-ui/icons/WbSunny";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import {
    indexPage,
    searchPage,
    faqPage,
    recPage,
    adminPage,
    calendarPage,
    loginPage,
    registerPage,
} from "../../config/front-routes";
import { fullLogo, fullLogoDark } from "../../config/theming/images";
import ExtraPagesList from "../../pages/extra-pages/index";
import SecondMenuItems from "../../config/drawer_items";
import UserContext from "../../contexts/user.context";
import SettingsContext from "../../contexts/settings.context";

export default function MiniDrawer() {
    const { t } = useTranslation("components");
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const theme = useTheme();
    const [user, setUser] = useContext(UserContext);
    const [settings, setSettings] = useContext(SettingsContext);
    // eslint-disable-next-line
    const [anchorEl, setAnchorEl] = useState(null);
    const profileMenu = Boolean(anchorEl);

    const [open, setOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const newMenus = [];
        if (ExtraPagesList.length) {
            ExtraPagesList.map(
                ({ PageUrl, PageTitle, PageShortTitle, PageIcon }) => {
                    newMenus.push({
                        text: PageTitle,
                        shortText: PageShortTitle ? PageShortTitle : "",
                        link: PageUrl,
                        icon: PageIcon ? PageIcon : "",
                        show: true,
                    });
                }
            );
        }
        setMenuItems([
            {
                text: t("header.index.default"),
                shortText: t("header.index.short"),
                link: indexPage,
                show: true,
                icon: <HomeIcon />,
            },
            {
                text: t("header.search.default"),
                shortText: t("header.search.short"),
                link: searchPage,
                show: true,
                icon: <SearchIcon />,
            },
            {
                text: t("header.calendar.default"),
                shortText: t("header.calendar.short"),
                link: calendarPage,
                show: true,
                icon: <CalendarIcon />,
            },
            {
                text: t("header.faq.default"),
                shortText: t("header.faq.short"),
                link: faqPage,
                show: process.env.REACT_APP_SSS_PAGE === "true" ? true : false,
                icon: <InfoIcon />,
            },
            {
                text: t("header.recruitment.default"),
                shortText: t("header.recruitment.short"),
                link: recPage,
                show: true,
                icon: <h2>{t("header.recruitment.logo")}</h2>,
            },
            ...newMenus,
        ]);
    }, [settings.language]);

    const [menuItems2] = useState(SecondMenuItems);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleLogoutButton() {
        setUser({});
        enqueueSnackbar("Başarıyla çıkış yapıldı", {
            variant: "success",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
            },
            autoHideDuration: 3500,
        });
        setAnchorEl(null);
    }

    const handleDrawerState = () => {
        setOpen((state) => !state);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function SidePanel() {
        return (
            <>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map((item) =>
                        item.show ? (
                            <NavLink
                                exact
                                to={item.link}
                                onClick={handleDrawerClose}
                                activeClassName={classes.Active}
                                key={item.text}
                            >
                                <ListItem className={classes.ListItem} button>
                                    <Box className={classes.iconContainer}>
                                        <ListItemIcon
                                            className={classes.ListItemIcon}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <Typography
                                            variant='subtitle2'
                                            className={classes.shortText}
                                        >
                                            {item.shortText || item.text}
                                        </Typography>
                                    </Box>
                                    <ListItemText
                                        className={classes.ListItemText}
                                    >
                                        <Typography variant='body2'>
                                            {item.text}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </NavLink>
                        ) : (
                            ""
                        )
                    )}
                </List>
                <Divider />
                {menuItems2.length ? (
                    <>
                        <List>
                            {menuItems2.map((item) => (
                                <a
                                    href={item.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={classes.secondary}
                                    key={item.title}
                                >
                                    <ListItem
                                        className={classes.ListItem}
                                        button
                                        style={{ backgroundColor: "inherit" }}
                                    >
                                        <Box className={classes.iconContainer}>
                                            <ListItemIcon
                                                className={classes.ListItemIcon}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            <Typography
                                                variant='subtitle2'
                                                className={classes.shortText}
                                            >
                                                {item.short_title}
                                            </Typography>
                                        </Box>
                                        <ListItemText
                                            className={classes.ListItemText}
                                        >
                                            <Typography variant='body2'>
                                                {item.title}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </a>
                            ))}
                        </List>
                        <Divider />
                    </>
                ) : (
                    ""
                )}

                <div
                    className={clsx(classes.hide, {
                        [classes.footerDisplay]: open,
                    })}
                >
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar
                color='default'
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='Open/close drawer'
                        onClick={handleDrawerState}
                        edge='start'
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.logoContainer}>
                        <Link to={indexPage} style={{ display: "flex" }}>
                            <img
                                title='Site logo'
                                loading='lazy'
                                className={classes.logo}
                                src={
                                    settings.theme === "dark"
                                        ? fullLogo
                                        : fullLogoDark
                                }
                                alt='Site Logo'
                            />
                        </Link>
                    </div>
                    <div className={classes.RightBox}>
                        {settings.theme === "dark" ? (
                            <IconButton
                                onClick={() =>
                                    setSettings((state) => ({
                                        ...state,
                                        theme: "light",
                                    }))
                                }
                            >
                                <SunIcon style={{ height: "25px" }} />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() =>
                                    setSettings((state) => ({
                                        ...state,
                                        theme: "dark",
                                    }))
                                }
                            >
                                <MoonIcon style={{ height: "25px" }} />
                            </IconButton>
                        )}
                        {user.token ? (
                            <IconButton
                                aria-label={user.username}
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='default'
                            >
                                {user.avatar ? (
                                    <img
                                        title={`${user.username} avatar`}
                                        loading='lazy'
                                        src={user.avatar}
                                        style={{ height: "24px" }}
                                        alt={`${user.username} avatar`}
                                        aria-labelledby={`${user.username} avatar`}
                                    />
                                ) : (
                                    <AccountCircle
                                        title={`${user.username} avatar`}
                                        alt={`${user.username} avatar`}
                                        aria-labelledby={`${user.username} avatar`}
                                    />
                                )}
                            </IconButton>
                        ) : (
                            <IconButton
                                aria-label='account menus'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='default'
                            >
                                <AccountCircle />
                            </IconButton>
                        )}
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={profileMenu}
                            onClose={handleClose}
                        >
                            <div>
                                {user.token ? (
                                    user.admin ? (
                                        <>
                                            <a
                                                href={adminPage}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                <MenuItem>
                                                    {t("common:ns.admin_panel")}
                                                </MenuItem>
                                            </a>
                                            <MenuItem
                                                onClick={handleLogoutButton}
                                            >
                                                {t("common:ns.logout")}
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <MenuItem onClick={handleLogoutButton}>
                                            {t("common:ns.logout")}
                                        </MenuItem>
                                    )
                                ) : (
                                    <>
                                        <Link to={loginPage}>
                                            <MenuItem>
                                                {t("common:ns.login")}
                                            </MenuItem>
                                        </Link>
                                        <Link to={registerPage}>
                                            <MenuItem>
                                                {t("common:ns.register")}
                                            </MenuItem>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
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
        </div>
    );
}
