package Handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"path/filepath"
	"porto-project/api/presenter"
	"porto-project/pkg/projects"
)

func AddProject(s projects.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		project := new(projects.Project)
		name, description := c.FormValue("name"), c.FormValue("description")
		project.Name, project.Description = name, description

		newId, err := gonanoid.New()
		if err != nil {
			log.Debugf("Error generating ID: %s", err.Error())
			return c.Status(fiber.StatusInternalServerError).JSON(presenter.FailedResponse{
				"Failed",
				"Failed when generating ID",
				err.Error(),
			})
		}
		project.Id = "project_" + newId


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
		result, err := s.CreateProject(project)
		return c.Status(fiber.StatusCreated).JSON(presenter.ProjectSuccessResponse{
			"Success",
			"Project Created",
			result,
		})
	}
}
