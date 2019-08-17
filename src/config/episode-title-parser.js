module.exports = (animename, episodenumber, specialtype) => {
    if (specialtype && specialtype !== "toplu") {
        return {
            title: `${animename} ${specialtype.toUpperCase()} ${episodenumber}`,
            slug: `${specialtype}${episodenumber}`
        }
    }
    else return {
        title: `${episodenumber}. Bölüm / ${animename}`,
        slug: `bolum${episodenumber}`
    }
}