module.exports = (animename, episodenumber, specialtype) => {
    if (specialtype && specialtype !== "toplu") {
        return {
            title: `${animename} ${specialtype.toUpperCase()} ${episodenumber}`,
            slug: `${specialtype}${episodenumber}`
        }
    }
    else return {
        title: `${animename} ${episodenumber}. Bölüm`,
        slug: `bolum${episodenumber}`
    }
}