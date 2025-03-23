package v1

import (
	"down/helper"

	"github.com/gofiber/fiber/v2"
)

var vsdb *helper.Visitors = helper.NewVisitors()

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Total visitor",
		Endpoint:    "/visitor",
		Method:      "GET",
		Description: "Mendapatkan token picsart",
		Params:      map[string]interface{}{},
		Type:        "",
		Body:        map[string]interface{}{},
		Hidden:      true,

		Code: func(c *fiber.Ctx) error {
			return c.Status(200).JSON(vsdb.ReadAll())
		},
	})
}
