//Temayı oluştururken MUI Theme objesi değerlerini kullanarak değişiklikler yapıyoruz. Aşağıda custom olarak
//değiştirdiğimiz değerler yer alıyor. Custom olarak değişmeyen değerler, index.js'te theme objesi oluşturulurken
//otomatik olarak oluşturuluyor. Eğer bu değerlerden farklı değerler kullanmak isterseniz ./extra.js içerisinde,
//anlatıldığı şekilde değişiklik yapabilirsiniz.

import custom from './extra'
import merge from 'lodash-es/merge'

const theme = {
    palette: {
        primary: { 
            main: process.env.REACT_APP_DARK_THEME_PRIMARY_COLOR || '#212121'
        },
        secondary: { 
            main: process.env.REACT_APP_DARK_THEME_SECONDARY_COLOR || 'rgb(255,127,80)'
        },
        background: {
            default: "#121212",
            level1: "#212121",
            level2: "#333",
            paper: "#424242"
        },
        contrastThreshold: 3,
        type: "dark"
    },
    props: {
        MuiTypography: {
            variantMapping: {
                body2: 'span',
            },
        },
    },
    typography: {
        fontFamily: `'Rubik', sans-serif`,
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
            lineHeight: 1.25
        },
        subtitle2: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: "0.775rem"
        }
    },
    overrides: {
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#FFF',
                }
            },
            focused: {}
        },
        MuiOutlinedInput: {
            root: {
                '&$focused $notchedOutline': {
                    color: '#FFF',
                    borderColor: '#FFF'
                }
            },
            focused: {}
        },
        defaultMargin: "80px 40px 24px",
        defaultMarginMobile: "80px 24px 24px",
        defaultMarginOverride: "-16px -40px -24px",
        defaultMarginMobileOverride: "-16px -24px -24px",
    },
    transitions: {
        duration: {
            short: 400,
            shorter: 300
        },
        easing: {
            ease: "ease"
        }
    },
    themeName: 'ForFansubs Dark Theme'
}

merge(theme, custom)

export default theme