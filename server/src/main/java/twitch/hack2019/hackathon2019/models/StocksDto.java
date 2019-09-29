package twitch.hack2019.hackathon2019.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class StocksDto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int StockId;

    int UserId;
    String Emote;
    int NumberofStocks;

    public StocksDto(int userId, String emote, int numberofStocks) {
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

    public int getUserId() {
        return UserId;
    }

    public void setUserId(int userId) {
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
