package twitch.hack2019.hackathon2019.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import twitch.hack2019.hackathon2019.models.Streamer;


public interface StreamerRepo extends JpaRepository<Streamer, Integer> {

    


}
