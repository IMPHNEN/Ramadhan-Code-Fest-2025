package bot.telegram.menfess.config;

import bot.telegram.menfess.bot.TelegramBotMain;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.generics.TelegramBot;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@Slf4j
@Configuration
@Component
public class BotConfig {

    @Bean
    public TelegramBot telegramBot (@Value("${bot.token}") String botToken,
                                    @Value("${bot.username}") String botUsername) {
        TelegramBotMain telegramBotMain = new TelegramBotMain(botToken, botUsername);
        try {
            TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
            telegramBotsApi.registerBot(telegramBotMain);
        } catch (TelegramApiException e) {
            log.warn("Error Registering Bot");
        }
        return telegramBotMain;
    }

}
