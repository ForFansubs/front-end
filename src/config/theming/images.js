import fourOhFourGif from '../../static/404.gif'

import bluray from '../../static/bluraylogo.png'

// Değişken görselleri tanımla.
var logo = null
var fullLogo = null
var fullLogoDark = null
var HeaderPlaceholder = null
var CoverPlaceholder = null

// Tam logonun dosyasını dene. Varsa içeri al.
try {
    logo = require('../../static/logo.png');
} catch (err) {
    console.error('Tam logo bulunamadı.')
}

// Tam logonun dosyasını dene. Varsa içeri al.
try {
    HeaderPlaceholder = require('../../static/HeaderPlaceholder.png');
} catch (err) {
    console.error('Tam logo bulunamadı.')
}

// Tam logonun dosyasını dene. Varsa içeri al.
try {
    CoverPlaceholder = require('../../static/CoverPlaceholder.png');
} catch (err) {
    console.error('Tam logo bulunamadı.')
}

// GIF logosunun dosyalarını dene. Varsa içeri al, birisi yoksa hata ver ve header'da statik logoyu göster. (/components/header/header.js)
if (process.env.REACT_APP_HEADER_LOGO_TYPE === "gif") {
    try {
        fullLogo = require('../../static/fullLogo.gif');
        fullLogoDark = require('../../static/fullLogo-dark.gif');
    } catch (err) {
        console.warn('GIF logo bulunamadı.')
    }
}
else {
    // Header logosunun dosyalarını dene. Varsa içeri al, birisi yoksa hata ver.
    try {
        fullLogo = require('../../static/fullLogo.png');
        fullLogoDark = require('../../static/fullLogo-dark.png');
    } catch (err) {
        console.error('Header logosu bulunamadı.')
    }
}

export { logo, fullLogo, fullLogoDark, fourOhFourGif, bluray, HeaderPlaceholder, CoverPlaceholder }