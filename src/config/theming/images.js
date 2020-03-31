import fourOhFourGif from '../../static/404.gif'

import bluray from '../../static/bluraylogo.png'
import HeaderPlaceholder from '../../static/HeaderPlaceholder.png'
import CoverPlaceholder from '../../static/CoverPlaceholder.png'

// Değişken görselleri tanımla.
var logo = null
var fullLogo = null
var fullLogoDark = null
var fullLogoGif = null
var fullLogoDarkGif = null

// Tam logonun dosyasını dene. Varsa içeri al.
try {
    logo = require('../../static/logo.png');
} catch (err) {
    console.error('Tam logo bulunamadı.')
}

// Header logosunun dosyalarını dene. Varsa içeri al, birisi yoksa hata ver.
try {
    fullLogo = require('../../static/fullLogo.png');
    fullLogoDark = require('../../static/fullLogo-dark.png');
} catch (err) {
    console.error('Header logosu bulunamadı.')
}

// GIF logosunun dosyalarını dene. Varsa içeri al, birisi yoksa hata ver ve header'da statik logoyu göster. (/components/header/header.js)
try {
    fullLogoGif = require('../../static/fullLogo.gif');
    fullLogoDarkGif = require('../../static/fullLogo-dark.gif');
} catch (err) {
    console.warn('GIF logo bulunamadı.')
}

export { logo, fullLogo, fullLogoGif, fullLogoDark, fullLogoDarkGif, fourOhFourGif, bluray, HeaderPlaceholder, CoverPlaceholder }