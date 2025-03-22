package presenter

import "porto-project/pkg/projects"

type ProjectSuccessResponse struct {
    Status string `json:"status"`
	Message string `json:"message"`
	Project *projects.Project `json:"project"`
}

type ProjectsSuccessResponse struct {
    Status string `json:"status"`
	Message string `json:"message"`
	LastIntId int `json:"lastIntId"`
	Project []projects.Project `json:"projects"`
}

type FailedResponse struct {
    Status string `json:"status"`
	Message string `json:"message"`
	Error string `json:"error"`
}
