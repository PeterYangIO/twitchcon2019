#!/usr/bin/python3


# simpleircbot.py - A simple IRC-bot written in python
#
# Copyright (C) 2015 : Niklas Hempel - http://liq-urt.de
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>

import socket
import re
import emotes
import queue

def Merge(dict1, dict2):
    res = {**dict1, **dict2}
    return res


chan_emotes = emotes.get_chan_emotes("114476906")
glob_emotes = emotes.get_global_emotes()
all_emotes = Merge(chan_emotes, glob_emotes)
print(all_emotes)

HOST = "irc.chat.twitch.tv"
PORT = 6667
CHAN = "#kabajiow"
NICK = "testing"
PASS = ""


def send_message(chan, msg):
    con.send(bytes('PRIVMSG %s :%s\r\n' % (chan, msg), 'UTF-8'))

# --------------------------------------------- Start Helper Functions ---------------------------------------------
def get_sender(msg):
    result = ""
    for char in msg:
        if char == "!":
            break
        if char != ":":
            result += char
    return result


def get_message(msg):
    result = ""
    i = 3
    length = len(msg)
    while i < length:
        result += msg[i] + " "
        i += 1
    result = result.lstrip(':')
    return result


def parse_message(msg):
    if len(msg) >= 1:
        msg = msg.split(' ')
        options = {'!test': command_test,
                   '!asdf': command_asdf}
        if msg[0] in options:
            options[msg[0]]()

# --------------------------------------------- Start Command Functions --------------------------------------------
def command_test():
    send_message(CHAN, 'testing some stuff')


def command_asdf():
    send_message(CHAN, 'asdfster')
# --------------------------------------------- End Command Functions ----------------------------------------------


con = socket.socket()

con.connect((HOST, PORT))

con.send(bytes('PASS %s\r\n' % PASS, 'UTF-8'))
con.send(bytes('NICK %s\r\n' % NICK, 'UTF-8'))
con.send(bytes('JOIN %s\r\n' % CHAN, 'UTF-8'))

data = ""
msg_strm = queue.Queue(maxsize=10)

total_seen = 0
emote_count = {emote : 0 for emote in all_emotes}
i = 0

while True:
    try:
        data = data + con.recv(1024).decode('UTF-8')
        data_split = re.split(r"[~\r\n]+", data)
        data = data_split.pop()

        for line in data_split:
            line = str.rstrip(line)
            line = str.split(line)

            if len(line) >= 1:
                if line[1] == 'PRIVMSG':
                    sender = get_sender(line[0])
                    message = get_message(line)
                    parse_message(message)

                    if msg_strm.qsize() == 10:
                        removed = msg_strm.get()
                        words = removed.split()
                        for word in words:
                            if word in all_emotes:
                                total_seen -= 1
                                emote_count[word] -= 1

                    # add to queue
                    msg_strm.put(message)

                    # count number of occurrences of emotes
                    words = message.split()
                    for word in words:
                        if word in all_emotes:
                            total_seen += 1
                            emote_count[word] += 1
                    i += 1
                    print(total_seen)
                    print(emote_count)
                    print("message number " + str(i))

                    print(sender + ": " + message)

    except socket.error:
        print("Socket died")
