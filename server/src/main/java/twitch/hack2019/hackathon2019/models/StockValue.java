package twitch.hack2019.hackathon2019.models;

import javax.persistence.*;

@Entity
public class StockValue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int ValueId;

    String StreamerId;

    String Emote;
    double ValueRate;

    public StockValue(String streamerId, String emote, double valueRate) {
        StreamerId = streamerId;
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
        return StreamerId;
    }

    public void setStreamerId(String streamerId) {
        StreamerId = streamerId;
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