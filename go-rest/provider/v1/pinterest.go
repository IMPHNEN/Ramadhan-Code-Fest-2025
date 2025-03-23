package v1

import (
	"down/helper"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

type pinterestResult struct {
	ResourceResponse struct {
		Status       string `json:"status"`
		Code         int    `json:"code"`
		Message      string `json:"message"`
		EndpointName string `json:"endpoint_name"`
		Data         struct {
			NodeID            string `json:"node_id"`
			IsRepin           bool   `json:"is_repin"`
			ShareCount        int    `json:"share_count"`
			AggregatedPinData struct {
				NodeID          string `json:"node_id"`
				AggregatedStats struct {
					Saves int `json:"saves"`
					Done  int `json:"done"`
				} `json:"aggregated_stats"`
				ID               string      `json:"id"`
				CreatorAnalytics interface{} `json:"creator_analytics"`
				IsShopTheLook    bool        `json:"is_shop_the_look"`
				IsStela          bool        `json:"is_stela"`
				CommentCount     int         `json:"comment_count"`
				HasXyTags        bool        `json:"has_xy_tags"`
				DidItData        struct {
					RecommendScores []struct {
						Score float64 `json:"score"`
						Count float64 `json:"count"`
					} `json:"recommend_scores"`
					Type             string        `json:"type"`
					VideosCount      int           `json:"videos_count"`
					DetailsCount     int           `json:"details_count"`
					Tags             []interface{} `json:"tags"`
					ImagesCount      int           `json:"images_count"`
					ResponsesCount   int           `json:"responses_count"`
					RecommendedCount int           `json:"recommended_count"`
					Rating           int           `json:"rating"`
					UserCount        int           `json:"user_count"`
				} `json:"did_it_data"`
			} `json:"aggregated_pin_data"`
			ViaPinner struct {
				NodeID           string `json:"node_id"`
				Username         string `json:"username"`
				FirstName        string `json:"first_name"`
				VerifiedIdentity struct {
				} `json:"verified_identity"`
				BlockedByMe            bool        `json:"blocked_by_me"`
				DomainVerified         bool        `json:"domain_verified"`
				FollowedByMe           bool        `json:"followed_by_me"`
				Indexed                bool        `json:"indexed"`
				DomainURL              interface{} `json:"domain_url"`
				ExplicitlyFollowedByMe bool        `json:"explicitly_followed_by_me"`
				Type                   string      `json:"type"`
				FollowerCount          int         `json:"follower_count"`
				AdsOnlyProfileSite     interface{} `json:"ads_only_profile_site"`
				IsDefaultImage         bool        `json:"is_default_image"`
				ImageSmallURL          string      `json:"image_small_url"`
				ID                     string      `json:"id"`
				FullName               string      `json:"full_name"`
				IsAdsOnlyProfile       bool        `json:"is_ads_only_profile"`
				ImageMediumURL         string      `json:"image_medium_url"`
				IsVerifiedMerchant     bool        `json:"is_verified_merchant"`
			} `json:"via_pinner"`
			PromotedIsLeadAd bool `json:"promoted_is_lead_ad"`
			Videos           struct {
				NodeID    string `json:"node_id"`
				VideoList struct {
					V720P struct {
						URL          string `json:"url"`
						Width        int    `json:"width"`
						Height       int    `json:"height"`
						Duration     int    `json:"duration"`
						Thumbnail    string `json:"thumbnail"`
						CaptionsUrls struct {
						} `json:"captions_urls"`
					} `json:"V_720P"`
					VHLSV4 struct {
						URL          string `json:"url"`
						Width        int    `json:"width"`
						Height       int    `json:"height"`
						Duration     int    `json:"duration"`
						Thumbnail    string `json:"thumbnail"`
						CaptionsUrls struct {
						} `json:"captions_urls"`
					} `json:"V_HLSV4"`
					VHLSV3MOBILE struct {
						URL          string `json:"url"`
						Width        int    `json:"width"`
						Height       int    `json:"height"`
						Duration     int    `json:"duration"`
						Thumbnail    string `json:"thumbnail"`
						CaptionsUrls struct {
						} `json:"captions_urls"`
					} `json:"V_HLSV3_MOBILE"`
				} `json:"video_list"`
				ID string `json:"id"`
			} `json:"videos"`
			IsEligibleForPdp bool   `json:"is_eligible_for_pdp"`
			DominantColor    string `json:"dominant_color"`
			NativeCreator    struct {
				NodeID           string `json:"node_id"`
				Username         string `json:"username"`
				FirstName        string `json:"first_name"`
				VerifiedIdentity struct {
				} `json:"verified_identity"`
				BlockedByMe            bool        `json:"blocked_by_me"`
				DomainVerified         bool        `json:"domain_verified"`
				FollowedByMe           bool        `json:"followed_by_me"`
				Indexed                bool        `json:"indexed"`
				DomainURL              interface{} `json:"domain_url"`
				ExplicitlyFollowedByMe bool        `json:"explicitly_followed_by_me"`
				Type                   string      `json:"type"`
				FollowerCount          int         `json:"follower_count"`
				AdsOnlyProfileSite     interface{} `json:"ads_only_profile_site"`
				IsDefaultImage         bool        `json:"is_default_image"`
				ImageSmallURL          string      `json:"image_small_url"`
				ID                     string      `json:"id"`
				FullName               string      `json:"full_name"`
				IsAdsOnlyProfile       bool        `json:"is_ads_only_profile"`
				ImageMediumURL         string      `json:"image_medium_url"`
				IsVerifiedMerchant     bool        `json:"is_verified_merchant"`
			} `json:"native_creator"`
			ProductPinData      interface{}   `json:"product_pin_data"`
			Method              string        `json:"method"`
			Access              []interface{} `json:"access"`
			LinkDomain          interface{}   `json:"link_domain"`
			FavoriteUserCount   int           `json:"favorite_user_count"`
			IPEligibleForStela  bool          `json:"ip_eligible_for_stela"`
			Type                string        `json:"type"`
			MediaAttribution    interface{}   `json:"media_attribution"`
			CloseupUnifiedTitle string        `json:"closeup_unified_title"`
			ThirdPartyPinOwner  interface{}   `json:"third_party_pin_owner"`
			Category            string        `json:"category"`
			TrackingParams      string        `json:"tracking_params"`
			CarouselData        interface{}   `json:"carousel_data"`
			CloseupUserNote     string        `json:"closeup_user_note"`
			Images              interface{}   `json:"images"`
			Attribution         interface{}   `json:"attribution"`
			ImageMediumURL      string        `json:"image_medium_url"`
			MusicAttributions   []interface{} `json:"music_attributions"`
			StoryPinData        struct {
				NodeID               string      `json:"node_id"`
				IsDeleted            bool        `json:"is_deleted"`
				HasAffiliateProducts bool        `json:"has_affiliate_products"`
				Type                 string      `json:"type"`
				ID                   string      `json:"id"`
				PageCount            int         `json:"page_count"`
				LastEdited           interface{} `json:"last_edited"`
				Metadata             struct {
					DiyData           interface{} `json:"diy_data"`
					PinTitle          string      `json:"pin_title"`
					CompatibleVersion string      `json:"compatible_version"`
					IsCompatible      bool        `json:"is_compatible"`
					IsEditable        bool        `json:"is_editable"`
					RootUserID        string      `json:"root_user_id"`
					IsPromotable      bool        `json:"is_promotable"`
					RecipeData        interface{} `json:"recipe_data"`
					RootPinID         string      `json:"root_pin_id"`
					Version           string      `json:"version"`
					TemplateType      interface{} `json:"template_type"`
					PinImageSignature string      `json:"pin_image_signature"`
					CanvasAspectRatio float64     `json:"canvas_aspect_ratio"`
					ShowreelData      interface{} `json:"showreel_data"`
					Basics            interface{} `json:"basics"`
				} `json:"metadata"`
				HasProductPins bool                     `json:"has_product_pins"`
				Pages          []map[string]interface{} `json:"pages"`
				MentionedUsers []interface{}            `json:"mentioned_users"`
			} `json:"story_pin_data"`
			VisualObjects []struct {
				X         float64     `json:"x"`
				Y         float64     `json:"y"`
				W         float64     `json:"w"`
				H         float64     `json:"h"`
				Detection bool        `json:"detection"`
				Score     float64     `json:"score"`
				Label     string      `json:"label"`
				Index     int         `json:"index"`
				LabelID   interface{} `json:"label_id"`
			} `json:"visual_objects"`
			OriginPinner struct {
				NodeID           string `json:"node_id"`
				Username         string `json:"username"`
				FirstName        string `json:"first_name"`
				VerifiedIdentity struct {
				} `json:"verified_identity"`
				BlockedByMe            bool        `json:"blocked_by_me"`
				DomainVerified         bool        `json:"domain_verified"`
				FollowedByMe           bool        `json:"followed_by_me"`
				Indexed                bool        `json:"indexed"`
				DomainURL              interface{} `json:"domain_url"`
				ExplicitlyFollowedByMe bool        `json:"explicitly_followed_by_me"`
				Type                   string      `json:"type"`
				FollowerCount          int         `json:"follower_count"`
				AdsOnlyProfileSite     interface{} `json:"ads_only_profile_site"`
				IsDefaultImage         bool        `json:"is_default_image"`
				ImageSmallURL          string      `json:"image_small_url"`
				ID                     string      `json:"id"`
				FullName               string      `json:"full_name"`
				IsAdsOnlyProfile       bool        `json:"is_ads_only_profile"`
				ImageMediumURL         string      `json:"image_medium_url"`
				IsVerifiedMerchant     bool        `json:"is_verified_merchant"`
			} `json:"origin_pinner"`
			IsV1IdeaPin         bool        `json:"is_v1_idea_pin"`
			SeoTitle            string      `json:"seo_title"`
			ShoppingRecDisabled bool        `json:"shopping_rec_disabled"`
			VideoStatus         interface{} `json:"video_status"`
			ImageSignature      string      `json:"image_signature"`
			IsUnsafeForComments bool        `json:"is_unsafe_for_comments"`
			IsHidden            bool        `json:"is_hidden"`
			IsOosProduct        bool        `json:"is_oos_product"`
			ShipsToUserCountry  bool        `json:"ships_to_user_country"`
			LinkUserWebsite     interface{} `json:"link_user_website"`
			AltText             interface{} `json:"alt_text"`
			Board               struct {
				NodeID            string `json:"node_id"`
				FollowedByMe      bool   `json:"followed_by_me"`
				Type              string `json:"type"`
				ImageThumbnailURL string `json:"image_thumbnail_url"`
				ID                string `json:"id"`
				IsCollaborative   bool   `json:"is_collaborative"`
				ImageCoverURL     string `json:"image_cover_url"`
				URL               string `json:"url"`
				Privacy           string `json:"privacy"`
				Name              string `json:"name"`
				Owner             struct {
					NodeID           string `json:"node_id"`
					Username         string `json:"username"`
					FirstName        string `json:"first_name"`
					VerifiedIdentity struct {
					} `json:"verified_identity"`
					BlockedByMe            bool        `json:"blocked_by_me"`
					DomainVerified         bool        `json:"domain_verified"`
					FollowedByMe           bool        `json:"followed_by_me"`
					Indexed                bool        `json:"indexed"`
					DomainURL              interface{} `json:"domain_url"`
					ExplicitlyFollowedByMe bool        `json:"explicitly_followed_by_me"`
					Type                   string      `json:"type"`
					FollowerCount          int         `json:"follower_count"`
					AdsOnlyProfileSite     interface{} `json:"ads_only_profile_site"`
					IsDefaultImage         bool        `json:"is_default_image"`
					ImageSmallURL          string      `json:"image_small_url"`
					ID                     string      `json:"id"`
					FullName               string      `json:"full_name"`
					IsAdsOnlyProfile       bool        `json:"is_ads_only_profile"`
					ImageMediumURL         string      `json:"image_medium_url"`
					IsVerifiedMerchant     bool        `json:"is_verified_merchant"`
				} `json:"owner"`
				CollaboratedByMe bool          `json:"collaborated_by_me"`
				Access           []interface{} `json:"access"`
				Category         interface{}   `json:"category"`
				Description      string        `json:"description"`
				Layout           string        `json:"layout"`
				MapID            string        `json:"map_id"`
				PinThumbnailUrls []string      `json:"pin_thumbnail_urls"`
			} `json:"board"`
			Embed              interface{} `json:"embed"`
			Shuffle            interface{} `json:"shuffle"`
			ContentSensitivity struct {
			} `json:"content_sensitivity"`
			HasRequiredAttributionProvider bool        `json:"has_required_attribution_provider"`
			RichMetadata                   interface{} `json:"rich_metadata"`
			DidItDisabled                  bool        `json:"did_it_disabled"`
			Pinner                         struct {
				NodeID           string `json:"node_id"`
				Username         string `json:"username"`
				FirstName        string `json:"first_name"`
				VerifiedIdentity struct {
				} `json:"verified_identity"`
				BlockedByMe            bool        `json:"blocked_by_me"`
				DomainVerified         bool        `json:"domain_verified"`
				FollowedByMe           bool        `json:"followed_by_me"`
				Indexed                bool        `json:"indexed"`
				DomainURL              interface{} `json:"domain_url"`
				ExplicitlyFollowedByMe bool        `json:"explicitly_followed_by_me"`
				Type                   string      `json:"type"`
				FollowerCount          int         `json:"follower_count"`
				AdsOnlyProfileSite     interface{} `json:"ads_only_profile_site"`
				IsDefaultImage         bool        `json:"is_default_image"`
				ImageSmallURL          string      `json:"image_small_url"`
				ID                     string      `json:"id"`
				FullName               string      `json:"full_name"`
				IsAdsOnlyProfile       bool        `json:"is_ads_only_profile"`
				ImageMediumURL         string      `json:"image_medium_url"`
				IsVerifiedMerchant     bool        `json:"is_verified_merchant"`
			} `json:"pinner"`
			Promoter                     interface{}   `json:"promoter"`
			CreatedAt                    string        `json:"created_at"`
			EditedFields                 []interface{} `json:"edited_fields"`
			ID                           string        `json:"id"`
			IsEligibleForRelatedProducts bool          `json:"is_eligible_for_related_products"`
			BuyableProductAvailability   interface{}   `json:"buyable_product_availability"`
			RichSummary                  interface{}   `json:"rich_summary"`
			Description                  string        `json:"description"`
			ClickThroughLinkQuality      interface{}   `json:"click_through_link_quality"`
			DoneByMe                     bool          `json:"done_by_me"`
			CreatorAnalytics             interface{}   `json:"creator_analytics"`
			FormattedDescription         struct {
			} `json:"formatted_description"`
			IsPromoted                      bool        `json:"is_promoted"`
			IsPlayable                      bool        `json:"is_playable"`
			Sponsorship                     interface{} `json:"sponsorship"`
			IsEligibleForAggregatedComments bool        `json:"is_eligible_for_aggregated_comments"`
			VideoStatusMessage              interface{} `json:"video_status_message"`
			StoryPinDataID                  string      `json:"story_pin_data_id"`
			CloseupUnifiedDescription       string      `json:"closeup_unified_description"`
			CommentCount                    int         `json:"comment_count"`
			IsPromotable                    bool        `json:"is_promotable"`
			UserMentionTags                 interface{} `json:"user_mention_tags"`
			PriceValue                      int         `json:"price_value"`
			CollectionPin                   interface{} `json:"collection_pin"`
			CommentsDisabled                bool        `json:"comments_disabled"`
			Domain                          string      `json:"domain"`
			CloseupAttribution              struct {
				NodeID           string `json:"node_id"`
				Username         string `json:"username"`
				FirstName        string `json:"first_name"`
				VerifiedIdentity struct {
				} `json:"verified_identity"`
				BlockedByMe            bool        `json:"blocked_by_me"`
				DomainVerified         bool        `json:"domain_verified"`
				FollowedByMe           bool        `json:"followed_by_me"`
				Indexed                bool        `json:"indexed"`
				DomainURL              interface{} `json:"domain_url"`
				ExplicitlyFollowedByMe bool        `json:"explicitly_followed_by_me"`
				Type                   string      `json:"type"`
				FollowerCount          int         `json:"follower_count"`
				AdsOnlyProfileSite     interface{} `json:"ads_only_profile_site"`
				IsDefaultImage         bool        `json:"is_default_image"`
				ImageSmallURL          string      `json:"image_small_url"`
				ID                     string      `json:"id"`
				FullName               string      `json:"full_name"`
				IsAdsOnlyProfile       bool        `json:"is_ads_only_profile"`
				ImageMediumURL         string      `json:"image_medium_url"`
				IsVerifiedMerchant     bool        `json:"is_verified_merchant"`
			} `json:"closeup_attribution"`
			IsStaleProduct       bool        `json:"is_stale_product"`
			IsUnsafe             bool        `json:"is_unsafe"`
			FavoritedByMe        bool        `json:"favorited_by_me"`
			CreatorClassInstance interface{} `json:"creator_class_instance"`
			TrackedLink          interface{} `json:"tracked_link"`
			ReactionCounts       struct {
				Num1 int `json:"1"`
			} `json:"reaction_counts"`
			ShuffleAsset                    interface{}   `json:"shuffle_asset"`
			DigitalMediaSourceType          interface{}   `json:"digital_media_source_type"`
			AutoAltText                     interface{}   `json:"auto_alt_text"`
			IsActiveAd                      bool          `json:"is_active_ad"`
			IsEligibleForBrandCatalog       bool          `json:"is_eligible_for_brand_catalog"`
			Section                         interface{}   `json:"section"`
			IsGoLinkless                    bool          `json:"is_go_linkless"`
			Title                           string        `json:"title"`
			Hashtags                        []interface{} `json:"hashtags"`
			IsYearInPreview                 bool          `json:"is_year_in_preview"`
			GridTitle                       string        `json:"grid_title"`
			IsQuickPromotableByPinner       bool          `json:"is_quick_promotable_by_pinner"`
			IsVideo                         bool          `json:"is_video"`
			PinnedToBoard                   interface{}   `json:"pinned_to_board"`
			ShouldMute                      bool          `json:"should_mute"`
			ShoppingFlags                   []interface{} `json:"shopping_flags"`
			DescriptionHTML                 string        `json:"description_html"`
			Themes                          []interface{} `json:"themes"`
			IsWhitelistedForTriedIt         bool          `json:"is_whitelisted_for_tried_it"`
			IsNative                        bool          `json:"is_native"`
			UnifiedUserNote                 string        `json:"unified_user_note"`
			CanDeleteDidItAndComments       bool          `json:"can_delete_did_it_and_comments"`
			Link                            interface{}   `json:"link"`
			RepinCount                      int           `json:"repin_count"`
			ShouldOpenInStream              bool          `json:"should_open_in_stream"`
			IsEligibleForFlashlightShopping bool          `json:"is_eligible_for_flashlight_shopping"`
			MobileLink                      interface{}   `json:"mobile_link"`
			PromotedIsRemovable             bool          `json:"promoted_is_removable"`
			CloseupDescription              interface{}   `json:"closeup_description"`
			Privacy                         string        `json:"privacy"`
			ReactionByMe                    int           `json:"reaction_by_me"`
			HighlightedAggregatedComments   []interface{} `json:"highlighted_aggregated_comments"`
			CreatorClass                    interface{}   `json:"creator_class"`
			IsQuickPromotable               bool          `json:"is_quick_promotable"`
			PriceCurrency                   string        `json:"price_currency"`
		} `json:"data"`
		XPinterestSliEndpointName string `json:"x_pinterest_sli_endpoint_name"`
		HTTPStatus                int    `json:"http_status"`
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
		AppTypeDetailed                 int         `json:"app_type_detailed"`
		AppVersion                      string      `json:"app_version"`
		BatchExp                        bool        `json:"batch_exp"`
		BrowserLocale                   string      `json:"browser_locale"`
		BrowserName                     string      `json:"browser_name"`
		BrowserType                     int         `json:"browser_type"`
		BrowserVersion                  string      `json:"browser_version"`
		Country                         string      `json:"country"`
		CountryFromHostname             string      `json:"country_from_hostname"`
		CountryFromIP                   string      `json:"country_from_ip"`
		CspNonce                        string      `json:"csp_nonce"`
		CurrentURL                      string      `json:"current_url"`
		Debug                           bool        `json:"debug"`
		DeepLink                        string      `json:"deep_link"`
		EnabledAdvertiserCountries      []string    `json:"enabled_advertiser_countries"`
		FacebookToken                   interface{} `json:"facebook_token"`
		FullPath                        string      `json:"full_path"`
		HTTPReferrer                    string      `json:"http_referrer"`
		ImpersonatorUserID              interface{} `json:"impersonator_user_id"`
		InviteCode                      string      `json:"invite_code"`
		InviteSenderID                  string      `json:"invite_sender_id"`
		IsAuthenticated                 bool        `json:"is_authenticated"`
		IsBot                           string      `json:"is_bot"`
		IsFullPage                      bool        `json:"is_full_page"`
		IsManagedAdvertiser             bool        `json:"is_managed_advertiser"`
		IsMobileAgent                   bool        `json:"is_mobile_agent"`
		IsShopThePinCampaignWhitelisted bool        `json:"is_shop_the_pin_campaign_whitelisted"`
		IsSterlingOnSteroids            bool        `json:"is_sterling_on_steroids"`
		IsTabletAgent                   bool        `json:"is_tablet_agent"`
		Language                        string      `json:"language"`
		Locale                          string      `json:"locale"`
		Origin                          string      `json:"origin"`
		Path                            string      `json:"path"`
		PlacedExperiences               interface{} `json:"placed_experiences"`
		Referrer                        interface{} `json:"referrer"`
		RegionFromIP                    string      `json:"region_from_ip"`
		RequestHost                     string      `json:"request_host"`
		RequestIdentifier               string      `json:"request_identifier"`
		SocialBot                       string      `json:"social_bot"`
		Stage                           string      `json:"stage"`
		SterlingOnSteroidsLdap          interface{} `json:"sterling_on_steroids_ldap"`
		SterlingOnSteroidsUserType      interface{} `json:"sterling_on_steroids_user_type"`
		Theme                           string      `json:"theme"`
		UnauthID                        string      `json:"unauth_id"`
		SeoDebug                        bool        `json:"seo_debug"`
		UserAgentCanUseNativeApp        bool        `json:"user_agent_can_use_native_app"`
		UserAgentPlatform               string      `json:"user_agent_platform"`
		UserAgentPlatformVersion        interface{} `json:"user_agent_platform_version"`
		UserAgent                       string      `json:"user_agent"`
		User                            struct {
			NodeID           string      `json:"node_id"`
			IPRegion         string      `json:"ip_region"`
			TwitterURL       interface{} `json:"twitter_url"`
			VerifiedIdentity struct {
			} `json:"verified_identity"`
			IsMaturedNewUser                             bool          `json:"is_matured_new_user"`
			FacebookID                                   string        `json:"facebook_id"`
			VerifiedUserWebsites                         []interface{} `json:"verified_user_websites"`
			LastName                                     string        `json:"last_name"`
			IsAdsOnlyProfile                             bool          `json:"is_ads_only_profile"`
			Nags                                         []interface{} `json:"nags"`
			TwitterPublishEnabled                        bool          `json:"twitter_publish_enabled"`
			UnverifiedPhoneNumberWithoutCountry          string        `json:"unverified_phone_number_without_country"`
			IsEligibleForImageOnlyGrid                   bool          `json:"is_eligible_for_image_only_grid"`
			ImageXlargeURL                               string        `json:"image_xlarge_url"`
			IsParentalControlPasscodeVerificationPending bool          `json:"is_parental_control_passcode_verification_pending"`
			ResurrectionInfo                             interface{}   `json:"resurrection_info"`
			PhoneNumberEnd                               string        `json:"phone_number_end"`
			AllowSwitchBetweenPrivateAndPublicProfile    bool          `json:"allow_switch_between_private_and_public_profile"`
			CreatedAt                                    string        `json:"created_at"`
			Epik                                         string        `json:"epik"`
			Type                                         string        `json:"type"`
			WebsiteURL                                   interface{}   `json:"website_url"`
			FacebookPublishStreamEnabled                 bool          `json:"facebook_publish_stream_enabled"`
			IsParentalControlPasscodeEnabled             bool          `json:"is_parental_control_passcode_enabled"`
			HasPassword                                  bool          `json:"has_password"`
			IsAnyWebsiteVerified                         bool          `json:"is_any_website_verified"`
			HasQuicksaveBoard                            bool          `json:"has_quicksave_board"`
			WeightLossAdsOptedOut                        bool          `json:"weight_loss_ads_opted_out"`
			OptInPrivateAccount                          bool          `json:"opt_in_private_account"`
			PersonalizeFromOffsiteBrowsing               bool          `json:"personalize_from_offsite_browsing"`
			PhoneNumber                                  interface{}   `json:"phone_number"`
			ImageLargeURL                                string        `json:"image_large_url"`
			IsWriteBanned                                bool          `json:"is_write_banned"`
			FullName                                     string        `json:"full_name"`
			ImageMediumURL                               string        `json:"image_medium_url"`
			DomainURL                                    interface{}   `json:"domain_url"`
			ConnectedToMicrosoft                         bool          `json:"connected_to_microsoft"`
			IsPartner                                    bool          `json:"is_partner"`
			LoginState                                   int           `json:"login_state"`
			Username                                     string        `json:"username"`
			FacebookTimelineEnabled                      bool          `json:"facebook_timeline_enabled"`
			ID                                           string        `json:"id"`
			ParentalControlAnonymizedEmail               interface{}   `json:"parental_control_anonymized_email"`
			AdsOnlyProfileSite                           interface{}   `json:"ads_only_profile_site"`
			GplusURL                                     string        `json:"gplus_url"`
			CanEnableMfa                                 bool          `json:"can_enable_mfa"`
			SearchPrivacyEnabled                         bool          `json:"search_privacy_enabled"`
			ConnectedToYoutube                           bool          `json:"connected_to_youtube"`
			ShowPersonalBoutique                         bool          `json:"show_personal_boutique"`
			FirstName                                    string        `json:"first_name"`
			PushPackageUserID                            string        `json:"push_package_user_id"`
			ConnectedToFacebook                          bool          `json:"connected_to_facebook"`
			VerifiedDomains                              []interface{} `json:"verified_domains"`
			IPCountry                                    string        `json:"ip_country"`
			ImageSmallURL                                string        `json:"image_small_url"`
			TeenSafetyOptionsURL                         interface{}   `json:"teen_safety_options_url"`
			IsPrivateProfile                             bool          `json:"is_private_profile"`
			ExcludeFromSearch                            bool          `json:"exclude_from_search"`
			UnverifiedPhoneNumber                        interface{}   `json:"unverified_phone_number"`
			CanEditSearchPrivacy                         bool          `json:"can_edit_search_privacy"`
			Country                                      string        `json:"country"`
			ConnectedToDropbox                           bool          `json:"connected_to_dropbox"`
			UnverifiedPhoneCountry                       interface{}   `json:"unverified_phone_country"`
			ConnectedToInstagram                         bool          `json:"connected_to_instagram"`
			Email                                        string        `json:"email"`
			ConnectedToEtsy                              bool          `json:"connected_to_etsy"`
			Gender                                       string        `json:"gender"`
			CustomGender                                 interface{}   `json:"custom_gender"`
			Partner                                      interface{}   `json:"partner"`
			ShouldShowMessaging                          bool          `json:"should_show_messaging"`
			IsUnder18                                    bool          `json:"is_under_18"`
			IsCandidateForParentalControlPasscode        bool          `json:"is_candidate_for_parental_control_passcode"`
			IsHighRisk                                   bool          `json:"is_high_risk"`
			ListedWebsiteURL                             interface{}   `json:"listed_website_url"`
			ThirdPartyMarketingTrackingEnabled           bool          `json:"third_party_marketing_tracking_enabled"`
			HasMfaEnabled                                bool          `json:"has_mfa_enabled"`
			PhoneCountry                                 interface{}   `json:"phone_country"`
			IsUnder16                                    bool          `json:"is_under_16"`
			ProfileDiscoveredPublic                      interface{}   `json:"profile_discovered_public"`
			ConnectedToGoogle                            bool          `json:"connected_to_google"`
			DomainVerified                               bool          `json:"domain_verified"`
			AllowPersonalizationCookies                  interface{}   `json:"allow_personalization_cookies"`
			AllowAnalyticCookies                         interface{}   `json:"allow_analytic_cookies"`
			AgeInYears                                   int           `json:"age_in_years"`
			AllowMarketingCookies                        interface{}   `json:"allow_marketing_cookies"`
		} `json:"user"`
		UtmCampaign interface{} `json:"utm_campaign"`
		VisibleURL  string      `json:"visible_url"`
	} `json:"client_context"`
	Resource struct {
		Name    string `json:"name"`
		Options struct {
			Bookmarks                []string `json:"bookmarks"`
			ID                       string   `json:"id"`
			FieldSetKey              string   `json:"field_set_key"`
			NoCache                  bool     `json:"noCache"`
			FetchVisualSearchObjects bool     `json:"fetch_visual_search_objects"`
		} `json:"options"`
	} `json:"resource"`
	RequestIdentifier string `json:"request_identifier"`
}

type Anjir struct {
	Image interface{}
}

type Anjir2 struct {
	Video interface{}
}

type Met struct {
	Anjir
	Anjir2
}

type Result struct {
	Title          string `json:"title"`
	AuthorId       string `json:"author_id"`
	AuthorImage    string `json:"author_image"`
	AuthorUsername string `json:"author_username"`
	AuthorName     string `json:"author_name"`
	Description    string `json:"description"`
	Metadata       Met    `json:"metadata"`
}

var PIN_INFO string = "https://id.pinterest.com/resource/PinResource/get"
var REG_URL *regexp.Regexp = regexp.MustCompile(`(?i)#EXT-X-MAP:URI="([\w.]+)"`)
var REG_NUM *regexp.Regexp = regexp.MustCompile(`(\d+)`)

func init() {
	NewRegister.RegisterProvider(RegisterComponent{
		Title:       "Pinterest",
		Endpoint:    "/pin",
		Method:      "GET",
		Description: "Pinterest photo and video downloader.",
		Params: map[string]interface{}{
			"id": "id video atau foto",
		},
		Type: "",
		Body: map[string]interface{}{},

		Code: func(c *fiber.Ctx) error {
			params := new(IDQuery)

			if err := c.QueryParser(params); err != nil {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan id yang valid!",
				})
			}

			if params.ID == "" {
				return c.Status(400).JSON(fiber.Map{
					"error":   true,
					"message": "Masukan id yang valid!",
				})
			}

			pinResult := pinInfo(params.ID)

			return c.Status(200).JSON(pinResult)
		},
	})
}

