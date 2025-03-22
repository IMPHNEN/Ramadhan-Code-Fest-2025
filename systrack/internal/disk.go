package internal

import (
	"fmt"
	"log/slog"
	"syscall"
)

const (
	B  = 1
	KB = 1024 * B
	MB = 1024 * KB
	GB = 1024 * MB
)

func GetDiskUsage(path string) (uint64, uint64, error) {
	var stat syscall.Statfs_t
	
	err := syscall.Statfs(path, &stat)
	if err != nil {
		slog.Error("error getting disk stats", "path", path, "error", err)
		return 0, 0, fmt.Errorf("statfs %s: %w", path, err)
	}
	
	blockSize := uint64(stat.Bsize)
	
	total := stat.Blocks * blockSize
	free := stat.Bfree * blockSize
	
	if blockSize == 0 {
		return 0, 0, fmt.Errorf("invalid block size: 0")
	}
	
	return total / GB, free / GB, nil
}