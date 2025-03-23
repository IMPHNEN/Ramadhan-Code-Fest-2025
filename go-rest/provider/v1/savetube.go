package v1

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"regexp"
	"net/http"

	"down/helper"

	"github.com/gofiber/fiber/v2"
)

type SaveTubeResponse struct {
	ID            string `json:"id,omitempty"`
	Key           string `json:"key,omitempty"`
	URL           string `json:"url,omitempty"`
	Title         string `json:"title,omitempty"`
	TitleSlug     string `json:"titleSlug,omitempty"`
	Thumbnail     string `json:"thumbnail,omitempty"`
	Duration      int    `json:"duration,omitempty"`
	DurationLabel string `json:"durationLabel,omitempty"`
	AudioFormats  []struct {
		Quality int         `json:"quality,omitempty"`
		URL     interface{} `json:"url,omitempty"`
		Label   string      `json:"label,omitempty"`
	} `json:"audio_formats,omitempty"`
	VideoFormats []struct {
		Height          int         `json:"height,omitempty"`
		Width           int         `json:"width,omitempty"`
		URL             interface{} `json:"url,omitempty"`
		Quality         int         `json:"quality,omitempty"`
		Label           string      `json:"label,omitempty"`
		DefaultSelected int         `json:"default_selected,omitempty"`
	} `json:"video_formats,omitempty"`
	ThumbnailFormats []struct {
		Label   string `json:"label,omitempty"`
		Quality string `json:"quality,omitempty"`
		Value   string `json:"value,omitempty"`
		URL     string `json:"url,omitempty"`
	} `json:"thumbnail_formats,omitempty"`
	DefaultSelected int    `json:"default_selected,omitempty"`
	FromCache       bool   `json:"fromCache,omitempty"`
	Error           string `json:"error,omitempty"`
}

type EncryptResponse struct {
	Data    string `json:"data"`
	Message string `json:"message"`
	Status  bool   `json:"status"`
}

var RANDOM_CDN string = "https://media.savetube.me/api/random-cdn"
var SECRET_KEY string = "C5D58EF67A7584E4A29F6C35BBC4EB12"
var REG_SEC *regexp.Regexp = regexp.MustCompile(`(?i)[\dA-F]{2}`)

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "SaveTube",
		Endpoint:    "/savetube",
		Method:      "GET",
		Description: "Youtube downloader | 360p only!",
		Params: map[string]interface{}{
			"url": "url youtube",
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

			yt := ytDownload(params.Url)

			return c.Status(200).JSON(yt)
		},
	})
}

func ytDownload(ytlink string) *SaveTubeResponse {
	cdn := _getRandomCdn()
	value, err := _getLinkDL(cdn, ytlink)
	if err != nil {
		return &SaveTubeResponse{
			Error: "Terjadi kesalahan saat mengunduh video, kemungkinan video ini bersifat private.",
		}
	}
	decb, err := base64.StdEncoding.DecodeString(value)
	if err != nil {
		fmt.Println(err)
	}
	if len(decb) < 15 {
		fmt.Println("Error saat mendecode base64")
	}
	iv := decb[:16]
	data := decb[16:]
	hx, err := hex.DecodeString(SECRET_KEY)
	if err != nil {
		fmt.Println(err)
	}
	block, err := aes.NewCipher(hx)
	if err != nil {
		fmt.Println(err)
	}

	cip := cipher.NewCBCDecrypter(block, iv)
	plaintext := make([]byte, len(data))
	cip.CryptBlocks(plaintext, data)

	paddingLen := int(plaintext[len(plaintext)-1])
	plaintext = plaintext[:len(plaintext)-paddingLen]

	var jsn SaveTubeResponse
	err = json.Unmarshal(plaintext, &jsn)
	if err != nil {
		fmt.Println(err)
	}

	return &jsn
}

func _getRandomCdn() string {
	res, err := helper.Request(RANDOM_CDN, "GET", nil, nil)
	if err != nil {
		fmt.Println(err)
	}

	var cdn struct {
		Cdn string `json:"cdn"`
	}

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	err = json.Unmarshal(ctt, &cdn)
	if err != nil {
		fmt.Println("Gagal parse json")
	}

	return cdn.Cdn
}

func _getLinkDL(cdn, ytlink string) (string, error) {
	payload := map[string]string{
		"url": ytlink,
	}
	jsm, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	head := http.Header{}
	head.Set("Content-Type", "application/json")
	res, err := helper.Request(fmt.Sprintf("https://%s/v2/info", cdn), "POST", bytes.NewReader(jsm), head)
	if err != nil {
		fmt.Println(err)
	}

	var js EncryptResponse

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	err = json.Unmarshal(ctt, &js)
	if err != nil {
		fmt.Println(err)
	}
	if !js.Status {
		return "", fmt.Errorf("gagal mengunduh, kemungkinan video bersifat private")
	}

	return js.Data, nil
}
