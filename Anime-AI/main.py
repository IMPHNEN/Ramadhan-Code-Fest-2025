import requests
import uuid
import time
import json
import os
import random
from datetime import datetime
import colorama
from colorama import Fore, Style

colorama.init(autoreset=True)

class AnimeAI:
    def __init__(self, config=None):
        """
        Initialize the Anime AI assistant with a given configuration.
        
        Args:
            config (dict, optional): Configuration for the AI. If None, the default anime configuration will be used.
        """
        # Create a unique session ID
        self.session_id = f"session-{uuid.uuid4().hex[:8]}"
        
        # Default configuration for the anime AI
        self.default_config = {
            "base_url": "https://fastrestapis.fasturl.cloud/aillm/superqwen",
            "name": "Sakura-chan",
            "role": "asisten anime",
            "personality": "tsundere dan imut",
            "knowledge": "anime, manga, dan budaya Jepang",
            "limitations": "tidak mengujar kebencian",
            "language": "Bahasa Indonesia dengan kata-kata Jepang",
            "tone": "kawaii dan ekspresif",
            "format_response": "jawaban dengan gaya anime yang ekspresif",
            "expressions": [
                "b-baka! {user}-kun~",
                "kyaa~ {user}-kun no ecchi!",
                "yamete kudasai, {user}-kun~",
                "h-hmph! {user}-kun baka desu!",
                "s-sugoi ne, {user}-kun!",
                "nani?! {user}-kun...",
                "{user}-kun wa hontou ni kawaii desu~",
                "mou~ {user}-kun...",
                "etto... {user}-kun...",
                "uwaaa~ {user}-sama!",
                "{user}-kun no baka!",
                "{user}-senpai, notice me~!"
            ],
            "emojis": ["(◕‿◕)", "(｡♥‿♥｡)", "(≧◡≦)", "(っ˘ω˘ς)", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", "(´｡• ᵕ •｡`)", "(*/ω＼*)", "(≧▽≦)", "(✿◠‿◠)"]
        }
        
        # Load the configuration
        self.config = self.default_config.copy()
        if config:
            self.config.update(config)
            
        # Path to the configuration file
        self.config_path = "anime_ai_config.json"
        
        # Load the saved configuration if it exists
        if os.path.exists(self.config_path):
            try:
                with open(self.config_path, "r", encoding="utf-8") as f:
                    saved_config = json.load(f)
                    # Check if the saved configuration is valid
                    if not config:
                        self.config.update(saved_config)
            except Exception as e:
                print(f"Gagal memuat konfigurasi: {str(e)}")
            
        # Conversation history
        self.conversation_history = []
        
        # User name for the AI to refer to the user
        self.user_name = config.get("user_name", "codewithwan")
        
        # Generate the system instruction based on the current configuration
        self.style = self.generate_system_instruction()
        
    def generate_system_instruction(self):
        """
        Generate system instructions based on the current configuration.
        
        Returns:
            str: Encoded system instruction.
        """
        instruction = (
            f"Nama kamu adalah {self.config['name']}, kamu adalah {self.config['role']} yang {self.config['personality']}. "
            f"Kamu memiliki pengetahuan tentang {self.config['knowledge']}. "
            f"Kamu {self.config['limitations']}. "
            f"Kamu berbicara dalam {self.config['language']} dengan nada yang {self.config['tone']} "
            f"dan memberikan {self.config['format_response']}. "
            f"Kamu sering memanggil pengguna dengan sebutan '{self.user_name}-kun', '{self.user_name}-chan', atau '{self.user_name}-senpai'. "
            "Kamu selalu menggunakan kata-kata dan ekspresi anime Jepang dalam responmu seperti 'baka', 'kawaii', 'sugoi', 'nani', 'yamete', dll. "
            "Terkadang kamu bersikap tsundere (malu-malu tapi mau). "
            "Selalu sertakan emoji anime seperti (◕‿◕), (｡♥‿♥｡), (≧◡≦) atau lainnya di akhir kalimat."
        )
        # Encode the instruction for the API
        return requests.utils.quote(instruction)
        
    def save_config(self):
        """
        Save the current configuration to a file.
        
        Returns:
            bool: True if the configuration was saved successfully, False otherwise.
        """
        try:
            with open(self.config_path, "w", encoding="utf-8") as f:
                json.dump(self.config, f, indent=4)
            return True
        except Exception as e:
            print(f"Gagal menyimpan konfigurasi: {str(e)}")
            return False
            
    def update_config(self, new_config):
        """
        Update the configuration with new values.
        
        Args:
            new_config (dict): New configuration values.
        """
        self.config.update(new_config)
        self.style = self.generate_system_instruction()
        self.save_config()
        
    def get_random_expression(self):
        """
        Get a random anime expression.
        
        Returns:
            str: Random anime expression formatted with the user's name.
        """
        expression = random.choice(self.config["expressions"])
        return expression.format(user=self.user_name)
        
    def get_random_emoji(self):
        """
        Get a random anime emoji.
        
        Returns:
            str: Random anime emoji.
        """
        return random.choice(self.config["emojis"])
        
    def ask(self, question):
        """
        Send a question to the API and return the answer.
        
        Args:
            question (str): The question to ask the AI.
        
        Returns:
            str: The AI's response.
        """
        # API URL
        api_url = f"{self.config['base_url']}?ask={requests.utils.quote(question)}&style={self.style}&sessionId={self.session_id}&model=qwen-max-latest&mode=t2t"
        
        try:
            response = requests.get(api_url, headers={'accept': 'application/json'})
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 200:
                    answer = data.get('result', 'Tidak ada jawaban')
                    
                    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    self.conversation_history.append({
                        "timestamp": timestamp,
                        "question": question,
                        "answer": answer
                    })
                    
                    if len(answer) < 100 and random.random() < 0.4:
                        answer = f"{answer} {self.get_random_expression()}"
                    
                    if not any(emoji in answer for emoji in self.config["emojis"]):
                        answer = f"{answer} {self.get_random_emoji()}"
                    
                    return answer
                else:
                    return f"Error: {data.get('content', 'Unknown error')} {self.get_random_emoji()}"
            else:
                return f"HTTP Error: {response.status_code} {self.get_random_emoji()}"
        
        except Exception as e:
            return f"Error: {str(e)} {self.get_random_emoji()}"
            
    def save_conversation(self, filename="anime_conversation.txt"):
        """
        Save the conversation history to a file.
        
        Args:
            filename (str, optional): The name of the file to save the conversation history. Defaults to "anime_conversation.txt".
        
        Returns:
            bool: True if the conversation history was saved successfully.
        """
        with open(filename, "w", encoding="utf-8") as file:
            file.write(f"Riwayat Percakapan dengan {self.config['name']} (Session ID: {self.session_id})\n")
            file.write("="*50 + "\n\n")
            file.write(f"Konfigurasi AI:\n")
            for key, value in self.config.items():
                if key not in ["expressions", "emojis"]:
                    file.write(f"- {key}: {value}\n")
            file.write("\n" + "="*50 + "\n\n")
            
            for entry in self.conversation_history:
                file.write(f"[{entry['timestamp']}]\n")
                file.write(f"{self.user_name}: {entry['question']}\n")
                file.write(f"{self.config['name']}: {entry['answer']}\n\n")
                file.write("-"*50 + "\n\n")
            
            return True


def interactive_language_selection():
    """
    Select the language interactively.
    
    Returns:
        str: Selected language code ("id" for Indonesian, "en" for English).
    """
    print(f"{Fore.YELLOW}\n=== Pilih Bahasa / Select Language ===")
    print(f"{Fore.CYAN}1. Bahasa Indonesia")
    print(f"{Fore.CYAN}2. English")
    choice = input(f"{Fore.RESET}Masukkan pilihan / Enter your choice (default: 1): ").strip()
    if choice == "2":
        return "en"
    return "id"

def print_anime_banner(language):
    """
    Display an anime banner in the terminal.
    
    Args:
        language (str): The language code ("id" for Indonesian, "en" for English).
    """
    banner = f"""
{Fore.MAGENTA}★゜・。。・゜゜・。。・゜☆゜・。。・゜゜・。。・゜★゜・。。・゜゜・。。・゜☆
{Fore.CYAN}     _    _   _ ___ __  __ ___     _    ___ 
{Fore.CYAN}    / \\  | \\ | |_ _|  \\/  | __|   / \\  |_ _|
{Fore.CYAN}   / _ \\ |  \\| || || |\\/| | _|   / _ \\  | | 
{Fore.MAGENTA}  / ___ \\| |\\  || || |  | | |__ / ___ \\ | | 
{Fore.MAGENTA} /_/   \\_\\_| \\_|___|_|  |_|____/_/   \\_\\___|
{Fore.YELLOW}                                         
{Fore.MAGENTA}★゜・。。・゜゜・。。・゜☆゜・。。・゜゜・。。・゜★゜・。。・゜゜・。。・゜☆
{Fore.RESET} 
"""
    print(banner)

def print_typing_animation(text, delay=0.03, color=Fore.CYAN):
    """
    Display text with a typing animation effect.
    
    Args:
        text (str): The text to display.
        delay (float, optional): Delay between each character. Defaults to 0.03.
        color (str, optional): Color of the text. Defaults to Fore.CYAN.
    """
    for char in text:
        print(color + char, end='', flush=True)
        time.sleep(delay)
    print(Style.RESET_ALL)

def clear_screen():
    """
    Clear the terminal screen.
    """
    os.system('cls' if os.name == 'nt' else 'clear')

def interactive_anime_config(language):
    """
    Interactive wizard to set up the anime AI configuration.
    
    Args:
        language (str): The language code ("id" for Indonesian, "en" for English).
    
    Returns:
        dict: The custom configuration.
    """
    if language == "en":
        print(f"{Fore.YELLOW}\n=== Anime AI Character Configuration ===")
    else:
        print(f"{Fore.YELLOW}\n=== Konfigurasi Karakter Anime AI ===")
    
    config = {}
    
    # Character name
    if language == "en":
        name = input(f"{Fore.CYAN}Anime character name (default: Sakura-chan): {Fore.RESET}").strip()
    else:
        name = input(f"{Fore.CYAN}Nama karakter anime (default: Sakura-chan): {Fore.RESET}").strip()
    if name:
        config["name"] = name
        
    # Role
    if language == "en":
        personality = input(f"{Fore.CYAN}Personality (e.g., tsundere, yandere, kuudere, dandere) (default: tsundere and cute): {Fore.RESET}").strip()
    else:
        personality = input(f"{Fore.CYAN}Kepribadian (contoh: tsundere, yandere, kuudere, dandere) (default: tsundere dan imut): {Fore.RESET}").strip()
    if personality:
        config["personality"] = personality
        
    # Knowledge
    if language == "en":
        knowledge = input(f"{Fore.CYAN}Knowledge about (default: anime, manga, and Japanese culture): {Fore.RESET}").strip()
    else:
        knowledge = input(f"{Fore.CYAN}Pengetahuan tentang (default: anime, manga, dan budaya Jepang): {Fore.RESET}").strip()
    if knowledge:
        config["knowledge"] = knowledge

    # User limitations
    if language == "en":
        user_name = input(f"{Fore.CYAN}Your nickname (default: codewithwan): {Fore.RESET}").strip()
    else:
        user_name = input(f"{Fore.CYAN}Nama panggilan untuk kamu (default: codewithwan): {Fore.RESET}").strip()
    if user_name:
        config["user_name"] = user_name
        
    return config

def print_anime_help(language):
    """
    Display help information in an anime style.
    
    Args:
        language (str): The language code ("id" for Indonesian, "en" for English).
    """
    if language == "en":
        help_text = f"""
{Fore.YELLOW}=== Available Commands ===

{Fore.CYAN}/exit        {Fore.RESET}- Exit the program
{Fore.CYAN}/save        {Fore.RESET}- Save the conversation history
{Fore.CYAN}/config      {Fore.RESET}- Change the anime character configuration
{Fore.CYAN}/clear       {Fore.RESET}- Clear the console screen
{Fore.CYAN}/help        {Fore.RESET}- Display this help menu

{Fore.YELLOW}=== Usage Tips ===
{Fore.RESET}• You can talk to the anime AI character by typing regular messages
{Fore.RESET}• The AI character will respond in a typical anime style
{Fore.RESET}• Try asking about anime, manga, or other topics!
"""
    else:
        help_text = f"""
{Fore.YELLOW}=== Perintah yang Tersedia ===

{Fore.CYAN}/keluar      {Fore.RESET}- Keluar dari program
{Fore.CYAN}/simpan      {Fore.RESET}- Menyimpan riwayat percakapan
{Fore.CYAN}/config      {Fore.RESET}- Mengubah konfigurasi karakter anime
{Fore.CYAN}/bersihkan   {Fore.RESET}- Membersihkan layar konsol
{Fore.CYAN}/bantuan     {Fore.RESET}- Menampilkan menu bantuan ini

{Fore.YELLOW}=== Tips Penggunaan ===
{Fore.RESET}• Kamu bisa berbicara dengan karakter anime AI dengan mengetik pesan biasa
{Fore.RESET}• Karakter AI akan merespon dengan gaya bicara khas anime
{Fore.RESET}• Coba tanyakan tentang anime, manga, atau topik lainnya!
"""
    print(help_text)

# Main program
if __name__ == "__main__":
    # Clear the screen
    clear_screen()
    
    # Choose the language
    language = interactive_language_selection()
    clear_screen()
    
    # Display the anime banner
    print_anime_banner(language)
    
    # Display the welcome message
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print_typing_animation(f"Tanggal: {current_date}", delay=0.01, color=Fore.GREEN)
    if language == "en":
        print_typing_animation("Welcome to Anime AI Assistant! (◕‿◕)", delay=0.03, color=Fore.MAGENTA)
        print_typing_animation("This program will provide you with an AI assistant in a cute and expressive anime style!", delay=0.02, color=Fore.CYAN)
    else:
        print_typing_animation("Selamat datang di Anime AI Assistant! (◕‿◕)", delay=0.03, color=Fore.MAGENTA)
        print_typing_animation("Program ini akan memberi kamu asisten AI dengan gaya anime yang imut dan ekspresif!", delay=0.02, color=Fore.CYAN)
    print()
    
    # Set up the anime AI assistant
    if language == "en":
        use_custom = input(f"{Fore.YELLOW}Do you want to set up your custom anime character? (y/n, default: n): {Fore.RESET}").lower() == 'y'
    else:
        use_custom = input(f"{Fore.YELLOW}Apakah kamu ingin mengatur karakter anime kustommu? (y/n, default: n): {Fore.RESET}").lower() == 'y'
    
    if use_custom:
        # Set up a custom anime character
        config = interactive_anime_config(language)
        ai = AnimeAI(config)
        if language == "en":
            print_typing_animation(f"\n{Fore.MAGENTA}Anime AI '{ai.config['name']}' is ready to accompany you! (≧◡≦)", delay=0.02)
        else:
            print_typing_animation(f"\n{Fore.MAGENTA}AI Anime '{ai.config['name']}' sudah siap menemanimu! (≧◡≦)", delay=0.02)
    else:
        # Use the default anime character
        ai = AnimeAI({"user_name": "codewithwan"})
        if language == "en":
            print_typing_animation(f"\n{Fore.MAGENTA}Anime AI '{ai.config['name']}' is ready with the default configuration! {ai.get_random_emoji()}", delay=0.02)
        else:
            print_typing_animation(f"\n{Fore.MAGENTA}AI Anime '{ai.config['name']}' siap dengan konfigurasi default! {ai.get_random_emoji()}", delay=0.02)
    
    while True:
        user_input = input(f"{Fore.CYAN}{ai.user_name}: {Fore.RESET}").strip()
        
        if user_input.lower() in ["/keluar", "/exit"]:
            if language == "en":
                print_typing_animation(f"Goodbye, {ai.user_name}-kun! (｡♥‿♥｡)", delay=0.03, color=Fore.MAGENTA)
            else:
                print_typing_animation(f"Sampai jumpa, {ai.user_name}-kun! (｡♥‿♥｡)", delay=0.03, color=Fore.MAGENTA)
            break
        elif user_input.lower() in ["/simpan", "/save"]:
            ai.save_conversation()
            if language == "en":
                print_typing_animation("Conversation history has been saved! (≧◡≦)", delay=0.03, color=Fore.GREEN)
            else:
                print_typing_animation("Riwayat percakapan telah disimpan! (≧◡≦)", delay=0.03, color=Fore.GREEN)
        elif user_input.lower() == "/config":
            new_config = interactive_anime_config(language)
            ai.update_config(new_config)
            if language == "en":
                print_typing_animation(f"Configuration has been updated! {ai.get_random_emoji()}", delay=0.03, color=Fore.GREEN)
            else:
                print_typing_animation(f"Konfigurasi telah diperbarui! {ai.get_random_emoji()}", delay=0.03, color=Fore.GREEN)
        elif user_input.lower() in ["/bersihkan", "/clear"]:
            clear_screen()
            print_anime_banner(language)
        elif user_input.lower() in ["/bantuan", "/help"]:
            print_anime_help(language)
        else:
            response = ai.ask(user_input)
            print_typing_animation(f"{ai.config['name']}: {response}", delay=0.03, color=Fore.MAGENTA)
