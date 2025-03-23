package v1

import (
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"down/helper"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type ImageForm struct {
	Name string `form:"name"`
}

type ImageParam struct {
	Name string `query:"name"`
}

type IFile struct {
	Name     string `json:"name"`
	Path     string `json:"path"`
	Filename string `json:"filename"`
	ID       string `json:"id"`
	Hit      string `json:"hit"`
}

var visitor *helper.Visitors = helper.NewVisitors()

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Mengupload gambar",
		Endpoint:    "/add-image",
		Method:      "POST",
		Description: "Menambahkan gambar ke server",
		Params:      map[string]interface{}{},
		Type:        "",
		Body:        map[string]interface{}{},
		Hidden:      true,

		Code: func(c *fiber.Ctx) error {
			form := new(ImageForm)
			image, err := c.FormFile("image")
			if err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Gambar tidak valid!",
				})
			}

			if !isImage(image) {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Input tidak valid!",
				})
			}

			if err := c.BodyParser(form); err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Input tidak valid!",
				})
			}

			if form.Name == "" {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Input tidak valid!",
				})
			}

			uuids := uuid.New()
			wd, _ := os.Getwd()
			kuren, _ := os.Open(filepath.Join(wd, "database", "file.json"))
			defer kuren.Close()
			kurenRd, _ := io.ReadAll(kuren)
			var jsnKuren []IFile
			_ = json.Unmarshal(kurenRd, &jsnKuren)
			jsn := IFile{
				Name:     form.Name,
				Path:     fmt.Sprintf("./database/images/%s.%s", uuids.String(), strings.Split(image.Filename, ".")[1]),
				Filename: fmt.Sprintf("%s.%s", uuids.String(), strings.Split(image.Filename, ".")[1]),
				ID:       uuids.String(),
				Hit:      "0",
			}

			opn, _ := image.Open()
			defer opn.Close()
			var buffer []byte = make([]byte, image.Size)
			_, _ = opn.Read(buffer)

			jsnKuren = append(jsnKuren, jsn)
			kurenRd, _ = json.Marshal(jsnKuren)
			// c.SaveFile(image, filepath.Join(wd, "storage", "images", fmt.Sprintf("%s.%s", uuids.String(), strings.Split(image.Filename, ".")[1])))
			os.WriteFile(filepath.Join(wd, "database", "file.json"), kurenRd, os.FileMode(os.O_WRONLY))
			visitor.Write(fmt.Sprintf("image%s.%s", uuids.String(), strings.Split(image.Filename, ".")[1]), map[string]any{
				"bytes":       buffer,
				"contentType": image.Header.Get("Content-Type"),
			})

			jsn = IFile{}
			kurenRd = nil
			jsnKuren = nil

			return c.Status(200).JSON(IFile{
				Name:     form.Name,
				Path:     fmt.Sprintf("./database/images/%s.%s", uuids.String(), strings.Split(image.Filename, ".")[1]),
				Filename: fmt.Sprintf("%s.%s", uuids.String(), strings.Split(image.Filename, ".")[1]),
				ID:       uuids.String(),
				Hit:      "0",
			})
		},
	})

	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Mengambil gambar",
		Endpoint:    "/get-image",
		Method:      "GET",
		Description: "Mengambil gambar dari server dan menambahkan hit",
		Params: map[string]interface{}{
			"name": "filename",
		},
		Type:   "",
		Body:   map[string]interface{}{},
		Hidden: true,

		Code: func(c *fiber.Ctx) error {
			form := new(ImageParam)

			if err := c.QueryParser(form); err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Nama tidak valid!",
				})
			}

			if form.Name == "" {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Nama tidak valid!",
				})
			}

			unix := time.Now().UnixMilli()

			return c.Redirect(fmt.Sprintf("/api/v1/get-image-nocache?name=%s&nocache=%d", form.Name, unix))
		},
	})

	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Mengambil gambar",
		Endpoint:    "/get-image-nocache",
		Method:      "GET",
		Description: "Mengambil gambar dari server dan menambahkan hit",
		Params: map[string]interface{}{
			"name": "filename",
		},
		Type:   "",
		Body:   map[string]interface{}{},
		Hidden: true,

		Code: func(c *fiber.Ctx) error {
			form := new(ImageParam)

			if err := c.QueryParser(form); err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Nama tidak valid!",
				})
			}

			if form.Name == "" {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Nama tidak valid!",
				})
			}

			// wd, _ := os.Getwd()
			// bt, err := os.Open(filepath.Join(wd, "storage", "images", fmt.Sprintf("%s", form.Name)))
			// defer bt.Close()
			imageData := visitor.Read(fmt.Sprintf("image%s", form.Name))
			if imageData == nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Gambar tidak ada!",
				})
			}

			cv := visitor.Read(form.Name)
			if cv == nil {
				cv = 0
			}

			visitor.Write(form.Name, 1+cv.(int))

			c.Response().Header.Set("Content-Type", imageData.(map[string]any)["contentType"].(string))
			c.Response().Header.Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
			c.Response().Header.Set("Pragma", "no-cache")
			c.Response().Header.Set("Expires", "0")

			// return c.Status(200).SendFile(fmt.Sprintf("./storage/images/%s", form.Name))
			return c.Status(200).Send(imageData.(map[string]any)["bytes"].([]byte))
		},
	})

	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Mengambil semua data gambar",
		Endpoint:    "/get-all-image",
		Method:      "GET",
		Description: "Mengambil semua data gambar dari server",
		Params:      map[string]interface{}{},
		Type:        "",
		Body:        map[string]interface{}{},
		Hidden:      true,

		Code: func(c *fiber.Ctx) error {
			wd, _ := os.Getwd()
			file, err := os.Open(filepath.Join(wd, "database", "file.json"))
			if err != nil {
				fmt.Println(err)
			}
			defer file.Close()

			plain, _ := io.ReadAll(file)

			var jsn []IFile
			_ = json.Unmarshal(plain, &jsn)

			if jsn == nil {
				return c.Status(200).JSON(fiber.Map{
					"message": "Tidak ada data gambar!",
				})
			}

			for i, v := range jsn {
				hit := 0

				ht := visitor.Read(v.Filename)
				if ht != nil {
					hit = ht.(int)
				}

				jsn[i].Hit = strconv.Itoa(hit)
			}

			return c.Status(200).JSON(jsn)
		},
	})
}

func isImage(file *multipart.FileHeader) bool {
	allowedTypes := []string{"image/jpeg", "image/png", "image/gif", "image/webp"}
	fileType := file.Header.Get("Content-Type")

	for _, t := range allowedTypes {
		if strings.HasPrefix(fileType, t) {
			return true
		}
	}

	return false
}
