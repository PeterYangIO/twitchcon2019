package twitch.hack2019.hackathon2019.Api;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import twitch.hack2019.hackathon2019.models.StreamerDto;
import twitch.hack2019.hackathon2019.repo.StreamerRepo;

@Controller
@CrossOrigin(origins = "*")
public class TwitchStonksApi {

    private StreamerRepo sRepo;


    @PostMapping("/addstreamer")
    public StreamerDto addStreamer(@RequestBody String body)
    {
        return sRepo.save(new StreamerDto(body));
    }

}
