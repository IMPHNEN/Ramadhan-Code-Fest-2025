package main

import (
	"github.com/gofiber/fiber/v2"
	"log"
	"porto-project/api/routes"
	"porto-project/pkg/projects"
)

func main() {
	app := fiber.New()
	projectRepo := projects.NewRepository()
	projectService := projects.NewService(projectRepo)
	api := app.Group("/api")
	routes.SetupProjectsRoutes(api, projectService)
	app.Use(func (c *fiber.Ctx) error {
		return c.Status(403).SendString("Unauthorized")
	})
	log.Fatal(app.Listen(":8080"))
}
