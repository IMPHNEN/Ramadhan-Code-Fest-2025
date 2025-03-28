package v1

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"down/helper"

	"github.com/gofiber/fiber/v2"
)

type PinterestSearchResponse struct {
	ResourceResponse struct {
		Bookmark                  string `json:"bookmark"`
		Code                      int    `json:"code"`
		EndpointName              string `json:"endpoint_name"`
		HTTPStatus                int    `json:"http_status"`
		Message                   string `json:"message"`
		Status                    string `json:"status"`
		XPinterestSliEndpointName string `json:"x_pinterest_sli_endpoint_name"`
		Metadata                  struct {
			UnitySearchQuery interface{} `json:"unity_search_query"`
		} `json:"metadata"`
		Data struct {
			ClientTrackingParams string `json:"clientTrackingParams"`
			Nag                  struct {
			} `json:"nag"`
			ShouldAppendGlobalSearch bool `json:"shouldAppendGlobalSearch"`
			Results                  []struct {
				NodeID               string      `json:"node_id"`
				LinkDomain           interface{} `json:"link_domain"`
				IsEligibleForFilters bool        `json:"is_eligible_for_filters"`
				ImageCrop            struct {
					MinY float64 `json:"min_y"`
					MaxY float64 `json:"max_y"`
				} `json:"image_crop"`
				DebugInfoHTML     interface{}   `json:"debug_info_html"`
				IsPrefetchEnabled bool          `json:"is_prefetch_enabled"`
				PromotedLeadForm  interface{}   `json:"promoted_lead_form"`
				IsUploaded        bool          `json:"is_uploaded"`
				ID                string        `json:"id"`
				DidIts            []interface{} `json:"did_its"`
				Pinner            struct {
					NodeID             string      `json:"node_id"`
					IsVerifiedMerchant bool        `json:"is_verified_merchant"`
					AdsOnlyProfileSite interface{} `json:"ads_only_profile_site"`
					ImageSmallURL      string      `json:"image_small_url"`
					Username           string      `json:"username"`
					ImageLargeURL      string      `json:"image_large_url"`
					ImageMediumURL     string      `json:"image_medium_url"`
					FullName           string      `json:"full_name"`
					VerifiedIdentity   struct {
					} `json:"verified_identity"`
					ID               string `json:"id"`
					IsAdsOnlyProfile bool   `json:"is_ads_only_profile"`
					FollowerCount    int    `json:"follower_count"`
				} `json:"pinner"`
				Videos                       interface{}   `json:"videos"`
				DominantColor                string        `json:"dominant_color"`
				Promoter                     interface{}   `json:"promoter"`
				Access                       []interface{} `json:"access"`
				CarouselData                 interface{}   `json:"carousel_data"`
				IsPromoted                   bool          `json:"is_promoted"`
				IsGoLinkless                 bool          `json:"is_go_linkless"`
				ShoppingFlags                []interface{} `json:"shopping_flags"`
				Sponsorship                  interface{}   `json:"sponsorship"`
				Title                        string        `json:"title"`
				InsertionID                  interface{}   `json:"insertion_id"`
				PromotedIsRemovable          bool          `json:"promoted_is_removable"`
				IsDownstreamPromotion        bool          `json:"is_downstream_promotion"`
				StoryPinDataID               string        `json:"story_pin_data_id"`
				IsEligibleForRelatedProducts bool          `json:"is_eligible_for_related_products"`
				Board                        struct {
					NodeID               string `json:"node_id"`
					BoardOrderModifiedAt string `json:"board_order_modified_at"`
					PinCount             int    `json:"pin_count"`
					Images               struct {
						One70X []struct {
							URL           string `json:"url"`
							Width         int    `json:"width"`
							Height        int    `json:"height"`
							DominantColor string `json:"dominant_color"`
						} `json:"170x"`
					} `json:"images"`
					CollaboratingUsers []interface{} `json:"collaborating_users"`
					CollaboratorCount  int           `json:"collaborator_count"`
					IsCollaborative    bool          `json:"is_collaborative"`
					SectionCount       int           `json:"section_count"`
					URL                string        `json:"url"`
					CoverImages        struct {
						Two22X struct {
							URL    string      `json:"url"`
							Width  int         `json:"width"`
							Height interface{} `json:"height"`
						} `json:"222x"`
					} `json:"cover_images"`
					Name  string `json:"name"`
					Type  string `json:"type"`
					ID    string `json:"id"`
					Owner struct {
						NodeID             string      `json:"node_id"`
						IsVerifiedMerchant bool        `json:"is_verified_merchant"`
						AdsOnlyProfileSite interface{} `json:"ads_only_profile_site"`
						ImageSmallURL      string      `json:"image_small_url"`
						Username           string      `json:"username"`
						ImageLargeURL      string      `json:"image_large_url"`
						ImageMediumURL     string      `json:"image_medium_url"`
						FullName           string      `json:"full_name"`
						VerifiedIdentity   struct {
						} `json:"verified_identity"`
						ID               string `json:"id"`
						IsAdsOnlyProfile bool   `json:"is_ads_only_profile"`
						FollowerCount    int    `json:"follower_count"`
					} `json:"owner"`
				} `json:"board"`
				HasRequiredAttributionProvider bool        `json:"has_required_attribution_provider"`
				CampaignID                     interface{} `json:"campaign_id"`
				RichSummary                    interface{} `json:"rich_summary"`
				Description                    string      `json:"description"`
				Embed                          interface{} `json:"embed"`
				Link                           interface{} `json:"link"`
				TrackingParams                 string      `json:"tracking_params"`
				IsEligibleForPdp               bool        `json:"is_eligible_for_pdp"`
				LinkUserWebsite                interface{} `json:"link_user_website"`
				IsOosProduct                   bool        `json:"is_oos_product"`
				GridTitle                      string      `json:"grid_title"`
				StoryPinData                   struct {
					NodeID             string      `json:"node_id"`
					LastEdited         interface{} `json:"last_edited"`
					TotalVideoDuration int         `json:"total_video_duration"`
					PageCount          int         `json:"page_count"`
					Metadata           struct {
						IsPromotable      bool        `json:"is_promotable"`
						TemplateType      interface{} `json:"template_type"`
						Version           string      `json:"version"`
						RootPinID         string      `json:"root_pin_id"`
						RecipeData        interface{} `json:"recipe_data"`
						IsCompatible      bool        `json:"is_compatible"`
						IsEditable        bool        `json:"is_editable"`
						PinTitle          string      `json:"pin_title"`
						Basics            interface{} `json:"basics"`
						CompatibleVersion string      `json:"compatible_version"`
						DiyData           interface{} `json:"diy_data"`
						ShowreelData      interface{} `json:"showreel_data"`
						PinImageSignature string      `json:"pin_image_signature"`
						RootUserID        string      `json:"root_user_id"`
						CanvasAspectRatio float64     `json:"canvas_aspect_ratio"`
					} `json:"metadata"`
					StaticPageCount int `json:"static_page_count"`
					Pages           []struct {
						Blocks []struct {
							BlockType  int `json:"block_type"`
							BlockStyle struct {
								XCoord       json.Number `json:"x_coord"`
								YCoord       json.Number `json:"y_coord"`
								CornerRadius json.Number `json:"corner_radius"`
								Height       json.Number `json:"height"`
								Width        json.Number `json:"width"`
								Rotation     json.Number `json:"rotation"`
							} `json:"block_style"`
							Text           string      `json:"text"`
							ImageSignature string      `json:"image_signature"`
							Type           string      `json:"type"`
							Image          interface{} `json:"image"`
							TrackingID     string      `json:"tracking_id"`
						} `json:"blocks"`
						ID    string `json:"id"`
						Style struct {
							MediaFit        interface{} `json:"media_fit"`
							BackgroundColor string      `json:"background_color"`
						} `json:"style"`
						Layout                 int           `json:"layout"`
						Image                  interface{}   `json:"image"`
						ImageSignature         string        `json:"image_signature"`
						ImageAdjusted          interface{}   `json:"image_adjusted"`
						ImageSignatureAdjusted string        `json:"image_signature_adjusted"`
						VideoSignature         interface{}   `json:"video_signature"`
						ShouldMute             bool          `json:"should_mute"`
						Video                  interface{}   `json:"video"`
						Type                   string        `json:"type"`
						MusicAttributions      []interface{} `json:"music_attributions"`
					} `json:"pages"`
					HasAffiliateProducts bool   `json:"has_affiliate_products"`
					Type                 string `json:"type"`
					ID                   string `json:"id"`
					PagesPreview         []struct {
						Blocks []struct {
							BlockType  int `json:"block_type"`
							BlockStyle struct {
								XCoord       json.Number `json:"x_coord"`
								YCoord       json.Number `json:"y_coord"`
								CornerRadius json.Number `json:"corner_radius"`
								Height       json.Number `json:"height"`
								Width        json.Number `json:"width"`
								Rotation     json.Number `json:"rotation"`
							} `json:"block_style"`
							Text           string      `json:"text"`
							ImageSignature string      `json:"image_signature"`
							Type           string      `json:"type"`
							Image          interface{} `json:"image"`
							TrackingID     string      `json:"tracking_id"`
						} `json:"blocks"`
						ID    string `json:"id"`
						Style struct {
							MediaFit        interface{} `json:"media_fit"`
							BackgroundColor string      `json:"background_color"`
						} `json:"style"`
						Layout                 int           `json:"layout"`
						Image                  interface{}   `json:"image"`
						ImageSignature         string        `json:"image_signature"`
						ImageAdjusted          interface{}   `json:"image_adjusted"`
						ImageSignatureAdjusted string        `json:"image_signature_adjusted"`
						VideoSignature         interface{}   `json:"video_signature"`
						ShouldMute             bool          `json:"should_mute"`
						Video                  interface{}   `json:"video"`
						Type                   string        `json:"type"`
						MusicAttributions      []interface{} `json:"music_attributions"`
					} `json:"pages_preview"`
					HasProductPins bool `json:"has_product_pins"`
				} `json:"story_pin_data"`
				CollectionPin     interface{} `json:"collection_pin"`
				AggregatedPinData struct {
					NodeID    string `json:"node_id"`
					HasXyTags bool   `json:"has_xy_tags"`
				} `json:"aggregated_pin_data"`
				AltText                         interface{} `json:"alt_text"`
				Domain                          string      `json:"domain"`
				CreatedAt                       string      `json:"created_at"`
				ImageSignature                  string      `json:"image_signature"`
				IsEligibleForPreLovedGoodsLabel bool        `json:"is_eligible_for_pre_loved_goods_label"`
				AdMatchReason                   int         `json:"ad_match_reason"`
				Attribution                     interface{} `json:"attribution"`
				Type                            string      `json:"type"`
				IsStaleProduct                  bool        `json:"is_stale_product"`
				Images                          interface{} `json:"images"`
				ShouldOpenInStream              bool        `json:"should_open_in_stream"`
				PromotedIsLeadAd                bool        `json:"promoted_is_lead_ad"`
				ReactionCounts                  struct {
					Num1  int `json:"1"`
					Num13 int `json:"13"`
				} `json:"reaction_counts"`
				DigitalMediaSourceType  interface{} `json:"digital_media_source_type"`
				IsEligibleForWebCloseup bool        `json:"is_eligible_for_web_closeup"`
				CallToActionText        interface{} `json:"call_to_action_text"`
			} `json:"results"`
			Guides       []interface{} `json:"guides"`
			RankedGuides []interface{} `json:"rankedGuides"`
			Sensitivity  struct {
				Advisory        int           `json:"advisory"`
				ResourceCountry string        `json:"resource_country"`
				Notice          interface{}   `json:"notice"`
				Severity        int           `json:"severity"`
				Notices         []interface{} `json:"notices"`
				Type            string        `json:"type"`
				ID              string        `json:"id"`
				AdvisoryType    string        `json:"advisory_type"`
			} `json:"sensitivity"`
			QueryL1VerticalIds []int64 `json:"queryL1VerticalIds"`
		} `json:"data"`
	} `json:"resource_response"`
	ClientContext struct {
		AnalysisUa struct {
			AppType        int         `json:"app_type"`
			AppVersion     string      `json:"app_version"`
			BrowserName    string      `json:"browser_name"`
			BrowserVersion string      `json:"browser_version"`
			DeviceType     interface{} `json:"device_type"`
			Device         string      `json:"device"`
			OsName         string      `json:"os_name"`
			OsVersion      string      `json:"os_version"`
		} `json:"analysis_ua"`
		AppTypeDetailed            int         `json:"app_type_detailed"`
		AppVersion                 string      `json:"app_version"`
		BatchExp                   bool        `json:"batch_exp"`
		BrowserLocale              string      `json:"browser_locale"`
		BrowserName                string      `json:"browser_name"`
		BrowserType                int         `json:"browser_type"`
		BrowserVersion             string      `json:"browser_version"`
		Country                    string      `json:"country"`
		CountryFromHostname        string      `json:"country_from_hostname"`
		CountryFromIP              string      `json:"country_from_ip"`
		CspNonce                   string      `json:"csp_nonce"`
		CurrentURL                 string      `json:"current_url"`
		Debug                      bool        `json:"debug"`
		DeepLink                   string      `json:"deep_link"`
		EnabledAdvertiserCountries []string    `json:"enabled_advertiser_countries"`
		FacebookToken              interface{} `json:"facebook_token"`
		FullPath                   string      `json:"full_path"`
		HTTPReferrer               string      `json:"http_referrer"`
		ImpersonatorUserID         interface{} `json:"impersonator_user_id"`
		InviteCode                 string      `json:"invite_code"`
		InviteSenderID             string      `json:"invite_sender_id"`
		IsAuthenticated            bool        `json:"is_authenticated"`
		IsBot                      string      `json:"is_bot"`
		IsFullPage                 bool        `json:"is_full_page"`
		IsMobileAgent              bool        `json:"is_mobile_agent"`
		IsSterlingOnSteroids       bool        `json:"is_sterling_on_steroids"`
		IsTabletAgent              bool        `json:"is_tablet_agent"`
		Language                   string      `json:"language"`
		Locale                     string      `json:"locale"`
		Origin                     string      `json:"origin"`
		Path                       string      `json:"path"`
		PlacedExperiences          interface{} `json:"placed_experiences"`
		Referrer                   interface{} `json:"referrer"`
		RegionFromIP               string      `json:"region_from_ip"`
		RequestHost                string      `json:"request_host"`
		RequestIdentifier          string      `json:"request_identifier"`
		SocialBot                  string      `json:"social_bot"`
		Stage                      string      `json:"stage"`
		SterlingOnSteroidsLdap     interface{} `json:"sterling_on_steroids_ldap"`
		SterlingOnSteroidsUserType interface{} `json:"sterling_on_steroids_user_type"`
		Theme                      string      `json:"theme"`
		UnauthID                   string      `json:"unauth_id"`
		SeoDebug                   bool        `json:"seo_debug"`
		UserAgentCanUseNativeApp   bool        `json:"user_agent_can_use_native_app"`
		UserAgentPlatform          string      `json:"user_agent_platform"`
		UserAgentPlatformVersion   interface{} `json:"user_agent_platform_version"`
		UserAgent                  string      `json:"user_agent"`
		User                       struct {
			UnauthID  string      `json:"unauth_id"`
			IPCountry string      `json:"ip_country"`
			IPRegion  interface{} `json:"ip_region"`
		} `json:"user"`
		UtmCampaign interface{} `json:"utm_campaign"`
		VisibleURL  string      `json:"visible_url"`
	} `json:"client_context"`
	Resource struct {
		Name    string `json:"name"`
		Options struct {
			Bookmarks               []string    `json:"bookmarks"`
			AppliedProductFilters   string      `json:"appliedProductFilters"`
			AppliedUnifiedFilters   interface{} `json:"applied_unified_filters"`
			Article                 interface{} `json:"article"`
			AutoCorrectionDisabled  bool        `json:"auto_correction_disabled"`
			Corpus                  interface{} `json:"corpus"`
			CustomizedRerankType    interface{} `json:"customized_rerank_type"`
			Domains                 interface{} `json:"domains"`
			DynamicPageSizeExpGroup interface{} `json:"dynamicPageSizeExpGroup"`
			Filters                 interface{} `json:"filters"`
			JourneyDepth            interface{} `json:"journey_depth"`
			PageSize                interface{} `json:"page_size"`
			PriceMax                interface{} `json:"price_max"`
			PriceMin                interface{} `json:"price_min"`
			Query                   string      `json:"query"`
			QueryPinSigs            interface{} `json:"query_pin_sigs"`
			ReduxNormalizeFeed      bool        `json:"redux_normalize_feed"`
			RequestParams           interface{} `json:"request_params"`
			Rs                      string      `json:"rs"`
			Scope                   string      `json:"scope"`
			SelectedOneBarModules   interface{} `json:"selected_one_bar_modules"`
			SeoDrawerEnabled        bool        `json:"seoDrawerEnabled"`
			SourceID                interface{} `json:"source_id"`
			SourceModuleID          interface{} `json:"source_module_id"`
			SourceURL               string      `json:"source_url"`
			TopPinID                interface{} `json:"top_pin_id"`
			TopPinIds               interface{} `json:"top_pin_ids"`
		} `json:"options"`
	} `json:"resource"`
	RequestIdentifier string `json:"request_identifier"`
}

