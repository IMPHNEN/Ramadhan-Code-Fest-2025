package projects

import (
	"gorm.io/gorm"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm/logger"
	"log"
	"os"
)

type Repository interface {
	CreateProject(project *Project) (*Project, error)
	GetAllProjects(lastId int) ([]Project, error)
	GetProjectById(id string) (*Project, error)
	EditProject(project *Project) (string, error)
	DeleteProject(id string) error
}
type repository struct {
	Db *gorm.DB
}

func NewRepository() Repository {
	var
	host,
	user,
	password,
	port,
	dbname =
				loadEnv("PGHOST"),
				loadEnv("PGUSER"),
				loadEnv("PGPASSWORD"),
				loadEnv("PGPORT"),
				loadEnv("PGDBNAME")
	dsn := 	"host="+host + " user="+user + " password="+password + " dbname="+dbname + " port="+port
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
		})
	if err != nil {
		log.Fatal("Failed to connect to database: \n", err)
	}
	log.Print("Connected to database")
	db.Logger = logger.Default.LogMode(logger.Info)
	db.AutoMigrate(&Project{})
	return &repository{
		db,
	}
}

func (r *repository) CreateProject(project *Project) (*Project, error) {
	return project, r.Db.Create(project).Error
}

func (r *repository) GetAllProjects(lastId int) ([]Project, error) {
	var projects []Project
	err := r.Db.Where("int_id > ?", lastId).Limit(9).Order("int_id ASC").Find(&projects).Error
	return projects, err
}

func (r *repository) GetProjectById(id string) (*Project, error) {
	var project Project
	err := r.Db.Where("id = ?", id).First(&project).Error
	return &project, err
}

func (r *repository) EditProject(project *Project) (string, error) {
	return project.Id, r.Db.Model(&project).Updates(Project{
		Name: project.Name,
		Description: project.Description,
		ImageUrl: project.ImageUrl,
	}).Error
}

func (r *repository) DeleteProject(id string) error {
	return r.Db.Where("id = ?", id).Delete(&Project{}).Error
}

func loadEnv(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("failed loading .env with key " + key)
	}
	return os.Getenv(key)
}
