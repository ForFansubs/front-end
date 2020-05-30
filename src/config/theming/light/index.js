//Temayı oluştururken MUI Theme objesi değerlerini kullanarak değişiklikler yapıyoruz. Aşağıda custom olarak
//değiştirdiğimiz değerler yer alıyor. Custom olarak değişmeyen değerler, index.js'te theme objesi oluşturulurken
//otomatik olarak oluşturuluyor. Eğer bu değerlerden farklı değerler kullanmak isterseniz ./extra.js içerisinde,
//anlatıldığı şekilde değişiklik yapabilirsiniz.

import custom from './extra'
import merge from 'lodash-es/merge'

const theme = {
    palette: {
        primary: {
            main: process.env.REACT_APP_LIGHT_THEME_PRIMARY_COLOR || '#90caf9'
        },
        secondary: {
            main: process.env.REACT_APP_LIGHT_THEME_SECONDARY_COLOR || 'rgb(255,127,80)'
        },
        background: {
            default: "#FFFFFF",
            level1: "#ECECEC",
            paper: "#F6F6F6"
        },
        contrastThreshold: 3,
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: 'rgb(236,236,236)'
            }
        }
    },
    themeName: 'ForFansubs Light Theme'
}

merge(theme, custom)

export default theme