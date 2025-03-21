package provider

import (
	"github.com/gofiber/fiber/v2"
)

type RegisterComponent struct {
	Endpoint    string
	Method      string
	Title       string
	Description string
	Type 				string
	Params      map[string]interface{}
	Body        map[string]interface{}
	Code        func(*fiber.Ctx) error
}

type Register struct {
	Api []RegisterComponent
}

type UrlQuery struct {
	Url string `query:"url"`
}

var NewRegister *Register = &Register{}

func (r *Register) RegisterProvider(i RegisterComponent) {
	r.Api = append(r.Api, i)
}

func (r *Register) GetRoutes() *Register {
	return r
}
