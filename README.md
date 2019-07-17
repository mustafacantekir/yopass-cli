# yopass-cli 
Command line interface for [yopass](https://github.com/jhaals/yopass).

## Prerequisites
Node.js - [Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Installation
Install yopass-cli using npm.

```
npm install -g yopass-cli
```

## Getting Started 
If you are managing your own yopass instance, you need to set environment variables for API and UI URLs. If they have the same hostname, exporting 
only API URL is enough. yopass-cli uses https://yopass.se by default.

```
export YOPASS_API_URL="https://api.foo.net"
export YOPASS_UI_URL="https://ui.foo.net"
```

Encrypt your secret using `encrypt` command. You can specify secret message as argument or pass value from stdin.

```
yopass-cli encrypt secret
```

```
cat foo.txt | yopass-cli encrypt 
```

Decrypt your message using `decrypt` command.

```
yopass-cli decrypt d20ab41e-d8e2-4db4-a920-5d82d8c53f8c xQjsGdelnIv53AE0
```

## Usage

For further information about commands and options use --help or -h option.

```
yopass-cli -h 
```

### Encrypt

```
yopass-cli encrypt secret [options] 
```

Options:

```
Options:
  --version                 Show version number                        [boolean]
  --help                    Show help                                  [boolean]
  --expiration, -e          Specify expiration time
                                         [choices: "h", "d", "w"] [default: "h"]
  --preserve-clipboard, -p  Preserve clipboard        [boolean] [default: false]
```

Examples

```
cat bar.txt | yopass-cli encrypt -e=w   Encrypt content of bar.txt, set expiration time to one week, copy one-click link to clipboard
yopass-cli encrypt 'foo bar' -p         Encrypt given message and preserve clipboard      
```

### Decrypt

```
yopass-cli decrypt uniqueIdentifier decryptionKey
```

## Next

- Implement test cases
- Global Error Handling


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details