package helper

import (
	"net/http"
	"net"
	"context"
	"strings"
	"time"
	"io"

	"github.com/rs/dnscache"
	"golang.org/x/net/http2"
)

func Request(url, method string, body io.Reader, header http.Header, optional ...bool) (*http.Response, error) {
	dns := &dnscache.Resolver{}

	transport := &http.Transport{
		DialContext: func (ctx context.Context, network, addr string) (net.Conn, error) {
			segment := strings.LastIndex(addr, ":")
			ips, err := dns.LookupHost(ctx, addr[:segment])
			for _, ip := range ips {
				conn, err := net.Dial(network, ip+addr[segment:])
				if err == nil {
					return conn, nil
				}
			}

			return nil, err
		},
		MaxIdleConns: 1024,
		MaxIdleConnsPerHost: 100,
		TLSHandshakeTimeout: 20 * time.Second,
		DisableCompression: false,
	}

	_ = http2.ConfigureTransport(transport)

	isRedirect := true
	if len(optional) != 0 {
		isRedirect = false
	}

	client := http.Client{
		Transport: transport,
		Timeout: 30 * time.Second,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			if isRedirect {
				return nil
			}

			return http.ErrUseLastResponse
		},
	}

	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}
	
	for k, v := range header {
		for _, h := range v {
			req.Header.Add(k, h)

		}
	}

	go func() {
		t := time.NewTicker(5 * time.Minute)
		defer t.Stop()
		for range t.C {
			dns.Refresh(true)
		}
	}()

	return client.Do(req)
}