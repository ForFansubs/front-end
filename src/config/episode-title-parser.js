import i18next from './i18n'

export default function EpisodeTitleParser(animename, episodenumber, specialtype) {
    if (specialtype && specialtype === "toplu") {
        return {
            title: episodenumber === "0"
                ?
                `${i18next.t('common:episode.episode_title_batch')}`
                :
                `${i18next.t('common:episode.episode_title_batch_episode_number', { episode_number: episodenumber })}`
        }
    }
    else if (specialtype && specialtype !== "toplu") {
        return {
            title: `${specialtype.toUpperCase()} ${episodenumber}`, // `${specialtype.toUpperCase()} ${episodenumber}`
            slug: `${specialtype}${episodenumber}`,
            data: `${specialtype}-${episodenumber}`
        }
    }
    else return {
        title: `${i18next.t('common:episode.episode_title', { episode_number: episodenumber })}`, // `${episodenumber}. Bölüm`
        slug: `bolum${episodenumber}`,
        data: `bolum-${episodenumber}`
    }
}