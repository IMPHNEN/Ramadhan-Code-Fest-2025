package bot.telegram.menfess.bot;

import bot.telegram.menfess.config.RulesCofiguration;
import bot.telegram.menfess.entity.*;
import bot.telegram.menfess.service.MessageService;
import bot.telegram.menfess.service.TransactionService;
import bot.telegram.menfess.service.UserService;
import bot.telegram.menfess.utils.command.SendCommand;
import bot.telegram.menfess.utils.command.StartCommand;
import bot.telegram.menfess.utils.command.TopUpCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.DeleteMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.EditMessageText;
import org.telegram.telegrambots.meta.api.objects.Chat;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.exceptions.TelegramApiRequestException;


@Slf4j
public class TelegramBotMain extends TelegramLongPollingBot {

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private MessageService messageService;

    private final String botName;

    public TelegramBotMain(String botToken, String botUsername) {
        super(botToken);
        this.botName = botUsername;
    }

    @Override
    @Bean
    public void onUpdateReceived(Update update) {
        if (update.getMessage() != null) {
            long chatId = update.getMessage().getChatId();
            String text = update.getMessage().getText();
            var isRegister = userService.findUsers(chatId);
            log.warn("From users {}", chatId);

            if (text.equals("/start")) {
                handleStartCommand(update, isRegister);
            } else if (text.contains("/send")) {
                handleSendCommand(update, chatId, text);
            } else if (text.contains("/topup")) {
                handleTopUpCommand(chatId, text);
            } else if (text.contains("/delete")) {
                handleDeleteCommand(update, chatId, text);
            }
        } else {
            handleCallbackQuery(update);
        }
    }

    private void handleDeleteCommand(Update update, long chatId, String text) {
        if (text.equals("/delete")) {
            sendMessage(new SendCommand().helpDeleteMessage("Silahkan masukkan id pesan yang ingin dihapus", chatId));
        } else {
            Messaging messaging = messageService.findMessage(text.replace("/delete ", ""));
            if (messaging != null) {
                Thread.startVirtualThread(() -> {
                    messaging.setMessageStatus(MessageStatus.DELETED);
                    messageService.saveMessage(messaging);
                });

                sendMessage(SendMessage.builder()
                        .text("Sukses Delete Message")
                        .chatId(chatId)
                        .build());
                deleteMessage(DeleteMessage.builder()
                        .messageId((int) messaging.getMessageId())
                        .chatId(new RulesCofiguration().getGetChannelId())
                        .build());
            }

        }
    }

    private void handleStartCommand(Update update, Users isRegister) {
        try {
            if (isRegister != null) {
                execute(new StartCommand().registered(update));
            } else {
                execute(new StartCommand().notRegistered(update));
            }
        } catch (TelegramApiException e) {
            log.warn(e.getMessage());
        }
    }

    private void handleSendCommand(Update update, long chatId, String text) {
        Users users = userService.findUsers(chatId);
        log.info(users.getLevel().toString());

        if (users.getBalance() == 0 && users.getLimitService() == 0) {
            Thread.startVirtualThread(() -> userService.changeLevel(chatId, UsersLevel.FREE));
        }

        if (text.equals("/send")) {
            sendMessage(new SendCommand().helpSendMenfess(update));
        } else if (users.getLimitService() > 0) {
            handleSendWithLimit(update, chatId, text, users);
        } else if (users.getLimitService() >= 0 && users.getLevel() == UsersLevel.PREMIUM && users.getBalance() > new RulesCofiguration().getPayAmountAfterLimit()) {
            handleSendWithBalance(update, chatId, text, users);
        } else {
            sendMessage(new SendCommand().errorUsersNotHaveLimit("Anda tidak memiliki limit", chatId));
        }
    }

    private void handleSendWithLimit(Update update, long chatId, String text, Users users) {
        if (users.getLevel() == UsersLevel.FREE) {
            if (text.contains(update.getMessage().getChat().getUserName())) {
                log.warn(text);
                sendAndUpdateLimit(update, chatId, text, users);
            } else {
                sendMessage(new SendCommand().errorUsersFreeNotContainsUsername("Pesan anda tidak mengandung username anda", chatId));
            }
        } else {
            sendAndUpdateLimit(update, chatId, text, users);
        }
    }

