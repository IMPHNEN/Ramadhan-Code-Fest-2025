package udptr

import (
	"context"
	"fmt"
	"net"
)

func RunServer(ctx context.Context) error {
	fmt.Println("Starting server on :12345...")
	l, err := net.ListenPacket("udp", ":12345")
	if err != nil {
		return fmt.Errorf("listen err: %w", err)
	}
	defer l.Close()

	pc := newPeerConn(l)
	pc.run(ctx)
	return nil
}
