//Temayı oluştururken MUI Theme objesi değerlerini kullanarak değişiklikler yapıyoruz. Aşağıda custom olarak
//değiştirdiğimiz değerler yer alıyor. Custom olarak değişmeyen değerler, index.js'te theme objesi oluşturulurken
//otomatik olarak oluşturuluyor. Eğer bu değerlerden farklı değerler kullanmak isterseniz ./extra.js içerisinde,
//anlatıldığı şekilde değişiklik yapabilirsiniz.

import custom from './extra'
import merge from 'lodash-es/merge'

const theme = {
    palette: {
        primary: {
            main: '#90caf9'
        },
        secondary: {
            main: 'rgb(255,127,80)'
        },
        background: {
            default: "#FFFFFF",
            level1: "#FAFAFA",
            paper: "#ECECEC"
        },
        contrastThreshold: 3,
        type: "light"
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#ECECEC'
            }
        }
    },
    themeName: 'ForFansubs Light Theme'
}

merge(theme, custom)

export default theme