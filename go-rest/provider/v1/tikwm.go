package v1

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"down/helper"

	"github.com/gofiber/fiber/v2"
)

type ITikWmResult struct {
	Code          int     `json:"code"`
	Msg           string  `json:"msg"`
	ProcessedTime float64 `json:"processed_time"`
	Data          struct {
		ID        string `json:"id"`
		Region    string `json:"region"`
		Title     string `json:"title"`
		Cover     string `json:"cover"`
		Duration  int    `json:"duration"`
		Play      string `json:"play"`
		Wmplay    string `json:"wmplay"`
		Hdplay    string `json:"hdplay"`
		Size      int    `json:"size"`
		WmSize    int    `json:"wm_size"`
		HdSize    int    `json:"hd_size"`
		Music     string `json:"music"`
		MusicInfo struct {
			ID       string `json:"id"`
			Title    string `json:"title"`
			Play     string `json:"play"`
			Author   string `json:"author"`
			Original bool   `json:"original"`
			Duration int    `json:"duration"`
			Album    string `json:"album"`
		} `json:"music_info"`
		PlayCount     int         `json:"play_count"`
		DiggCount     int         `json:"digg_count"`
		CommentCount  int         `json:"comment_count"`
		ShareCount    int         `json:"share_count"`
		DownloadCount int         `json:"download_count"`
		CollectCount  int         `json:"collect_count"`
		CreateTime    int         `json:"create_time"`
		Anchors       interface{} `json:"anchors"`
		AnchorsExtras string      `json:"anchors_extras"`
		IsAd          bool        `json:"is_ad"`
		CommerceInfo  struct {
			AdvPromotable          bool `json:"adv_promotable"`
			AuctionAdInvited       bool `json:"auction_ad_invited"`
			BrandedContentType     int  `json:"branded_content_type"`
			WithCommentFilterWords bool `json:"with_comment_filter_words"`
		} `json:"commerce_info"`
		CommercialVideoInfo string `json:"commercial_video_info"`
		ItemCommentSettings int    `json:"item_comment_settings"`
		MentionedUsers      string `json:"mentioned_users"`
		Author              struct {
			ID       string `json:"id"`
			UniqueID string `json:"unique_id"`
			Nickname string `json:"nickname"`
			Avatar   string `json:"avatar"`
		} `json:"author"`
		Images []string `json:"images,omitempty"`
	} `json:"data"`
}

var TIKWM_BASE string = "https://tikwm.com"
var TIKWM string = "https://tikwm.com/api/"
var Transporter *http.Transport

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Tik WM",
		Endpoint:    "/tikwm",
		Method:      "GET",
		Description: "Tiktok audio & video downloader",
		Params: map[string]interface{}{
			"url": "url tiktokmu",
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

			yt := ttdown(params.Url)

			return c.Status(200).JSON(yt)
		},
	})
}

func ttdown(link string) ITikWmResult {
	args := url.Values{}
	args.Set("url", link)
	args.Set("count", "12")
	args.Set("cursor", "0")
	args.Set("web", "1")
	args.Set("hd", "1")

	req := http.Header{}
	req.Set("authority", "tikwm.com")
	req.Set("accept", "application/json, text/javascript, */*; q=0.01")
	req.Set("accept-language", "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6")
	req.Set("cache-control", "no-cache")
	req.Set("content-type", "application/x-www-form-urlencoded")
	req.Set("cookie", "current_language=en; _ga=GA1.1.488607917.1740887958; _ga_5370HT04Z3=GS1.1.1740887957.1.1.1740888188.0.0.0")
	req.Set("origin", "https://tikwm.com")
	req.Set("pragma", "no-cache")
	req.Set("priority", "u=1, i")
	req.Set("referer", "https://tikwm.com/")
	req.Set("sec-ch-ua", "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"")
	req.Set("sec-ch-ua-mobile", "?0")
	req.Set("sec-ch-ua-platform", "\"Windows\"")
	req.Set("sec-fetch-dest", "empty")
	req.Set("sec-fetch-mode", "cors")
	req.Set("sec-fetch-site", "same-origin")
	req.Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36")
	req.Set("x-requested-with", "XMLHttpRequest")

	res, err := helper.Request(TIKWM+"?"+args.Encode(), "GET", nil, nil)
	if err != nil {
		fmt.Println(err)
	}

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	var jsn ITikWmResult
	err = json.Unmarshal(ctt, &jsn)
	if err != nil {
		fmt.Println(err)
	}

	return jsn
}
