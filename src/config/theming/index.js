import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
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
        lineHeight: 1.25
    },
    h2: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: "3rem"
    },
    h3: {
        fontFamily: `'Rubik', sans-serif`,
        fontWeight: "bold",
        fontSize: "2.4rem"
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

export default createMuiTheme({ palette, typography, transitions, props, themeName });