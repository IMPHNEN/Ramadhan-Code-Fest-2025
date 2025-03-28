// Package chromedpundetected provides a chromedp context with an undetected
// Chrome browser.
package lib

import (
	"context"
	"net"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/Xuanwo/go-locale"
	"github.com/chromedp/chromedp"
	"github.com/google/uuid"
	"golang.org/x/exp/slog"
)

const (
	// DefaultNoSandbox enables the 'no-sandbox' flag by default.
	DefaultNoSandbox = true
)

// Option is a functional option.
type Option func(*Config)

// Config is a undetected Chrome config.
type Config struct {
	// Ctx is the base context to use. By default a background context will be used.
	Ctx context.Context `json:"-" yaml:"-"`

	// ContextOptions are chromedp context option.
	ContextOptions []chromedp.ContextOption `json:"-" yaml:"-"`

	// ChromeFlags are additional Chrome flags to pass to the browser.
	//
	// NOTE: adding additional flags can make the detection unstable, so test,
	// and be careful of what flags you add. Mostly intended to configure things
	// like a proxy. Also check if the flags you want to set are not already set
	// by this library.
	ChromeFlags []chromedp.ExecAllocatorOption

	// UserDataDir is the path to the directory where Chrome user data is stored.
	//
	// By default a temporary directory will be used.
	UserDataDir string `json:"userDataDir" yaml:"userDataDir"`

	// LogLevel is the Chrome log level, 0 by default.
	LogLevel int `json:"logLevel" yaml:"logLevel"`

	// NoSandbox dictates whether the no-sanbox flag is added. Defaults to true.
	NoSandbox bool `json:"noSandbox" yaml:"noSandbox"`

	// ChromePath is a specific binary path for Chrome.
	//
	// By default the chrome or chromium on your PATH will be used.
	ChromePath string `json:"chromePath" yaml:"chromePath"`

	// Port is the Chrome debugger port. By default a random port will be used.
	Port int `json:"port" yaml:"port"`

	// Timeout is the context timeout.
	Timeout time.Duration `json:"timeout" yaml:"timeout"`

	// Headless dicates whether Chrome will start headless (without a visible window)
	//
	// It will NOT use the '--headless' option, rather it will use a virtual display.
	// Requires Xvfb to be installed, only available on Linux.
	Headless bool `json:"headless" yaml:"headless"`

	// Extensions are the paths to the extensions to load.
	Extensions []string `json:"extensions" yaml:"extensions"`

	// language to be used otherwise system/OS defaults are used
	// https://developer.chrome.com/docs/webstore/i18n/#localeTable
	Language string
}

// NewConfig creates a new config object with defaults.
func NewConfig(opts ...Option) Config {
	c := Config{
		NoSandbox: DefaultNoSandbox,
	}

	for _, o := range opts {
		o(&c)
	}

	return c
}

// WithContext adds a base context.
func WithContext(ctx context.Context) Option {
	return func(c *Config) {
		c.Ctx = ctx
	}
}

// WithUserDataDir sets the user data directory to a custom path.
func WithUserDataDir(dir string) Option {
	return func(c *Config) {
		c.UserDataDir = dir
	}
}

// WithChromeBinary sets the chrome binary path.
func WithChromeBinary(path string) Option {
	return func(c *Config) {
		c.ChromePath = path
	}
}

// WithTimeout sets the context timeout.
func WithTimeout(timeout time.Duration) Option {
	return func(c *Config) {
		c.Timeout = timeout
	}
}

// WithHeadless creates a headless chrome instance.
func WithHeadless() Option {
	return func(c *Config) {
		c.Headless = true
	}
}

// WithNoSandbox enable/disable sandbox. Disabled by default.
func WithNoSandbox(b bool) Option {
	return func(c *Config) {
		c.NoSandbox = b
	}
}

// WithPort sets the chrome debugger port.
func WithPort(port int) Option {
	return func(c *Config) {
		c.Port = port
	}
}

// WithLogLevel sets the chrome log level.
func WithLogLevel(level int) Option {
	return func(c *Config) {
		c.LogLevel = level
	}
}

// WithChromeFlags add chrome flags.
func WithChromeFlags(opts ...chromedp.ExecAllocatorOption) Option {
	return func(c *Config) {
		c.ChromeFlags = append(c.ChromeFlags, opts...)
	}
}

// WithExtensions adds chrome extensions.
//
// Provide the paths to the extensions to load.
func WithExtensions(extensions ...string) Option {
	return func(c *Config) {
		c.Extensions = append(c.Extensions, extensions...)
	}
}

// Defaults.
var (
	DefaultUserDirPrefix = "chromedp-undetected-"
)

