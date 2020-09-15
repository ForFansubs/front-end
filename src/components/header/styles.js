const { makeStyles } = require("@material-ui/core");

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
        width: theme.spacing(10),
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

export { useStyles }