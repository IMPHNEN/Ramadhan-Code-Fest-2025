/*--------------------------- Page Loader --------------------------------*/
$(function () {
    setTimeout(() => {
        $('.page-loader').fadeOut('slow');
    }, 800);
});
/*---------------------------- Onboarding Screen ----------------------------*/
$(document).on("click", ".skip_btn_1", function () {
    $("#first").removeClass("active");
    $(".first_slide").removeClass("active");

    $("#second").addClass("active");
    $(".second_slide").addClass("active");
});

$(document).on("click", ".skip_btn_2", function () {
    $("#second").removeClass("active");
    $(".second_slide").removeClass("active");

    $("#third").addClass("active");
    $(".third_slide").addClass("active");
});

/*------------------------- New Password hide show button --------------------------*/
$(document).on("click", ".eye-off", function () {
    const input = $(this).siblings("input");
    const isPassword = input.attr("type") === "password";

    input.attr("type", isPassword ? "text" : "password");
    $(this).attr("src", isPassword ? "assets/images/svg/eye.svg" : "assets/images/svg/eye-off.svg");
});

/*------------------------------ Sticky Header -----------------------------*/
$(window).on("scroll", function () {
    const scrollPosition = $(window).scrollTop();

    if (scrollPosition >= 20) {
        $("#top-header, #top-navbar").addClass("fixed");
        $(".Amigo_img_main").css("padding-top", "70px");
    } else {
        $("#top-header, #top-navbar").removeClass("fixed");
        $(".Amigo_img_main").css("padding-top", "0");
    }
});
/*---------------------------- Confirm OTP Input filed  ------------------------------*/
function validateInput(input) {
    input.value = input.value.replace(/\D/g, "");

    if (input.value.length > 1) {
        input.value = input.value.charAt(0);
    }

    if (input.value !== "") {
        input.classList.add("filled");

        const nextInput = input.nextElementSibling;
        if (nextInput && nextInput.tagName === "INPUT") {
            nextInput.focus();
        }
    } else {
        input.classList.remove("filled");
    }
}
/*-----------------------------  Personal Info Photo Upload -------------------------*/
$(document).on("DOMContentLoaded", function () {
    const readURL = (input) => {
        if (input.files && input.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                $(".profile-pic").attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    $(document).on("change", ".file-upload", function () {
        readURL(this);
    });

    $(document).on("click", ".upload-button", function () {
        $(".file-upload").click();
    });
});

/*------------------------ Personal Info Tab Buttons --------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    function toggleSection(targetSection) {
        document.querySelectorAll(".toggle-btn-per-info").forEach((btn) => btn.classList.remove("active"));
        document.querySelectorAll("section").forEach((section) => section.classList.remove("active"));

        const targetElement = document.querySelector(`.${targetSection}`);
        const targetButton = document.querySelector(`.toggle-btn-per-info[data-section="${targetSection}"]`);

        if (targetElement) targetElement.classList.add("active");
        if (targetButton) targetButton.classList.add("active");
    }

    document.addEventListener("click", (event) => {
        const button = event.target.closest(".toggle-btn-per-info");
        const arrow = event.target.closest(".per-arrow-btn");

        if (button) {
            const targetSection = button.dataset.section;
            toggleSection(targetSection);
        }

        if (arrow) {
            event.preventDefault();
            const targetSection = arrow.dataset.section;
            toggleSection(targetSection);
        }
    });
});

/*------------- Personal info open Pop-Up page redirect ---------------------*/
$(document).on("click", ".print-continue-btn", function () {
    $(".loader2").fadeIn().delay(3000).fadeOut();

    setTimeout(() => {
        window.location.href = "create-new-pin.html";
    }, 2000);
});

/*------------- Shop Slider Home Screen ---------------------*/
$(document).ready(function () {
    $('.shop-card').slick({
        infinity: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true,
        speed: 1000,
    });
});
/*------------- Categories Slider Home Screen ---------------------*/
$('.categories-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: false,
    arrows: false,
    dots: false,
    speed: 1000,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                autoplay: false,
                arrows: false,
                variableWidth: true,
            }
        }
    ]
});
/*------------- Featured Slider Home Screen ---------------------*/
$('.featured-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    arrows: false,
    dots: false,
    speed: 1000,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 375,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }
    ]
})

/*------------- Brand logo Slider Home Screen ---------------------*/
$('.brand-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: false,
    arrows: false,
    dots: false,
    speed: 1000,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                autoplay: false,
                arrows: false,
                variableWidth: true,
            }
        }
    ]
})

/*------------- Best Sellers Home Screen ---------------------*/
$('.best-sellers-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: false,
    arrows: false,
    dots: false,
    speed: 1000,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                autoplay: false,
                arrows: false,
                variableWidth: true,
            }
        }
    ]
})
/*------------- Like Heart ---------------------*/
document.addEventListener("click", (event) => {
    const icon = event.target.closest(".heart-icon");
    if (icon) {
        icon.classList.toggle("filled");
    }
});
/*------------------------------------- Tabs -------------------------------------*/
$(document).on("click", ".tab-btn-main a", function (e) {
    e.preventDefault();

    const tabId = $(this).data("tab");
    if (!tabId) return; // Prevent errors if data-tab is missing

    $(".tab-btn-main a, .Tabcondent").removeClass("tab-active");
    $(this).addClass("tab-active");
    $("#" + tabId).addClass("tab-active");
});

/*--------------------------------- Click On Search Page Redirct -------------------------------------*/
document.addEventListener("click", function (event) {
    if (event.target.id === "searchInput") {
        window.location.href = "search.html";
    }
});

