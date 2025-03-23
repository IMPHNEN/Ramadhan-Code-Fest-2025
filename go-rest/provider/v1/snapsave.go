package v1

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"regexp"

	"down/helper"

	"github.com/dop251/goja"
	"github.com/gofiber/fiber/v2"
)

var SNAP_API string = "https://snapsave.app/id/action.php?lang=id"
var REG_URLL *regexp.Regexp = regexp.MustCompile(`(?i)"(https://d.rapidcdn.app[\w:\/.?=-]+[\w&=]+)\\"\s?`)

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
		Body: map[string]interface{}{},
		Hidden: true,

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

			var ress []string = instaDown(params.Url)

			if len(ress) == 0 {
				return c.Status(400).JSON(fiber.Map{
					"error": true,
					"message": "Tidak dapat menemukan isi konten, silahkan coba url lain",
				})
			}

			return c.Status(200).JSON(fiber.Map{
				"result": ress,
			})
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

func parseHtml(htmlString string) []string {
	var result []string
	match := REG_URLL.FindAllStringSubmatch(htmlString, -1)
	if len(match) == 0 {
		fmt.Println("Url video dan thumbnail tidak ditemukan")
	}
	for _, v := range match {
		result = append(result, v[1])
	}

	return result
}

func runVm(code string) []string {
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

	return parseHtml(str)
}

func instaDown(link string) []string {
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

	return runVm(string(ctt))
}
