package twitch.hack2019.hackathon2019.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Streamer {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    int StreamerId;

    String Streamer;

    public Streamer(String streamer) {
        Streamer = streamer;
    }

    public int getStreamerId() {
        return StreamerId;
    }

    public void setStreamerId(int streamerId) {
        StreamerId = streamerId;
    }

    public String getStreamer() {
        return Streamer;
    }

    public void setStreamer(String streamer) {
        Streamer = streamer;
    }
}
