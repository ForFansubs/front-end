import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { enUS, trTR } from '@material-ui/core/locale';
import i18next from '../i18n'
import merge from 'lodash-es/merge'

import darkTheme from './dark/index'
import lightTheme from './light/index'

const generalBorderRadius = 2

const languageMap = {
    "en": enUS,
    "tr": trTR
}

const general = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1600,
        }
    },
    props: {
        MuiTypography: {
            variantMapping: {
                body2: 'span',
            },
        },
    },
    typography: {
        fontFamily: `'Roboto', sans-serif`,
        h1: {

            fontWeight: "bold",
            fontSize: "4.8rem",
            lineHeight: 1.2
        },
        h2: {
            fontWeight: "bold",
            fontSize: "3rem",
            lineHeight: 1.2
        },
        h3: {
            fontWeight: "bold",
            fontSize: "2.4rem",
            lineHeight: 1.2
        },
        h4: {
            fontWeight: "bold",
            fontSize: "1.7rem"
        },
        h5: {
            fontWeight: "bold",
            fontSize: "1rem"
        },
        h6: {
            fontWeight: "bold",
            fontSize: ".8rem"
        },
        body1: {
            fontFamily: "'Source Sans Pro', sans-serif"
        },
        body2: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: ".8rem",
            fontWeight: "bold",
            letterSpacing: "0.0075em",
            lineHeight: 1.6
        },
        subtitle1: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.25,
            borderRadius: generalBorderRadius,
        },
        subtitle2: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: "0.675rem",
            borderRadius: generalBorderRadius,
        }
    },
    overrides: {
        defaultMargin: "96px 56px 24px",
        defaultMarginMobile: "80px 12px 24px",
        defaultMarginOverride: "-32px -56px -24px",
        defaultMarginMobileOverride: "-24px -12px -24px",
        defaultBorderRadius: 4,
        MuiToolbar: {
            gutters: {
                ['@media (min-width:600px)']: {
                    paddingLeft: 29
                }
            }
        }

    },
    transitions: {
        duration: {
            short: 400,
            shorter: 300
        },
        easing: {
            ease: "ease"
        }
    }
}

export default function getTheme(type) {
    switch (type) {
        case type: {
            const theme = merge(general, type === "dark" ? darkTheme : lightTheme)
            return responsiveFontSizes(createMuiTheme(theme, languageMap[i18next.language]))
        }
        default:
            return false
    }
}