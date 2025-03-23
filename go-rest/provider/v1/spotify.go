package v1

import (
	"github.com/gofiber/fiber/v2"
)

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Spotify DL",
		Endpoint:    "/spotify",
		Method:      "GET",
		Description: "Mendownload musik dari spotify",
		Params:      map[string]interface{}{},
		Type:        "",
		Skip:        true,
		Body:        map[string]interface{}{},

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
