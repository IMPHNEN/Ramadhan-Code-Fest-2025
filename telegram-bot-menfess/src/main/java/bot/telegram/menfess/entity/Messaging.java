package bot.telegram.menfess.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "messages")
public class Messaging {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private long user;

    private String message;

    private long MessageId;

    @Enumerated(EnumType.STRING)
    private MessageStatus messageStatus;

}
