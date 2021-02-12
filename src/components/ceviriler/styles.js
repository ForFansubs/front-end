import { makeStyles, fade } from '@material-ui/core'

export default makeStyles((theme) => ({
    Container: {
        position: "relative",
    },
    BackgroundContainer: {
        overflow: "hidden",
        position: "relative",
        margin: theme.overrides.defaultMarginOverride,
        marginBottom: 0,

        [theme.breakpoints.down("sm")]: {
            margin: theme.overrides.defaultMarginMobileOverride,
            marginBottom: 0
        },
    },
    MetadataContainer: {
        position: "relative",
        margin: theme.overrides.defaultMarginOverride,
        marginTop: 0,
        marginBottom: 0,
        padding: `${theme.spacing(2)}px ${theme.spacing(7)}px`,
        backgroundColor: theme.palette.background.default,
        textAlign: "center",

        [theme.breakpoints.down("sm")]: {
            margin: theme.overrides.defaultMarginMobileOverride,
            marginTop: 0,
            marginBottom: 0
        }
    },
    JikanStatsContainer: {
        margin: theme.spacing(2, 0, 3)
    },
    BackgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        overflow: "hidden",
        "& img": {
            position: "absolute",
            objectFit: "cover",
            width: "70%",
            height: "100%",
            top: "50%",
            left: "65%",
            transform: "translate(-50%, -50%)",
        },
        [theme.breakpoints.down("xs")]: {
            paddingBottom: "80%",
            "& img": {
                marginTop: 0,
            },
        },
    },
    BackgroundImageOverlay: {
        //eslint-disable-next-line
        background: `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 35%, ${fade(theme.palette.background.default, 0)} 50%)`,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        [theme.breakpoints.down("xs")]: {
            background: theme.palette.background.default
        },
    },
    FallbackBackgroundImage: {
        filter: "blur(5px)",
        opacity: 0.8,
    },
    CoverArtContainer: {
        maxWidth: 225 - theme.spacing(2),
        width: 225 - theme.spacing(2),
        display: "none",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "70%",
            width: "70%",
        },

        "& img": {
            width: "inherit",
        },
    },
    FallbackCoverArt: {
        display: "block",
        zIndex: 2,
        boxShadow: theme.shadows[6],
        height: "auto!important",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },
    LogoImage: {
        "& img": {
            width: 400,
            [theme.breakpoints.down('sm')]: {
                width: "100%"
            }
        }
    },
    MobileCoverArt: {
        display: "none",
        margin: theme.spacing(2, 0),
        "& img": {
            boxShadow: theme.shadows[6]
        },
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center"
        }
    },
    AnimeContainer: {
        position: "relative",
        zIndex: 2,
        padding: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        }
    },
    PremieredContainer: {
        color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.text.primary,
    },
    TextContainer: {
        width: "45%",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    SynopsisContainer: {
        whiteSpace: "pre-wrap",
    },
    ContentButton: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        boxShadow: theme.shadows[6]
    },
    BottomStuff: {
        margin: theme.spacing(2, 0)
    },
    DownloadLinkDivider: {
        marginBottom: theme.spacing(1),
    },
    ModalContainer: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    JikanStatsScoresChart: {
        padding: theme.spacing(0, 2, 2, 2),
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
        "& text": {
            y: "-10px!important",
            fill: `${theme.palette.getContrastText(theme.palette.background.paper)}!important`
        },
        "&:hover": {
            "& $JikanStatsScoresChartText": {
                display: "block"
            }
        }
    },
    JikanStatsScoresChartText: {
        display: "none"
    },
    JikanStatsStatusChart: {
        padding: theme.spacing(2),
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper
    },
    JikanStatsStatusChartList: {
        display: "flex",
        flexWrap: "wrap",
        gap: `${theme.spacing(1)}px`,
        [theme.breakpoints.up('sm')]: {
            display: "grid",
            gridAutoFlow: "column",
            justifyContent: "space-around"
        }
    },
    JikanStatsStatusChartItem: {
        textAlign: "center"
    },
    JikanStatsStatusChartItemHeaderText: {
        width: "100%",
        padding: theme.spacing(0.5, 2)
    },
    JikanDataErrorBox: {
        height: 250,
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& svg": {
            fontSize: "3rem"
        }
    },
    CharactersStaffBoxList: {
        display: "grid",
        gridGap: theme.spacing(2),
        gridTemplateColumns: "repeat(3,1fr)",
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: "repeat(2,1fr)"
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "repeat(1,1fr)"
        }
    },
    CharactersStaffBoxItem: {
        display: "inline-grid",
        height: theme.spacing(10),
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper
    },
    CharactersStaffBoxCharacter: {
        gridTemplateColumns: "100%",
        gridTemplateAreas: "chr"
    },
    CharactersStaffBoxStaff: {
        gridTemplateColumns: "100%",
        gridTemplateAreas: "stff"
    },
    CharactersStaffBoxItemImage: {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%"
    },
    CharactersStaffBoxItemCharacter: {
        display: "inline-grid",
        gridTemplateColumns: "25% 75%",
        "& $CharactersStaffBoxItemText": {
            padding: theme.spacing(1, 0, 1, 1)
        }
    },
    CharactersStaffBoxItemStaff: {
        textAlign: "right",
        display: "inline-grid",
        gridTemplateColumns: "50% 50%",
        "& $CharactersStaffBoxItemText": {
            padding: theme.spacing(1, 1, 1, 0)
        }
    },
    CharactersStaffBoxStaffOverride: {
        gridTemplateColumns: "25% 75%",
    },
    CharactersStaffBoxItemText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    CharactersStaffBoxShowMore: {
        textAlign: "right",
        marginBottom: theme.spacing(2)
    },
    YoutubePreview: {
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.background.paper,
        display: "flex"
    }
}))