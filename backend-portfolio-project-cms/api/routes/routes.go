package routes

import (
	"github.com/gofiber/fiber/v2"
	Handler "porto-project/api/Handler/Projects"
	"porto-project/pkg/projects"
)

func SetupProjectsRoutes(router fiber.Router, service projects.Service) {
	//url: /api/
	router.Get("/projects", Handler.GetProjects(service))
	router.Post("/projects", Handler.AddProject(service))
	router.Get("/projects/:id", Handler.GetProjectById(service))
	router.Delete("/projects/:id", Handler.DeleteProject(service))
	router.Put("/projects/:id", Handler.EditProject(service))
	router.Static("/projects/images/", "./uploads/projects/")
	router.Use(func (c *fiber.Ctx) error {
		return c.Status(403).SendString("Unauthorized")
	})
}