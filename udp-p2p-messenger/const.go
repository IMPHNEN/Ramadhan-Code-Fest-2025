package udptr

import "time"

const (
	maxMsgSize    = 2048
	peerTimeout   = 30 * time.Second
	connDeadline  = 5 * time.Second
	cleanupPeriod = 10 * time.Second
)
