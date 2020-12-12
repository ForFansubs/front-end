import fourOhFourGif from '../../static/404.gif'
import bluray from '../../static/bluraylogo.png'
import cursorPrevious from '../../static/cursor-previous.png'
import cursorNext from '../../static/cursor-next.png'
import LoginRegister from '../../static/LoginRegister.png'

// Değişken görselleri tanımla.
var logo = null
var fullLogo = null
var fullLogoDark = null
var HeaderPlaceholder = null
var CoverPlaceholder = null

// Tam logonun dosyasını dene. Varsa içeri al.
try {
    logo = require('../../static/logo.png').default;
} catch (err) {
    console.error('Tam logo bulunamadı.')
}

// Tam logonun dosyasını dene. Varsa içeri al.
try {
    HeaderPlaceholder = require('../../static/HeaderPlaceholder.png').default;
} catch (err) {
    console.error('Tam logo bulunamadı.')
}

// Tam logonun dosyasını dene. Varsa içeri al.
try {
    CoverPlaceholder = require('../../static/CoverPlaceholder.png').default;
} catch (err) {
    console.error('Tam logo bulunamadı.')
}

// GIF logosunun dosyalarını dene. Varsa içeri al, birisi yoksa hata ver ve header'da statik logoyu göster. (/components/header/header.js)
if (process.env.REACT_APP_HEADER_LOGO_TYPE === "gif") {
    try {
        fullLogo = require('../../static/fullLogo.gif').default;
        fullLogoDark = require('../../static/fullLogo-dark.gif').default;
    } catch (err) {
        console.warn('GIF logo bulunamadı.')
    }
}
else {
    // Header logosunun dosyalarını dene. Varsa içeri al, birisi yoksa hata ver.
    try {
        fullLogo = require('../../static/fullLogo.png').default;
        fullLogoDark = require('../../static/fullLogo-dark.png').default;
    } catch (err) {
        console.error('Header logosu bulunamadı.')
    }
}

export { fourOhFourGif, bluray, cursorPrevious, cursorNext, LoginRegister, logo, fullLogo, fullLogoDark, HeaderPlaceholder, CoverPlaceholder }