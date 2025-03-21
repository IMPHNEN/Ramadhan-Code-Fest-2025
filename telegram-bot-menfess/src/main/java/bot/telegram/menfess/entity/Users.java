package bot.telegram.menfess.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "users")
public class Users {

    @Id
    private long id;

    @Enumerated(EnumType.STRING)
    private UsersLevel level;

    @Column(name = "limit_service")
    private long limitService;

    private long balance;
}
