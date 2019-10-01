package twitch.hack2019.hackathon2019.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import twitch.hack2019.hackathon2019.models.StockValue;

import javax.transaction.Transactional;
import java.util.List;

public interface StockValueRepo extends JpaRepository<StockValue, String> {

    @Query(value = "SELECT value_rate FROM stock_Value WHERE streamer =?1 AND emote = ?2",nativeQuery = true)
    double getEmoteValue(String streamer, String emote);

//    @Query(value ="SELECT * FROM stock_Value WHERE streamer=?1", nativeQuery = true)
    @Query(value = "SELECT * FROM stock_Value", nativeQuery = true)
    List<StockValue> getAllValues(String streamer);

    @Transactional
    @Modifying
    @Query(value = "UPDATE stock_Value SET value_rate=?3 WHERE streamer=?1 AND emote=?2",nativeQuery = true)
    void updateEmoteValue(String streamer, String emote, double value);

    @Query(value = "SELECT * FROM stock_Value WHERE streamer = ?1 AND emote=?2", nativeQuery = true)
    List<StockValue> checkexists(String streamer, String emote);
}
