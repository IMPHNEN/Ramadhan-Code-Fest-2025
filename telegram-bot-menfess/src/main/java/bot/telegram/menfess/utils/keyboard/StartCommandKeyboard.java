package bot.telegram.menfess.utils.keyboard;

import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;

import java.util.List;

public class StartCommandKeyboard {

    private static InlineKeyboardButton createButton(String text, String callbackData) {
        return InlineKeyboardButton.builder()
                .text(text)
                .callbackData(callbackData)
                .build();
    }

    public static InlineKeyboardMarkup notRegister() {
        InlineKeyboardButton buttonAgree = createButton("Mendaftar", "mendaftar");
        InlineKeyboardButton buttonDisagree = createButton("Tidak Mendaftar", "disagree");
        InlineKeyboardButton help = createButton("Bantuan", "help");

        return InlineKeyboardMarkup.builder()
                .keyboard(List.of(List.of(buttonAgree, buttonDisagree), List.of(help)))
                .build();
    }

    public static InlineKeyboardMarkup register() {
        InlineKeyboardButton buttonRegister = createButton("Akun Anda", "akun");
        InlineKeyboardButton buttonHelp = createButton("Bantuan", "help");

        return InlineKeyboardMarkup.builder()
                .keyboard(List.of(List.of(buttonRegister, buttonHelp)))
                .build();
    }
}