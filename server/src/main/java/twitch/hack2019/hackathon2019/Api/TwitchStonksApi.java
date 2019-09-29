package twitch.hack2019.hackathon2019.Api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import twitch.hack2019.hackathon2019.models.Point;
import twitch.hack2019.hackathon2019.models.StockValue;
import twitch.hack2019.hackathon2019.models.StocksPort;
import twitch.hack2019.hackathon2019.repo.PointsRepo;
import twitch.hack2019.hackathon2019.repo.StockValueRepo;
import twitch.hack2019.hackathon2019.repo.StocksPortRepo;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class TwitchStonksApi {

    @Autowired
    private StocksPortRepo sprepo;
    @Autowired
    private StockValueRepo svrepo;
    @Autowired
    private PointsRepo prepo;
    private String streamer;
    private String user;
    private int points;

    @RequestMapping("/")
    public String checkconn()
    {
        return "Connected";
    }

    @RequestMapping("/generate")
    public void generate()
    {
        String streamerId = "269532505";
        String userid = "269532505";

        sprepo.deleteAll();
        svrepo.deleteAll();
        prepo.deleteAll();

        sprepo.save(new StocksPort(streamerId, userid, "LUL", 10));
        sprepo.save(new StocksPort(streamerId, userid, "Kappa", 20));
        sprepo.save(new StocksPort(streamerId, userid, "TTows", 30));
        sprepo.save(new StocksPort(streamerId, userid, "VoHiYo", 15));
        sprepo.save(new StocksPort(streamerId, userid, "BlessRNG", 45));

        svrepo.save(new StockValue(streamerId, "LUL", 20));
        svrepo.save(new StockValue(streamerId, "Kappa", 10));
        svrepo.save(new StockValue(streamerId, "TTows", 30));
        svrepo.save(new StockValue(streamerId, "VoHiYo", 5));
        svrepo.save(new StockValue(streamerId, "BlessRNG", 35));

        prepo.save(new Point(streamerId, userid, 1000));
    }

    @PostMapping("/addstock")
    public StocksPort addStock(@RequestParam String emote, @RequestParam int amount, @RequestParam String userId, @RequestParam String streamerId)
    {
        return sprepo.save(new StocksPort(streamerId, userId, emote, amount));
    }

    @GetMapping("/getportfolio")
    public List<StocksPort> getPortfolio (@RequestParam String streamer, @RequestParam String user)
    {
        return sprepo.getPorfolio(streamer, user);
    }

    @GetMapping("/getstockprices")
    public List<StockValue> geteValues(@RequestParam String streamer)
    {
        return svrepo.getAllValues(streamer);
    }

    @GetMapping("/getpoints")
    public int getPoints(@RequestParam String streamer, @RequestParam String user)
    {
        if(prepo.getUserPoints(streamer, user) == null)
        {
            prepo.save(new Point(streamer, user, 10000));
            return 10000;
        }
        else
        {
            return prepo.getUserPoints(streamer,user);
        }
    }

    @GetMapping("/getemotevalue")
    public double getEmoteValue(@RequestParam String streamer, @RequestParam String emote)
    {
        return svrepo.getEmoteValue(streamer, emote);
    }

    @PostMapping("/updatepoints")
    public void updateUserPoints(@RequestParam String streamer, @RequestParam String user, @RequestParam int points)
    {
        prepo.updatePoint(streamer, user, points);
    }

    @GetMapping("/getstock")
    public int getStockamount(@RequestParam String streamer, @RequestParam String user, @RequestParam String emote)
    {
        return sprepo.getStockAmount(streamer, user, emote);
    }

    @PostMapping("/removestock")
    public boolean removestock(@RequestParam String streamer, @RequestParam String user, @RequestParam String emote, @RequestParam int amount)
    {
        if(getStockamount(streamer, user, emote) < amount)
        {
            return false;
        }
        else
        {
            sprepo.updateStockAmount(streamer, user, emote, getStockamount(streamer,user,emote) - amount);
            return true;
        }
    }

    @PostMapping("/sellstocks")
    public ResponseEntity<String> sellStocks(@RequestParam String streamer, @RequestParam String user, @RequestParam int amount, @RequestParam String emote)
    {
        HttpHeaders headers = new HttpHeaders();
        if(!removestock(streamer, user, emote, amount))
        {
            return new ResponseEntity<>("Cannot Sell Stonks", headers, HttpStatus.BAD_REQUEST);
        }

        int points = getPoints(streamer, user);
        double value = getEmoteValue(streamer, emote);

        points = points + (amount*(int)value*100);

        updateUserPoints(streamer, user, points);
        return new ResponseEntity<>("Success",headers,HttpStatus.OK);
    }

    @PostMapping("/buystocks")
    public ResponseEntity<String> buyStocks(@RequestParam String streamer, @RequestParam String user, @RequestParam int amount, @RequestParam String emote)
    {
        HttpHeaders header = new HttpHeaders();
        int points = getPoints(streamer, user);
        double value = getEmoteValue(streamer, emote);

        int cost = amount*(int)value*100;

        if(points < cost)
        {
            return new ResponseEntity<>("Insufficient Points",header,HttpStatus.OK);
        }
        else
        {
            updateUserPoints(streamer,user,points - cost);
            sprepo.updateStockAmount(streamer,user,emote,getStockamount(streamer,user,emote) - amount);
            return new ResponseEntity<>("Success",header,HttpStatus.OK);
        }
    }

    @PostMapping("/receiveemotefrequency")
    public ResponseEntity<String> receiveEmoteFrequency(@RequestParam String streamer, @RequestParam Map<String, Integer> data) {
        int total = 0;
        for (Integer value : data.values()) {
            total += value;
        }
        for (Map.Entry<String, Integer> entry : data.entrySet()) {
            String emote = entry.getKey();
            Integer count = entry.getValue();
            svrepo.updateEmoteValue(streamer, emote, total == 0 ? 0 : (float)count / total);
        }
        return new ResponseEntity<>("Success", new HttpHeaders(), HttpStatus.OK);
    }
}
