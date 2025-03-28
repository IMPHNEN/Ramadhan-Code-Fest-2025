package v1

import (
	"github.com/gofiber/fiber/v2"
)

type RegisterComponent struct {
	ID          int
	Endpoint    string
	Method      string
	Title       string
	Description string
	Type        string
	Params      map[string]interface{}
	Body        map[string]interface{}
	Code        func(*fiber.Ctx) error
	Demo        string
	Group       string
	Skip 				bool
	Hidden			bool
}

type Register struct {
	Api []RegisterComponent
}

type UrlQuery struct {
	Url string `query:"url"`
}

type IDQuery struct {
	ID string `query:"id"`
}

type SearchQuery struct {
	Q     string `query:"q"`
	Limit string `query:"limit"`
	Page  string `query:"page"`
}

type PinterestSearch struct {
	Q string `query:"q"`
}

var NewRegister *Register = &Register{}

func (r *Register) RegisterProvider(i RegisterComponent) {
	i.Group = "api/v1"
	i.Endpoint = "/api/v1" + i.Endpoint
	r.Api = append(r.Api, i)
}
