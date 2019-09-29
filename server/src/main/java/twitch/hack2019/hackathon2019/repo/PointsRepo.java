package twitch.hack2019.hackathon2019.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import twitch.hack2019.hackathon2019.models.Point;

import javax.transaction.Transactional;
import java.util.List;

public interface PointsRepo  extends JpaRepository<Point, Integer> {

    @Query(value = "SELECT points FROM point WHERE streamer=?1 AND user=?2", nativeQuery = true)
    Integer getUserPoints(String streamer, String user);

    @Transactional
    @Modifying
    @Query(value = "UPDATE point SET Points = ?3 WHERE streamer = ?1 AND user = ?2", nativeQuery = true)
    void updatePoint(String streamer, String user, int points);
}
