package twitch.hack2019.hackathon2019.models;

import javax.persistence.*;

@Entity
public class StockValue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int ValueId;

    String Streamer;

    String Emote;
    double ValueRate;

    public StockValue(){}

    public StockValue(String streamerId, String emote, double valueRate) {
        Streamer = streamerId;
        Emote = emote;
        ValueRate = valueRate;
    }

    public int getValueId() {
        return ValueId;
    }

    public void setValueId(int valueId) {
        ValueId = valueId;
    }

    public String getStreamerId() {
        return Streamer;
    }

    public void setStreamerId(String streamerId) {
        Streamer = streamerId;
    }

    public String getEmote() {
        return Emote;
    }

    public void setEmote(String emote) {
        Emote = emote;
    }

    public double getValueRate() {
        return ValueRate;
    }

    public void setValueRate(double valueRate) {
        ValueRate = valueRate;
    }
}