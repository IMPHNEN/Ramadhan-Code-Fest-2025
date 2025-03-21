package bot.telegram.menfess.utils.command;

import bot.telegram.menfess.entity.Users;
import bot.telegram.menfess.utils.keyboard.StartCommandKeyboard;
import bot.telegram.menfess.utils.text.TextUtils;
import lombok.extern.slf4j.Slf4j;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.EditMessageText;
import org.telegram.telegrambots.meta.api.objects.Update;

@Slf4j
public class StartCommand {

    public SendMessage notRegistered(Update update) {

        return SendMessage.builder()
                .chatId(update.getMessage().getChatId())
                .text(TextUtils.welcomMessage)
                .replyMarkup(StartCommandKeyboard.notRegister())
                .build();
    }
    public SendMessage registered(Update update) {

        return SendMessage.builder()
                .chatId(update.getMessage().getChatId())
                .text(TextUtils.alreadyRegistered)
                .replyMarkup(StartCommandKeyboard.register())
                .build();
    }

    public EditMessageText successRegistered(Update update) {

        return EditMessageText.builder()
                .chatId(update.getCallbackQuery().getMessage().getChatId())
                .messageId(update.getCallbackQuery().getMessage().getMessageId())
                .text(TextUtils.registerSuccess)
                .build();
    }
    public EditMessageText errorRegisteredUsers(Update update) {

        return EditMessageText.builder()
                .chatId(update.getCallbackQuery().getMessage().getChatId())
                .messageId(update.getCallbackQuery().getMessage().getMessageId())
                .text(TextUtils.errorRegistered)
                .build();
    }

    public EditMessageText accountDetails(Users users, Update update) {
        return EditMessageText.builder()
                .chatId(update.getCallbackQuery().getMessage().getChatId())
                .messageId(update.getCallbackQuery().getMessage().getMessageId())
                .text(TextUtils.account + "\nId : " + users.getId() + "\nSaldo : " + users.getBalance() + "\nLevel : " + users.getLevel() + "\nLimit : " + users.getLimitService())
                .build();
    }
    public EditMessageText helpButton(Users users,Update update) {
        return EditMessageText.builder()
                .messageId(update.getCallbackQuery().getMessage().getMessageId())
                .chatId(update.getCallbackQuery().getMessage().getChatId())
                .text("Status user anda adalah " + users.getLevel() +"\n" +TextUtils.help)
                .parseMode("HTML")
                .build();
    }

}
