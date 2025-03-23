package v1

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"down/helper"

	"github.com/gofiber/fiber/v2"
)

var ANIM_SEARCH string = "https://prod.animeplay.dev/items/series?"
var IP string = "http://ip-api.com/json/?fields=61439"

var JWT string = "fahmixd404@gmail.com"
var KEY []byte = []byte("b4c88e94b909a53f322c1da8699d310e")
var IV []byte = []byte("hxNg4rQ-xvXPQatt")

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Animeplay",
		Endpoint:    "/anime-play",
		Method:      "GET",
		Description: "Mendapatkan anime, info dari aplikasi animeplay",
		Params: map[string]interface{}{
			"q": "Giji harem",
			"limit": "25",
			"page": "1",
		},
		Type: "",
		Body: map[string]interface{}{},

		Code: func(c *fiber.Ctx) error {
			params := new(SearchQuery)

			if err := c.QueryParser(params); err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan query 'q', 'limit', dan 'page'!",
				})
			}

			if params.Q == "" || params.Limit == "" || params.Page == "" {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan query 'q', 'limit', dan 'page'!",
				})
			}

			result := search(params.Q, params.Limit, params.Page)

			return c.Status(200).JSON(result)
		},
	})
}

func search(q, l, p string) map[string]interface{} {
	args := &url.Values{}
	args.Set("search", q)
	args.Set("page", p)
	args.Set("sort", "title")
	args.Set("fields", "id,title,rating,latest_episode,image_url,broadcast,type,date_created")
	args.Set("limit", l)
	args.Set("filter%5Bstatus%5D%5B_eq%5D", "published")

	head := &http.Header{}
	head.Set("Accept", "*/*")
	head.Set("User-Agent", "AnimePlay/1.1.4 (Android 30) 21121119SG/Xiaomi")
	head.Set("Authorization", "Bearer W6BfD32COp61fZenIQuBak7cJJVPGRbF2os5LYkMLPo=")
	head.Set("Connection", "Keep-Alive")
	head.Set("Host", "prod.animeplay.dev")
	head.Set("installed_from_play_store", "true")
	head.Set("Session-Info", getSessionInfo())
	
	res, err := helper.Request(ANIM_SEARCH + args.Encode(), "GET", nil, *head)
	if err != nil {
		fmt.Println(err)
	}

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	var jsn map[string]interface{}
	_ = json.Unmarshal([]byte(decrypt(string(ctt))), &jsn)

	return jsn
}

func getIpinfo() string {
	res, err := helper.Request(IP, "GET", nil, nil)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	serial, _ := json.Marshal(string(ctt))

	return string(serial)
}

func getSessionInfo() string {
	payload := map[string]interface{}{
		"created_at":                time.Now().Format("2006-01-02 15:04:05"),
		"installed_from_play_store": true,
		"ip_info":                   getIpinfo(),
		"version_code":              143,
		"version_name":              "1.1.4",
	}

	serial, _ := json.Marshal(payload)

	return encrypt(string(serial))
}

func decrypt(enc string) string {
	decodeText, err := base64.StdEncoding.DecodeString(enc)
	if err != nil {
		fmt.Println(err)
	}

	plaintext := make([]byte, len(decodeText))
	block, _ := aes.NewCipher(KEY)

	cipher := cipher.NewCBCDecrypter(block, IV)
	cipher.CryptBlocks(plaintext, decodeText)

	paddingLen := int(plaintext[len(plaintext)-1])
	plaintext = plaintext[:len(plaintext)-paddingLen]

	return string(plaintext)
}

func padPKCS7(data []byte, blockSize int) []byte {
	padding := blockSize - len(data)%blockSize
	padText := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(data, padText...)
}

func encrypt(data string) string {
	block, _ := aes.NewCipher(KEY)

	plaintext := padPKCS7([]byte(data), block.BlockSize())

	var res []byte = make([]byte, len([]byte(plaintext)))
	cipher := cipher.NewCBCEncrypter(block, IV)
	cipher.CryptBlocks(res, []byte(plaintext))

	return base64.StdEncoding.EncodeToString(res)
}
