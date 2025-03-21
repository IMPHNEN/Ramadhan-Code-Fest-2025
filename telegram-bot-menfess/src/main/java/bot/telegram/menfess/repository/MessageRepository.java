package bot.telegram.menfess.repository;

import bot.telegram.menfess.entity.Messaging;
import bot.telegram.menfess.entity.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Messaging, String> {
    List<Messaging> findByUser(long userId);
    Messaging findMessageByMessage(String message);
    Messaging findMessageByMessageAndMessageStatus(String message, MessageStatus messageStatus);
}
