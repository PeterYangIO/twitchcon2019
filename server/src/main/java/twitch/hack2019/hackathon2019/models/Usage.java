package twitch.hack2019.hackathon2019.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Usage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int UId;
    
    int StreamerId;
    int EId;
    double UsageRate;

    public Usage(int StreamerId, int EId, double usageRate) {
        this.StreamerId = StreamerId;
        this.EId = EId;
        UsageRate = usageRate;
    }

    public int getUId() {
        return UId;
    }

    public void setUId(int UId) {
        this.UId = UId;
    }

    public int getStreamerId() {
        return StreamerId;
    }

    public void setStreamerId(int StreamerId) {
        this.StreamerId = StreamerId;
    }

    public int getEId() {
        return EId;
    }

    public void setEId(int EId) {
        this.EId = EId;
    }

    public double getUsageRate() {
        return UsageRate;
    }

    public void setUsageRate(double usageRate) {
        UsageRate = usageRate;
    }
}
