function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    //eslint-disable-next-line
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function EpisodeLinkOverride(link) {
    let payload = {
        link: "",
        func: null
    }

    if (link.match('tune.pk/player/embed_')) {
        const vid_id = getParameterByName('vid', link)

        payload.link = ""

        payload.func = (fallback_div) => {
            var script = document.createElement("script");
            var div = document.createElement("div")

            script.src = `https://tune.pk/js/open/embed.js?vid=${vid_id}`;
            script.async = true;

            div.className = "open-stream-player"
            div.id = `open-stream-player-${vid_id}`

            fallback_div.style.display = "block"

            fallback_div.appendChild(div)
            fallback_div.appendChild(script)
        }
    }

    else if (link.match('streamango')) {
        payload.link = link.replace('streamango', 'streamcherry')
    }

    else if (link.match('openload.co')) {
        payload.link = link.replace('openload.co', 'oload.life')
    }

    else {
        payload.link = link
    }

    return payload
}