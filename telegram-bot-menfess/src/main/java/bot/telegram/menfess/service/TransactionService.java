package bot.telegram.menfess.service;

import bot.telegram.menfess.entity.Transaction;
import bot.telegram.menfess.entity.TransactionStatus;
import bot.telegram.menfess.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction findNotClaimedTransaction(String transactionId, TransactionStatus transactionStatus) {
        return transactionRepository.findTransactionByTransactionIdAndTransactionStatus(transactionId, transactionStatus);
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
