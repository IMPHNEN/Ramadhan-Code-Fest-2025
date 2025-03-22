package bot.telegram.menfess.service;

import bot.telegram.menfess.entity.Messaging;
import bot.telegram.menfess.entity.MessageStatus;
import bot.telegram.menfess.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Messaging saveMessage(Messaging messaging) {
        return messageRepository.save(messaging);
    }

    public Messaging deleteMessage(String message) {
        return messageRepository.findById(message).map(messaging1 -> {
            messaging1.setMessageStatus(MessageStatus.DELETED);
            return messageRepository.save(messaging1);
        }).orElse(null);
    }
    public Messaging findMessage(String message) {
        return messageRepository.findById(message).orElse(null);
    }
}
