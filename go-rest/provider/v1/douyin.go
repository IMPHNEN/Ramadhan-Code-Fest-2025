package v1

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"regexp"
	"encoding/json"
	"strings"
	"os/exec"

	"down/helper"

	"github.com/gofiber/fiber/v2"
)

const (
	DOUYIN string = "https://www.douyin.com/aweme/v1/web/aweme/detail/"
)

var (
	REG_AWEME *regexp.Regexp = regexp.MustCompile(`(?i)video\/(\d+)\/`)
)

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Douyin download",
		Endpoint:    "/douyin",
		Method:      "GET",
		Description: "Mendownload video dari website douyin",
		Params: map[string]interface{}{
			"url": "https://v.douyin.com/i5srBkFu/",
		},
		Type: "",
		Body: map[string]interface{}{},

		Code: func(c *fiber.Ctx) error {
			params := new(UrlQuery)

			if err := c.QueryParser(params); err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan url yang valid!",
				})
			}

			if params.Url == "" {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan url yang valid!",
				})
			}

			result := downloadDouyin(params.Url)

			return c.Status(200).JSON(result)
		},
	})
}

func getAwemeId(link string) string {
	head := http.Header{}
	head.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
	head.Add("Content-Type", "application/json")

	res, _ := helper.Request(link, "GET", nil, head, true)
	redi, _ := url.Parse(res.Header.Get("Location"))
	math := REG_AWEME.FindStringSubmatch(redi.Path)

	return math[1]
}

func encodeUrl(params []struct {
	Key   string
	Value string
}) string {
	var parts []string
	for _, param := range params {
		parts = append(parts, param.Key+"="+param.Value)
	}
	return strings.Join(parts, "&")
}

func getAbogusToken(awemeId string) string {
	exe := exec.Command("python", "service/abogus.py", awemeId)
	std, _ := exe.CombinedOutput()
	fmt.Println(string(std))

	return string(std)
}

func downloadDouyin(link string) map[string]interface{} {
	awemeId := getAwemeId(link)
	params := []struct {
		Key   string
		Value string
	}{
		{"device_platform", "webapp"},
		{"aid", "6383"},
		{"channel", "channel_pc_web"},
		{"pc_client_type", "1"},
		{"version_code", "190500"},
		{"version_name", "19.5.0"},
		{"cookie_enabled", "true"},
		{"browser_language", "zh-CN"},
		{"browser_platform", "Win32"},
		{"browser_name", "Firefox"},
		{"browser_online", "true"},
		{"engine_name", "Gecko"},
		{"os_name", "Windows"},
		{"os_version", "10"},
		{"platform", "PC"},
		{"screen_width", "1920"},
		{"screen_height", "1080"},
		{"browser_version", "124.0"},
		{"engine_version", "122.0.0.0"},
		{"cpu_core_num", "12"},
		{"device_memory", "8"},
		{"aweme_id", awemeId},
	}
	encd := encodeUrl(params)
	
	abogus := strings.TrimSpace(getAbogusToken(awemeId))
	params = append(params, struct{Key string; Value string}{"a_bogus", abogus})
	encd = encodeUrl(params)

	head := http.Header{}
	head.Add("Accept-Language", "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2")
	head.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
	head.Add("Referer", "https://www.douyin.com/")
	head.Add("Cookie", "ttwid=1%7Cf2En73Zb9L_Os8D1OmbVuUmNSZz_vN6AlI5XQ9wsFlI%7C1739674384%7C931abdef52b78449685d1bb088f95d3106596c346758560164017dac7b226e52;UIFID_TEMP=5a0fbbb49c6c57acd77ca86d66dd2e8e2f1fcf7b3fa6b8a56e480f684bd0858970f18035bc217e04fdc30ffb1feffa1f4c24c4747c2e9d0a77b828533f4fea4e514ca2296c5a8c8989fbc62760943fd9;fpk1=U2FsdGVkX19EdL3pPCC3awA8UJk35x2HCLSgBZJHbx5/62OW9C408MCFysLNdLtjPizuRfFZlvcdgJ8VKbm50w==;fpk2=41770e408d453f0e18b6cf535e220c84;passport_csrf_token=7b9b3fd406d48ebc7d0957232188da12;passport_csrf_token_default=7b9b3fd406d48ebc7d0957232188da12;UIFID=5a0fbbb49c6c57acd77ca86d66dd2e8e2f1fcf7b3fa6b8a56e480f684bd0858970f18035bc217e04fdc30ffb1feffa1f7bf5e4cc435f3a96da0367bddd378e8af65cd87ad07563f70c5d4cfc803d111c7b6c6f7896798d2b061824c3264c790f74a4069bcb8a540b4de6c9bb8cedd93fb12cf7b4de0261ba95e5e3a00a3734f56dd1bbc021ca080f972653b1f5f217938b9998fd5e22f546b2689141589af72c;__security_mc_1_s_sdk_cert_key=ef0225ec-4daa-91d3;__security_mc_1_s_sdk_sign_data_key_web_protect=8fe1d29e-4be5-af92;__security_mc_1_s_sdk_crypt_sdk=73887f2c-4d12-be08;bd_ticket_guard_client_web_domain=2;__security_mc_1_s_sdk_sign_data_key_sso=b6917533-4ce7-83ff;home_can_add_dy_2_desktop=%220%22;dy_swidth=1366;dy_sheight=768;strategyABtestKey=%221742026866.902%22;odin_tt=0a9fcaa5443364c428e3f848abf6f80f1edeb773860d99e5a97a3a48670bfc3f0db428465c95a21f37c75cdf48f35b0a0ff5dca5889261a9f599e1c1f320db7cc381c1a757ec5b17e71779603b7942d2;FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D;SEARCH_RESULT_LIST_TYPE=%22single%22;xgplayer_user_id=563095733678;download_guide=%223%2F20250315%2F0%22;volume_info=%7B%22isUserMute%22%3Atrue%2C%22isMute%22%3Afalse%2C%22volume%22%3A0%7D;s_v_web_id=verify_m8a7nzcj_c402c538_1795_de0a_cd61_18a7df407275;WallpaperGuide=%7B%22showTime%22%3A1742034335903%2C%22closeTime%22%3A0%2C%22showCount%22%3A1%2C%22cursor1%22%3A16%2C%22cursor2%22%3A4%2C%22hoverTime%22%3A1742044056478%7D;bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCUGJDbm9PTnUwR2pCbkpZNnpQd1ROSFdWU21SVmNrZGZvQmZ2SEVneW12bzZUUE9lTEZKd280eTh0Rm52K1ZlQnF4MDcvem10MWZGWmg1VEMyR25aSEk9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D;stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22;__ac_nonce=067d67be00065c587b6de;__ac_signature=_02B4Z6wo00f01ZQ-u2gAAIDAIYhCNMZQWr2UHr.AAALa43;wkzyjzsbl=136;=douyin.com;xg_device_score=6.026470588235294;device_web_cpu_core=4;device_web_memory_size=8;architecture=amd64;IsDouyinActive=true;stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1366%2C%5C%22screen_height%5C%22%3A768%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A4%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A1.4%2C%5C%22effective_type%5C%22%3A%5C%223g%5C%22%2C%5C%22round_trip_time%5C%22%3A1000%7D%22")

	res, err := helper.Request(fmt.Sprintf("https://www.douyin.com/aweme/v1/web/aweme/detail/?%s", encd), "GET", nil, head)
	if err != nil {
		fmt.Println(err)
	}

	ctt, _ := io.ReadAll(res.Body)

	var jsn map[string]interface{}
	_ = json.Unmarshal(ctt, &jsn)

	return jsn
}
