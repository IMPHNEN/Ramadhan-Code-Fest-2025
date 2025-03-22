package bot.telegram.menfess.service;

import bot.telegram.menfess.entity.Users;
import bot.telegram.menfess.entity.UsersLevel;
import bot.telegram.menfess.repository.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {


    public UserService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    private UsersRepository usersRepository;

    public Users findUsers (long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users registerUser(Users users) {
        return usersRepository.save(users);
    }
    public Users changeLevel(Long id, UsersLevel level) {
        return usersRepository.findById(id).map(users -> {
            users.setLevel(level);
            return usersRepository.save(users);
        }).orElse(null);
    }
    public Users topUpBalance(Long id, int balance) {
        Users users = usersRepository.findById(id).orElse(null);
        if (users != null) {
            users.setBalance(users.getBalance() + balance);
            return usersRepository.save(users);
        }
        return null;
    }

    public Users deductBalance(Long id, int balance) {
        Users users = usersRepository.findById(id).orElse(null);
        if (users != null) {
            users.setBalance(users.getBalance() - balance);
            return usersRepository.save(users);
        }
        return null;
    }
    public Users changeLimitService(Long id, long limitService) {
        return usersRepository.findById(id).map(users -> {
            users.setLimitService(limitService);
            return usersRepository.save(users);
        }).orElse(null);
    }

}
