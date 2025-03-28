package v1

import (
	crand "crypto/rand"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"math"
	"math/big"
	"math/rand"
	"sort"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/gofiber/fiber/v2"
)

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Visitor id",
		Endpoint:    "/visitor-id",
		Method:      "GET",
		Description: "Mendapatkan visitor id",
		Params:      map[string]interface{}{},
		Type:        "",
		Body:        map[string]interface{}{},

		Code: func(c *fiber.Ctx) error {

			res := f61(COMPONENTS())

			return c.Status(200).JSON(fiber.Map{
				"token": res,
			})
		},
	})
}

func generateRandomMathValues() map[string]interface{} {
	x := rand.Intn(2)
	y := rand.Intn(10)

	return map[string]interface{}{
		"acos":    math.Acos(math.Abs(float64(x))),
		"acosh":   math.Acosh(float64(y + 1)),
		"acoshPf": math.Acosh(float64(y + 1)),
		"asin":    math.Asin(float64(x)),
		"asinh":   math.Asinh(float64(x)),
		"asinhPf": math.Asinh(float64(x)),
		"atanh":   math.Atanh(float64(float64(x) * 0.9)),
		"atanhPf": math.Atanh(float64(float64(x) * 0.9)),
		"atan":    math.Atan(float64(x)),
		"sin":     math.Sin(float64(y)),
		"sinh":    math.Sinh(float64(y)),
		"sinhPf":  math.Sinh(float64(float64(y) * 0.5)),
		"cos":     math.Cos(float64(y)),
		"cosh":    math.Cosh(float64(y)),
		"coshPf":  math.Cosh(float64(y)),
		"tan":     math.Tan(float64(y)),
		"tanh":    math.Tanh(float64(y)),
		"tanhPf":  math.Tanh(float64(y)),
		"exp":     math.Exp(float64(x)),
		"expm1":   math.Expm1(float64(x)),
		"expm1Pf": math.Expm1(float64(x)),
		"log1p":   math.Log1p(float64(y)),
		"log1pPf": math.Log1p(float64(y)),
		"powPI":   math.Pow(float64(math.Pi), float64(-y)),
	}
}

var shaderTypes = []string{"FRAGMENT_SHADER", "VERTEX_SHADER"}
var precisionLevels = []string{"LOW_FLOAT", "MEDIUM_FLOAT", "HIGH_FLOAT", "LOW_INT", "MEDIUM_INT", "HIGH_INT"}
var extensions = []string{
	"ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_clip_control",
	"EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_disjoint_timer_query",
	"OES_texture_float", "OES_texture_half_float", "WEBGL_draw_buffers",
}
var extensionParams = []string{
	"COLOR_ATTACHMENT0_WEBGL=36064", "COMPRESSED_RGBA_S3TC_DXT1_EXT=33777",
	"DEPTH_CLAMP_EXT=34383", "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT=33296",
	"TEXTURE_MAX_ANISOTROPY_EXT=34046=16",
}
var vA5 = [2]uint64{2277735313, 289559509}
var vA6 = [2]uint64{1291169091, 658871167}
var vA7 = [2]uint64{0, 5}
var vA8 = [2]uint64{0, 1390208809}
var vA9 = [2]uint64{0, 944331445}
var vA2 = [2]uint64{4283543511, 3981806797}
var vA3 = [2]uint64{3301882366, 444984403}

func getRandomParameter() string {
	var keys = []string{
		"ACTIVE_ATTRIBUTES", "ACTIVE_TEXTURE", "ACTIVE_UNIFORMS", "ALIASED_LINE_WIDTH_RANGE",
		"ALIASED_POINT_SIZE_RANGE", "ALPHA", "ALPHA_BITS", "ALWAYS", "ARRAY_BUFFER",
		"ARRAY_BUFFER_BINDING", "ATTACHED_SHADERS", "BACK", "BLEND", "BLEND_COLOR",
		"BLEND_DST_ALPHA", "BLEND_DST_RGB", "BLEND_EQUATION", "BLEND_EQUATION_ALPHA",
		"BLEND_EQUATION_RGB", "BLEND_SRC_ALPHA", "BLEND_SRC_RGB", "BLUE_BITS",
		"BOOL", "BOOL_VEC2", "BOOL_VEC3", "BOOL_VEC4", "BROWSER_DEFAULT_WEBGL",
	}

	var key = keys[rand.Intn(len(keys))]
	var value interface{}
	if float64(rand.Float64()) > 0.5 {
		value = strconv.Itoa(rand.Intn(50000))
	} else {
		value = strconv.Itoa((rand.Intn(1000))) + "," + strconv.Itoa((rand.Intn(1000)))
	}

	return fmt.Sprintf("\"%s=%s\"", key, value)
}

