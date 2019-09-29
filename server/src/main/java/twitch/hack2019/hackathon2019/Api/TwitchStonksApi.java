package twitch.hack2019.hackathon2019.Api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import twitch.hack2019.hackathon2019.models.Streamer;
import twitch.hack2019.hackathon2019.repo.StreamerRepo;

@RestController
@CrossOrigin(origins = "*")
public class TwitchStonksApi {

    @Autowired
    private StreamerRepo sRepo;

    @RequestMapping("/")
    public String checkconn()
    {
        return "Connected";
    }

    @PostMapping("/addstreamer")
    public Streamer addStreamer(@RequestParam String body)
    {
        return sRepo.save(new Streamer(body));
    }

}