type ResultSearch struct {
	ID string `json:"id"`
	Result
}

const BASE_RESOURCE string = "https://www.pinterest.com/resource/BaseSearchResource/get"

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Pinterest search",
		Endpoint:    "/pin-search",
		Method:      "GET",
		Description: "Mencari foto / video pada pinterest",
		Params: map[string]interface{}{
			"q": "Anime 4k",
		},
		Type: "",
		Body: map[string]interface{}{},

		Code: func(c *fiber.Ctx) error {
			params := new(PinterestSearch)

			if err := c.QueryParser(params); err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan query yang valid!",
				})
			}

			if params.Q == "" {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan query yang valid!",
				})
			}

			pinResult := pinSearch(params.Q)

			return c.Status(200).JSON(pinResult)
		},
	})
}

func pinSearch(q string) []ResultSearch {
	payload := map[string]interface{}{
		"options": map[string]interface{}{
			"applied_unified_filters":  nil,
			"appliedProductFilters":    "---",
			"article":                  nil,
			"auto_correction_disabled": false,
			"corpus":                   nil,
			"customized_rerank_type":   nil,
			"domains":                  nil,
			"dynamicPageSizeExpGroup":  nil,
			"filters":                  nil,
			"journey_depth":            nil,
			"page_size":                nil,
			"price_max":                nil,
			"price_min":                nil,
			"query_pin_sigs":           nil,
			"query":                    q,
			"redux_normalize_feed":     true,
			"request_params":           nil,
			"rs":                       "typed",
			"scope":                    "pins",
			"selected_one_bar_modules": nil,
			"seoDrawerEnabled":         false,
			"source_id":                nil,
			"source_module_id":         nil,
			"source_url":               "/search/pins/?q=" + q + "&rs=typed",
			"top_pin_id":               nil,
			"top_pin_ids":              nil,
		},
		"context": make(map[string]string),
	}

	bj, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	tm := time.Now().UnixMilli()

	params := url.Values{
		"source_url": []string{"/search/pins/?q=" + q + "&rs=typed"},
		"data":       []string{string(bj)},
		"_":          []string{strconv.Itoa(int(tm))},
	}

	head := http.Header{}
	head.Set("authority", "id.pinterest.com")
	head.Set("accept", "application/json, text/javascript, */*, q=0.01")
	head.Set("accept-language", "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6")
	head.Set("cache-control", "no-cache")
	head.Set("pragma", "no-cache")
	head.Set("priority", "u=1, i")
	head.Set("referer", "https://id.pinterest.com/")
	head.Set("screen-dpr", "1")
	head.Set("sec-ch-ua", "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"")
	head.Set("sec-ch-ua-full-version-list", "\"Not(A:Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"133.0.6943.142\", \"Chromium\";v=\"133.0.6943.142\"")
	head.Set("sec-ch-ua-mobile", "?0")
	head.Set("sec-ch-ua-model", "\"\"")
	head.Set("sec-ch-ua-platform", "\"Windows\"")
	head.Set("sec-ch-ua-platform-version", "\"10.0.0\"")
	head.Set("sec-fetch-dest", "empty")
	head.Set("sec-fetch-mode", "cors")
	head.Set("sec-fetch-site", "same-origin")
	head.Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36")
	head.Set("x-app-version", "d22ff69")
	head.Set("x-b3-flags", "0")
	head.Set("x-b3-parentspanid", GenParentSpanId())
	head.Set("x-b3-spanid", GenParentSpanId())
	head.Set("x-b3-traceid", GenParentSpanId())
	head.Set("x-pinterest-appstate", "active")
	head.Set("x-pinterest-pws-handler", "www/pin/[id].js")
	head.Set("x-pinterest-source-url", "/pin/12103492742343320/")
	head.Set("x-requested-with", "XMLHttpRequest")

	res, err := helper.Request(BASE_RESOURCE+"?"+params.Encode(), "GET", nil, head)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	var jsn *PinterestSearchResponse
	err = json.Unmarshal(ctt, &jsn)
	if err != nil {
		fmt.Println(err)
	}

	var result []ResultSearch
	for _, v := range jsn.ResourceResponse.Data.Results {
		result = append(result, ResultSearch{
			ID: v.ID,
			Result: Result{
				Title:          v.Title,
				AuthorId:       v.NodeID,
				AuthorImage:    v.Pinner.ImageLargeURL,
				AuthorUsername: v.Pinner.Username,
				AuthorName:     v.Pinner.FullName,
				Description:    v.Description,
				Metadata: Met{
					Anjir:  Anjir{Image: v.Images},
					Anjir2: Anjir2{Video: v.StoryPinData.PagesPreview},
				},
			},
		})
	}

	return result
}