    private void sendAndUpdateLimit(Update update, long chatId, String text, Users users) {
        SendMessage message = new SendCommand().message(text.replace("/send ", ""), new RulesCofiguration().getChannelId);
        Message messageing = sendMessage(message);
        Thread.startVirtualThread(() -> {
            userService.changeLimitService(chatId, users.getLimitService() - 1);
            Messaging messaging1 = insertMessage(update, messageing.getMessageId());
            log.warn("Message Id {}", messaging1.getMessageId());
            sendMessage(new SendCommand().successSendingMessage("Pesan anda berhasil terkirim\nUntuk Menghapus Pesan silahkan kirim\n <code>/delete " + messaging1.getId() + "</code>", chatId));
        });
    }

    private void handleSendWithBalance(Update update, long chatId, String text, Users users) {
        if (text.contains(update.getMessage().getChat().getUserName())) {
            sendAndUpdateLimit(update, chatId, text, users);
        } else {
            sendAndUpdateBalance(update, chatId, text);
        }
    }
    private void sendAndUpdateBalance(Update update, long chatId, String text) {
        SendMessage message = new SendCommand().message(text.replace("/send ", ""), new RulesCofiguration().getChannelId);
        Message messageing = sendMessage(message);
        Thread.startVirtualThread(() -> {
            userService.deductBalance(chatId, new RulesCofiguration().getPayAmountAfterLimit());
            Messaging messaging1 = insertMessage(update, messageing.getMessageId());
            sendMessage(new SendCommand().successSendingMessage("Pesan anda berhasil terkirim\nUntuk Menghapus Pesan silahkan kirim\n <code>/delete " + messaging1.getId() + "</code>", chatId));
        });
    }

    private void handleTopUpCommand(long chatId, String text) {
        if (text.equals("/topup")) {
            sendMessage(new TopUpCommand().helpTopUp(chatId));
        } else {
            Transaction transaction = transactionService.findNotClaimedTransaction(text.replace("/topup ", ""), TransactionStatus.SUCCESS);
            if (transaction != null) {
                sendMessage(new TopUpCommand().topUpMessage(chatId, true));
                Thread.startVirtualThread(() -> {
                    transaction.setTransactionStatus(TransactionStatus.ACCEPT);
                    transaction.setUserId(chatId);
                    userService.topUpBalance(chatId, transaction.getPrice());
                    userService.changeLevel(chatId, UsersLevel.PREMIUM);
                    userService.changeLimitService(chatId, transaction.getPrice() / new RulesCofiguration().getPayAmountAfterLimit());
                    transactionService.saveTransaction(transaction);
                });
            } else {
                sendMessage(new TopUpCommand().topUpMessage(chatId, false));
            }
        }
    }

    private Messaging insertMessage(Update update, long messageId) {
        Messaging messaging = Messaging.builder()
                .messageStatus(MessageStatus.SENT)
                .user(update.getMessage().getChatId())
                .MessageId(messageId)
                .build();
        return messageService.saveMessage(messaging);
    }


    private void handleCallbackQuery(Update update) {
        String callbackData = update.getCallbackQuery().getData();
        if (callbackData != null) {
            switch (callbackData) {
                case "mendaftar":
                    registerUser(update);
                    break;
                case "akun":
                    showAccountDetails(update);
                    break;
                case "help":
                    showHelp(update);
                    break;
            }

        }
    }

    private void registerUser(Update update) {
        Users registerUser = Users.builder()
                .id(update.getCallbackQuery().getMessage().getChatId())
                .limitService(new RulesCofiguration().getLimitFreeUsers())
                .level(UsersLevel.FREE)
                .balance(0)
                .build();
        registerUser = userService.registerUser(registerUser);
        if (registerUser != null) {
            editMessage(new StartCommand().successRegistered(update));
        } else {
            log.warn("Error Registering User");
            editMessage(new StartCommand().errorRegisteredUsers(update));
        }
    }

    private void showAccountDetails(Update update) {
        Users users = userService.findUsers(update.getCallbackQuery().getMessage().getChatId());
        editMessage(new StartCommand().accountDetails(users, update));
    }

    private void showHelp(Update update) {
        Users users = userService.findUsers(update.getCallbackQuery().getMessage().getChatId());
        editMessage(new StartCommand().helpButton(users, update));
    }

    private Message sendMessage(SendMessage message) {
        try {
            return execute(message);
        } catch (TelegramApiException e) {
            log.warn(e.getMessage());
            return null;
        }
    }
    private void editMessage(EditMessageText messageText) {
        try {
            execute(messageText);
        } catch (TelegramApiException e) {
            throw new RuntimeException(e);
        }
    }
    private void deleteMessage(DeleteMessage deleteMessage) {
        try {
            execute(deleteMessage);
        } catch (TelegramApiException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public String getBotUsername() {
        return botName;
    }
}