import emotes
import queue
import re
import socket

HOST = "irc.chat.twitch.tv"
PORT = 6667
CHAN = "#kabajiow"
NICK = "testing"
PASS = ""

class IRCReader:
    def __init__(self, channel_id, queue_size=100):
        all_emotes = emotes.get_all_emotes(channel_id)
        self.emote_count = {emote: 0 for emote in all_emotes}
        self.total_seen = 0
        self.queue_size = queue_size
    
    def run(self):
        con = socket.socket()
        con.connect((HOST, PORT))
        con.send(bytes('PASS %s\r\n' % PASS, 'UTF-8'))
        con.send(bytes('NICK %s\r\n' % NICK, 'UTF-8'))
        con.send(bytes('JOIN %s\r\n' % CHAN, 'UTF-8'))

        data = ""
        msg_strm = queue.Queue(maxsize=self.queue_size)

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
                                        self.total_seen -= 1
                                        self.emote_count[word] -= 1

                            # add to queue
                            msg_strm.put(message)

                            # count number of occurrences of emotes
                            words = message.split()
                            for word in words:
                                if word in all_emotes:
                                    self.total_seen += 1
                                    self.emote_count[word] += 1
                            i += 1
                            print(self.total_seen)
                            print(self.emote_count)
                            print("message number " + str(i))

                            print(sender + ": " + message)

            except socket.error:
                print("Socket died")


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
