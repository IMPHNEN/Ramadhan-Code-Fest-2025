package v1

import (
	"github.com/gofiber/fiber/v2"
)

const (
	CREATE   = "https://chat.deepseek.com/api/v0/chat_session/create"
	DEEPSEEK = "https://chat.deepseek.com/api/v0/chat/completion"
)

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Deepseek V3",
		Endpoint:    "/deepseek",
		Method:      "GET",
		Description: "Chat dengan deepseek ai",
		Params:      map[string]interface{}{},
		Type:        "",
		Skip:        true,
		Body:        map[string]interface{}{},

		Code: func(c *fiber.Ctx) error {
			return c.Status(200).JSON(fiber.Map{
				"token": "Testing",
			})
		},
	})
}
