package twitch.hack2019.hackathon2019.models;

import javax.persistence.*;

@Entity
public class Stocks {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int StockId;

    String StreamerId;

    String UserId;
    String Emote;
    int NumberofStocks;

    public Stocks(String streamerId, String userId, String emote, int numberofStocks) {
        StreamerId = streamerId;
        UserId = userId;
        Emote = emote;
        NumberofStocks = numberofStocks;
    }

    public int getStockId() {
        return StockId;
    }

    public void setStockId(int stockId) {
        StockId = stockId;
    }

    public String getStreamerId() {
        return StreamerId;
    }

    public void setStreamerId(String streamerId) {
        StreamerId = streamerId;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public String getEmote() {
        return Emote;
    }

    public void setEmote(String emote) {
        Emote = emote;
    }

    public int getNumberofStocks() {
        return NumberofStocks;
    }

    public void setNumberofStocks(int numberofStocks) {
        NumberofStocks = numberofStocks;
    }
}
