package lib

import (
	"encoding/hex"
	"fmt"
	"math/rand"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/tjfoc/gmsm/sm3"
)

// Original Author:
// This file is from https://github.com/JoeanAmier/TikTokDownloader
// And is licensed under the GNU General Public License v3.0
// If you use this code, please keep this license and the original author information.
//
// Modified by:
// And this file is now a part of the https://github.com/Evil0ctal/Douyin_TikTok_Download_API open-source project.
// This project is licensed under the Apache License 2.0, and the original author information is kept.
//
// Purpose:
// This file is used to generate the `a_bogus` parameter for the Douyin Web API.
//
// Changes Made:
// 1. Changed the ua_code to compatible with the current config file User-Agent string in https://github.com/Evil0ctal/Douyin_TikTok_Download_API/blob/main/crawlers/douyin/web/config.yaml

// __all__ = ["ABogus", ]

type ABogus struct {
	__filter     *regexp.Regexp
	__arguments  []int
	__ua_key     string
	__end_string string
	__version    []int
	__browser    string
	__reg        []int
	__str        map[string]string

	// Instance variables
	chunk        []int
	size         int
	reg          []int
	ua_code      []int
	browser      string
	browser_len  int
	browser_code []int
}

// NewABogus is the constructor for ABogus.
// platform: if provided, will be used to generate browser info; if empty, default __browser is used.
func NewABogus(platform string) *ABogus {
	filter, _ := regexp.Compile(`%([0-9A-F]{2})`)
	ab := &ABogus{
		__filter:     filter,
		__arguments:  []int{0, 1, 14},
		__ua_key:     "\u0000\u0001\u000e",
		__end_string: "cus",
		__version:    []int{1, 0, 1, 5},
		__browser:    "1536|742|1536|864|0|0|0|0|1536|864|1536|864|1536|742|24|24|MacIntel",
		__reg:        []int{1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214},
		__str: map[string]string{
			"s0": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
			"s1": "Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
			"s2": "Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
			"s3": "ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe",
			"s4": "Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe",
		},
		chunk: []int{},
		size:  0,
		reg:   nil,
		ua_code: []int{
			76, 98, 15, 131, 97, 245, 224, 133,
			122, 199, 241, 166, 79, 34, 90, 191,
			128, 126, 122, 98, 66, 11, 14, 40,
			49, 110, 110, 173, 67, 96, 138, 252,
		},
	}
	// Copy __reg to reg
	ab.reg = make([]int, len(ab.__reg))
	copy(ab.reg, ab.__reg)
	if platform != "" {
		ab.browser = ab.Generate_browser_info(platform)
	} else {
		ab.browser = ab.__browser
	}
	ab.browser_len = len(strings.Split(ab.browser, "|"))
	ab.browser_code = char_code_at(ab.browser)
	return ab
}

// List_1 is a class method.
func (AB *ABogus) List_1(random_num *float64, a, b, c int) []int {
	return random_list(random_num, a, b, 1, 2, 5, c&a)
}

// List_2 is a class method.
func (AB *ABogus) List_2(random_num *float64, a, b int) []int {
	return random_list(random_num, a, b, 1, 0, 0, 0)
}

// List_3 is a class method.
func (AB *ABogus) List_3(random_num *float64, a, b int) []int {
	return random_list(random_num, a, b, 1, 0, 5, 0)
}

// random_list is a static method.
func random_list(a *float64, b, c, d, e, f, g int) []int {
	var r float64
	if a == nil {
		r = rand.Float64() * 10000
	} else {
		r = *a
	}
	v := []int{int(r), int(r) & 255, int(r) >> 8}
	s := (v[1] & b) | d
	v = append(v, s)
	s = (v[1] & c) | e
	v = append(v, s)
	s = (v[2] & b) | f
	v = append(v, s)
	s = (v[2] & c) | g
	v = append(v, s)
	return v[len(v)-4:]
}

// from_char_code is a static method.
func from_char_code(args ...int) string {
	var builder strings.Builder
	for _, code := range args {
		builder.WriteRune(rune(code))
	}
	return builder.String()
}

