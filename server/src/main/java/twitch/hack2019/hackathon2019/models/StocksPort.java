package twitch.hack2019.hackathon2019.models;

import javax.persistence.*;

@Entity
public class StocksPort {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int StockId;

    String Streamer;
    String User;
    String Emote;
    int numberofstocks;

    public StocksPort(){}

    public StocksPort(String streamer, String user, String emote, int numberofstocks) {
        Streamer = streamer;
        User = user;
        Emote = emote;
        this.numberofstocks = numberofstocks;
    }

    public int getStockId() {
        return StockId;
    }

    public void setStockId(int stockId) {
        StockId = stockId;
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

    public String getEmote() {
        return Emote;
    }

    public void setEmote(String emote) {
        Emote = emote;
    }

    public int getnumberofstocks() {
        return numberofstocks;
    }

    public void setnumberofstocks(int numberofstocks) {
        this.numberofstocks = numberofstocks;
    }
}
