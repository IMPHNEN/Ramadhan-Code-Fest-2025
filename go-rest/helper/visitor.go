package helper

import (
	// "fmt"
	"sync"
	"strings"
	"regexp"
)

type Visitors struct {
	Data  map[string]any
	Mutex sync.RWMutex
}

var vsInstance *Visitors
var once sync.Once
var REG_AS *regexp.Regexp = regexp.MustCompile(`(?i)[.\/-]`)

func NewVisitors() *Visitors {
	once.Do(func() {
		vsInstance = &Visitors{
			Data: make(map[string]any),
		}
	})

	return vsInstance
}

func (vs *Visitors) Write(key string, value any) {
	vs.Mutex.Lock()
	defer vs.Mutex.Unlock()
	vs.Data[vs.Serialize(key)] = value
}

func (vs *Visitors) Read(key string) any {
	vs.Mutex.Lock()
	defer vs.Mutex.Unlock()
	if v, ok := vs.Data[vs.Serialize(key)]; ok {
		return v
	}

	return nil
}

func (vs *Visitors) ReadAll() map[string]any {
	vs.Mutex.RLock()
	defer vs.Mutex.RUnlock()
	return vs.Data
}

func (vs *Visitors) Serialize(input string) string {
	regs := REG_AS.ReplaceAllString(strings.ReplaceAll(strings.TrimSpace(input), ".", ""), "")
	return regs
}