// Generate_string_1 is a class method.
func (AB *ABogus) Generate_string_1(random_num_1, random_num_2, random_num_3 *float64) string {
	return from_char_code(AB.List_1(random_num_1, 170, 85, 45)...) +
		from_char_code(AB.List_2(random_num_2, 170, 85)...) +
		from_char_code(AB.List_3(random_num_3, 170, 85)...)
}

// Generate_string_2 is an instance method.
func (AB *ABogus) Generate_string_2(url_params string, method string, start_time, end_time int) string {
	a := AB.Generate_string_2_list(url_params, method, start_time, end_time)
	e := end_check_num(a)
	a = append(a, AB.browser_code...)
	a = append(a, e)
	return rc4_encrypt(from_char_code(a...), "y")
}

// Generate_string_2_list is an instance method.
func (AB *ABogus) Generate_string_2_list(url_params string, method string, start_time, end_time int) []int {
	if start_time == 0 {
		start_time = int(time.Now().UnixNano() / int64(time.Millisecond))
	}
	if end_time == 0 {
		end_time = start_time + rand.Intn(5) + 4
	}
	paramsArray := AB.Generate_params_code(url_params)
	methodArray := AB.Generate_method_code(method)
	return list_4(
		(end_time>>24)&255,
		paramsArray[21],
		AB.ua_code[23],
		(end_time>>16)&255,
		paramsArray[22],
		AB.ua_code[24],
		(end_time>>8)&255,
		(end_time>>0)&255,
		(start_time>>24)&255,
		(start_time>>16)&255,
		(start_time>>8)&255,
		(start_time>>0)&255,
		methodArray[21],
		methodArray[22],
		int(end_time/256/256/256/256)>>0,
		int(start_time/256/256/256/256)>>0,
		AB.browser_len,
	)
}

// reg_to_array is a static method.
func reg_to_array(a []int) []int {
	o := make([]int, 32)
	for i := 0; i < 8; i++ {
		c := a[i]
		o[4*i+3] = c & 255
		c = c >> 8
		o[4*i+2] = c & 255
		c = c >> 8
		o[4*i+1] = c & 255
		c = c >> 8
		o[4*i] = c & 255
	}
	return o
}

// Compress is an instance method.
func (AB *ABogus) Compress(a []int) {
	f := generate_f(a)
	i := make([]int, len(AB.reg))
	copy(i, AB.reg)
	for o := 0; o < 64; o++ {
		c := (de(i[0], 12) + i[4] + de(pe(o), o)) & 0xFFFFFFFF
		c = de(c, 7)
		s := (c ^ de(i[0], 12)) & 0xFFFFFFFF

		u := he(o, i[0], i[1], i[2])
		u = (u + i[3] + s + f[o+68]) & 0xFFFFFFFF

		b := ve(o, i[4], i[5], i[6])
		b = (b + i[7] + c + f[o]) & 0xFFFFFFFF

		i[3] = i[2]
		i[2] = de(i[1], 9)
		i[1] = i[0]
		i[0] = u

		i[7] = i[6]
		i[6] = de(i[5], 19)
		i[5] = i[4]
		i[4] = (b ^ de(b, 9) ^ de(b, 17)) & 0xFFFFFFFF
	}
	for l := 0; l < 8; l++ {
		AB.reg[l] = (AB.reg[l] ^ i[l]) & 0xFFFFFFFF
	}
}

// generate_f is a class method.
func generate_f(e []int) []int {
	r := make([]int, 132)
	for t := 0; t < 16; t++ {
		r[t] = ((e[4*t] << 24) | (e[4*t+1] << 16) | (e[4*t+2] << 8) | e[4*t+3]) & 0xFFFFFFFF
	}
	for n := 16; n < 68; n++ {
		a := r[n-16] ^ r[n-9] ^ de(r[n-3], 15)
		a = a ^ de(a, 15) ^ de(a, 23)
		r[n] = (a ^ de(r[n-13], 7) ^ r[n-6]) & 0xFFFFFFFF
	}
	for n := 68; n < 132; n++ {
		r[n] = (r[n-68] ^ r[n-64]) & 0xFFFFFFFF
	}
	return r
}

