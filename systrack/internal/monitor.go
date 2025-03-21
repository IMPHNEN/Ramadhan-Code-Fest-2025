package internal

import (
	"fmt"
	"log/slog"
	"time"
)

type SystemStats struct {
	CPUUsage     float64
	MemInfo      MemoryInfo
	DiskTotal    uint64
	DiskFree     uint64
	ProcessCount int
	LastUpdate   time.Time
}

type Monitor struct {
	cpuMonitor   *CPUMonitor
	lastStats    SystemStats
	updatePeriod time.Duration
}

func NewMonitor() *Monitor {
	return &Monitor{
		cpuMonitor:   NewCPUMonitor(),
		updatePeriod: 1 * time.Second,
	}
}

func (m *Monitor) GetStats() (SystemStats, error) {
	stats := SystemStats{LastUpdate: time.Now()}

	cpuUsage, err := m.cpuMonitor.GetUsage()
	if err != nil {
		slog.Error("failed to get CPU usage", "error", err)
	} else {
		stats.CPUUsage = cpuUsage
	}

	memInfo, err := GetMemoryInfo()
	if err != nil {
		slog.Error("failed to get memory info", "error", err)
	} else {
		stats.MemInfo = memInfo
	}

	diskTotal, diskFree, err := GetDiskUsage("/")
	if err != nil {
		slog.Error("failed to get disk usage", "error", err)
	} else {
		stats.DiskTotal = diskTotal
		stats.DiskFree = diskFree
	}

	procCount, err := CountProcesses()
	if err != nil {
		slog.Error("failed to count processes", "error", err)
	} else {
		stats.ProcessCount = procCount
	}

	m.lastStats = stats
	return stats, nil
}

func (m *Monitor) RefreshDisplay() error {
	fmt.Print("\033[H\033[2J")

	stats, _ := m.GetStats()

	fmt.Printf("CPU Usage: %.2f%%\n", stats.CPUUsage)
	fmt.Printf("Memory: %d MB total, %d MB available (%.1f%% used)\n", 
		stats.MemInfo.Total, 
		stats.MemInfo.Available, 
		stats.MemInfo.UsedPerc)
	fmt.Printf("Disk: %d GB total, %d GB free\n", stats.DiskTotal, stats.DiskFree)
	fmt.Printf("Running Processes: %d\n", stats.ProcessCount)

	fmt.Println("\nPress Ctrl+C to exit...")
	return nil
}
