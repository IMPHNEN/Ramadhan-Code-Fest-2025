package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"syscall"
)

const (
	maxHistory = 100
)

var (
	history []string
)

func addToHistory(entry string) {
	if len(history) >= maxHistory {
		history = history[1:]
	}
	history = append(history, entry)
}

func showHistory() {
	for i, entry := range history {
		fmt.Printf("%d: %s\n", i+1, entry)
	}
}

func readFromStdin() (string, error) {
	var buffer [1024]byte
	n, err := syscall.Read(0, buffer[:])
	if err != nil {
		return "", fmt.Errorf("read error: %w", err)
	}
	return strings.TrimSpace(string(buffer[:n])), nil
}

func writeToStdout(data string) error {
	if _, err := syscall.Write(1, []byte(data)); err != nil {
		return fmt.Errorf("write error: %w", err)
	}
	return nil
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("Clipboard Manager - Type 'exit' to quit")

	for {
		fmt.Print("> ")
		if !scanner.Scan() {
			break
		}

		input := scanner.Text()
		switch {
			case input == "exit":
				return
			case input == "copy":
				content, err := readFromStdin()
				if err != nil {
					fmt.Println("Error reading input:", err)
					continue
				}
				addToHistory(content)
				fmt.Println("Content copied to history.")
			case input == "history":
				showHistory()
			case strings.HasPrefix(input, "paste "):
				indexStr := strings.TrimPrefix(input, "paste ")
				index, err := strconv.Atoi(indexStr)
				if err != nil || index < 1 || index > len(history) {
					fmt.Println("Invalid index. Use 'history' to view valid entries.")
					continue
				}
				content := history[index-1]
				if err := writeToStdout(content); err != nil {
					fmt.Println("Error writing to output:", err)
					continue
				}
				fmt.Printf("Pasted: %s\n", content)
			default:
				fmt.Println("Unknown command. Available commands: 'copy', 'history', 'paste <index>', 'exit'.")
		}
	}
}
