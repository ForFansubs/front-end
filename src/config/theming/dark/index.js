const palette = {
    primary: { main: '#212121' },
    secondary: { main: 'rgb(255,127,80)' },
    background: {
        default: "#121212",
        level1: "#212121",
        level2: "#333",
        paper: "#424242"
    },
    contrastThreshold: 3,
    type: "dark"
}

const props = {
    MuiTypography: {
        variantMapping: {
            body2: 'span',
        },
    },
}

const typography = {
    h1: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: "4.8rem",
        lineHeight: 1.2
    },
    h2: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: "3rem",
        lineHeight: 1.2
    },
    h3: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: "2.4rem",
        lineHeight: 1.2
    },
    h4: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: "1.7rem"
    },
    h5: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: "1rem"
    },
    h6: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: ".8rem"
    },
    body2: {
        fontFamily: "'Rubik', sans-serif",
        fontSize: ".8rem",
        fontWeight: "bold",
        letterSpacing: "0.0075em",
        lineHeight: 1.6
    },
    subtitle1: {
        lineHeight: 1.25
    }
}

const overrides = {
    // Style sheet name ⚛️
    MuiPaper: {
        root: {
            backgroundColor: palette.background.level1
        }
    },
    MuiAppBar: {
        colorPrimary: {
            backgroundColor: palette.background.level2,
            color: "white"
        }
    },
    MuiButton: {
        outlinedSecondary: {
            color: palette.secondary.main
        }
    },
    MuiCircularProgress: {
        svg: {
            color: palette.background.level2
        }
    }
}

const transitions = {
    duration: {
        short: 400,
        shorter: 300
    },
    easing: {
        ease: "ease"
    }
}

const themeName = 'PuzzleSubs Dark Theme';

const data = { palette, typography, overrides, transitions, props, themeName }

export default data