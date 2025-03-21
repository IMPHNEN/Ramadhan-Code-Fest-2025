Note: It is designed for Linux systems. It uses syscall.Read and syscall.Write, which may not be compatible with Windows or macOS without modification. This program stores text in memory but does not interact with the system clipboard. It acts as a simple in-memory text storage, allowing users to save and retrieve text entries. It reads and writes data using syscall.Read and syscall.Write, bypassing high-level functions. Entries are stored in a FIFO system with a maximum limit of 100 items. User input is processed using bufio.Scanner.

## Usage

- Compile the program using `go build -o clipboard_manager`.
- Run the compiled binary with `./clipboard_manager`.
- Enter `copy`, then type the text you want to store and press Enter.
- Use `history` to view stored entries with their corresponding index.
- Retrieve stored content by using `paste <index>`, where `<index>` is the position of the entry in history.
- Use `exit` to terminate the program.

### Example Session:

```sh
$ go run main.go
Clipboard Manager - Type 'exit' to quit
> copy
Hello, world!
Content copied to history.
> history
1: Hello, world!
> paste 1
Hello, world!
Pasted: Hello, world!
> exit
```

## Commands

- **`copy`**: Reads input from stdin and adds it to the history.
- **`history`**: Displays stored clipboard entries with their index.
- **`paste <index>`**: Outputs the clipboard entry at the given index. Example: `paste 1` retrieves the first copied item.
- **`exit`**: Terminates the program.
