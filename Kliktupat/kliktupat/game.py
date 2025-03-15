import pyxel

SCREEN_WIDTH = 160
SCREEN_HEIGHT = 120
KETUPAT_INTERVAL = 30
START_SCENE = "start"
PLAY_SCENE = "play"

class Ketupat:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size

    def randomize(self):
        self.x = pyxel.rndi(0, SCREEN_WIDTH - self.size)
        self.y = pyxel.rndi(0, SCREEN_HEIGHT - self.size)

    def draw(self):
        pyxel.blt(self.x, self.y, 0, 16, 0, self.size, self.size, pyxel.COLOR_BLACK)

class App:
    def __init__(self):
        pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT, title="Kliktupat")
        pyxel.mouse(True)
        pyxel.load("saus.pyxres")
        self.current_scene = START_SCENE
        self.ketupat_size = 16
        self.ketupats = []
        self.score = 0
        self.spawn_interval = KETUPAT_INTERVAL
        self.miss = 0
        self.max_miss = 3
        self.is_muted = False
        pyxel.playm(0, loop=True)
        pyxel.run(self.update, self.draw)

    def reset_game(self):
        self.ketupats.clear()
        self.score = 0
        self.spawn_interval = KETUPAT_INTERVAL
        self.miss = 0
        self.current_scene = PLAY_SCENE
        if not self.is_muted:
            pyxel.playm(1, loop=True)

    def update_start_scene(self):
        if pyxel.btnp(pyxel.MOUSE_BUTTON_LEFT):
            if (5 <= pyxel.mouse_x <= 40 and 
                SCREEN_HEIGHT - 20 <= pyxel.mouse_y <= SCREEN_HEIGHT - 5):
                self.is_muted = not self.is_muted
                if self.is_muted:
                    pyxel.stop()
                else:
                    pyxel.playm(0, loop=True)
            else:
                self.reset_game()

    def update_play_scene(self):
        self.spawn_interval = max(15, KETUPAT_INTERVAL - (self.score // 10) * 2)
            
        if pyxel.frame_count % self.spawn_interval == 0:
            new_ketupat = Ketupat(0, 0, self.ketupat_size)
            new_ketupat.randomize()
            self.ketupats.append(new_ketupat)
        
        if pyxel.btnp(pyxel.MOUSE_BUTTON_LEFT):
            clicked_ketupat = False
            for ketupat in self.ketupats.copy():
                if (ketupat.x <= pyxel.mouse_x <= ketupat.x + ketupat.size and
                    ketupat.y <= pyxel.mouse_y <= ketupat.y + ketupat.size):
                    clicked_ketupat = True
                    self.ketupats.remove(ketupat)
                    self.score += 1
                    if not self.is_muted:
                        pyxel.play(1, 2)
                    break
            if not clicked_ketupat:
                self.miss += 1
                if self.miss >= self.max_miss:
                    self.current_scene = START_SCENE
                    pyxel.stop()
                    if not self.is_muted:
                        pyxel.playm(0, loop=True)

    def update(self):
        if pyxel.btnp(pyxel.KEY_ESCAPE):
            pyxel.quit()

        if self.current_scene == START_SCENE:
            self.update_start_scene()
        elif self.current_scene == PLAY_SCENE:
            self.update_play_scene()

    def draw_start_scene(self):
        pyxel.cls(pyxel.COLOR_LIME)
        pyxel.text(SCREEN_WIDTH // 2 - 32, SCREEN_HEIGHT // 2 - 10, "| Kliktupat", pyxel.COLOR_WHITE)
        if pyxel.frame_count % 30 < 15:
            pyxel.text(SCREEN_WIDTH // 2 - 32, SCREEN_HEIGHT // 2, "| Click to Start", pyxel.COLOR_GREEN)
        if self.score > 0:
            pyxel.text(SCREEN_WIDTH // 2 - 32, SCREEN_HEIGHT // 2 + 10, f"| Last Score: {self.score}", pyxel.COLOR_WHITE)
        mute_text = "Mute" if not self.is_muted else "Unmute"
        pyxel.text(5, SCREEN_HEIGHT - 10, mute_text, pyxel.COLOR_WHITE)
    def draw_play_scene(self):
        pyxel.cls(pyxel.COLOR_YELLOW)
        
        for ketupat in self.ketupats:
            ketupat.draw()
            
        pyxel.text(5, 5, f"Score: {self.score}", pyxel.COLOR_WHITE)
        pyxel.text(5, 15, f"Miss: {self.miss}/{self.max_miss}", pyxel.COLOR_WHITE)

    def draw(self):
        if self.current_scene == START_SCENE:
            self.draw_start_scene()
        elif self.current_scene == PLAY_SCENE:
            self.draw_play_scene()

App()