package twitch.hack2019.hackathon2019.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Point {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int PId;
    
    String Streamer;
    String User;
    int Points;

    public Point(){}

    public Point(String streamer, String user, int points) {
        Streamer = streamer;
        User = user;
        Points = points;
    }

    public int getPId() {
        return PId;
    }

    public void setPId(int PId) {
        this.PId = PId;
    }

    public String getStreamer() {
        return Streamer;
    }

    public void setStreamer(String streamer) {
        Streamer = streamer;
    }

    public String getUser() {
        return User;
    }

    public void setUser(String user) {
        User = user;
    }

    public int getPoints() {
        return Points;
    }

    public void setPoints(int points) {
        Points = points;
    }
}
