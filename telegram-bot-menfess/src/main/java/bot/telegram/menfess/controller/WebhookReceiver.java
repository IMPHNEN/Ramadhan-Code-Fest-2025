package bot.telegram.menfess.controller;

import bot.telegram.menfess.entity.Transaction;
import bot.telegram.menfess.entity.TransactionStatus;
import bot.telegram.menfess.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/webhook")
public class WebhookReceiver {

    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping
    public ResponseEntity<String> handleWebhook(@RequestBody Map<String, Object> payload) {
        log.warn("Received Webhook");
        processWebhook(payload);

        return ResponseEntity.ok("Received");


    }
    private void processWebhook(Map<String, Object> payload) {
        log.warn("Processing Webhook");

        Transaction transaction = new Transaction();
        transaction.setTransactionId((String) payload.get("transaction_id"));
        transaction.setPrice((Integer) payload.get("price"));
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transactionRepository.save(transaction);
    }


}
