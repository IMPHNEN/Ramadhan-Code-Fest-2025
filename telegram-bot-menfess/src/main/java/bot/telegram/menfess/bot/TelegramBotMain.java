package bot.telegram.menfess.bot;

import bot.telegram.menfess.config.RulesCofiguration;
import bot.telegram.menfess.entity.Transaction;
import bot.telegram.menfess.entity.TransactionStatus;
import bot.telegram.menfess.entity.Users;
import bot.telegram.menfess.entity.UsersLevel;
import bot.telegram.menfess.service.TransactionService;
import bot.telegram.menfess.service.UserService;

import bot.telegram.menfess.utils.command.SendCommand;
import bot.telegram.menfess.utils.command.StartCommand;
import bot.telegram.menfess.utils.command.TopUpCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Slf4j
public class TelegramBotMain extends TelegramLongPollingBot {


    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

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
            if (update.getMessage().getText().equals("/start")) {
                if (isRegister != null) {
                    try {
                        execute(new StartCommand().registered(update));
                    } catch (TelegramApiException e){
                        log.warn(e.getMessage());
                    }

                } else {
                    try {
                        execute(new StartCommand().notRegistered(update));
                    } catch (TelegramApiException e) {
                        log.warn(e.getMessage());
                    }
                }

            } else if (text.contains("/send")) {
                Users users = userService.findUsers(chatId);
                log.info(users.getLevel().toString());
                if (users.getBalance() == 0 && users.getLimitService() == 0) {
                    Thread.startVirtualThread(() -> userService.changeLevel(chatId, UsersLevel.FREE));
                }
                if (text.equals("/send")) {
                    try {
                        execute(new SendCommand().helpSendMenfess(update));
                    } catch (TelegramApiException e) {
                        log.warn(e.getMessage());
                    }
                } else if (users.getLimitService() > 0) {
                    if(users.getLevel() == UsersLevel.FREE) {
                        if (text.contains(update.getMessage().getChat().getUserName())) {
                            log.warn(text);
                            try {
                                Thread.startVirtualThread(() -> userService.changeLimitService(chatId, users.getLimitService() - 1));
                                execute(new SendCommand().message(text.replace("/send ", ""), new RulesCofiguration().getChannelId));

                            } catch (TelegramApiException e) {
                                log.warn(e.getMessage());
                            }
                        } else {
                            try {
                                execute(new SendCommand().errorUsersFreeNotContainsUsername("Pesan anda tidak mengandung username anda", chatId));
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }
                    } else {
                        try {
                            Thread.startVirtualThread(() -> {
                               Users users1 = userService.findUsers(chatId);
                                 users1.setLimitService(users1.getLimitService() - 1);
                                 userService.changeLimitService(chatId, users1.getLimitService());
                            });
                            execute(new SendCommand().message(text.replace("/send ", ""), new RulesCofiguration().getChannelId));
                        } catch (TelegramApiException e) {
                            throw new RuntimeException(e);
                        }
                    }
                } else if (users.getLimitService() == 0 && users.getLevel() == UsersLevel.PREMIUM && users.getBalance() > new RulesCofiguration().getPayAmountAfterLimit()) {
                    if (text.contains(update.getMessage().getChat().getUserName())) {
                        try {
                            Thread.startVirtualThread(() -> userService.changeLimitService(chatId, users.getLimitService() - 1));
                            execute(new SendCommand().message(text.replace("/send ", ""), new RulesCofiguration().getChannelId));

                        } catch (TelegramApiException e) {
                            log.warn(e.getMessage());
                        }
                    } else {
                        try {
                            Thread.startVirtualThread(() -> userService.deductBalance(chatId, new RulesCofiguration().getPayAmountAfterLimit()));
                            execute(new SendCommand().message(text.replace("/send ", ""), new RulesCofiguration().getChannelId));

                        } catch (TelegramApiException e) {
                            log.warn(e.getMessage());
                        }
                    }


                } else {
                    try {
                        execute(new SendCommand().errorUsersNotHaveLimit("Anda tidak memiliki limit", chatId));
                    } catch (TelegramApiException e) {
                        throw new RuntimeException(e);
                    }
                }
            } else if (text.contains("/topup")) {
                if (text.equals("/topup")) {
                    try {
                        execute(new TopUpCommand().helpTopUp(chatId));
                    } catch (TelegramApiException e) {
                        log.warn(e.getMessage());
                    }
                } else {
                    Transaction transaction = transactionService.findNotClaimedTransaction(text.replace("/topup ", ""), TransactionStatus.SUCCESS);
                    if (transaction != null) {
                        try {
                            execute(new TopUpCommand().topUpMessage(chatId, true));
                            Thread.startVirtualThread(() -> {
                                transaction.setTransactionStatus(TransactionStatus.ACCEPT);
                                transaction.setUserId(chatId);
                                userService.topUpBalance(chatId, transaction.getPrice());
                                userService.changeLevel(chatId, UsersLevel.PREMIUM);
                                userService.changeLimitService(chatId, transaction.getPrice()/new RulesCofiguration().getPayAmountAfterLimit());
                                transactionService.saveTransaction(transaction);
                            });
                            System.out.println(transaction.getTransactionId());
                        } catch (TelegramApiException e) {
                            log.warn(e.getMessage());
                        }
                    } else {
                        try {
                            execute(new TopUpCommand().topUpMessage(chatId, false));
                        } catch (TelegramApiException e) {
                            log.warn(e.getMessage());
                        }
                    }
                }
            }


        } else {
            log.info(update.getCallbackQuery().getData());
            if (update.getCallbackQuery().getData() != null) {
                if (update.getCallbackQuery().getData().equals("mendaftar")) {
                    Users registerUser = Users.builder()
                            .id(update.getCallbackQuery().getMessage().getChatId())
                            .limitService(new RulesCofiguration().getLimitFreeUsers())
                            .level(UsersLevel.FREE)
                            .balance(0)
                            .build();
                    registerUser = userService.registerUser(registerUser);
                    if (registerUser != null) {
                        try {
                            execute(new StartCommand().successRegistered(update));
                        } catch (TelegramApiException e) {
                            log.warn(e.getMessage());
                        }
                    } else {
                        log.warn("Error Registering User");
                        try {
                            execute(new StartCommand().errorRegisteredUsers(update));
                        } catch (TelegramApiException e) {
                            log.warn(e.getMessage());
                        }
                    }

                } else if (update.getCallbackQuery().getData().equals("akun")) {
                    Users users = userService.findUsers(update.getCallbackQuery().getMessage().getChatId());
                    try {
                        execute(new StartCommand().accountDetails(users, update));
                    } catch (TelegramApiException e) {
                        log.warn(e.getMessage());
                    }

                } else if (update.getCallbackQuery().getData().equals("help")) {
                    Users users = userService.findUsers(update.getCallbackQuery().getMessage().getChatId());
                    try {
                        execute(new StartCommand().helpButton(users, update));
                    } catch (TelegramApiException e) {
                        log.warn(e.getMessage());
                    }

                }
            }
        }


    }

    @Override
    public String getBotUsername() {
        return botName;
    }
}
