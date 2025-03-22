package internal

import (
	"fmt"
	"log/slog"
	"os"
	"strconv"
	"strings"
)

type MemoryInfo struct {
	Total     uint64
	Free      uint64
	Available uint64
	Used      uint64
	UsedPerc  float64
}

func GetMemoryInfo() (MemoryInfo, error) {
	var info MemoryInfo

	data, err := os.ReadFile("/proc/meminfo")
	if err != nil {
		slog.Error("error reading /proc/meminfo", "error", err)
		return info, fmt.Errorf("read /proc/meminfo: %w", err)
	}

	memData := parseMemInfo(string(data))
	info.Total, _ = memData["MemTotal"]
	info.Free, _ = memData["MemFree"]
	info.Available, _ = memData["MemAvailable"]

	if info.Available == 0 {
		info.Available = estimateAvailableMemory(memData, info.Free)
	}

	info.Total /= 1024
	info.Free /= 1024
	info.Available /= 1024
	info.Used = (info.Total - info.Available)
	if info.Total > 0 {
		info.UsedPerc = 100.0 * float64(info.Used) / float64(info.Total)
	}

	return info, nil
}

func parseMemInfo(data string) map[string]uint64 {
	memData := make(map[string]uint64)
	for _, line := range strings.Split(data, "\n") {
		fields := strings.Fields(line)
		if len(fields) < 2 {
			continue
		}
		if val, err := strconv.ParseUint(fields[1], 10, 64); err == nil {
			memData[strings.TrimSuffix(fields[0], ":")] = val
		}
	}
	return memData
}

func estimateAvailableMemory(memData map[string]uint64, free uint64) uint64 {
	buffers, hasBuffers := memData["Buffers"]
	cached, hasCached := memData["Cached"]
	if hasBuffers && hasCached {
		return free + buffers + cached
	}
	return free
}
