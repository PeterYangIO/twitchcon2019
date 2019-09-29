# curl -H 'Client-ID: <your id>' -X GET https://api.twitch.tv/helix/users\?login\=<channel name>
# https://dev.twitch.tv/docs/api/reference/#get-users

# https://api.twitchemotes.com/api/v4/channels/<channel id>
# a_seagull: https://api.twitchemotes.com/api/v4/channels/19070311
# https://twitchemotes.com/apidocs

# global
# https://twitchemotes.com/api_cache/v3/global.json


# THIS IS THE ONE YOU NEED TO GET IMAGES FROM EMOTE ID
# http://static-cdn.jtvnw.net/emoticons/v1/EMOTE_ID/SIZE (size is 1.0, 2.0, 3.0, 4.0)

import requests
import json


def get_chan_emotes(channel_id):
    r = requests.get(f"https://api.twitchemotes.com/api/v4/channels/{channel_id}")
    j = json.loads(r.text)
    chan_emotes = {emote["code"] : emote["id"] for emote in j["emotes"]}
    return chan_emotes


def get_global_emotes():
    r = requests.get("https://twitchemotes.com/api_cache/v3/global.json")
    j = json.loads(r.text)
    glob_emotes = {j[emote]["code"] : j[emote]["id"] for emote in j}
    return glob_emotes

