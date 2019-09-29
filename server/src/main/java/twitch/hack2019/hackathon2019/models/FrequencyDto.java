package twitch.hack2019.hackathon2019.models;

import java.util.Map;

public class FrequencyDto {
    private String streamer;
    private Map<String, Integer> data;

    FrequencyDto() {}

    FrequencyDto(String streamer, Map<String, Integer> data) {
        this.streamer = streamer;
        this.data = data;
    }

    public Map<String, Integer> getData() {
        return data;
    }

    public String getStreamer() {
        return streamer;
    }

    public void setData(Map<String, Integer> data) {
        this.data = data;
    }

    public void setStreamer(String streamer) {
        this.streamer = streamer;
    }
}

