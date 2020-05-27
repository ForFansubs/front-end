// Bu dosyayı drawerınıza herhangi bir link eklemek için kullanabilirsiniz.
// Array içerisine koyacağınız objenin 
// {
//  icon: "",           // Yazı solundaki ikon.
//  title: "",          // Drawer açıkken gözükecek text.
//  short_title: "",    // Drawer kapalıyken ikon altında gözükecek text.
//  link: ""            // Sekmenin göstereceği yol. 
// } 
// biçiminde olması gerekiyor.
//
// Not: icon kısmında FontAwesomeIcon componentı kullanabilirsiniz. Örn:
//
//
//  {
//      icon: <FontAwesomeIcon icon={faDiscord} size="2x" />,
//      title: "Discord sunucumuza katılın!",
//      short_title: "Discord"
//      link: "https://discord.gg/davetkodu"
//  }

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default [
    {
        icon: <FontAwesomeIcon icon={faDiscord} size="2x" />,
        title: "Discord sunucumuza katılın!",
        short_title: "Discord",
        link: "https://discord.gg/davetkodu"
    }
]