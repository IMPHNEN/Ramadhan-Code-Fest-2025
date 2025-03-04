package bot.telegram.menfess.utils.command;

import bot.telegram.menfess.utils.text.TextUtils;
import lombok.extern.slf4j.Slf4j;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

@Slf4j
public class SendCommand {

    public SendMessage helpSendMenfess(Update update) {
        return SendMessage.builder()
                .chatId(update.getMessage().getChatId())
                .text(TextUtils.help)
                .parseMode("HTML")
                .build();
    }

    public SendMessage help(Update update) {
        return SendMessage.builder()
                .chatId(update.getMessage().getChatId())
                .text(TextUtils.helpSendMenfess)
                .parseMode("HTML")
                .build();
    }
    public SendMessage message(String message, long channel) {
        return SendMessage.builder()
                .chatId(channel)
                .text(message)
                .parseMode("HTML")
                .build();
    }
    public SendMessage errorUsersFreeNotContainsUsername(String message, long chatId) {
        return SendMessage.builder()
                .chatId(chatId)
                .text(message)
                .parseMode("HTML")
                .build();
    }
    public SendMessage errorUsersNotHaveLimit(String message, long chatId) {
        return SendMessage.builder()
                .chatId(chatId)
                .text(message)
                .parseMode("HTML")
                .build();
    }
}
