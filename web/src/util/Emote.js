export default class Emote {
    static async getAllEmotes(channelId) {
        const allEmotes = await Promise.all([
            Emote._getChannelEmotes(channelId),
            Emote._getGlobalEmotes()
        ]);

        return Object.assign({}, allEmotes[0], allEmotes[1])
    }

    static async _getChannelEmotes(channelId) {
        const proxy = "https://cors-anywhere.herokuapp.com/" + `https://api.twitchemotes.com/api/v4/channels/${channelId}`
        const response = fetch(proxy, {
            headers: {
                "X-Requested-With": "origin"
            }
        });
        if (response.ok) {
            const data = await response.json();
            const emotes = data.emotes;
            const map = {};
            emotes.forEach(emote => {
                map[emote.code] = emote;
            })
            return map;
        }
        else {
            return {};
        }
    }

    static async _getGlobalEmotes() {
        const proxy = "https://cors-anywhere.herokuapp.com/" + "https://twitchemotes.com/api_cache/v3/global.json"
        const response = await fetch(proxy, {
            headers: {
                "X-Requested-With": "origin"
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            console.log("failed glob")
            return {};
        }
    }

    static getEmoteImage(emoteId) {
        return `http://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/4.0`;
    }
}