func pinInfo(id string) *Result {
	payload := map[string]interface{}{
		"options": map[string]interface{}{
			"id":                          id,
			"field_set_key":               "auth_web_main_pin",
			"noCache":                     true,
			"fetch_visual_search_objects": true,
		},
		"context": make(map[string]string),
	}

	bj, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	tm := time.Now().UnixMilli()

	params := url.Values{
		"source_url": []string{"/pin/" + id + "/"},
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
	head.Set("x-app-version", GenParentSpanId())
	head.Set("x-b3-flags", "0")
	head.Set("x-b3-parentspanid", "")
	head.Set("x-b3-spanid", GenParentSpanId())
	head.Set("x-b3-traceid", GenParentSpanId())
	head.Set("x-pinterest-appstate", "active")
	head.Set("x-pinterest-pws-handler", "www/pin/[id].js")
	head.Set("x-pinterest-source-url", "/pin/"+id+"/")
	head.Set("x-requested-with", "XMLHttpRequest")

	res, err := helper.Request(PIN_INFO+"?"+params.Encode(), "GET", nil, head)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	var jsn *pinterestResult
	err = json.Unmarshal(ctt, &jsn)
	if err != nil {
		fmt.Println(err)
	}

	// var videoo string = ""
	// if jsn != nil && len(jsn.ResourceResponse.Data.StoryPinData.Pages) != 0 && jsn.ResourceResponse.Data.Videos.VideoList.V720P.URL != "" {
	// 	if jsn.ResourceResponse.Data.Videos.VideoList.V720P.URL != "" {
	// 		videoo = jsn.ResourceResponse.Data.Videos.VideoList.V720P.URL
	// 	} else if jsn.ResourceResponse.Data.StoryPinData.Pages[0].Video.VideoList.V720P.URL != "" {
	// 		videoo = jsn.ResourceResponse.Data.Videos.VideoList.V720P.URL
	// 	} else {
	// 		videoo = getStream(jsn.ResourceResponse.Data.StoryPinData.Pages[0].Video.VideoList.VHLSV3MOBILE.URL)
	// 	}
	// }

	return &Result{
		Title:          jsn.ResourceResponse.Data.Title,
		Description:    jsn.ResourceResponse.Data.CloseupUnifiedDescription,
		AuthorId:       jsn.ResourceResponse.Data.NativeCreator.NodeID,
		AuthorName:     jsn.ResourceResponse.Data.NativeCreator.FullName,
		AuthorUsername: jsn.ResourceResponse.Data.NativeCreator.Username,
		AuthorImage:    strings.ReplaceAll(jsn.ResourceResponse.Data.NativeCreator.ImageMediumURL, "75", "280"),
		Metadata: Met{
			Anjir:  Anjir{Image: jsn.ResourceResponse.Data.Images},
			Anjir2: Anjir2{Video: jsn.ResourceResponse.Data.StoryPinData.Pages},
		},
	}
}

func GenParentSpanId() string {
	var result string = ""
	result += string("01234567"[rand.Intn(8)])
	for i := 0; i < 16; i++ {
		result += string("0123456789abcdef"[rand.Intn(16)])
	}

	return result
}

// func worker(urs <-chan string, chr chan<- []byte, wg *sync.WaitGroup) {
// 	defer wg.Done()
// 	for ul := range urs {
// 		fmt.Println(ul)
// 		res, err := helper.Request(ul, "GET", nil, nil)
// 		if err != nil {
// 			fmt.Println(err)
// 		}

// 		bit, err := io.ReadAll(res.Body)
// 		if err != nil {
// 			fmt.Println(err)
// 		}

// 		fmt.Println(bit)

// 		chr <- bit
// 	}
// }

func getStream(file string) string {
	var binary string

	res, err := helper.Request(file, "GET", nil, nil)
	if err != nil {
		fmt.Println(err)
	}

	ctt, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	var highRes string
	spl := strings.Split(string(ctt), "\n")
	for _, v := range spl {
		if strings.HasSuffix(v, ".m3u8") {
			highRes = v
		}
	}

	highUrl := file[:strings.LastIndex(file, "/")+1] + highRes
	// hres := REG_NUM.FindStringSubmatch(strings.Replace(strings.Split(highUrl, "_")[1], ".m3u8", "", -1))

	res, err = helper.Request(highUrl, "GET", nil, nil)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	ctt, err = io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	// https://v1.pinimg.com/videos/iht/720p/84/1e/a8/841ea838c6bfc124c87c1006f1b094c4.mp4
	// https://v1.pinimg.com/videos/iht/hls/84/1e/a8/841ea838c6bfc124c87c1006f1b094c4_720w.cmfv

	spl = strings.Split(string(ctt), "\n")
	for _, v := range spl {
		if strings.HasPrefix(v, "#EXT-X-MAP:URI=") {
			rs := REG_URL.FindStringSubmatch(v)
			// vUrl := strings.Replace(file[:strings.LastIndex(file, "/")+1], "hls", hres[1]+"p", -1) + rs[1][:strings.LastIndex(rs[1], "_")] + ".mp4"
			vUrl := strings.Replace(file[:strings.LastIndex(file, "/")+1], "hls", "720p", -1) + rs[1][:strings.LastIndex(rs[1], "_")] + ".mp4"
			// fmt.Println(vUrl)
			// res, err = helper.Request(vUrl, "GET", nil, nil)
			// if err != nil {
			// 	fmt.Println(err)
			// }

			// bit, err := io.ReadAll(res.Body)
			// if err != nil {
			// 	fmt.Println(err)
			// }

			binary = vUrl
			break
		}
	}

	// chUrl := make(chan string, MAX_WORKER)
	// chRes := make(chan []byte, MAX_WORKER)
	// var wg sync.WaitGroup

	// for range MAX_WORKER {
	// 	wg.Add(1)
	// 	go worker(chUrl, chRes, &wg)
	// }

	// for _, ur := range ths {
	// 	chUrl <- ur
	// }

	// close(chUrl)
	// close(chRes)
	// wg.Wait()

	// fmt.Println(<-chRes)
	return binary
}
