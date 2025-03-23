package v1

// import (
// 	"context"
// 	"fmt"
// 	"time"

// 	"github.com/chromedp/cdproto/runtime"
// 	"github.com/chromedp/chromedp"
// 	"github.com/gofiber/fiber/v2"
// )

// const (
// 	HUTAO string = "https://hutatools.my.id/"
// )

// type browserCache struct {
// 	Ctx context.Context
// }

// // var TK *browserCache = NewBrowserCache()

// func init() {
// 	NewRegister.RegisterProvider(RegisterComponent{
// 		Title:       "Hutao Auth",
// 		Endpoint:    "/hutao",
// 		Method:      "GET",
// 		Description: "Mendapatkan token auth hutao tools",
// 		Params:      map[string]interface{}{},
// 		Type:        "",
// 		Body:        map[string]interface{}{},
// 		Skip:        true,

// 		Code: func(c *fiber.Ctx) error {
// 			// token := TK.GetHutao()

// 			return c.Status(200).JSON(fiber.Map{
// 				// "token": token,
// 			})
// 		},
// 	})
// }

// func NewBrowserCache() *browserCache {
// 	fmt.Println("[ CLASS ] Init hutao class...")

// 	ctx, _ := chromedp.NewContext(context.Background())

// 	err := chromedp.Run(ctx,
// 		chromedp.Navigate(HUTAO),
// 		chromedp.Sleep(5*time.Second),
// 	)

// 	if err != nil {
// 		fmt.Println(err)
// 	}

// 	return &browserCache{
// 		Ctx: ctx,
// 	}
// }

// func (br browserCache) GetHutao() string {
// 	js := `new Promise((resolve) => grecaptcha.execute('6Leq1_MqAAAAACwlehaGmM2-6x4U5_2WU1Wt4hnH', { action: 'submit' }).then(token => resolve(token)));`

// 	var res string
// 	err := chromedp.Run(br.Ctx,
// 		chromedp.Evaluate(js, &res, func(p *runtime.EvaluateParams) *runtime.EvaluateParams {
// 			return p.WithAwaitPromise(true)
// 		}),
// 	)
// 	if err != nil {
// 		fmt.Println(err)
// 	}

// 	return res
// }
