package bot.telegram.menfess.config;

import lombok.Data;

@Data
public class RulesCofiguration {


    public int limitFreeUsers = 3;
    public int payAmountAfterLimit = 100;
    public boolean forceShowUsername = true;
    public long getChannelId = -1002161694809L;

}