// pad_array is a static method.
func pad_array(arr []int, length int) []int {
	for len(arr) < length {
		arr = append(arr, 0)
	}
	return arr
}

// Fill is an instance method.
func (AB *ABogus) Fill(length int) {
	size := 8 * AB.size
	AB.chunk = append(AB.chunk, 128)
	AB.chunk = pad_array(AB.chunk, length)
	for i := 0; i < 4; i++ {
		shift := uint(8 * (3 - i))
		AB.chunk = append(AB.chunk, (size>>shift)&255)
	}
}

// list_4 is a static method.
func list_4(a, b, c, d, e, f, g, h, i, j, k, m, n, o, p, q, r int) []int {
	return []int{
		44,
		a,
		0,
		0,
		0,
		0,
		24,
		b,
		n,
		0,
		c,
		d,
		0,
		0,
		0,
		1,
		0,
		239,
		e,
		o,
		f,
		g,
		0,
		0,
		0,
		0,
		h,
		0,
		0,
		14,
		i,
		j,
		0,
		k,
		m,
		3,
		p,
		1,
		q,
		1,
		r,
		0,
		0,
		0,
	}
}

// end_check_num is a static method.
func end_check_num(a []int) int {
	r := 0
	for _, i := range a {
		r ^= i
	}
	return r
}

// Decode_string is a class method.
func (AB *ABogus) Decode_string(url_string string) string {
	return AB.__filter.ReplaceAllStringFunc(url_string, replace_func)
}

// replace_func is a static method.
func replace_func(match string) string {
	// match is like "%XY", remove "%" and parse the hex.
	if len(match) >= 3 {
		val, err := strconv.ParseInt(match[1:3], 16, 32)
		if err == nil {
			return string(rune(val))
		}
	}
	return match
}

// de is a static method.
func de(e int, r int) int {
	r = r % 32
	return ((e << r) & 0xFFFFFFFF) | (e >> (32 - r))
}

// pe is a static method.
func pe(e int) int {
	if e >= 0 && e < 16 {
		return 2043430169
	}
	return 2055708042
}

// he is a static method.
func he(e, r, t, n int) int {
	if e >= 0 && e < 16 {
		return (r ^ t ^ n) & 0xFFFFFFFF
	} else if e >= 16 && e < 64 {
		return ((r & t) | (r & n) | (t & n)) & 0xFFFFFFFF
	}
	panic("ValueError")
}

// ve is a static method.
func ve(e, r, t, n int) int {
	if e >= 0 && e < 16 {
		return (r ^ t ^ n) & 0xFFFFFFFF
	} else if e >= 16 && e < 64 {
		return ((r & t) | ((^r) & n)) & 0xFFFFFFFF
	}
	panic("ValueError")
}

// convert_to_char_code is a static method.
func convert_to_char_code(a string) []int {
	d := []int{}
	for _, ch := range a {
		d = append(d, int(ch))
	}
	return d
}

// split_array is a static method.
func split_array(arr []int, chunk_size int) [][]int {
	var result [][]int
	for i := 0; i < len(arr); i += chunk_size {
		end := i + chunk_size
		if end > len(arr) {
			end = len(arr)
		}
		result = append(result, arr[i:end])
	}
	return result
}

// char_code_at is a static method.
func char_code_at(s string) []int {
	codes := []int{}
	for _, ch := range s {
		codes = append(codes, int(ch))
	}
	return codes
}

// Write is an instance method.
func (AB *ABogus) Write(e interface{}) {
	switch v := e.(type) {
	case string:
		decoded := AB.Decode_string(v)
		AB.chunk = char_code_at(decoded)
	case []int:
		AB.chunk = v
	default:
		AB.chunk = []int{}
	}
	AB.size = len(AB.chunk)
	if len(AB.chunk) > 64 {
		chunks := split_array(AB.chunk, 64)
		for _, c := range chunks[:len(chunks)-1] {
			AB.Compress(c)
		}
		AB.chunk = chunks[len(chunks)-1]
	}
}

