package twitch.hack2019.hackathon2019.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import twitch.hack2019.hackathon2019.models.StockValue;
import twitch.hack2019.hackathon2019.models.StocksPort;

import javax.transaction.Transactional;
import java.util.List;

public interface StocksPortRepo extends JpaRepository<StocksPort, Integer> {

    @Query(value = "SELECT * FROM stocks_Port WHERE streamer= ?1 AND user = ?2", nativeQuery = true)
    List<StocksPort> getPorfolio(String streamer, String user);

    @Query(value ="SELECT numberofstocks FROM stocks_Port WHERE streamer =?1 AND user = ?2 AND emote=?3",nativeQuery = true)
    int getStockAmount(String streamer, String user, String emote);

    @Transactional
    @Modifying
    @Query(value="UPDATE stocks_Port SET numberofstocks=?4 WHERE streamer = ?1 AND user =?2 AND emote=?3",nativeQuery = true)
    void updateStockAmount(String streamer, String user, String emote, int amount);

}
