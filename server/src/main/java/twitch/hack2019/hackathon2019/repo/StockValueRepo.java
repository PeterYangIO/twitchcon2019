package twitch.hack2019.hackathon2019.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import twitch.hack2019.hackathon2019.models.StockValue;

import javax.transaction.Transactional;
import java.util.List;

public interface StockValueRepo extends JpaRepository<StockValue, Integer> {

    @Query(value = "SELECT value_rate FROM stock_Value WHERE streamer =?1 AND emote = ?2",nativeQuery = true)
    double getEmoteValue(String streamer, String emote);

    @Query(value ="SELECT * FROM stock_Value WHERE streamer=?1", nativeQuery = true)
    List<StockValue> getAllValues(String streamer);

    @Transactional
    @Modifying
    @Query(value = "UPDATE stock_Value SET value_rate=?4 WHERE streamer = ?1 AND user = ?2 AND emote=?3",nativeQuery = true)
    void updateEmoteValue(String streamer, String user, String emote, double value);
}
