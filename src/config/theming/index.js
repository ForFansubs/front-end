import { createMuiTheme } from '@material-ui/core/styles';

import darkTheme from './dark/index'
import lightTheme from './light/index'

export default function getTheme(type) {
    switch (type) {
        case "dark":
            return createMuiTheme({ ...darkTheme })
        case "light":
            return createMuiTheme({ ...lightTheme })
        default:
            return false
    }
}