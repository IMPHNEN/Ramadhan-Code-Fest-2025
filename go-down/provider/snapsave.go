package provider

import (
	"bytes"
	"fmt"
	"io"
	// "math/rand"
	"net/http"
	"mime/multipart"

	"down/helper"

	"github.com/dop251/goja"
	"github.com/gofiber/fiber/v2"
)

var SNAP_API = "https://snapsave.app/id/action.php?lang=id"

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Snapsave",
		Endpoint:    "/snapsave",
		Method:      "GET",
		Description: "Instagram downloader",
		Params: map[string]interface{}{
			"url": "url video atau fotonya",
		},
		Type: "",
		Body: make(map[string]interface{}),

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

			instaDown(params.Url)

			return c.Status(200).SendString("Testing")
		},
	})
}

// func random(length int) string {
// 	var result string
// 	for range length {
// 		result += string("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[rand.Intn(62)])
// 	}

// 	return result
// }

func runVm(code string) {
	container := `
	function container(code) {
		return new Promise(resolve => {
			eval(code.replace("eval", "resolve"))
		})
	}`
	vm := goja.New()
	_, err := vm.RunString(container)
	if err != nil {
		fmt.Println(err)
	}

	v, ok := goja.AssertFunction(vm.Get("container"))
	if !ok {
		fmt.Println("Not a function")
	}

	promise, err := v(goja.Undefined(), vm.ToValue(code))
	if err != nil {
		fmt.Println(err)
	}

	var str string
	if p, ok := promise.Export().(*goja.Promise); ok {
		switch p.State() {
		case goja.PromiseStateFulfilled:
			str = p.Result().String()
		}
	}

	fmt.Println(str)
}

func instaDown(link string) {
	var reqs bytes.Buffer
	writter := multipart.NewWriter(&reqs)

	_ = writter.WriteField("url", link)

	head := http.Header{}
	head.Set("Content-Type", writter.FormDataContentType())

	res, err := helper.Request(SNAP_API, "POST", &reqs, head)
	if err != nil {
		fmt.Println(err)
	}

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	runVm(string(ctt))
}
