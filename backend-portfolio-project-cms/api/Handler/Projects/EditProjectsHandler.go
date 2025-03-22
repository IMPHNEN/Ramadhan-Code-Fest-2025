package Handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"path/filepath"
	"porto-project/api/presenter"
	"porto-project/pkg/projects"
)

func EditProject(s projects.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		project := new(projects.Project)
		id := c.Params("id")
		project.Id = id
		project.Name, project.Description = c.FormValue("name"), c.FormValue("description")

		img, err := c.FormFile("image")
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(presenter.FailedResponse{
				"Failed",
				"Key: 'image' is not found or empty",
				err.Error(),
			})
		}
		if !isImage(img) {
			return c.Status(fiber.StatusBadRequest).JSON(presenter.FailedResponse{
				"Failed",
				"Failed to upload image",
				"Invalid MIME type or extension",
			})
		}
		imgPath, err := saveImage(c, img, project.Id)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(presenter.FailedResponse{
				"Failed",
				"Failed to save image",
				err.Error(),
			})
		}
		err = compressImage(imgPath)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(presenter.FailedResponse{
				"Failed",
				"Failed when compressing image",
				err.Error(),
			})
		}
		
		project.ImageUrl = "/api/projects/images/" + filepath.Base(imgPath)
		updatedId, err := s.EditProject(project)
		if err != nil {
			log.Debug("Failed updating project in database: " + err.Error())
			return c.Status(fiber.StatusInternalServerError).JSON(presenter.FailedResponse{
				"Failed",
				"Failed updating project",
				err.Error(),
			})
		}
		return c.Status(fiber.StatusOK).JSON(presenter.ProjectSuccessResponse{
			"Success",
			"Updated project " + updatedId,
			project,
		})
	}
}
