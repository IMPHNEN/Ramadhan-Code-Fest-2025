package internal

import (
	"fmt"
	"log/slog"
	"os"
	"strconv"
	"strings"
	"time"
)

type CPUStats struct {
	User   uint64
	Nice   uint64
	System uint64
	Idle   uint64
	IOWait uint64
	Total  uint64
}

type CPUMonitor struct {
	prevStats CPUStats
	lastCheck time.Time
}

func NewCPUMonitor() *CPUMonitor {
	stats, _ := readCPUStats()
	return &CPUMonitor{
		prevStats: stats,
		lastCheck: time.Now(),
	}
}

func (m *CPUMonitor) GetUsage() (float64, error) {
	currentStats, err := readCPUStats()
	if err != nil {
		return 0, err
	}

	now := time.Now()
	

	userDelta := currentStats.User - m.prevStats.User
	niceDelta := currentStats.Nice - m.prevStats.Nice
	systemDelta := currentStats.System - m.prevStats.System
	idleDelta := currentStats.Idle - m.prevStats.Idle
	totalDelta := userDelta + niceDelta + systemDelta + idleDelta

	m.prevStats = currentStats
	m.lastCheck = now

	if totalDelta == 0 {
		return 0.0, nil
	}

	usage := 100.0 * float64(userDelta+niceDelta+systemDelta) / float64(totalDelta)
	return usage, nil
}

func readCPUStats() (CPUStats, error) {
	var stats CPUStats

	data, err := os.ReadFile("/proc/stat")
	if err != nil {
		slog.Error("error reading /proc/stat", "error", err)
		return stats, fmt.Errorf("read /proc/stat: %w", err)
	}

	fields := strings.Fields(strings.Split(string(data), "\n")[0])
	if len(fields) < 5 || fields[0] != "cpu" {
		return stats, fmt.Errorf("invalid /proc/stat format")
	}

	stats.User, _ = parseUint64(fields[1])
	stats.Nice, _ = parseUint64(fields[2])
	stats.System, _ = parseUint64(fields[3])
	stats.Idle, _ = parseUint64(fields[4])
	if len(fields) > 5 {
		stats.IOWait, _ = parseUint64(fields[5])
	}

	stats.Total = stats.User + stats.Nice + stats.System + stats.Idle + stats.IOWait
	return stats, nil
}

func parseUint64(s string) (uint64, error) {
	return strconv.ParseUint(s, 10, 64)
}
