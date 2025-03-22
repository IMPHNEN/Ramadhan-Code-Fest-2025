package internal

import (
	"fmt"
	"log/slog"
	"os"
	"strconv"
)

func CountProcesses() (int, error) {
	files, err := os.ReadDir("/proc")
	if err != nil {
		slog.Error("error reading /proc directory", "error", err)
		return 0, fmt.Errorf("read /proc: %w", err)
	}
	
	count := 0
	for _, f := range files {
		name := f.Name()
		if _, err := strconv.Atoi(name); err == nil {
			if isDir(f) {
				count++
			}
		}
	}
	
	return count, nil
}

func isDir(entry os.DirEntry) bool {
	if entry.IsDir() {
		return true
	}
	
	info, err := entry.Info()
	if err != nil {
		return false
	}
	
	return info.IsDir()
}