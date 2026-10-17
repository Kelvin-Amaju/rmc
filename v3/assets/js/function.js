(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */	
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
	 		$("header.active-sticky-header").css("height", $('header.active-sticky-header .header-sticky').outerHeight());
		}	
	
		$window.on("scroll", function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header.active-sticky-header .header-sticky').outerHeight()
			$("header.active-sticky-header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header.active-sticky-header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}	
	
	/* Mobile navigation stays below the header and slides in from the left. */
	const desktopMenu = document.getElementById('menu');
	const mobileToggle = document.querySelector('.navbar-toggle');
	const headerNav = document.querySelector('.main-header .navbar');
	if (desktopMenu && mobileToggle && headerNav) {
		const panel = document.createElement('div');
		panel.id = 'rmcMobileMenu';
		panel.className = 'offcanvas offcanvas-start rmc-mobile-menu';
		panel.tabIndex = -1;
		panel.setAttribute('aria-label', 'Mobile navigation');
		panel.innerHTML = '<div class="offcanvas-body"><nav aria-label="Mobile navigation"></nav></div>';
		const menu = desktopMenu.cloneNode(true);
		menu.removeAttribute('id');
		menu.className = 'rmc-mobile-links';
		menu.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
		menu.querySelectorAll('li.submenu').forEach((item, index) => {
			const link = item.querySelector(':scope > a');
			const submenu = item.querySelector(':scope > ul');
			if (!link || !submenu) return;
			submenu.id = 'rmcMobileSubmenu' + index;
			submenu.hidden = true;
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'rmc-submenu-toggle';
			button.setAttribute('aria-expanded', 'false');
			button.setAttribute('aria-controls', submenu.id);
			button.innerHTML = '<span></span><i class="bi bi-chevron-down" aria-hidden="true"></i>';
			button.firstElementChild.textContent = link.textContent;
			if (link.getAttribute('href') === '#') {
				link.replaceWith(button);
			} else {
				button.firstElementChild.textContent = 'More ' + link.textContent;
				link.after(button);
			}
			button.addEventListener('click', () => {
				submenu.hidden = !submenu.hidden;
				button.setAttribute('aria-expanded', String(!submenu.hidden));
			});
		});
		panel.querySelector('nav').append(menu);
		const headerAction = document.querySelector('.main-header .header-btn a');
		if (headerAction) {
			const action = headerAction.cloneNode(true);
			action.className = 'rmc-mobile-action';
			panel.querySelector('nav').append(action);
		}
		document.body.append(panel);
		mobileToggle.innerHTML = '<button type="button" class="rmc-menu-toggle" aria-label="Open mobile menu" aria-controls="rmcMobileMenu" aria-expanded="false"><i class="bi bi-list" aria-hidden="true"></i></button>';
		const toggle = mobileToggle.firstElementChild;
		// Keep the header hamburger reachable while the full-width drawer is open.
		const offcanvas = new bootstrap.Offcanvas(panel, { scroll: true });
		let menuScrollPosition = 0;
		let pendingMenuAnchor = null;
		const updateMenuTop = () => {
			document.body.style.setProperty('--rmc-menu-top', Math.max(0, headerNav.getBoundingClientRect().bottom) + 'px');
			const headerStyle = getComputedStyle(headerNav.closest('.header-sticky'));
			panel.style.setProperty('--rmc-menu-bg', headerStyle.backgroundColor);
			panel.style.setProperty('--rmc-menu-blur', headerStyle.backdropFilter || 'blur(30px)');
			const headerLink = headerNav.querySelector('.nav-link');
			if (headerLink) panel.style.setProperty('--rmc-menu-color', getComputedStyle(headerLink).color);
		};
		toggle.addEventListener('click', () => {
			updateMenuTop();
			offcanvas.toggle();
		});
		panel.addEventListener('show.bs.offcanvas', () => {
			updateMenuTop();
			menuScrollPosition = window.scrollY;
			document.body.style.setProperty('--rmc-scroll-offset', -menuScrollPosition + 'px');
			document.documentElement.classList.add('rmc-scroll-locked');
			document.body.classList.add('rmc-menu-open');
			toggle.setAttribute('aria-expanded', 'true');
			toggle.setAttribute('aria-label', 'Close mobile menu');
		});
		panel.addEventListener('hidden.bs.offcanvas', () => {
			document.body.classList.remove('rmc-menu-open');
			document.documentElement.classList.remove('rmc-scroll-locked');
			document.body.style.removeProperty('--rmc-scroll-offset');
			window.scrollTo({ top: menuScrollPosition, behavior: 'instant' });
			toggle.setAttribute('aria-expanded', 'false');
			toggle.setAttribute('aria-label', 'Open mobile menu');
			if (window.innerWidth < 992) toggle.focus({ preventScroll: true });
			if (pendingMenuAnchor) {
				const target = document.getElementById(decodeURIComponent(pendingMenuAnchor.slice(1)));
				if (target) {
					history.pushState(null, '', pendingMenuAnchor);
					target.scrollIntoView();
				}
				pendingMenuAnchor = null;
			}
		});
		panel.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
			const destination = new URL(link.href, window.location.href);
			if (destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) {
				event.preventDefault();
				pendingMenuAnchor = destination.hash;
			}
			offcanvas.hide();
		}));
		window.addEventListener('resize', () => {
			updateMenuTop();
			if (window.innerWidth >= 992) offcanvas.hide();
		});
		window.addEventListener('scroll', updateMenuTop, { passive: true });
		new ResizeObserver(updateMenuTop).observe(headerNav);
		updateMenuTop();
	}

	/* Match the main RMC homepage's pointer and scroll parallax. */
	const heroCarousel = document.querySelector('.rmc-hero-carousel');
	if (heroCarousel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		const hero = heroCarousel.closest('.hero');
		if (window.matchMedia('(pointer: fine)').matches) {
			hero.addEventListener('pointermove', event => {
				const rect = hero.getBoundingClientRect();
				const x = (event.clientX - rect.left) / rect.width - 0.5;
				const y = (event.clientY - rect.top) / rect.height - 0.5;
				heroCarousel.style.transform = `translate3d(${x * -24}px, ${y * -24}px, 0) scale(1.08)`;
			});
			hero.addEventListener('pointerleave', () => { heroCarousel.style.transform = ''; });
		}
		const heroInner = hero.querySelector(':scope > .container');
		let heroFramePending = false;
		const updateHeroScroll = () => {
			if (heroFramePending) return;
			heroFramePending = true;
			requestAnimationFrame(() => {
				if (!document.body.classList.contains('rmc-menu-open')) {
					const y = Math.max(0, -hero.getBoundingClientRect().top);
					const height = hero.offsetHeight || 1;
					heroInner.style.transform = `translateY(${Math.min(y, height) * 0.24}px)`;
					heroInner.style.opacity = String(Math.max(0, 1 - y / (height * 0.9)));
				}
				heroFramePending = false;
			});
		};
		window.addEventListener('scroll', updateHeroScroll, { passive: true });
		updateHeroScroll();
	}

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				991:{
					slidesPerView: 2,
				}
			}
		});
	}

	if ($('.testimonial-slider-silver').length) {
		const testimonial_slider_silver = new Swiper('.testimonial-slider-silver .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next-silver',
				prevEl: '.testimonial-button-prev-silver',
			},
			breakpoints: {
				768:{
					slidesPerView: 1,
				},
				991:{
					slidesPerView: 1,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function() {
			$('.skillbar').each(function() {
				$(this).find('.count-bar').animate({
				width:$(this).attr('data-percent')
				},2000);
			});
		},{
			offset: '70%'
		});
	}	

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	function initHeadingAnimation() {
		// Respect OS reduced-motion settings: never hide or split essential headings.
		if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		
		if($('.text-effect').length) {
			var textheading = $(".text-effect");

			if(textheading.length === 0) return; gsap.registerPlugin(SplitText); textheading.each(function(index, el) {
				
				el.split = new SplitText(el, { 
					type: "lines,words,chars",
					linesClass: "split-line"
				});
				
				if( $(el).hasClass('text-effect') ){
					gsap.set(el.split.chars, {
						opacity: .3,
						x: "-7",
					});
				}
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 92%",
						end: "top 60%",
						markers: false,
						scrub: 1,
					},

					x: "0",
					y: "0",
					opacity: 1,
					duration: .7,
					stagger: 0.2,
				});
				
			});
		}
		
		if ($('.text-anime-style-1').length) {
			let staggerAmount 	= 0.05,
				translateXValue = 0,
				delayValue 		= 0.5,
			   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
			
			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
					gsap.from(animationSplitText.words, {
					duration: 1,
					delay: delayValue,
					x: 20,
					autoAlpha: 0,
					stagger: staggerAmount,
					scrollTrigger: { trigger: element, start: "top 85%" },
					});
			});		
		}
		
		if ($('.text-anime-style-2').length) {				
			let	 staggerAmount 		= 0.03,
				 translateXValue	= 20,
				 delayValue 		= 0.1,
				 easeType 			= "power2.out",
				 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
			
			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
					gsap.from(animationSplitText.chars, {
						duration: 1,
						delay: delayValue,
						x: translateXValue,
						autoAlpha: 0,
						stagger: staggerAmount,
						ease: easeType,
						scrollTrigger: { trigger: element, start: "top 85%"},
					});
			});		
		}
		
		if ($('.text-anime-style-3').length) {		
			let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
			
			 animatedTextElements.forEach((element) => {
				//Reset if needed
				if (element.animation) {
					element.animation.progress(1).kill();
					element.split.revert();
				}

				element.split = new SplitText(element, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});
				gsap.set(element, { perspective: 400 });

				gsap.set(element.split.chars, {
					opacity: 0,
					x: "50",
				});

				element.animation = gsap.to(element.split.chars, {
					scrollTrigger: { trigger: element,	start: "top 90%" },
					x: "0",
					y: "0",
					rotateX: "0",
					opacity: 1,
					duration: 1,
					ease: Back.easeOut,
					stagger: 0.02,
				});
			});		
		}
	}
	
	if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            initHeadingAnimation();
        });
    } else {
        window.addEventListener("load", initHeadingAnimation);
    }

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 1024) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
			  return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		if ($contactform.is('[data-email-draft]')) {
			const values = new FormData($contactform[0]);
			const name = [values.get('fname'), values.get('lname')].join(' ').trim();
			const body = 'Name: ' + name + '\nEmail: ' + values.get('email') + '\nPhone: ' + values.get('phone') + '\n\n' + values.get('message');
			window.location.href = 'mailto:info@mabamidje.com?subject=' + encodeURIComponent('Website enquiry from ' + name) + '&body=' + encodeURIComponent(body);
			submitMSG(true, 'Your email draft is ready to open in your email app. Send it there to contact RMC.');
			return;
		}
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Projects Item (filtering) Start */
	$window.on( "load", function(){
		if( $(".project-item-list").length ) {
				
			/* Init Isotope */
			var $menuitem = $(".project-item-list").isotope({
				itemSelector: ".project-item-box",
				layoutMode: "masonry",
				masonry: {
					// use outer width of grid-sizer for columnWidth
					columnWidth: 1,
				}
			});
				
			/* Filter items on click */
			var $menudisesnav = $(".project-nav li a");
				$menudisesnav.on('click', function (e) { 
			
				var filterValue = $(this).attr('data-filter');
				$menuitem.isotope({
					filter: filterValue
				}); 
				
				$menudisesnav.removeClass("active-btn"); 
				$(this).addClass("active-btn");
				e.preventDefault();
			});		
			$menuitem.isotope({ filter: ".first" });
		}			
	});
	/* Projects Item (filtering) End */

	/* Service Item List Start */
	var $services_item_list = $('.services-item-list');
	if ($services_item_list.length) {
		var $service_item = $services_item_list.find('.service-item');

		if ($service_item.length) {
			$service_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$service_item.removeClass('active'); 
						$(this).addClass('active'); 
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Service Item List End */

	/* Service Item List gold Start */
	var $services_item_list_gold = $('.services-item-list-gold');
	if ($services_item_list_gold.length) {
		var $service_item_gold = $services_item_list_gold.find('.service-item-gold');

		if ($service_item_gold.length) {
			$service_item_gold.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$service_item_gold.removeClass('active'); 
						$(this).addClass('active'); 
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Service Item List gold End */
	
})(jQuery);