// Reset is an instance method.
func (AB *ABogus) Reset() {
	AB.chunk = []int{}
	AB.size = 0
	AB.reg = make([]int, len(AB.__reg))
	copy(AB.reg, AB.__reg)
}

// Sum is an instance method.
func (AB *ABogus) Sum(e interface{}, length int) []int {
	AB.Reset()
	AB.Write(e)
	AB.Fill(length)
	AB.Compress(AB.chunk)
	return reg_to_array(AB.reg)
}

// Generate_result_unit is a class method.
func (AB *ABogus) Generate_result_unit(n int, s string) string {
	r := ""
	masks := []int{16515072, 258048, 4032, 63}
	jValues := []int{18, 12, 6, 0}
	for idx, i := range jValues {
		mask := masks[idx]
		r += string(AB.__str[s][(n&mask)>>i])
	}
	return r
}

// Generate_result_end is a class method.
func (AB *ABogus) Generate_result_end(s string, e string) string {
	r := ""
	b := char_code_at(s)[120] << 16
	r += string(AB.__str[e][(b&16515072)>>18])
	r += string(AB.__str[e][(b&258048)>>12])
	r += "=="
	return r
}

// Generate_result is a class method.
func (AB *ABogus) Generate_result(s string, e string) string {
	var r []string
	for i := 0; i < len(s); i += 3 {
		var n int
		if i+2 < len(s) {
			n = (int(s[i]) << 16) | (int(s[i+1]) << 8) | int(s[i+2])
		} else if i+1 < len(s) {
			n = (int(s[i]) << 16) | (int(s[i+1]) << 8)
		} else {
			n = int(s[i]) << 16
		}
		maskVals := []int{0xFC0000, 0x03F000, 0x0FC0, 0x3F}
		indexShifts := []int{18, 12, 6, 0}
		for j := 0; j < 4; j++ {
			if j == 1 && i+1 >= len(s) {
				break
			}
			if j == 3 && i+2 >= len(s) {
				break
			}
			idx := (n & maskVals[j]) >> indexShifts[j]
			r = append(r, string(AB.__str[e][idx]))
		}
	}
	// Append "=" * ((4 - len(r) % 4) % 4)
	padding := (4 - (len(r) % 4)) % 4
	r = append(r, strings.Repeat("=", padding))
	return strings.Join(r, "")
}

// Generate_args_code is a class method.
func (AB *ABogus) Generate_args_code() []int {
	a := []int{}
	for j := 24; j >= 0; j -= 8 {
		a = append(a, AB.__arguments[0]>>j)
	}
	a = append(a, (AB.__arguments[1] / 256))
	a = append(a, (AB.__arguments[1] % 256))
	a = append(a, AB.__arguments[1]>>24)
	a = append(a, AB.__arguments[1]>>16)
	for j := 24; j >= 0; j -= 8 {
		a = append(a, AB.__arguments[2]>>j)
	}
	result := []int{}
	for _, i := range a {
		result = append(result, i&255)
	}
	return result
}

// Generate_method_code is an instance method.
func (AB *ABogus) Generate_method_code(method string) []int {
	return sm3_to_array(sm3_to_array(method + AB.__end_string))
	// return AB.Sum(method + AB.__end_string)
}

// Generate_params_code is an instance method.
func (AB *ABogus) Generate_params_code(params string) []int {
	return sm3_to_array(sm3_to_array(params + AB.__end_string))
	// return AB.Sum(params + AB.__end_string)
}

