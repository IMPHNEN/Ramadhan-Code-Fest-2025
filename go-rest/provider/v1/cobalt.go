package v1

// import (
// 	"context"
// 	"fmt"
// 	"time"

// 	cu "github.com/Davincible/chromedp-undetected"
// 	"github.com/chromedp/chromedp"
// 	"github.com/gofiber/fiber/v2"
// )

// const (
// 	COBALT string = "https://cobalt.tools/"
// )

// type browserCacheCobalt struct {
// 	Ctx       context.Context
// 	Turnstile string
// }

// // var CB *browserCacheCobalt = NewBrowserCacheCobalt()

// func init() {
// 	NewRegister.RegisterProvider(RegisterComponent{
// 		Title:       "Cobalt cloudflare",
// 		Endpoint:    "/cobalt",
// 		Method:      "GET",
// 		Description: "Mendapatkan token cobalt cloudflare",
// 		Params:      map[string]interface{}{},
// 		Type:        "",
// 		Body:        map[string]interface{}{},
// 		Skip:        true,

// 		Code: func(c *fiber.Ctx) error {
// 			// token := CB.GetCobalt()

// 			return c.Status(200).JSON(fiber.Map{
// 				// "token": token,
// 			})
// 		},
// 	})
// }

// func NewBrowserCacheCobalt() *browserCacheCobalt {
// 	fmt.Println("[ CLASS ] Init cobalt class...")

// 	ctx, _, err := cu.New(cu.NewConfig(
// 	// cu.WithHeadless(),
// 	))
// 	if err != nil {
// 		fmt.Println(err)
// 	}

// 	// download-button
// 	// link-area
// 	// https://youtu.be/KoB2cqmYZNg?si=V1pvccBFB1boSKlK
// 	// button elevated popup-button

// 	if err := chromedp.Run(ctx,
// 		chromedp.Navigate(COBALT),
// 		chromedp.MouseEvent(
// 			"mouseMoved",
// 			float64(300),
// 			float64(200),
// 		),
// 		chromedp.WaitVisible("#link-area", chromedp.ByID),
// 		chromedp.MouseEvent(
// 			"mouseMoved",
// 			float64(400),
// 			float64(200),
// 		),
// 		cu.SendKeys("#link-area", "https://youtu.be/KoB2cqmYZNg", chromedp.ByID),
// 		chromedp.MouseEvent(
// 			"mouseMoved",
// 			float64(400),
// 			float64(400),
// 		),
// 		chromedp.Click("#download-button", chromedp.ByID),
// 		chromedp.MouseEvent(
// 			"mouseMoved",
// 			float64(0),
// 			float64(10),
// 		),
// 		chromedp.WaitVisible(".button.elevated.popup-button", chromedp.ByQuery),
// 		chromedp.Sleep(2*time.Second),
// 		chromedp.MouseEvent(
// 			"mouseMoved",
// 			float64(300),
// 			float64(200),
// 		),
// 		chromedp.Sleep(1*time.Second),
// 		chromedp.MouseEvent(
// 			"mouseMoved",
// 			float64(300),
// 			float64(300),
// 		),
// 		chromedp.Click(".button.elevated.popup-button", chromedp.ByQuery),
// 		chromedp.MouseEvent(
// 			"mouseMoved",
// 			float64(100),
// 			float64(300),
// 		),
// 	); err != nil {
// 		fmt.Println(err)
// 	}

// 	return &browserCacheCobalt{
// 		Ctx:       ctx,
// 		Turnstile: "",
// 	}
// }

// func (br *browserCacheCobalt) GetCobalt() string {
// 	var ress string
// 	if err := chromedp.Run(br.Ctx,
// 		chromedp.ActionFunc(func(ctx context.Context) error {
// 			var res string
// 			timeout := time.After(2 * time.Minute)
// 			ticker := time.NewTicker(5 * time.Second)

// 			defer ticker.Stop()

// 			for {
// 				select {
// 				case <-timeout:
// 					fmt.Println("Timeout: Tidak mendapatkan response turnstile")
// 					return fmt.Errorf("turnstile response timeout")
// 				case <-ticker.C:
// 					err := chromedp.Run(ctx, chromedp.Evaluate("window?.turnstile?.getResponse()", &res))
// 					if err != nil {
// 						fmt.Println("Error Evaluating:", err)
// 						continue
// 					}

// 					if res != "" {
// 						ress = res
// 						return nil
// 					}
// 				}
// 			}
// 		}),
// 	); err != nil {
// 		fmt.Println(err)
// 	}

// 	br.Turnstile = ress

// 	if br.Turnstile != "" {
// 		fmt.Println(ress)
// 		return br.Turnstile
// 	}

// 	return ""
// }

// func (br browserCacheCobalt) Reset() {
// 	fmt.Println("[ COBALT ] RESET ...")
// 	if err := chromedp.Run(br.Ctx,
// 		chromedp.Evaluate("window.turnstile.reset()", nil),
// 	); err != nil {
// 		fmt.Println(err)
// 	}

// 	br.GetCobalt()
// }
