package twitch.hack2019.hackathon2019.Api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import twitch.hack2019.hackathon2019.models.Stocks;
import twitch.hack2019.hackathon2019.repo.StocksRepo;

@RestController
@CrossOrigin(origins = "*")
public class TwitchStonksApi {

    @Autowired
    private StocksRepo stockRepo;

    @RequestMapping("/")
    public String checkconn()
    {
        return "Connected";
    }

    @PostMapping("/addstock")
    public Stocks addStock(@RequestParam String emote, @RequestParam int amount, @RequestParam String userId, @RequestParam String streamerId)
    {
        return stockRepo.save(new Stocks(streamerId, userId, emote, amount));
    }

}
