package projects

type Service interface {
	CreateProject(project *Project) (*Project, error)
	GetAllProjects(lastId int) ([]Project, error)
	GetProjectById(id string) (*Project, error)
	EditProject(project *Project) (string, error)
	DeleteProject(id string) error
}
type service struct {
	repository Repository
}

func NewService(repo Repository) Service {
	return &service{
		repo,
	}
}

func (s *service) CreateProject(project *Project) (*Project, error) {
	return s.repository.CreateProject(project)
}

func (s *service) GetAllProjects(lastId int) ([]Project, error) {
	return s.repository.GetAllProjects(lastId)
}

func (s *service) GetProjectById(id string) (*Project, error) {
	return s.repository.GetProjectById(id)
}

func (s *service) EditProject(project *Project) (string, error) {
	return s.repository.EditProject(project)
}

func (s *service) DeleteProject(id string) error {
	return s.repository.DeleteProject(id)
}