/*---------------------------------Filter Range  -------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const minSlider = document.getElementById("min-slider");
    const maxSlider = document.getElementById("max-slider");
    const minPrice = document.getElementById("min-price");
    const maxPrice = document.getElementById("max-price");
    const slider = document.querySelector(".slider");

    if (!minSlider || !maxSlider || !minPrice || !maxPrice || !slider) return;

    function updateSlider() {
        const minVal = parseInt(minSlider.value, 10);
        const maxVal = parseInt(maxSlider.value, 10);

        if (minVal > maxVal) {
            minSlider.value = maxVal;
        }
        minPrice.textContent = `$${minSlider.value}`;

        if (maxVal < minVal) {
            maxSlider.value = minVal;
        }
        maxPrice.textContent = `$${maxSlider.value}`;

        const leftPosition = (parseInt(minSlider.value, 10) / 100) * 100;
        const rightPosition = (parseInt(maxSlider.value, 10) / 100) * 100;

        slider.style.setProperty("--left", `${leftPosition}%`);
        slider.style.setProperty("--right", `${rightPosition}%`);

        minPrice.style.left = `${leftPosition}%`;
        maxPrice.style.left = `${rightPosition}%`;
    }

    minSlider.addEventListener("input", updateSlider);
    maxSlider.addEventListener("input", updateSlider);

    updateSlider();
});

/*---------------------------------Filter screen top Button -------------------------------------*/
document.addEventListener("click", function (event) {
    const button = event.target.closest(".filter-sales-btn, .size-btn");
    if (!button) return;

    document.querySelectorAll(".filter-sales-btn, .size-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
});

/*--------------------------------- Single Item Slider -------------------------------------*/
$('.single-product-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: false,
    speed: 1000,
    prevArrow: '<button type="button" class="single-slick-arrow slick-prev"><img src="assets/images/svg/left-black-arrow.svg" alt="left-black-arrow"></button>',
    nextArrow: '<button type="button" class="single-slick-arrow slick-next"><img src="assets/images/svg/right-half-arrow-black.svg" alt="right-half-arrow"></button>',
})

/*--------------------------------- Incre Decre -------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const decrementButton = document.getElementById('decrement');
    const incrementButton = document.getElementById('increment');
    const valueDisplay = document.getElementById('value');

    if (decrementButton && incrementButton && valueDisplay) {
        let value = 1;

        decrementButton.addEventListener('click', () => {
            if (value > 1) {
                value--;
                valueDisplay.textContent = value;
            }
        });

        incrementButton.addEventListener('click', () => {
            value++;
            valueDisplay.textContent = value;
        });
    }
});

// Add Text In Card
function updateLokiBox(lokiBoxId, inputField) {
    const lokiBox = document.getElementById(lokiBoxId);
    if (!lokiBox || !inputField) return;

    lokiBox.textContent = inputField.value.trim();
}

// Add Card Number 16 digit
function maskNumber() {
    const inputElement = document.getElementById("cardNumber");
    const outputElement = document.getElementById("lokiCardNumber");

    if (!inputElement || !outputElement) return;

    let inputNumber = inputElement.value.trim();

    let digitsOnly = inputNumber.replace(/\D/g, "");

    let maskedPart = digitsOnly.slice(0, 12).replace(/\d/g, "*"); // Mask first 12 digits
    let lastPart = digitsOnly.slice(12); // Show last 4 digits

    let maskedNumber = maskedPart.replace(/(.{4})/g, "$1 ").trim();

    if (lastPart) {
        maskedNumber += " " + lastPart;
    }

    outputElement.textContent = maskedNumber;
}

// Add CVV Number Only Three
function validateInputcvv(inputField) {
    inputField.value = inputField.value.replace(/\D/g, '');

    if (inputField.value.length > 3) {
        inputField.value = inputField.value.slice(0, 3);
    }
    document.getElementById('lokiCVV').textContent = inputField.value;
}

/*-------------------------------------Faq Section-------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
        const header = event.target.closest(".accordion-header");
        const subHeader = event.target.closest(".sub-accordion-header");

        if (header) {
            const content = header.nextElementSibling;
            const icon = header.querySelector(".icon");

            // Close all other accordions
            document.querySelectorAll(".accordion-content").forEach((acc) => {
                if (acc !== content) {
                    acc.classList.remove("open");
                    acc.previousElementSibling.classList.remove("active");
                    acc.previousElementSibling.querySelector(".icon")?.classList.remove("rotate");
                }
            });

            // Toggle the clicked accordion
            content.classList.toggle("open");
            header.classList.toggle("active");
            icon?.classList.toggle("rotate");
        }

        if (subHeader) {
            const content = subHeader.nextElementSibling;
            const icon = subHeader.querySelector(".icon");
            const parentAccordion = subHeader.closest(".accordion-content");

            // Close all other sub-accordions within the same parent
            parentAccordion.querySelectorAll(".sub-accordion-content").forEach((sub) => {
                if (sub !== content) {
                    sub.classList.remove("open");
                    sub.previousElementSibling.classList.remove("active");
                    sub.previousElementSibling.querySelector(".icon")?.classList.remove("rotate");
                }
            });

            // Toggle the clicked sub-accordion
            content.classList.toggle("open");
            subHeader.classList.toggle("active");
            icon?.classList.toggle("rotate");
        }
    });
});

/*-------------------------------------Add Home Screen Pop Up Screen-------------------------------------*/
$(document).ready(function () {
    setTimeout(() => {
        $("#bkgOverlay, #delayedPopup").fadeIn(400);
    }, 4800);

    $("#btnClose").on("click", function (e) {
        e.preventDefault();
        HideDialog();
    });

    function HideDialog() {
        $("#bkgOverlay, #delayedPopup").fadeOut(400);
    }
});
