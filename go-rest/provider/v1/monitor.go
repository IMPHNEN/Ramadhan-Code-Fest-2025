package v1

import (
	"github.com/gofiber/fiber/v2"
)

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Monitor statistic",
		Endpoint:    "/monitor",
		Method:      "GET",
		Description: "Memonitor status dari server ataupun hal lainnya",
		Params:      map[string]interface{}{},
		Type:        "",
		Body:        map[string]interface{}{},
		Hidden:      true,

		Code: func(c *fiber.Ctx) error {
			return c.Status(200).JSON(fiber.Map{
				"message": "Cek console",
			})
		},
	})
}
