package twitch.hack2019.hackathon2019.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import twitch.hack2019.hackathon2019.models.StockValue;

import java.util.List;

public interface StockValueRepo extends JpaRepository<StockValue, Integer> {

    @Query(value = "SELECT value_rate FROM stock_Value WHERE streamer =?1 AND emote = ?2",nativeQuery = true)
    double getEmoteValue(String streamer, String emote);

}