func generateRandomParameters(count int) string {
	var parameters []string
	for i := 0; i < count; i++ {
		parameters = append(parameters, getRandomParameter())
	}

	return fmt.Sprintf("{\n  \"parameters\": [\n    %s\n  ]\n}", strings.Join(parameters, ",\n    "))
}

func getRandomNumber(min, max int) int {
	return rand.Intn(max-min+1) + min
}

func generateShaderPrecisions() []string {
	var result []string
	for _, shaderType := range shaderTypes {
		for _, level := range precisionLevels {
			result = append(result, fmt.Sprintf("%s.%s=%d,%d,%d", shaderType, level, getRandomNumber(10, 200), getRandomNumber(10, 200), getRandomNumber(0, 50)))
		}
	}
	return result
}

func generateExtensions() []string {
	rand.Shuffle(len(extensions), func(i, j int) { extensions[i], extensions[j] = extensions[j], extensions[i] })
	return extensions[:getRandomNumber(5, len(extensions))]
}

func generateExtensionParameters() []string {
	rand.Shuffle(len(extensionParams), func(i, j int) { extensionParams[i], extensionParams[j] = extensionParams[j], extensionParams[i] })
	return extensionParams[:getRandomNumber(3, len(extensionParams))]
}

func generateDummyData() map[string]interface{} {
	return map[string]interface{}{
		"shaderPrecisions":    generateShaderPrecisions(),
		"extensions":          generateExtensions(),
		"extensionParameters": generateExtensionParameters(),
	}
}

func randomInt(min, max int) int {
	n, _ := crand.Int(crand.Reader, big.NewInt(int64(max-min+1)))
	return int(n.Int64()) + min
}

func randomFloat(min, max float64) float64 {
	return min + (max-min)*randFloat()
}

func randFloat() float64 {
	b := make([]byte, 8)
	_, _ = crand.Read(b)
	n := binary.LittleEndian.Uint64(b)
	return float64(n) / (1 << 64)
}

func randomBool() bool {
	return randomInt(0, 1) == 1
}

