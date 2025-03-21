package bot.telegram.menfess.utils.command;

import bot.telegram.menfess.utils.text.TextUtils;
import lombok.extern.slf4j.Slf4j;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

@Slf4j
public class SendCommand {

    private SendMessage createMessage(String text, long chatId) {
        return SendMessage.builder()
                .chatId(chatId)
                .text(text)
                .parseMode("HTML")
                .build();
    }

    public SendMessage helpSendMenfess(Update update) {
        return createMessage(TextUtils.help, update.getMessage().getChatId());
    }

    public SendMessage help(Update update) {
        return createMessage(TextUtils.helpSendMenfess, update.getMessage().getChatId());
    }

    public SendMessage message(String message, long channel) {
        return createMessage(message, channel);
    }

    public SendMessage errorUsersFreeNotContainsUsername(String message, long chatId) {
        return createMessage(message, chatId);
    }

    public SendMessage errorUsersNotHaveLimit(String message, long chatId) {
        return createMessage(message, chatId);
    }
    public SendMessage successSendingMessage(String message, long chatId) {
        return createMessage(message, chatId);
    }
    public SendMessage helpDeleteMessage(String message, long chatId) {
        return createMessage(message, chatId);
    }
}