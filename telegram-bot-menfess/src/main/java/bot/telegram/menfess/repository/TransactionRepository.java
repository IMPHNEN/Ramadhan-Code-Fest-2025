package bot.telegram.menfess.repository;

import bot.telegram.menfess.entity.Transaction;
import bot.telegram.menfess.entity.TransactionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    Transaction findTransactionByTransactionIdAndTransactionStatus(String transactionId, TransactionStatus transactionStatus);
}