// sm3_to_array is a class method.
/*
代码参考: https://github.com/Johnserf-Seed/f2/blob/main/f2/utils/abogus.py

计算请求体的 SM3 哈希值，并将结果转换为整数数组
Calculate the SM3 hash value of the request body and convert the result to an array of integers

Args:
    data (Union[str, List[int]]): 输入数据 (Input data).

Returns:
    List[int]: 哈希值的整数数组 (Array of integers representing the hash value).
*/
func sm3_to_array(data interface{}) []int {
	var b []byte
	switch v := data.(type) {
	case string:
		b = []byte(v)
	case []int:
		b = make([]byte, len(v))
		for i, val := range v {
			b[i] = byte(val)
		}
	default:
		b = []byte{}
	}
	// Compute SM3 hash using gmssl/sm3 library.
	digest := sm3.New()
	digest.Write(b)
	hashBytes := digest.Sum(nil)
	// Convert to hex string.
	hexStr := hex.EncodeToString(hashBytes)
	result := []int{}
	for i := 0; i < len(hexStr); i += 2 {
		part := hexStr[i : i+2]
		v, err := strconv.ParseInt(part, 16, 32)
		if err == nil {
			result = append(result, int(v))
		}
	}
	return result
}

// Generate_browser_info is a class method.
func (AB *ABogus) Generate_browser_info(platform string) string {
	inner_width := rand.Intn(1920-1280+1) + 1280
	inner_height := rand.Intn(1080-720+1) + 720
	outer_width := rand.Intn(1920-inner_width+1) + inner_width
	outer_height := rand.Intn(1080-inner_height+1) + inner_height
	screen_x := 0
	screen_yOptions := []int{0, 30}
	screen_y := screen_yOptions[rand.Intn(len(screen_yOptions))]
	value_list := []interface{}{
		inner_width,
		inner_height,
		outer_width,
		outer_height,
		screen_x,
		screen_y,
		0,
		0,
		outer_width,
		outer_height,
		outer_width,
		outer_height,
		inner_width,
		inner_height,
		24,
		24,
		platform,
	}
	strList := []string{}
	for _, v := range value_list {
		strList = append(strList, fmt.Sprintf("%v", v))
	}
	return strings.Join(strList, "|")
}

// rc4_encrypt is a static method.
func rc4_encrypt(plaintext, key string) string {
	s := make([]int, 256)
	for i := 0; i < 256; i++ {
		s[i] = i
	}
	j := 0
	for i := 0; i < 256; i++ {
		j = (j + s[i] + int(key[i%len(key)])) % 256
		s[i], s[j] = s[j], s[i]
	}
	i := 0
	j = 0
	cipher := []rune{}
	for k := 0; k < len(plaintext); k++ {
		i = (i + 1) % 256
		j = (j + s[i]) % 256
		s[i], s[j] = s[j], s[i]
		t := (s[i] + s[j]) % 256
		cipher = append(cipher, rune(s[t]^int(plaintext[k])))
	}
	return string(cipher)
}

// Get_value is an instance method.
func (AB *ABogus) Get_value(url_params interface{}, method string, start_time, end_time int, random_num_1, random_num_2, random_num_3 *float64) string {
	var paramsStr string
	switch v := url_params.(type) {
	case map[string]string:
		values := url.Values{}
		for key, value := range v {
			values.Set(key, value)
		}
		paramsStr = values.Encode()
	case string:
		paramsStr = v
	default:
		paramsStr = ""
	}
	string_1 := AB.Generate_string_1(random_num_1, random_num_2, random_num_3)
	string_2 := AB.Generate_string_2(paramsStr, method, start_time, end_time)
	stringAll := string_1 + string_2
	// return AB.Generate_result(stringAll, "s4") + AB.Generate_result_end(stringAll, "s4")
	return AB.Generate_result(stringAll, "s4")
}

func GetAbogusToken(link string) string {
	bogus := NewABogus("")
	u, _ := url.Parse(link)
	urlParams := map[string]string{}
	for key, vals := range u.Query() {
		if len(vals) > 0 {
			urlParams[key] = vals[0]
		}
	}
	a_bogus := bogus.Get_value(urlParams, "GET", 0, 0, nil, nil, nil)
	a_bogus = url.QueryEscape(a_bogus)

	return a_bogus
}

// func main() {
// 	// Uncomment the following lines to run a test similar to the Python main.

// 		// query := os.Args
// 		// query := []string{"", "7345492945006595379"}
// 		// 7345492945006595379
// 		// USERAGENT := "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
// 		// 将url参数转换为字典
// 		// fmt.Println(USERAGENT)

// 	// For now, just exit.
// 	os.Exit(0)
// }
