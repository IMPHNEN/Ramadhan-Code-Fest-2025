package Handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"porto-project/api/presenter"
	"porto-project/pkg/projects"
)

func DeleteProject(s projects.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		projectId := c.Params("id")
		err := s.DeleteProject(projectId)
		if err != nil {
			log.Debug("DeleteProject: Failed to delete project cause " + err.Error())
			return c.Status(fiber.StatusInternalServerError).JSON(presenter.FailedResponse{
				"Failed",
				"Unable to delete project",
				err.Error(),
			})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status": "Success",
			"message": "Project deleted",
		})
	}
}
