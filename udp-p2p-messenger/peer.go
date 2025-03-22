package udptr

import (
	"context"
	"log"
	"net"
	"os"
	"sync"
	"time"
)

type PeerConn struct {
	sync.RWMutex
	peers   map[string]*Peer
	udpConn net.PacketConn
	doneCh  chan struct{}
}

type Peer struct {
	addr     *net.UDPAddr
	lastSeen time.Time
}

func newPeerConn(conn net.PacketConn) *PeerConn {
	return &PeerConn{
		peers:   make(map[string]*Peer),
		udpConn: conn,
		doneCh:  make(chan struct{}),
	}
}

func (pc *PeerConn) run(ctx context.Context) {
	go pc.cleanupLoop(ctx)

	buf := make([]byte, maxMsgSize)
	for {
		select {
		case <-ctx.Done():
			return
		default:
			n, addr, err := pc.udpConn.ReadFrom(buf)
			if err != nil {
				if !os.IsTimeout(err) {
					log.Printf("read error: %v", err)
				}
				continue
			}

			log.Printf("Received from %s: %s", addr.String(), string(buf[:n]))
			pc.handleMsg(buf[:n], addr)
		}
	}
}

func (pc *PeerConn) handleMsg(msg []byte, from net.Addr) {
	udpAddr, ok := from.(*net.UDPAddr)
	if !ok {
		return
	}

	if string(msg) == "handshake" {
		pc.udpConn.WriteTo([]byte("ack"), from)
		return
	}

	pc.Lock()
	pc.peers[from.String()] = &Peer{
		addr:     udpAddr,
		lastSeen: time.Now(),
	}
	pc.Unlock()

	log.Printf("Processing message from %s: %s", from.String(), string(msg))

	go pc.broadcast(msg, from.String())
}

func (pc *PeerConn) broadcast(msg []byte, srcAddr string) {
	pc.RLock()
	defer pc.RUnlock()

	for addr, p := range pc.peers {
		if addr == srcAddr {
			continue
		}

		_, err := pc.udpConn.WriteTo(msg, p.addr)
		if err != nil {
			log.Printf("Error sending to %s: %v", addr, err)
		} else {
			log.Printf("Message sent to %s: %s", addr, string(msg))
		}
	}
}

func (pc *PeerConn) cleanupLoop(ctx context.Context) {
	t := time.NewTicker(cleanupPeriod)
	defer t.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			pc.cleanup()
		}
	}
}

func (pc *PeerConn) cleanup() {
	pc.Lock()
	defer pc.Unlock()

	now := time.Now()
	for addr, p := range pc.peers {
		if now.Sub(p.lastSeen) > peerTimeout {
			delete(pc.peers, addr)
		}
	}
}
