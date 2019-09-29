package twitch.hack2019.hackathon2019.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Points {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int PId;
    
    int StreamerId;
    String UserId;
    int Points;

    public Points(int StreamerId, String userId, int points) {
        this.StreamerId = StreamerId;
        UserId = userId;
        Points = points;
    }

    public int getPId() {
        return PId;
    }

    public void setPId(int PId) {
        this.PId = PId;
    }

    public int getStreamerId() {
        return StreamerId;
    }

    public void setStreamerId(int StreamerId) {
        this.StreamerId = StreamerId;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public int getPoints() {
        return Points;
    }

    public void setPoints(int points) {
        Points = points;
    }
}
