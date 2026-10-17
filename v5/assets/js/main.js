/***************************************************
==================== JS INDEX ======================
****************************************************
GSAP Registration
Animations Initialize
Preloader
Data Bg JS
Header Search
Heder Sticky
Mobile Menu
Offcanvas Menu
Nice Select
GLightBox JS
Progress bar
Pricing Toggle
Why Choose Hover Active
Swiper Sliders
Counter
Contact Map
Copyright Year
CountDown
Cursor
GSAP Animations


****************************************************/

(function ($) {
	"use strict";

	// Let visitors pause the decorative hero slideshow.
	const heroCarousel = document.querySelector(".rmc-hero-carousel");
	const heroMotion = heroCarousel?.querySelector(".rmc-hero-motion");
	heroMotion?.addEventListener("click", function () {
		const paused = heroCarousel.classList.toggle("is-paused");
		heroMotion.setAttribute("aria-pressed", String(paused));
		heroMotion.setAttribute("aria-label", paused ? "Play background slideshow" : "Pause background slideshow");
		heroMotion.querySelector("i").className = paused ? "bi bi-play-fill" : "bi bi-pause-fill";
	});

	////////////////////////////////////////////////////
	// GSAP Registration
	if (typeof gsap !== "undefined") {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);
	}

	////////////////////////////////////////////////////
	// Animations Initialize
	window.gsapAnimations = function () {
		initGlobalFadeAnimations();
		initrmcZoom();
		initSplitTextAnimations();
		initrmcCharsUp();
		initrmcCharsReveal();
		initrmcTextMove();
		initrmcImageReveal();
		initrmcZoomIn();
		initrmcHoverButtons();
		initrmcBgParallax();
		initPortfoliosSlider();
		initH1ProcessActive();
		initH2ProcessActive();
		initH3PortfolioWatermarkSticky();
	};

	////////////////////////////////////////////////////
	// Preloader
	$(window).on("load", function () {
		const rmcPreloader = $("#rmc-preloader");
		if (rmcPreloader.length > 0) {
			setTimeout(function () {
				rmcPreloader.addClass("is-loaded");
				rmcPreloader.fadeOut(600);
				gsapAnimations();
			}, 1000);
		} else {
			gsapAnimations();
		}
	});

	////////////////////////////////////////////////////
	// Data Bg JS
	$("[data-bg-image]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-bg-image") + ")");
	});

	////////////////////////////////////////////////////
	// Header Search - use event delegation for cloned sticky header
	$(document).on("click", ".rmc_header_search", function () {
		$(".rmc_search_popup").addClass("search-opened");
		$(".rmc_search_popup_overlay").addClass("opened");
	});
	$(document).on("click", ".search_close_btn", function () {
		$(".rmc_search_popup").removeClass("search-opened");
		$(".rmc_search_popup_overlay").removeClass("opened");
	});
	$(document).on("click", ".rmc_search_popup_overlay", function () {
		$(".rmc_search_popup").removeClass("search-opened");
		$(this).removeClass("opened");
	});

	////////////////////////////////////////////////////
	// Heder Sticky
	if ($(".rmc-header.header-sticky").length) {
		$(".rmc-header.header-sticky").clone().insertAfter(".rmc-header.header-sticky").addClass("header-sticky--cloned");
	}

	var lastScrollTop = "";
	function stickyMenu($targetMenu, $toggleClass) {
		var st = $(window).scrollTop();
		if ($(window).scrollTop() > 500) {
			if (st > lastScrollTop) {
				$targetMenu.removeClass($toggleClass);
			} else {
				$targetMenu.addClass($toggleClass);
			}
		} else {
			$targetMenu.removeClass($toggleClass);
		}

		lastScrollTop = st;
	}
	$(window).on("scroll", function () {
		if ($(".rmc-header").length) {
			stickyMenu($(".header-sticky"), "sticky");
		}
	});

	////////////////////////////////////////////////////
	// Mobile Menu - Populate both desktop and mobile offcanvas menus
	if ($(".rmc_main_navigation").length && $(".rmc_offcanvas_menu").length) {
		let navContent = document.querySelector(".rmc_main_navigation").innerHTML;
		let mobileNavContainers = document.querySelectorAll(".rmc_offcanvas_menu");
		mobileNavContainers.forEach(container => {
			container.innerHTML = navContent;
		});
	}

	// Offcanvas dropdown toggler - works for both desktop and mobile offcanvas
	if ($(".rmc_offcanvas_menu").length) {
		$(".rmc_offcanvas_menu").each(function () {
			let dropdownAnchor = $(this).find(".has-dropdown > a, .menu-item-has-children > a");
			dropdownAnchor.each(function () {
				let self = $(this);
				let toggleBtn = document.createElement("BUTTON");
				toggleBtn.setAttribute("aria-label", "dropdown toggler");
				toggleBtn.innerHTML = "<i class='bi bi-chevron-down'></i>";
				self.append(function () {
					return toggleBtn;
				});
				self.find("button").on("click", function (e) {
					e.preventDefault();
					let self = $(this);
					self.toggleClass("expanded");
					self.parent().toggleClass("expanded");
					self.parent().parent().children("ul").slideToggle();
				});
			});
		});
	}

	////////////////////////////////////////////////////
	// Offcanvas Menu
	if ($(".rmc_offcanvas").length) {
		$(".rmc_offcanvas_toggle").on("click", function () {
			$(".rmc_offcanvas").addClass("opened");
			$(".rmc_offcanvas_overlay").addClass("opened");
		});

		$(".offcanvas_close").on("click", function () {
			$(".rmc_offcanvas").removeClass("opened");
			$(".rmc_offcanvas_overlay").removeClass("opened");
		});
		$(".rmc_offcanvas_overlay").on("click", function () {
			$(".rmc_offcanvas").removeClass("opened");
			$(this).removeClass("opened");
		});
	}

	////////////////////////////////////////////////////
	// Nice Select
	if ($(".rmc-select").length > 0) {
		$(".rmc-select").niceSelect();
	}

	////////////////////////////////////////////////////
	// GLightBox JS
	const videoPopup = GLightbox({
		selector: ".video_popup",
		touchNavigation: false,
	});

	const rmcImageGallery = GLightbox({
		selector: "[data-gallery]",
		touchNavigation: true,
		loop: true,
		zoomable: true,
		autoplayVideos: true,
	});

	////////////////////////////////////////////////////
	// Progress bar
	function initProgressBars() {
		$(".rmc_progress").each(function () {
			const container = $(this);
			const bar = container.find(".progress_bar");
			const percentText = container.find(".progress_percent");

			const percent = parseInt(bar.data("percent")) || 0;

			// start state
			bar.css("width", "0%");

			function animateBar() {
				if (bar.hasClass("animated")) return;

				bar.addClass("animated");

				$({ value: 0 }).animate(
					{ value: percent },
					{
						duration: 1200,
						step: function (val) {
							bar.css("width", val + "%");

							if (percentText.length) {
								percentText.text(Math.round(val) + "%");
							}
						},
					}
				);
			}

			// basic scroll detection
			$(window).on("scroll", function () {
				const top = container.offset().top;
				const scroll = $(window).scrollTop() + $(window).height();

				if (scroll > top) {
					animateBar();
				}
			});
		});
	}
	initProgressBars();

	////////////////////////////////////////////////////
	// Pricing Toggle
	if ($(".rmc-toggle-checkbox").length > 0) {
		$(".rmc-toggle-checkbox").on("change", function () {
			const isYearly = $(this).is(":checked");

			$(".rmc_pricing_box").each(function () {
				const $price = $(this).find(".price");
				const $period = $(this).find(".period");

				$price.text(isYearly ? $price.data("year-price") : $price.data("month-price"));

				$period.text(isYearly ? $period.data("year-period") : $period.data("month-period"));
			});
		});
	}

	////////////////////////////////////////////////////
	// Why Choose Hover Active
	if ($(".rmc-h2_why_choose_wrap").length) {
		$(".rmc-h2_why_choose_wrap .choose_item").on("mouseover", function () {
			const $this = $(this);

			// Remove active class from all siblings
			$this.siblings(".rmc-h2_why_choose_wrap .choose_item").removeClass("active");

			// Add active class to hovered item
			$this.addClass("active");

			// Get class name(s) of the icon inside hovered item
			const $img = $this.find(".choose_image img");
			const imageSrc = $img.attr("src"); // get all classes as string

			// Find target icon container
			const $showContainer = $(".rmc-h2_why_choose_wrap .choose_images img");

			// Animate zoom out, change class, then zoom back in
			$showContainer
				.fadeOut(300)
				.css("transform", "scale(1.1)")
				.promise()
				.done(function () {
					$showContainer
						.attr("src", imageSrc) // replace src
						.fadeIn(300)
						.css("transform", "scale(1)");
				});
		});

		const serviceItems = document.querySelectorAll(".rmc-h2_why_choose_wrap .choose_item");
		if (serviceItems?.length) {
			serviceItems.forEach(item => {
				const title = item.querySelector(".choose_title");
				const text = title.textContent.trim();
				title.textContent = "";

				// Create layers
				const layer1 = document.createElement("span");
				layer1.classList.add("flip-layer", "layer1");
				const layer2 = document.createElement("span");
				layer2.classList.add("flip-layer", "layer2");
				layer1.textContent = text;
				layer2.textContent = text;

				// Append layers
				title.appendChild(layer1);
				title.appendChild(layer2);
			});
		}
	}

	////////////////////////////////////////////////////
	// Swiper Sliders

	// H1 Services Carousel
	if ($(".rmc-h1_services_carousel").length > 0) {
		var h1ServicesCarousel = new Swiper(".rmc-h1_services_carousel", {
			slidesPerView: "auto",
			spaceBetween: 24,
			centeredSlides: true,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			// pagination: {
			// 	el: ".rmc_slider-pagination",
			// 	clickable: true,
			// },
			navigation: {
				nextEl: ".rmc_slider-next",
				prevEl: ".rmc_slider-prev",
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: "auto",
					spaceBetween: 24,
				},
			},
		});
	}

	// H1 Testimonial Carousel
	if ($(".rmc-h1_testimonial_carousel").length > 0) {
		var h1TestimonialsCarousel = new Swiper(".rmc-h1_testimonial_carousel", {
			slidesPerView: "auto",
			spaceBetween: 24,
			centeredSlides: true,
			loop: true,
			speed: 2000,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			pagination: {
				el: ".rmc_slider-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: "auto",
					spaceBetween: 24,
				},
			},
		});
	}

	// H2 Portfolios Carousel
	if ($(".rmc-h2_portfolios_carousel").length > 0) {
		var h2PortfoliosCarousel = new Swiper(".rmc-h2_portfolios_carousel", {
			slidesPerView: "auto",
			spaceBetween: 24,
			centeredSlides: true,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".rmc_slider-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: "auto",
					spaceBetween: 24,
				},
			},
		});
	}

	// H2 Partners Carousel
	if ($(".rmc-h2_partners_carousel").length > 0) {
		var h2PartnersCarousel = new Swiper(".rmc-h2_partners_carousel", {
			slidesPerView: 2,
			spaceBetween: 1,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				576: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 4,
				},
				992: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 5,
				},
				1600: {
					slidesPerView: 6,
				},
			},
		});
	}

	// H2 Testimonial Carousel
	if ($(".rmc-h2_testimonial_carousel").length > 0) {
		var h1ServicesCarousel = new Swiper(".rmc-h2_testimonial_carousel", {
			effect: "cards",
			cardsEffect: {
				rotate: true,
				perSlideRotate: 2,
				slideShadows: false,
			},
			grabCursor: true,
			loop: false,
			speed: 500,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			breakpoints: {
				0: {
					cardsEffect: {
						perSlideRotate: 2,
					},
				},
				576: {
					cardsEffect: {
						perSlideRotate: 3,
					},
				},
				992: {
					cardsEffect: {
						perSlideRotate: 5,
					},
				},
				1200: {
					cardsEffect: {
						perSlideRotate: 10,
					},
				},
			},
			pagination: {
				el: ".rmc_slider-progress-pagination",
				type: "custom",
				renderCustom: function (swiper, current, total) {
					let html = "";
					for (let i = 1; i <= total; i++) {
						let paddedNumber = i < 10 ? "0" + i : i;
						let activeClass = i === current ? "is-active" : "";

						html += `
                        <div class="page-item ${activeClass}" data-index="${i - 1}">
                            <span class="page-num">${paddedNumber}</span>
                            ${i === current ? '<div class="custom-progress-bar"><div class="progress-fill"></div></div>' : ""}
                        </div>
                    `;
					}
					return html;
				},
			},
			on: {
				init: function () {
					makePaginationClickable(this);
					setAutoPlayDuration(this);
				},
				slideChange: function () {
					makePaginationClickable(this);
					setAutoPlayDuration(this);
				},
			},
		});

		// Click handler to jump to slides when numbers are clicked
		function makePaginationClickable(swiper) {
			document.querySelectorAll(".page-item").forEach(button => {
				button.onclick = function () {
					let index = parseInt(this.getAttribute("data-index"));
					swiper.slideTo(index);
					swiper.autoplay.start(); // Restart autoplay timeline on manual click
				};
			});
		}

		// Injects the exact delay time into CSS so the animation matches perfectly
		function setAutoPlayDuration(swiper) {
			const delay = swiper.params.autoplay.delay;
			// Apply time directly to the wrapper element
			document.documentElement.style.setProperty("--autoplay-delay", `${delay}ms`);
		}
	}

	// H2 Blog Carousel
	if ($(".rmc-h2_blog_carousel").length > 0) {
		var h2BlogCarousel = new Swiper(".rmc-h2_blog_carousel", {
			slidesPerView: "auto",
			centeredSlides: false,
			spaceBetween: 24,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".rmc_slider-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: "auto",
					spaceBetween: 24,
				},
			},
		});
	}

	// H3 Services Carousel
	if ($(".rmc-h3_services_carousel").length > 0) {
		let h3ServicesCarousel = new Swiper(".rmc-h3_services_carousel", {
			effect: "creative",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 1,
			loop: true,
			speed: 500,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			pagination: {
				el: ".rmc_slider-pagination",
				clickable: true,
			},
			creativeEffect: {
				prev: {
					shadow: false,
					// translate: ["-15%", "2%", -150],
					rotate: [0, 0, -10], // Exact -10 degree rotation
					opacity: 0.3,
				},
				next: {
					shadow: false,
					// translate: ["15%", "-2%", -150],
					rotate: [0, 0, 10], // Exact 10 degree rotation
					opacity: 0.3,
				},
			},
			breakpoints: {
				0: {
					creativeEffect: {
						prev: {
							rotate: [0, 0, -5],
						},
						next: {
							rotate: [0, 0, 5],
						},
					},
				},
				768: {
					creativeEffect: {
						prev: {
							rotate: [0, 0, -10],
						},
						next: {
							rotate: [0, 0, 10],
						},
					},
				},
			},
		});
	}

	// H3 Process Carousel
	if ($(".rmc-h3_process_carousel").length > 0) {
		var h3ProcessCarousel = new Swiper(".rmc-h3_process_carousel", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			speed: 2000,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			pagination: {
				el: ".rmc_slider-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: "auto",
					spaceBetween: 24,
				},
			},
		});
	}

	// H3 Teams Carousel
	if ($(".rmc-h3_teams_carousel").length > 0) {
		var h3TeamsCarousel = new Swiper(".rmc-h3_teams_carousel", {
			slidesPerView: "auto",
			spaceBetween: 24,
			centeredSlides: true,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".rmc_slider-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: "auto",
					spaceBetween: 24,
				},
			},
		});
	}

	// About Testimonials Carousel
	if ($(".rmc-about_testimonial_carousel").length > 0) {
		var AboutTestimonialsCarousel = new Swiper(".rmc-about_testimonial_carousel", {
			slidesPerView: 1,
			spaceBetween: 24,
			centeredSlides: true,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".rmc_slider-pagination",
				clickable: true,
			},
		});
	}

	////////////////////////////////////////////////////
	// Counter
	if ($(".rmc_counter-number").length > 0) {
		function animateCounter($el) {
			var from = parseFloat($el.data("from-value")) || 0;
			var to = parseFloat($el.data("to-value")) || 0;
			var duration = parseInt($el.data("duration")) || 2000;

			$({ counter: from }).animate(
				{ counter: to },
				{
					duration: duration,
					easing: "swing",
					step: function (now) {
						$el.text(Math.floor(now));
					},
					complete: function () {
						$el.text(to);
					},
				}
			);
		}

		// Trigger on scroll (only once)
		var observer = new IntersectionObserver(
			function (entries, obs) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var $el = $(entry.target);
						animateCounter($el);
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);

		$(".rmc_counter-number").each(function () {
			observer.observe(this);
		});
	}

	////////////////////////////////////////////////////
	// Contact Map
	const maps = document.querySelectorAll(".rmc-map");
	maps.forEach(mapEl => {
		const config = JSON.parse(mapEl.dataset.map || "{}");

		const lat = parseFloat(config.lat) || 0;
		const lng = parseFloat(config.lng) || 0;
		const zoom = parseInt(config.zoom) || 14;
		const icon = config.icon || "bi bi-geo-alt-fill";

		const map = L.map(mapEl, {
			center: [lat, lng],
			zoom: zoom,
			zoomControl: false,
		});

		L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
			attribution: "&copy; OpenStreetMap contributors",
		}).addTo(map);

		const customMarker = L.divIcon({
			className: "rmc_map_marker",
			html: `<i class="${icon}"></i>`,
			iconSize: [40, 40],
			iconAnchor: [20, 40],
		});

		L.marker([lat, lng], {
			icon: customMarker,
		}).addTo(map);
	});

	////////////////////////////////////////////////////
	// Copyright Year
	if ($(".rmc_copyright_text").length > 0) {
		const yearEl = document.querySelector(".rmc_copyright_text span");

		if (yearEl) {
			const currentYear = new Date().getFullYear();
			const spanYear = parseInt(yearEl.textContent);

			if (spanYear < currentYear) {
				yearEl.textContent = currentYear;
			}
		}
	}

	////////////////////////////////////////////////////
	// CountDown
	class rmcCountdown {
		constructor(el) {
			this.el = el;
			this.date = new Date(el.dataset.date).getTime();

			this.stop = el.dataset.stop === "true";

			this.labels = {
				days: el.dataset.days || "Days",
				hours: el.dataset.hours || "Hours",
				minutes: el.dataset.minutes || "Minutes",
				seconds: el.dataset.seconds || "Seconds",
			};

			this.expireTitle = el.dataset.expireTitle || "";
			this.expireDesc = el.dataset.expireDesc || "";

			this.start();
		}

		start() {
			if (this.stop) {
				this.el.innerHTML = this.timerContent({
					days: "08",
					hours: "12",
					minutes: "30",
					seconds: "45",
				});
				return;
			}

			this.update();
			this.interval = setInterval(() => this.update(), 1000);
		}

		// add leading zero
		format(num) {
			return num < 10 ? "0" + num : num;
		}

		update() {
			const now = new Date().getTime();
			const distance = this.date - now;

			if (distance < 0) {
				clearInterval(this.interval);
				this.el.innerHTML = this.expireContent();
				return;
			}

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			this.el.innerHTML = this.timerContent({
				days: this.format(days),
				hours: this.format(hours),
				minutes: this.format(minutes),
				seconds: this.format(seconds),
			});
		}

		timerContent(times) {
			let html = "";

			Object.keys(times).forEach(key => {
				html += `
				<div class="timer-content timer-item-${key}">
					<span class="time-count ${key}-count">${times[key]}</span>
					<span class="time-title ${key}-title">${this.labels[key]}</span>
				</div>
				<span class="divider">:</span>
			`;
			});

			return html;
		}

		expireContent() {
			let html = `<div class="countdown-expire">`;

			if (this.expireTitle) {
				html += `<div class="countdown-expire-title">${this.expireTitle}</div>`;
			}

			if (this.expireDesc) {
				html += `<div class="countdown-expire-desc">${this.expireDesc}</div>`;
			}

			html += `</div>`;
			return html;
		}
	}

	// init all countdowns
	document.querySelectorAll(".rmc-countdown").forEach(el => {
		new rmcCountdown(el);
	});

	////////////////////////////////////////////////////
	// Cursor
	if ($(".mouse-cursor").length && $(".cursor-inner").length && $(".cursor-outer").length) {
		const inner = document.querySelector(".cursor-inner");
		const outer = document.querySelector(".cursor-outer");

		if (!inner || !outer) return;

		// Hide on mobile / touch devices
		if (window.matchMedia("(pointer: coarse)").matches) {
			inner.style.display = "none";
			outer.style.display = "none";
			return;
		}

		let cursorVisible = false;

		window.addEventListener("mousemove", function (e) {
			outer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
			inner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

			if (!cursorVisible) {
				inner.classList.add("cursor-visible");
				outer.classList.add("cursor-visible");

				inner.classList.remove("cursor-hidden");
				outer.classList.remove("cursor-hidden");

				cursorVisible = true;
			}
		});

		// Hide when leaving browser window
		document.addEventListener("mouseleave", function () {
			inner.classList.remove("cursor-visible");
			outer.classList.remove("cursor-visible");

			inner.classList.add("cursor-hidden");
			outer.classList.add("cursor-hidden");

			cursorVisible = false;
		});

		// Show when entering again
		document.addEventListener("mouseenter", function () {
			inner.classList.add("cursor-visible");
			outer.classList.add("cursor-visible");

			inner.classList.remove("cursor-hidden");
			outer.classList.remove("cursor-hidden");

			cursorVisible = true;
		});

		$("body").on("mouseenter", "a, .know_tm_topbar .trigger, .cursor-pointer", function () {
			inner.classList.add("cursor-hover");
			outer.classList.add("cursor-hover");
		});

		$("body").on("mouseleave", "a, .know_tm_topbar .trigger, .cursor-pointer", function () {
			if (!($(this).is("a") && $(this).closest(".cursor-pointer").length)) {
				inner.classList.remove("cursor-hover");
				outer.classList.remove("cursor-hover");
			}
		});
	}

	////////////////////////////////////////////////////
	// Form Submission
	if ($("#contact-form").length > 0) {
		$("#contact-form").validate({
			rules: {
				conName: "required",
				conEmail: {
					required: true,
					email: true,
				},
				conPhone: "required",
				conMessage: "required",
			},

			messages: {
				conName: "Enter your full name.",
				conEmail: "Enter your valid email address.",
				conPhone: "Enter your valid phone number.",
				conMessage: "Enter your query message.",
			},
			submitHandler: function (form) {
				// start ajax request
				$.ajax({
					type: "POST",
					url: "assets/mail/contact-form.php",
					data: $("#contact-form").serialize(),
					cache: false,
					success: function (data) {
						if (data == "Y") {
							$("#message_sent").modal("show");
							$("#contact-form").trigger("reset");
						} else {
							$("#message_fail").modal("show");
						}
					},
				});
			},
		});
	}

	/***********************************************************************************************
======================================= GSAP Animations ==========================================
**************************************************************************************************/

	// Smooth Scroll
	if ($("#smooth-wrapper").length && $("#smooth-content").length && ScrollTrigger.isTouch !== 1) {
		gsap.config({ nullTargetWarn: false });

		if (!ScrollSmoother.get()) {
			window.rmcSmoother = ScrollSmoother.create({
				smooth: 1,
				effects: true,
				smoothTouch: 0.1,
				normalizeScroll: false,
				ignoreMobileResize: true,
			});
		}
	}

	// match media
	let mediaMatch = gsap.matchMedia();

	// Fade Animation
	function initGlobalFadeAnimations() {
		const fadeItems = gsap.utils.toArray(".rmc-fade");
		if (!fadeItems.length) return;

		const isRTL = document.documentElement.dir === "rtl"; // detect RTL

		fadeItems.forEach(item => {
			// Read data attributes
			const onscroll = parseInt(item.getAttribute("data-on-scroll")) || 1;
			const offset = parseInt(item.getAttribute("data-offset")) || 40;
			const delay = parseFloat(item.getAttribute("data-delay")) || 0.15;
			const duration = parseFloat(item.getAttribute("data-duration")) || 1.15;
			const direction = item.getAttribute("data-direction") || "bottom";
			const easeValue = item.getAttribute("data-ease") || "power2.out";

			// Determine initial x/y based on direction
			let x = 0,
				y = 0;

			switch (direction.toLowerCase()) {
				case "left":
					x = isRTL ? offset : -offset;
					break;
				case "right":
					x = isRTL ? -offset : offset;
					break;
				case "top":
					y = -offset;
					break;
				case "bottom":
					y = offset;
					break;
			}

			// Base animation settings
			const animSettings = {
				autoAlpha: 0,
				x: x,
				y: y,
				ease: easeValue,
				duration: duration,
				delay: delay,
			};

			// Add ScrollTrigger if required
			if (onscroll === 1 && typeof ScrollTrigger !== "undefined") {
				animSettings.scrollTrigger = {
					trigger: item,
					start: "top 85%",
					// you can add toggleActions, markers for debugging
					// toggleActions: "play none none none",
					// invalidateOnRefresh: true,
				};
			}

			// Set initial state visible to prevent flash
			gsap.set(item, { autoAlpha: 1 });

			// Run animation
			gsap.from(item, animSettings);
		});
	}

	// Zoom Animation
	function initrmcZoom() {
		const zoomItems = gsap.utils.toArray(".rmc-zoom");

		if (!zoomItems.length) return;

		zoomItems.forEach(item => {
			let onscrollValue = item.getAttribute("data-on-scroll") || 1,
				startScale = item.getAttribute("data-scale") || 0.5,
				delayValue = item.getAttribute("data-delay") || 0,
				durationValue = item.getAttribute("data-duration") || 1,
				easeValue = item.getAttribute("data-ease") || "power2.out";

			let animationSetting = {
				scale: startScale,
				autoAlpha: 0,
				duration: durationValue,
				delay: delayValue,
				ease: easeValue,
			};

			if (onscrollValue == 1) {
				animationSetting.scrollTrigger = {
					trigger: item,
					start: "top 85%",
				};
			}

			gsap.set(item, { autoAlpha: 1 });

			gsap.from(item, animationSetting);
		});
	}

	// Split Text
	function initSplitTextAnimations() {
		const splitTextElements = gsap.utils.toArray(".rmc-split-text");
		if (!splitTextElements.length) return;

		const isRTL = document.documentElement.dir === "rtl"; // detect RTL

		splitTextElements.forEach(element => {
			// Read data attributes
			let staggerAmount = parseFloat(element.getAttribute("data-stagger")) || 0.02;
			let translateXValue = parseFloat(element.getAttribute("data-x")) || 30;
			const translateYValue = parseFloat(element.getAttribute("data-y")) || 0;
			const delayValue = parseFloat(element.getAttribute("data-delay")) || 0.3;
			const durationValue = parseFloat(element.getAttribute("data-duration")) || 1;
			const easeType = element.getAttribute("data-ease") || "power2.out";

			// Flip X in RTL
			if (isRTL) translateXValue = -translateXValue;

			// HIDE ENTIRE ELEMENT IMMEDIATELY
			gsap.set(element, { autoAlpha: 0 });

			// Split text
			const splitInstance = new SplitText(element, {
				type: "chars, words",
				charsClass: "rmc-char",
				wordsClass: "rmc-word",
			});

			// Step 1: Parent is hidden via CSS (.rmc-split-text { opacity: 0; visibility: hidden })
			// Reveal parent so the split chars exist in visible DOM
			gsap.set(element, { autoAlpha: 1 });

			// Animate characters
			gsap.from(splitInstance.chars, {
				duration: durationValue,
				delay: delayValue,
				x: translateXValue,
				y: translateYValue,
				autoAlpha: 0,
				ease: easeType,
				stagger: staggerAmount,
				scrollTrigger: {
					// markers: true,
					trigger: element,
					start: "top 85%",
					// invalidateOnRefresh: true,
				},
			});
		});
	}

	// Chars up
	function initrmcCharsUp() {
		const elements = gsap.utils.toArray(".rmc-chars-up");
		if (!elements.length) return;

		const isRTL = document.documentElement.dir === "rtl";

		elements.forEach(element => {
			// HIDE ENTIRE ELEMENT IMMEDIATELY
			gsap.set(element, { autoAlpha: 0 });

			const split = new SplitText(element, {
				type: "chars,lines",
				charsClass: "rmc-char",
				linesClass: "rmc-line",
			});

			// Prevent char overflow
			gsap.set(split.lines, { overflow: "hidden" });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top 85%",
					toggleActions: "play none none none",
				},
			});

			// Step 1: Parent is hidden via CSS (.rmc-chars-up { opacity: 0; visibility: hidden })
			// Reveal parent so the split chars exist in visible DOM
			tl.set(element, { autoAlpha: 1 });

			tl.from(split.chars, {
				autoAlpha: 0,
				yPercent: 100,
				duration: 0.35,
				ease: "power2.out",
				stagger: {
					amount: 0.6,
					from: isRTL ? "end" : "start",
				},
			});
		});
	}

	// Chars reveal
	function initrmcCharsReveal() {
		const elements = gsap.utils.toArray(".rmc-chars-reveal");
		if (!elements.length) return;

		const isRTL = document.documentElement.dir === "rtl";

		elements.forEach(element => {
			const split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "rmc-line",
				wordsClass: "rmc-word",
				charsClass: "rmc-char",
			});

			// Initial state
			gsap.set(split.chars, {
				opacity: 0.3,
				x: isRTL ? 7 : -7, // RTL support
			});

			gsap.to(split.chars, {
				x: 0,
				y: 0,
				opacity: 1,
				duration: 0.7,
				ease: "power2.out",
				stagger: 0.03,

				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					end: "top 60%",
					scrub: 1.2,
					once: true,
				},
			});
		});
	}

	// Text move
	function initrmcTextMove() {
		const elements = gsap.utils.toArray(".rmc-text-move");
		if (!elements.length) return;

		elements.forEach(element => {
			// Hide before splitting
			gsap.set(element, {
				autoAlpha: 0,
			});

			const split = new SplitText(element, {
				type: "lines",
				linesClass: "rmc-line",
			});

			// Show after splitting
			gsap.set(element, {
				autoAlpha: 1,
				perspective: 400,
			});

			// Initial state
			gsap.set(split.lines, {
				autoAlpha: 0,
				rotationX: -80,
				transformOrigin: "top center - 50",
				force3D: true,
			});

			// Animation
			gsap.to(split.lines, {
				autoAlpha: 1,
				rotationX: 0,
				delay: 0.15,
				duration: 1,
				stagger: 0.02,
				ease: "power2.out",

				scrollTrigger: {
					trigger: element,
					start: "top 85%",
					once: true,
				},
			});
		});
	}

	// Image reveal
	function initrmcImageReveal() {
		// Select all image reveal containers
		const revealItems = gsap.utils.toArray(".rmc-img-reveal");

		if (!revealItems.length) return;

		const isRTL = document.documentElement.dir === "rtl";

		revealItems.forEach(container => {
			const image = container.querySelector("img");
			if (!image) return;

			// Timeline for this element
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top 70%",
					// invalidateOnRefresh: true,
				},
			});

			// Make container visible
			tl.set(container, { autoAlpha: 1 });

			// Slide in container from left
			tl.from(container, {
				duration: 1.5,
				xPercent: isRTL ? 100 : -100,
				ease: "power2.out",
			});

			// Slide image from right + scale
			tl.from(image, {
				duration: 1.5,
				xPercent: isRTL ? -100 : 100,
				scale: 1.3,
				ease: "power2.out",
				delay: -1.5, // overlap with container animation
			});
		});
	}

	// Image zoom in
	function initrmcZoomIn() {
		const zoomItems = gsap.utils.toArray(".rmc-zoom-in");

		if (!zoomItems.length) return;

		zoomItems.forEach(element => {
			// Wrap element in a container for overflow hidden if not already wrapped
			if (!element.parentElement.classList.contains("rmc-zoom-in-wrap")) {
				const wrap = document.createElement("div");
				wrap.classList.add("rmc-zoom-in-wrap");
				wrap.style.overflow = "hidden";

				element.parentNode.insertBefore(wrap, element);
				wrap.appendChild(element);
			}

			const container = element.parentElement;

			// Timeline with ScrollTrigger
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top 90%",
					markers: false,
					// invalidateOnRefresh: true,
				},
			});

			// Animate element
			tl.from(element, {
				duration: 1.5,
				// autoAlpha: 0,
				scale: 1.15,
				ease: "power2.out",
				clearProps: "all", // removes inline styles after animation
			});
		});
	}

	// Hover buttons
	function initrmcHoverButtons() {
		const wrappers = gsap.utils.toArray(".rmc-hover-btn-wrapper");
		const items = gsap.utils.toArray(".rmc-hover-btn-item");

		if (!wrappers.length || !items.length) return;

		wrappers.forEach((wrapper, i) => {
			const target = items[i];
			if (!target) return;

			// Mouse move event
			wrapper.addEventListener("mousemove", e => {
				parallaxMove(e, wrapper, target, 30);
			});

			// Mouse leave event → reset
			wrapper.addEventListener("mouseleave", () => {
				gsap.to(target, {
					duration: 1,
					x: 0,
					y: 0,
					ease: "power2.out",
				});
			});
		});

		// Parallax calculation
		function parallaxMove(e, wrapper, target, movement) {
			const rect = wrapper.getBoundingClientRect();
			const relX = e.clientX - rect.left;
			const relY = e.clientY - rect.top;

			gsap.to(target, {
				duration: 1,
				x: ((relX - rect.width / 2) / rect.width) * movement,
				y: ((relY - rect.height / 2) / rect.height) * movement,
				ease: "power2.out",
			});
		}
	}

	// Image parallax
	function initrmcBgParallax() {
		const items = gsap.utils.toArray(".rmc-img-parallax");

		if (!items.length) return;

		items.forEach(el => {
			const speed = parseFloat(el.dataset.speed) || 40;
			const zoom = parseFloat(el.dataset.zoom) || 1.15;

			// Set initial background
			gsap.set(el, {
				backgroundPosition: "50% 0%",
				scale: 1,
			});

			gsap.to(el, {
				backgroundPosition: `50% ${speed}%`,
				scale: zoom,
				ease: "none",
				scrollTrigger: {
					trigger: el,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});
		});
	}

	// H1 Portfolios ScrollSlider
	function initPortfoliosSlider() {
		const h1PortfoliosWrap = document.querySelector(".rmc-h1_portfolios_wrap");
		if (!h1PortfoliosWrap) return;

		mediaMatch.add(
			{
				isDesktop: "(min-width: 768px)",
			},
			screen => {
				const { isDesktop } = screen?.conditions;

				if (isDesktop) {
					const portfoliosTitle = gsap.utils.toArray(h1PortfoliosWrap.querySelectorAll(".subtitle_list > .subtitle"));
					const portfoliosItems = gsap.utils.toArray(
						h1PortfoliosWrap.querySelectorAll(".portfolios_card .rmc-h1_portfolio_item")
					);
					const portfolioCard = h1PortfoliosWrap.querySelector(".portfolios_card");
					const portfolioImage = h1PortfoliosWrap.querySelector(".portfolio_images_wrap > .portfolio_img");

					if (!portfoliosItems.length || !portfolioCard) return;

					let activeIndex = -1;

					const getItemImage = index => {
						const image = portfoliosItems[index]?.querySelector(".portfolio_image img");
						return image?.getAttribute("src") || image?.currentSrc || "";
					};

					const setPortfolioBg = index => {
						if (!portfolioImage) return;

						const imageSrc = getItemImage(index);
						if (!imageSrc) return;

						portfolioImage.setAttribute("data-bg-image", imageSrc);
						portfolioImage.style.backgroundImage = `url(${imageSrc})`;
					};

					const setActiveClass = index => {
						portfoliosTitle.forEach((subtitle, subtitleIndex) => {
							subtitle.classList.toggle("active", subtitleIndex === index);
						});
					};

					const setActivePortfolio = index => {
						if (index === activeIndex) return;

						activeIndex = index;
						setActiveClass(activeIndex);

						portfoliosItems.forEach((item, itemIndex) => {
							gsap.to(item, {
								autoAlpha: itemIndex === activeIndex ? 1 : 0,
								y: itemIndex === activeIndex ? 0 : 60,
								duration: 0.45,
								ease: "power2.out",
								overwrite: true,
							});
						});

						if (portfolioImage) {
							const imageSrc = getItemImage(activeIndex);
							if (imageSrc) {
								portfolioImage.setAttribute("data-bg-image", imageSrc);
								gsap.to(portfolioImage, {
									autoAlpha: 0.75,
									duration: 0.18,
									ease: "power1.out",
									overwrite: true,
									onComplete: () => {
										portfolioImage.style.backgroundImage = `url(${imageSrc})`;
										gsap.to(portfolioImage, {
											autoAlpha: 1,
											duration: 0.3,
											ease: "power1.out",
											overwrite: true,
										});
									},
								});
							}
						}
					};

					const setPortfolioCardHeight = () => {
						const maxItemHeight = Math.max(...portfoliosItems.map(item => item.offsetHeight));
						portfolioCard.style.minHeight = `${maxItemHeight}px`;
					};

					portfolioCard.style.position = "relative";
					setPortfolioCardHeight();

					portfoliosItems.forEach((item, index) => {
						gsap.set(item, {
							position: "absolute",
							width: "100%",
							left: 0,
							top: 0,
							y: index === 0 ? 0 : 60,
							autoAlpha: index === 0 ? 1 : 0,
						});
					});

					setActivePortfolio(0);

					const scrollSteps = Math.max(portfoliosItems.length - 1, 1);
					const portfoliosTrigger = ScrollTrigger.create({
						trigger: h1PortfoliosWrap,
						start: "top top",
						end: () => `+=${scrollSteps * window.innerHeight}`,
						pin: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						snap: {
							snapTo: portfoliosItems.length > 1 ? 1 / (portfoliosItems.length - 1) : 1,
							duration: { min: 0.15, max: 0.35 },
							ease: "power1.inOut",
						},
						// markers: true,

						onUpdate: self => {
							const nextIndex = Math.round(self.progress * (portfoliosItems.length - 1));
							setActivePortfolio(gsap.utils.clamp(0, portfoliosItems.length - 1, nextIndex));
						},
						onRefresh: setPortfolioCardHeight,
					});

					return () => {
						portfoliosTrigger.kill();
						gsap.killTweensOf([portfolioImage, ...portfoliosItems]);
						portfolioCard.removeAttribute("style");
						portfoliosItems.forEach(item => item.removeAttribute("style"));
						activeIndex = -1;
						setActiveClass(0);
						setPortfolioBg(0);
					};
				}
			}
		);

		let resizeRefresh;
		window.addEventListener("resize", () => {
			if (resizeRefresh) resizeRefresh.kill();

			resizeRefresh = gsap.delayedCall(0.25, () => {
				ScrollTrigger.refresh();
			});
		});
	}

	// H1 Process active on scroll
	function initH1ProcessActive() {
		const processWrapper = document.querySelector(".rmc-h1_process_wrapper");
		if (!processWrapper) return;

		const processItems = gsap.utils.toArray(processWrapper.querySelectorAll(".rmc_process_item"));
		if (!processItems.length) return;

		mediaMatch.add(
			{
				isDesktop: "(min-width: 992px)",
			},
			screen => {
				const { isDesktop } = screen?.conditions;

				if (isDesktop) {
					const setActiveThrough = activeIndex => {
						processItems.forEach((item, index) => {
							item.classList.toggle("active", index <= activeIndex);
						});
					};

					setActiveThrough(0);

					const processTrigger = ScrollTrigger.create({
						trigger: processWrapper,
						start: "top top+=50",
						end: () => `+=${Math.max(processItems.length - 1, 1) * window.innerHeight * 0.6}`,
						pin: true,
						pinSpacing: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						scrub: true,
						// markers: true,
						onUpdate: self => {
							const activeIndex = Math.round(self.progress * (processItems.length - 1));
							setActiveThrough(gsap.utils.clamp(0, processItems.length - 1, activeIndex));
						},
					});

					return () => {
						processTrigger.kill();
						processItems.forEach((item, index) => {
							item.classList.toggle("active", index === 0);
						});
					};
				}
			}
		);
	}

	// H2 Process active on scroll
	function initH2ProcessActive() {
		const processContentWrapper = document.querySelector(".rmc-h2_process_content_wrapper");
		if (!processContentWrapper) return;

		const processItems = gsap.utils.toArray(processContentWrapper.querySelectorAll(".rmc_process_item_2"));
		const processImages = gsap.utils.toArray(processContentWrapper.querySelectorAll(".process_images img"));
		if (!processItems.length) return;

		mediaMatch.add(
			{
				isDesktop: "(min-width: 768px)",
			},
			screen => {
				const { isDesktop } = screen?.conditions;

				if (isDesktop) {
					const setActiveProcess = activeIndex => {
						processItems.forEach((item, index) => {
							item.classList.toggle("active", index <= activeIndex);
						});

						processImages.forEach((image, index) => {
							image.classList.toggle("active", index === activeIndex);
						});
					};

					setActiveProcess(0);

					const processTrigger = ScrollTrigger.create({
						trigger: processContentWrapper,
						start: "top top+=50",
						end: () => `+=${Math.max(processItems.length - 1, 1) * window.innerHeight * 0.6}`,
						pin: true,
						pinSpacing: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						scrub: true,
						// markers: true,
						onUpdate: self => {
							const activeIndex = Math.round(self.progress * (processItems.length - 1));
							setActiveProcess(gsap.utils.clamp(0, processItems.length - 1, activeIndex));
						},
					});

					return () => {
						processTrigger.kill();
						processItems.forEach((item, index) => {
							item.classList.toggle("active", index === 0);
						});
						processImages.forEach((image, index) => {
							image.classList.toggle("active", index === 0);
						});
					};
				}
			}
		);
	}

	// H3 Portfolio Watermark Sticky
	function initH3PortfolioWatermarkSticky() {
		const portfoliosWrapper = document.querySelector(".rmc-h3_portfolios_wrapper");
		if (!portfoliosWrapper) return;

		const portfolioWatermark = portfoliosWrapper.querySelector(".watermark");
		if (!portfolioWatermark) return;

		const watermarkTrigger = ScrollTrigger.create({
			trigger: portfolioWatermark,
			endTrigger: portfoliosWrapper,
			pin: portfolioWatermark,
			start: "center center",
			end: "bottom bottom-=300",
			markers: false,
			pinSpacing: false,
			scrub: 1,
		});

		return () => {
			watermarkTrigger.kill();
		};
	}
})(jQuery);
