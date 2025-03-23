package v1

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/gofiber/fiber/v2"
)

type BratBrowser struct {
	Ctx context.Context
}

type BratParams struct {
	Text string `query:"text"`
}

const (
	BRAT string = "https://www.bratgenerator.com/"
)

var BR *BratBrowser = NewBratBrowser()

// textOverlay

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Brat generator",
		Endpoint:    "/brat",
		Method:      "GET",
		Description: "Brat generator super cepat",
		Params: map[string]interface{}{
			"text": "Lorem ipsum sit dolor amet",
		},
		Type: "",
		Body: map[string]interface{}{},

		Code: func(c *fiber.Ctx) error {
			params := new(BratParams)

			if err := c.QueryParser(params); err != nil {
				return c.Status(200).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan query text!",
				})
			}

			if params.Text == "" {
				return c.Status(200).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan query text!",
				})
			}

			brat := BR.bratGen(params.Text)

			c.Response().Header.Set("Content-Type", "image/jpeg")

			return c.Status(200).Send(brat)
		},
	})
}

func NewBratBrowser() *BratBrowser {
	fmt.Println("[ BRAT ] Membuka browser...")

	opts := append(
		chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", true),
		chromedp.Flag("disable-gpu", true),
		chromedp.Flag("disable-software-rasterizer", true),
		chromedp.Flag("no-sandbox", true),
		chromedp.Flag("disable-dev-shm-usage", true),
	)
	ctx, _ := chromedp.NewExecAllocator(context.Background(), opts...)
	ctx, _ = chromedp.NewContext(ctx)

	go func() {
		err := chromedp.Run(ctx,
			chromedp.Navigate(BRAT),
		)

		if err != nil {
			fmt.Println(err)
		}
	}()

	time.Sleep(20 * time.Second)
	fmt.Println("Apakah?")

	err := chromedp.Run(ctx,
		chromedp.MouseEvent(
			"mouseMoved",
			float64(300),
			float64(200),
		),
		chromedp.MouseClickXY(float64(20), float64(200)),
		chromedp.MouseEvent(
			"mouseMoved",
			float64(100),
			float64(20),
		),
		chromedp.MouseClickXY(float64(400), float64(20)),
		chromedp.MouseEvent(
			"mouseMoved",
			float64(30),
			float64(400),
		),
		chromedp.MouseClickXY(float64(23), float64(68)),
		// chromedp.WaitVisible("#onetrust-accept-btn-handler", chromedp.ByID),
		// chromedp.Sleep(2*time.Second),
		// chromedp.Click("#onetrust-accept-btn-handler", chromedp.ByID),
		chromedp.Evaluate(`window.stop();`, nil),
		chromedp.Sleep(2*time.Second),
		chromedp.WaitVisible("#toggleButtonWhite", chromedp.ByID),
		chromedp.Click("#toggleButtonWhite", chromedp.ByID),
		chromedp.WaitVisible("#textInput", chromedp.ByID),
		chromedp.WaitVisible("#textOverlay", chromedp.ByID),
		// chromedp.FullScreenshot(&screenByte, 100),
	)

	if err != nil {
		fmt.Println(err)
	}

	return &BratBrowser{
		Ctx: ctx,
	}
}

func (br BratBrowser) bratGen(text string) []byte {
	var screenByte []byte
	first := text[:len([]rune(text))-1]
	last := text[len([]rune(text))-1:]
	chromedp.Run(br.Ctx,
		chromedp.Evaluate(`document.getElementById("textInput").value = ""`, nil),
		chromedp.Evaluate(fmt.Sprintf(`document.getElementById("textInput").value = "%s"`, first), nil),
		chromedp.SendKeys("#textInput", last, chromedp.ByID),
		chromedp.FullScreenshot(&screenByte, 100),
		chromedp.Screenshot("#textOverlay", &screenByte, chromedp.ByID),
	)

	return screenByte
}

func (br BratBrowser) bratVidGen(text string) [][]byte {
	var screenByte [][]byte
	for _, c := range strings.Split(text, " ") {
		var tmp []byte
		first := c[:len([]rune(c))-1]
		last := c[len([]rune(c))-1:]
		chromedp.Run(br.Ctx,
			chromedp.Evaluate(`document.getElementById("textInput").value = ""`, nil),
			chromedp.Evaluate(fmt.Sprintf(`document.getElementById("textInput").value = "%s"`, first), nil),
			chromedp.SendKeys("#textInput", last, chromedp.ByID),
			chromedp.Screenshot("#textOverlay", &tmp, chromedp.ByID),
		)
		screenByte = append(screenByte, tmp)
	}

	return screenByte
}
