//Temayı oluştururken MUI Theme objesi değerlerini kullanarak değişiklikler yapıyoruz. Aşağıda custom olarak
//değiştirdiğimiz değerler yer alıyor. Custom olarak değişmeyen değerler, index.js'te theme objesi oluşturulurken
//otomatik olarak oluşturuluyor. Eğer bu değerlerden farklı değerler kullanmak isterseniz ./extra.js içerisinde,
//anlatıldığı şekilde değişiklik yapabilirsiniz.

import custom from './extra'
import merge from 'lodash-es/merge'

const theme = {
    palette: {
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
    },
    props: {
        MuiTypography: {
            variantMapping: {
                body2: 'span',
            },
        },
    },
    typography: {
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
    },
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: '#212121'
            }
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#333',
                color: "white"
            }
        },
        MuiButton: {
            outlinedSecondary: {
                color: 'rgb(255,127,80)'
            }
        },
        MuiCircularProgress: {
            svg: {
                color: '#333'
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
    },
    themeName: 'ForFansubs Dark Theme'
}

merge(theme, custom)

export default theme