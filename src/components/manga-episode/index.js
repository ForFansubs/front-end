import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    OuterContainer: {
        [theme.breakpoints.down("sm")]: {
            overflow: "auto",
            height: "100%",
        },
    },
    Container: {
        position: "relative",
        backgroundColor: theme.palette.background.paper,
    },
    Navigator: {},
    NavigatorButtonContainer: {},
    NavigateBefore: {
        position: "fixed",
        bottom: 0,
        left: theme.spacing(12),
        [theme.breakpoints.down("sm")]: {
            position: "initial",
            width: `calc(50% - ${theme.spacing(1)}px)`,
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
    NavigateNext: {
        position: "fixed",
        bottom: 0,
        right: theme.spacing(12),
        [theme.breakpoints.down("sm")]: {
            position: "initial",
            width: `calc(50% - ${theme.spacing(1)}px)`,
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
    },
    ReadingStyleButtonContainer: {
        display: "flex",
        marginTop: theme.spacing(2),
        justifyContent: "center",
        "& svg": {
            marginRight: theme.spacing(1),
        },
    },
    PagebyPage: {
        marginRight: theme.spacing(1),
    },
    ToManga: {
        marginLeft: theme.spacing(1),
    },
    WebtoonContainer: {
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        width: "80%",
        "&::-webkit-scrollbar": {
            width: 8,
            [theme.breakpoints.down("sm")]: {
                width: 0,
                height: 0,
            },
        },
        "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            backgroundColor: theme.palette.background.paper,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.down("sm")]: {
            height: "90vh",
        },
    },
    ImageOuterContainer: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: "100vh",
        [theme.breakpoints.down("sm")]: {
            height: "100%",
        },
    },
    ImageContainer: {
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    PaginationContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    PaginationItem: {
        width: "100%",
        backgroundColor: grey[600],
        zIndex: 2,
        height: 8,
        border: `1px solid ${grey[900]}`,
    },
    MainPageImage: {
        maxWidth: "100%",
        maxHeight: "100%",
        bottom: 8,
        left: "0",
        margin: "auto",
        overflow: "auto",
        position: "absolute",
        right: "0",
        top: "0",
        objectFit: "contain",
        [theme.breakpoints.down("sm")]: {
            position: "initial",
        },
    },
    MainPageWebtoonImage: {
        width: "100%",
        height: "auto",
    },
    SidebarContainer: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        },
    },
    ImageOverlayContainer: {
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    ImageOverlay: {
        flexGrow: 1,
    },
    CommentContainer: {
        marginTop: theme.spacing(2),
        overflow: "auto",
        maxHeight: "600px",
        "&::-webkit-scrollbar": {
            width: 8,
            [theme.breakpoints.down("sm")]: {
                width: 0,
                height: 0,
            },
        },
        "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            backgroundColor: theme.palette.background.paper,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
        },
    },
    SelectEpisodeWarning: {
        color: grey[600],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
        },
    },
}));

const defaultBoxProps = {
    bgcolor: "background.paper",
};

export { useStyles, defaultBoxProps };