// New creates a context with an undetected Chrome executor.
func New(config Config) (context.Context, context.CancelFunc, error) {
	var (
		opts    []chromedp.ExecAllocatorOption
		tempDir bool
	)

	if config.UserDataDir == "" {
		tempDir = true
		config.UserDataDir = path.Join(os.TempDir(), DefaultUserDirPrefix+uuid.NewString())
	}

	if config.ChromePath != "" {
		opts = append(opts, chromedp.ExecPath(config.ChromePath))
	}

	headlessOpts, closeFrameBuffer, err := headlessFlag(config)
	if err != nil {
		return nil, func() {}, err
	}

	if config.Language == "" {
		opts = append(opts, localeFlag())
	} else {
		opts = append(opts, chromedp.Flag("lang", config.Language))
	}

	if len(config.Extensions) > 0 {
		opts = append(opts, chromedp.Flag("load-extension", strings.Join(config.Extensions, ",")))
	}

	opts = append(opts, supressWelcomeFlag()...)
	opts = append(opts, logLevelFlag(config))
	opts = append(opts, debuggerAddrFlag(config)...)
	opts = append(opts, noSandboxFlag(config)...)
	opts = append(opts, chromedp.UserDataDir(config.UserDataDir))
	opts = append(opts, headlessOpts...)
	opts = append(opts, config.ChromeFlags...)

	if config.ChromePath != "" {
		opts = append(opts, chromedp.ExecPath(config.ChromePath))
	}

	ctx := context.Background()
	if config.Ctx != nil {
		ctx = config.Ctx
	}

	cancelT := func() {}
	if config.Timeout > 0 {
		ctx, cancelT = context.WithTimeout(ctx, config.Timeout)
	}

	// pps := append(chromedp.DefaultExecAllocatorOptions[:], opts...)

	ctx, cancelA := chromedp.NewExecAllocator(ctx, opts...)
	ctx, cancelC := chromedp.NewContext(ctx, config.ContextOptions...)

	cancel := func() {
		cancelT()
		cancelA()
		cancelC()

		if err := closeFrameBuffer(); err != nil {
			slog.Error("failed to close Xvfb", err)
		}

		if tempDir {
			_ = os.RemoveAll(config.UserDataDir) //nolint:errcheck
		}
	}

	return ctx, cancel, nil
}

func supressWelcomeFlag() []chromedp.ExecAllocatorOption {
	return []chromedp.ExecAllocatorOption{
		chromedp.Flag("no-first-run", true),
		chromedp.Flag("no-default-browser-check", true),
	}
}

func debuggerAddrFlag(config Config) []chromedp.ExecAllocatorOption {
	port := strconv.Itoa(config.Port)
	if config.Port == 0 {
		port = getRandomPort()
	}

	return []chromedp.ExecAllocatorOption{
		chromedp.Flag("remote-debugging-host", "127.0.0.1"),
		chromedp.Flag("remote-debugging-port", port),
	}
}

func localeFlag() chromedp.ExecAllocatorOption {
	lang := "en-US"
	if tag, err := locale.Detect(); err != nil && len(tag.String()) > 0 {
		lang = tag.String()
	}

	return chromedp.Flag("lang", lang)
}

func noSandboxFlag(config Config) []chromedp.ExecAllocatorOption {
	var opts []chromedp.ExecAllocatorOption

	if config.NoSandbox {
		opts = append(opts,
			chromedp.Flag("no-sandbox", true),
			chromedp.Flag("test-type", true),
			chromedp.Flag("disable-dev-shm-usage", true),
		)
	}

	return opts
}

func logLevelFlag(config Config) chromedp.ExecAllocatorOption {
	return chromedp.Flag("log-level", strconv.Itoa(config.LogLevel))
}

func headlessOpts() (opts []chromedp.ExecAllocatorOption, cleanup func() error, err error) {
	return nil, nil, nil
}

func headlessFlag(config Config) ([]chromedp.ExecAllocatorOption, func() error, error) {
	var opts []chromedp.ExecAllocatorOption

	cleanup := func() error { return nil }

	if config.Headless {
		// var (
		// 	optx []chromedp.ExecAllocatorOption
		// 	err  error
		// )

		// optx, cleanup, err = headlessOpts()
		// if err != nil {
		// 	return nil, cleanup, err
		// }

		opts = append(opts,
			// chromedp.Flag("window-size", "1920,1080"),
			// chromedp.Flag("start-maximized", true),
			// chromedp.Flag("no-sandbox", true),
			chromedp.Flag("headless", true),
			// chromedp.Flag("no-first-run", true),
			// chromedp.Flag("no-default-browser-check", true),
			// chromedp.Flag("disable-background-networking", true),
			// chromedp.Flag("disable-background-timer-throttling", true),
			// chromedp.Flag("disable-backgrounding-occluded-windows", true),
			// chromedp.Flag("disable-dev-shm-usage", true),
			// chromedp.Flag("disable-features", "site-per-process,Translate,BlinkGenPropertyTrees"),
			// chromedp.Flag("disable-hang-monitor", true),
			// chromedp.Flag("disable-popup-blocking", true),
			// chromedp.Flag("disable-renderer-backgrounding", true),
			// chromedp.Flag("metrics-recording-only", true),
		)
		// opts = append(opts, optx...)
	}

	return opts, cleanup, nil
}

func getRandomPort() string {
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err == nil {
		addr := l.Addr().String()
		l.Close() //nolint:errcheck,gosec

		return strings.Split(addr, ":")[1]
	}

	return "42069"
}