func COMPONENTS() map[string]interface{} {
	var webgl = map[string]interface{}{
		"contextAttributes": []string{
			fmt.Sprintf("alpha=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("antialias=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("depth=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("desynchronized=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("failIfMajorPerformanceCaveat=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("powerPreference=default"),
			fmt.Sprintf("premultipliedAlpha=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("preserveDrawingBuffer=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("stencil=%f", randomFloat(0, 0.5)),
			fmt.Sprintf("xrCompatible=%f", randomFloat(0, 0.5)),
		},
		"parameters":            generateRandomParameters(15),
		"unsupportedExtensions": []interface{}{},
	}

	var webassign map[string]interface{} = make(map[string]interface{})
	for k, v := range webgl {
		webassign[k] = v
	}
	for k, v := range generateDummyData() {
		webassign[k] = v
	}

	var COMPONENTS = map[string]interface{}{
		"applePay":         []int{-1, 1, 0}[randomInt(0, 2)],
		"architecture":     rand.Intn(255),
		"audio":            randomFloat(0, 999.9999),
		"audioBaseLatency": []int{-1, -2, 1}[randomInt(0, 2)],
		"canvas": map[string]interface{}{
			"winding":  randomBool(),
			"geometry": "data:image/png;base64,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",
			"text":     "data:image/png;base64,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",
		},
		"colorDepth":     rand.Intn(24),
		"colorGamut":     []string{"srgb", "rgb", "rgba"}[randomInt(0, 2)],
		"contrast":       rand.Intn(255),
		"cookiesEnabled": true,
		"deviceMemory":   rand.Intn(24),
		"fontPreferences": map[string]float64{
			"default": randomFloat(0, 247.9999),
			"apple":   randomFloat(0, 239.1013),
			"serif":   randomFloat(0, 973.1287),
			"sans":    randomFloat(0, 778.1238),
			"mono":    randomFloat(0, 87.918351),
			"min":     randomFloat(0, 9.23409),
			"system":  randomFloat(0, 999.999999),
		},
		"fonts": []string{
			"Agency FB",
			"Calibri",
			"Century",
			"Century Gothic",
			"Franklin Gothic",
			"Futura Bk BT",
			"Futura Md BT",
			"Haettenschweiler",
			"Humanst521 BT",
			"Leelawadee",
			"Lucida Bright",
			"Lucida Sans",
			"MS Outlook",
			"MS Reference Specialty",
			"MS UI Gothic",
			"MT Extra",
			"Marlett",
			"Microsoft Uighur",
			"Monotype Corsiva",
			"Pristina",
			"Segoe UI Light",
		}[rand.Intn(5):rand.Intn(20)],
		"forcedColors":        false,
		"hardwareConcurrency": rand.Intn(12),
		"hdr":                 randomBool(),
		"indexedDB":           true,
		"languages": []string{
			[]string{
				"id-ID",
				"en-EN",
				"us-US",
				"eu-EU",
			}[rand.Intn(3)],
		},
		"localStorage":     true,
		"math":             generateRandomMathValues(),
		"monochrome":       0,
		"openDatabase":     false,
		"pdfViewerEnabled": true,
		"platform":         []string{"Win32", "Win64", "Linux", "MacOS"}[rand.Intn(4)],
		"plugins": []map[string]interface{}{
			{
				"name":        "PDF Viewer",
				"description": "Portable Document Format",
				"mimeTypes": []map[string]interface{}{
					{
						"type":     "application/pdf",
						"suffixes": "pdf",
					},
					{
						"type":     "text/pdf",
						"suffixes": "pdf",
					},
				},
			},
			{
				"name":        "Chrome PDF Viewer",
				"description": "Portable Document Format",
				"mimeTypes": []map[string]interface{}{
					{
						"type":     "application/pdf",
						"suffixes": "pdf",
					},
					{
						"type":     "text/pdf",
						"suffixes": "pdf",
					},
				},
			},
			{
				"name":        "Chromium PDF Viewer",
				"description": "Portable Document Format",
				"mimeTypes": []map[string]interface{}{
					{
						"type":     "application/pdf",
						"suffixes": "pdf",
					},
					{
						"type":     "text/pdf",
						"suffixes": "pdf",
					},
				},
			},
			{
				"name":        "Microsoft Edge PDF Viewer",
				"description": "Portable Document Format",
				"mimeTypes": []map[string]interface{}{
					{
						"type":     "application/pdf",
						"suffixes": "pdf",
					},
					{
						"type":     "text/pdf",
						"suffixes": "pdf",
					},
				},
			},
			{
				"name":        "WebKit built-in PDF",
				"description": "Portable Document Format",
				"mimeTypes": []map[string]interface{}{
					{
						"type":     "application/pdf",
						"suffixes": "pdf",
					},
					{
						"type":     "text/pdf",
						"suffixes": "pdf",
					},
				},
			},
		}[rand.Intn(5)],
		"reducedMotion":       false,
		"reducedTransparency": false,
		"screenFrame": []int{
			0,
			0,
			50,
			0,
		},
		"screenResolution": []int{
			rand.Intn(4090),
			rand.Intn(3090),
		},
		"sessionStorage": true,
		"timezone":       "Asia/Jakarta",
		"touchSupport": map[string]interface{}{
			"maxTouchPoints": 0,
			"touchEvent":     false,
			"touchStart":     false,
		},
		"vendor": `${_randomChar(10)}`,
		"vendorFlavors": []string{
			"chrome",
		},
		"webGlBasics": map[string]string{
			"version":                "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
			"vendor":                 "WebKit",
			"vendorUnmasked":         `${_randomChar(10)} (NVIDIA)`,
			"renderer":               "WebKit WebGL",
			"rendererUnmasked":       fmt.Sprintf("ANGLE (NVIDIA, NVIDIA GeForce RTX %s (0x00001380) Direct3D11 vs_5_0 ps_5_0, D3D11)", []string{"3090", "4090", "5090", "360", "450", "720"}[rand.Intn(6)]),
			"shadingLanguageVersion": "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
		},
		"webGlExtensions": webassign,
	}

	return COMPONENTS
}

func f24(p58 *[2]uint64, p59 int) {
	v48 := p58[0]
	p59 %= 64

	if p59 == 32 {
		p58[0] = p58[1]
		p58[1] = v48
	} else if p59 < 32 {
		p58[0] = (v48 << uint(p59)) | (p58[1] >> (32 - p59))
		p58[1] = (p58[1] << uint(p59)) | (v48 >> (32 - p59))
	} else {
		p59 -= 32
		p58[0] = (p58[1] << uint(p59)) | (v48 >> (32 - p59))
		p58[1] = (v48 << uint(p59)) | (p58[1] >> (32 - p59))
	}
}

func f22(p54 *[2]uint64, p55 *[2]uint64) {
	var v28, v29, v30, v31, v32, v33, v34, v35, v36, v37, vLN03, vLN04 uint64

	v30 = p54[0] >> 16
	v31 = p54[0] & 65535
	v32 = p54[1] >> 16
	v33 = p54[1] & 65535
	v34 = p55[0] >> 16
	v35 = p55[0] & 65535
	v36 = p55[1] >> 16
	v37 = p55[1] & 65535

	vLN03 = 0
	vLN04 = 0
	v29 = (v33 + v37) >> 16
	v28 = v29 & 65535
	v28 += v32 + v36
	vLN04 += v28 >> 16
	v28 &= 65535
	vLN04 += v31 + v35
	vLN03 += vLN04 >> 16
	vLN04 &= 65535
	vLN03 += v30 + v34
	vLN03 &= 65535

	p54[0] = (vLN03 << 16) | vLN04
	p54[1] = (v28 << 16) | v29
}

func f25(p60 *[2]uint64, p61 uint64) {
	p61 %= 64
	if p61 != 0 {
		if p61 < 32 {
			p60[0] = p60[1] >> (32 - p61)
			p60[1] = p60[1] << p61
		} else {
			p60[0] = p60[1] << (p61 - 32)
			p60[1] = 0
		}
	}
}

func f26(p62, p63 *[2]uint64) {
	p62[0] ^= p63[0]
	p62[1] ^= p63[1]
}

func f23(p56, p57 *[2]uint64) {
	var v38, v39, v40, v41, v42, v43, v44, v45, v46, v47, vLN05, vLN06 uint64

	v40 = p56[0] >> 16
	v41 = p56[0] & 65535
	v42 = p56[1] >> 16
	v43 = p56[1] & 65535
	v44 = p57[0] >> 16
	v45 = p57[0] & 65535
	v46 = p57[1] >> 16
	v47 = p57[1] & 65535

	vLN05 = 0
	vLN06 = 0

	v39 = v43 * v47
	v38 = (v39 >> 16)
	v39 &= 65535
	v38 += v42 * v47
	vLN06 += v38 >> 16
	v38 &= 65535
	v38 += v43 * v46
	vLN06 += v38 >> 16
	v38 &= 65535
	vLN06 += v41 * v47
	vLN05 += vLN06 >> 16
	vLN06 &= 65535
	vLN06 += v42 * v46
	vLN05 += vLN06 >> 16
	vLN06 &= 65535
	vLN06 += v43 * v45
	vLN05 += vLN06 >> 16
	vLN06 &= 65535
	vLN05 += v40*v47 + v41*v46 + v42*v45 + v43*v44
	vLN05 &= 65535

	p56[0] = (vLN05 << 16) | vLN06
	p56[1] = (v38 << 16) | v39
}

func f27(p64 *[2]uint64) {
	var vA4 = [2]uint64{0, p64[0] >> 1}
	f26(p64, &vA4)
	f23(p64, &vA2)
	vA4[1] = p64[0] >> 1
	f26(p64, &vA4)
	f23(p64, &vA3)
	vA4[1] = p64[0] >> 1
	f26(p64, &vA4)
}

func f61(p138 map[string]interface{}) string {
	// Fungsi anonim yang mengonversi map ke string
	processMap := func(p142 map[string]interface{}) string {
		var vLS strings.Builder
		keys := make([]string, 0, len(p142))
		for k := range p142 {
			keys = append(keys, k)
		}
		sort.Strings(keys) // Urutkan keys

		for _, v245 := range keys {
			v246 := p142[v245]
			var v247 string
			switch v := v246.(type) {
			case string:
				v247 = v
			default:
				jsonData, _ := json.Marshal(v)
				v247 = string(jsonData)
			}
			// Escape karakter khusus
			v245 = strings.NewReplacer(":", "\\:", "|", "\\|", "\\", "\\\\").Replace(v245)
			if vLS.Len() > 0 {
				vLS.WriteString("|")
			}
			vLS.WriteString(fmt.Sprintf("%s:%s", v245, v247))
		}
		return vLS.String()
	}

	// Fungsi anonim yang memproses string dan offset
	processString := func(p139 string, p140 int) string {
		// Konversi string ke []byte
		vF5 := func(p141 string) []byte {
			if utf8.RuneCountInString(p141) != len(p141) {
				// Jika ada karakter non-ASCII, gunakan UTF-8 encoding
				return []byte(p141)
			}
			// Jika semua karakter ASCII, konversi langsung
			return []byte(p141)
		}(p139)

		p140 = p140 % 64 // Pastikan p140 dalam rentang 0-63
		vA27 := [2]uint64{0, uint64(len(vF5))}
		v242 := vA27[1] % 16
		v243 := vA27[1] - v242

		vA28 := [2]uint64{0, uint64(p140)}
		vA29 := [2]uint64{0, uint64(p140)}
		vA30 := [2]uint64{0, 0}
		vA31 := [2]uint64{0, 0}

		var v239 int

		for v239 = 0; v239 < int(v243); v239 += 16 {
			vA30[0] = uint64(vF5[v239+4]) | uint64(vF5[v239+5])<<8 | uint64(vF5[v239+6])<<16 | uint64(vF5[v239+7])<<24
			vA30[1] = uint64(vF5[v239]) | uint64(vF5[v239+1])<<8 | uint64(vF5[v239+2])<<16 | uint64(vF5[v239+3])<<24
			vA31[0] = uint64(vF5[v239+12]) | uint64(vF5[v239+13])<<8 | uint64(vF5[v239+14])<<16 | uint64(vF5[v239+15])<<24
			vA31[1] = uint64(vF5[v239+8]) | uint64(vF5[v239+9])<<8 | uint64(vF5[v239+10])<<16 | uint64(vF5[v239+11])<<24

			f23(&vA30, &vA5)
			f24(&vA30, 31)
			f23(&vA30, &vA6)
			f26(&vA28, &vA30)
			f24(&vA28, 27)
			f22(&vA28, &vA29)
			f23(&vA28, &vA7)
			f22(&vA28, &vA8)
			f23(&vA31, &vA6)
			f24(&vA31, 33)
			f23(&vA31, &vA5)
			f26(&vA29, &vA31)
			f24(&vA29, 31)
			f22(&vA29, &vA28)
			f23(&vA29, &vA7)
			f22(&vA29, &vA9)
		}

		// Penanganan sisa data
		vA32 := [2]uint64{0, 0}
		switch v242 {
		case 15:
			vA32[1] = uint64(vF5[v239+14])
			f25(&vA32, 48)
			f26(&vA31, &vA32)
		case 14:
			vA32[1] = uint64(vF5[v239+13])
			f25(&vA32, 40)
			f26(&vA31, &vA32)
		case 13:
			vA32[1] = uint64(vF5[v239+12])
			f25(&vA32, 32)
			f26(&vA31, &vA32)
		case 12:
			vA32[1] = uint64(vF5[v239+11])
			f25(&vA32, 24)
			f26(&vA31, &vA32)
		case 11:
			vA32[1] = uint64(vF5[v239+10])
			f25(&vA32, 16)
			f26(&vA31, &vA32)
		case 10:
			vA32[1] = uint64(vF5[v239+9])
			f25(&vA32, 8)
			f26(&vA31, &vA32)
		case 9:
			vA32[1] = uint64(vF5[v239+8])
			f26(&vA31, &vA32)
			f23(&vA31, &vA6)
			f24(&vA31, 33)
			f23(&vA31, &vA5)
			f26(&vA29, &vA31)
		case 8:
			vA32[1] = uint64(vF5[v239+7])
			f25(&vA32, 56)
			f26(&vA30, &vA32)
		case 7:
			vA32[1] = uint64(vF5[v239+6])
			f25(&vA32, 48)
			f26(&vA30, &vA32)
		case 6:
			vA32[1] = uint64(vF5[v239+5])
			f25(&vA32, 40)
			f26(&vA30, &vA32)
		case 5:
			vA32[1] = uint64(vF5[v239+4])
			f25(&vA32, 32)
			f26(&vA30, &vA32)
		case 4:
			vA32[1] = uint64(vF5[v239+3])
			f25(&vA32, 24)
			f26(&vA30, &vA32)
		case 3:
			vA32[1] = uint64(vF5[v239+2])
			f25(&vA32, 16)
			f26(&vA30, &vA32)
		case 2:
			vA32[1] = uint64(vF5[v239+1])
			f25(&vA32, 8)
			f26(&vA30, &vA32)
		case 1:
			vA32[1] = uint64(vF5[v239])
			f26(&vA30, &vA32)
			f23(&vA30, &vA5)
			f24(&vA30, 31)
			f23(&vA30, &vA6)
			f26(&vA28, &vA30)
		}

		// Operasi setelah switch
		f26(&vA28, &vA27)
		f26(&vA29, &vA27)
		f22(&vA28, &vA29)
		f22(&vA29, &vA28)
		f27(&vA28)
		f27(&vA29)
		f22(&vA28, &vA29)
		f22(&vA29, &vA28)

		// Format hasil akhir
		result := fmt.Sprintf("%08x%08x%08x%08x", vA28[0], vA28[1], vA29[0], vA29[1])
		return result
	}

	p139 := processMap(p138)
	return processString(p139, 0)
}
