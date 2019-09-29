package twitch.hack2019.hackathon2019.repo;

import org.springframework.data.repository.CrudRepository;
import twitch.hack2019.hackathon2019.models.StreamerDto;

public interface StreamerRepo extends CrudRepository<StreamerDto, Integer> {

    


}
