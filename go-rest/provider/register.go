package provider

import (
	"down/provider/v1"
)

func GetEndpoint() *v1.Register {
	return v1.NewRegister
}