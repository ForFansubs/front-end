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
            paper: "#333333"
        },
        contrastThreshold: 3,
        type: "dark"
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
        }
    },
    themeName: 'ForFansubs Dark Theme'
}

merge(theme, custom)

export default theme