package main

import (
	"fmt"
	"strings"

	"down/helper"
	"down/provider"
	v1 "down/provider/v1"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	// "github.com/robfig/cron"
)

type EndpointList struct {
	ID          int         `json:"id"`
	Title       string      `json:"title"`
	Endpoint    string      `json:"endpoint"`
	Method      string      `json:"method"`
	Description string      `json:"description"`
	Params      interface{} `json:"params"`
	Body        interface{} `json:"body"`
	Type        string      `json:"type"`
	Hit         int         `json:"hit"`
	UpdateDate  string      `json:"date"`
	Status      string      `json:"status"`
	Demo        string      `json:"demo"`
}

var PORT string = ""
var VisitorDB *helper.Visitors = helper.NewVisitors()

func filterEndpoint(reg *v1.Register) {
	j := 0
	for i, v := range reg.Api {
		if !v.Skip {
			reg.Api[j] = reg.Api[i]
			j++
		}
	}

	reg.Api = reg.Api[:j]
}

func handleProvider(app *fiber.App) {
	prov := provider.GetEndpoint()
	filterEndpoint(prov)
	id := 1
	var router fiber.Router

	for i, v := range prov.Api {
		if v.Skip {
			fmt.Println(v.Skip)
			continue
		}
		prov.Api[i].ID = id
		group := v.Group
		router = app.Group(group)

		id++
		switch v.Method {
		case "GET":
			router.Get(strings.ReplaceAll(v.Endpoint, "/"+group, ""), v.Code)
		case "POST":
			router.Post(strings.ReplaceAll(v.Endpoint, "/"+group, ""), v.Code)
		case "PUT":
			router.Put(strings.ReplaceAll(v.Endpoint, "/"+group, ""), v.Code)
		}
	}

	initial()
}

func useMiddleware(app *fiber.App) {
	app.Use(cors.New())
	app.Use(logger.New(logger.Config{
		CustomTags: map[string]logger.LogFunc{
			"resLen": func(output logger.Buffer, c *fiber.Ctx, data *logger.Data, extraParam string) (int, error) {
				str := fmt.Sprintf("%d bytes", len(c.Response().Body()))
				return output.WriteString(str)
			},
		},
		Format:        "[ ${time} ] ${ip} - ${status} - ${method} ${path} - ${resLen}${latency}\n",
		DisableColors: false,
		TimeFormat:    "2006-01-02T15:04:05-0700",
		TimeZone:      "Asia/Jakarta",
	}))
	app.Use(func(c *fiber.Ctx) error {
		path := strings.ReplaceAll(strings.TrimSpace(c.Path()), "/", "")
		var total any = VisitorDB.Read(path)
		if total == nil {
			total = 0
		}

		VisitorDB.Write(path, total.(int)+1)

		return c.Next()
	})
}

func initial() {
	fmt.Println("[ INIT ] Initialization ...")
	// v1.CB.GetCobalt()

	// c := cron.New()
	// c.AddFunc("@every 50s", func() {
	// 	go v1.CB.Reset()
	// })
	// c.Start()
}

func main() {
	app := fiber.New(fiber.Config{
		Prefork: false,
	})

	useMiddleware(app)

	if PORT == "" {
		PORT = "7860"
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"message": "Hello World",
		})
	})

	app.Get("/list-endpoint", func(c *fiber.Ctx) error {
		var endpoint []EndpointList = make([]EndpointList, 0)

		for _, v := range provider.GetEndpoint().Api {
			if v.Hidden {
				continue
			}

			hit := 0

			ht := VisitorDB.Read(strings.ReplaceAll(strings.TrimSpace(v.Endpoint), "/", ""))
			if ht != nil {
				hit = ht.(int)
			}

			demo := v.Endpoint
			if v.Demo != "" {
				demo = v.Demo
			}

			endpoint = append(endpoint, EndpointList{
				ID:          v.ID,
				Title:       v.Title,
				Description: v.Description,
				Endpoint:    v.Endpoint,
				Method:      v.Method,
				Params:      v.Params,
				Body:        v.Body,
				Type:        v.Type,
				Hit:         hit,
				UpdateDate:  "Mon 8:00pm",
				Status:      "Active",
				Demo:        demo,
			})
		}

		return c.Status(200).JSON(fiber.Map{
			"message": "Hai 👋",
			"path":    endpoint,
		})
	})

	handleProvider(app)

	app.Listen("0.0.0.0:7860")
}
