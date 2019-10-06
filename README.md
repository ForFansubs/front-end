# ForFansubs ReactApp - Front-end Repo
<p align="center">
<a href="https://github.com/ayberktandogan/ForFansubs-ReactApp---Front-end/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/ayberktandogan/ForFansubs-ReactApp---Front-end?style=for-the-badge"> <img alt="GitHub release" src="https://img.shields.io/github/release-pre/ayberktandogan/ForFansubs-ReactApp---Front-end?style=for-the-badge"> </a> <img alt="GitHub release" src="https://img.shields.io/github/release/ayberktandogan/ForFansubs-ReactApp---Front-end?style=for-the-badge"> </a>
<br/>
<img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/ayberktandogan/ForFansubs-ReactApp---Front-end/react?style=for-the-badge">
<img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/ayberktandogan/ForFansubs-ReactApp---Front-end/@material-ui/core?style=for-the-badge"> 
<img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/ayberktandogan/ForFansubs-ReactApp---Front-end/styled-components?style=for-the-badge">
<br/>
<img src="https://repository-images.githubusercontent.com/202852145/e4e20a00-c1ae-11e9-9378-f678ddafa890" alt="cover-image" width="1000px"/>
</p>


[React](https://github.com/facebook/react) ve [ReactN](https://github.com/CharlesStover/reactn) paketleri başta olmak üzere [Material-UI](https://github.com/mui-org/material-ui) ve [styled-components](https://github.com/styled-components/styled-components) kullanarak hazırlandı. (v1'deki hataları olabildiğince tekrarlamamaya ve özellik eklenebilir bir kod çıkarmaya çalıştım, umarım oldu.)

## Yükleme Talimatları

Klasik Create React App scriptleri.

```
npm i
```

sonrasında da 

```
npm start
npm build
```

yazarak çalıştırabilirsiniz. Ancak startlamadan ya da buildlemeden önce aşağıda gereken dosyaları oluşturun.

### Gerekenler

Öncelikle **./.env**, **/public/index.html**, **/src/static/fullLogo.png** ve **/src/static/logo.png** dosyalarını oluşturmanız gerekiyor. Örnekleri aşağıdaki gibidir.

#### 1. ./.env
```env
REACT_APP_SITENAME="" // Sitenin ismi. (Example)
REACT_APP_SITEURL="" // Sitenin isim alanı. (www.example.com gibi)

REACT_APP_DISQUS_SHORTNAME="" // Disqus kısa ismini sağlarsanız anime, manga ve bölüm sayfalarında yorum kısmı gösterir.
REACT_APP_DEV_API_URL="" // Dev ortamında istekleri yapmak için kullanacağı alan adı. (http://localhost:5000 gibi)
REACT_APP_GA_USER_ID="" // Google Analytics kullanıcı id'niz.
REACT_APP_FACEBOOK_LINK="" // Link sağlarsanız footer'da tıklanabilir bir Facebook logosu gösterir.
REACT_APP_DISCORD_LINK="" // Link sağlarsanız footer'da tıklanabilir bir Discord logosu gösterir.

REACT_APP_SSS_PAGE_TEXT="" // Markdown text sağlarsanız SSS sayfası oluşturur, menüde gösterir.
``` 

#### 2. /public/index.html 
```html
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Site name</title>
  </head>
  <body>
    <noscript>
      <style>
        p {
          color: red;
          font-family: 'Roboto', sans-serif;
          font-weight: bold;
          font-size: 36px;
          width: 100vw;
          height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        a {
          margin-left: 10px;
        }
      </style>
      <p>Bu sayfayı görüntülemek için JavaScript'e ihtiyacınız var. Daha iyi bir browser indirmek için <a href="http://outdatedbrowser.com/en" target="_blank">buraya tıklayın.</a></p>
    </noscript>
    <div id="app-mount"></div>
  </body>
</html>
```
meta tagları harici genel hatları yukardaki gibi olmalıdır. En önemli nokta id="app-mount"tur. Bu div, programın mountlandığı divdir. Eğer id'yi değiştirmek isterseniz /src/index.js dosyasında aşağıdaki "app-mount" değerini de değiştirmelisiniz.
```jsx
ReactDOM.render(<App />, document.getElementById('app-mount'))
```

#### 3. /src/static/fullLogo.png (--- x 150)
<img src="https://i.ibb.co/2kHhkjf/fullLogo.png" alt="fullLogo" width="200px"/>

#### 4. /src/static/logo.png (500 x 500)
<img src="https://i.ibb.co/gy1DrT9/logo.png" alt="logo" width="100px" height="100px"/>