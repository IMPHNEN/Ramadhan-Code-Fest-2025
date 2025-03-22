package udptr

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"sync"
	"time"
)

func RunClient(ctx context.Context) error {
	fmt.Println("Checking server availability...")
	conn, err := net.Dial("udp", "127.0.0.1:12345")
	if err != nil {
		return fmt.Errorf("dial err: %w", err)
	}
	defer conn.Close()

	handshakeMsg := []byte("handshake")
	conn.SetDeadline(time.Now().Add(2 * time.Second))
	if _, err := conn.Write(handshakeMsg); err != nil {
		return fmt.Errorf("failed to send handshake: %w", err)
	}

	buf := make([]byte, maxMsgSize)
	n, err := conn.Read(buf)
	if err != nil {
		return fmt.Errorf("server not responding: %w", err)
	}

	response := string(buf[:n])
	if response != "ack" {
		return fmt.Errorf("unexpected response from server: %s", response)
	}

	conn.SetDeadline(time.Time{})

	fmt.Println("Server Available! Type 'q' to quit")

	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		buf := make([]byte, maxMsgSize)
		for {
			select {
			case <-ctx.Done():
				return
			default:
				n, err := conn.Read(buf)
				if err != nil {
					if !os.IsTimeout(err) && !isClosedErr(err) {
						log.Printf("read err: %v", err)
					}
					continue
				}
				fmt.Printf("\nReceived: %s\nMessage > ", string(buf[:n]))
			}
		}
	}()

	fmt.Print("Message > ")
	scn := bufio.NewScanner(os.Stdin)
	for scn.Scan() {
		txt := scn.Text()
		if txt == "q" {
			fmt.Println("Goodbye!")
			break
		}

		if txt == "" {
			fmt.Print("Message > ")
			continue
		}

		if _, err := conn.Write([]byte(txt)); err != nil {
			if !isClosedErr(err) {
				log.Printf("write err: %v", err)
			}
			continue
		}
		fmt.Print("Message > ")
	}

	if err := conn.Close(); err != nil {
		log.Printf("close err: %v", err)
	}

	wg.Wait()
	return scn.Err()
}

func isClosedErr(err error) bool {
	if err == nil {
		return false
	}
	return err.Error() == "use of closed network connection"
}
