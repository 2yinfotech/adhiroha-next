! function(s) {
    "use strict";
    s(window).on("load", function() {
        s('[data-loader="circle-side"]').fadeOut(), s("#preloader").addClass("loaded"), s(".animate_hero").addClass("is-transitioned")
    }), s("header.reveal_header").headroom({
        offset: 50,
        tolerance: 5,
        classes: {
            initial: "animated",
            pinned: "slideDown",
            unpinned: "slideUp"
        }
    }), s(window).on("scroll", function() {
        1 < s(this).scrollTop() ? s(".fixed_header").addClass("sticky") : s(".fixed_header").removeClass("sticky")
    }), s(window).scroll(), scrollCue.init({
        percentage: .85
    }), s(".opacity-mask").each(function() {
        s(this).css("background-color", s(this).attr("data-opacity-mask"))
    }), s(".background-image").each(function() {
        s(this).css("background-image", s(this).attr("data-background"))
    }), s('a[href^="#"].btn_scrollto').on("click", function(e) {
        e.preventDefault();
        var t = this.hash,
            e = s(t);
        s("html, body").stop().animate({
            scrollTop: e.offset().top - 60
        }, 300, "swing", function() {
            window.location.hash = t
        })
    });
    const e = document.querySelectorAll(".pinned-image");
    e.forEach(e => {
        const t = e.querySelector(".pinned-image__container");
        t.querySelector("img");
        var o = t.querySelector(".pinned-image__container-overlay"),
            a = e.querySelector(".pinned_over_content");
        const s = gsap.timeline({
            paused: !0
        });
        s.to(t, {
            scale: 1.05
        }, 0), s.from(a, {
            autoAlpha: 0
        }, 0), s.from(o, {
            autoAlpha: 0
        }, 0);
        ScrollTrigger.create({
            animation: s,
            trigger: e,
            start: "top center",
            markers: !1,
            pin: !1,
            scrub: !1
        })
    });
    var t, o, a, i, n = s(window),
        r = s("#section_video video");
    r.length && (r.each(function() {
        s(this).attr("webkit-playsinline", ""), s(this).attr("playsinline", ""), s(this).attr("muted", "muted"), s(this).attr("id", "loadvideo"), document.getElementById("loadvideo").load()
    }), n.scroll(function() {
        r.each(function() {
            var e;
            1 == (t = s(e = this).offset().top, o = t + s(e).outerHeight(), a = n.scrollTop(), i = a + n.height(), a < o && t < i) ? s(this)[0].play() : s(this)[0].pause()
        })
    })), s(".open_close_nav_panel").on("click", function() {
        s(".nav_panel").toggleClass("show"), s(".layer").toggleClass("layer-is-visible")
    }), s(".sidebar-navigation nav li a").on("click", function() {
        var e = s(this).parents("ul").length - 1,
            t = s(this).closest("ul"),
            o = s(this).parent("li"),
            a = s(".level-" + e),
            e = s(this).next("ul");
        o.hasClass("back") ? (t.removeClass("active"), a.removeClass("hidden")) : 0 < o.children("ul").length && (e.toggleClass("active"), t.addClass("hidden"))
    }), s(".open_close_menu").on("click", function() {
        s(".main-menu").toggleClass("show"), s(".layer").toggleClass("layer-is-visible")
    }), s(".menu_open").on("click", function() {
        s(".hamburger").toggleClass("is-active"), s(".panel_menu").toggleClass("active"), s("body").toggleClass("no_scroll"), s("header").toggleClass("header_color")
    }), s(".wrapper_menu ul li a").each(function() {
        s(this).on("mouseover", function() {
            s(".wrapper_menu").addClass("hover"), s(".container-item").removeClass("active"), s(this).parent().addClass("active")
        }).on("mouseleave", function() {
            s(".wrapper_menu").removeClass("hover")
        })
    }), s("a.show-submenu").on("click", function() {
        s(this).toggleClass("show_normal")
    });
    var l = s('input[name="dates"]');
    s(function() {
        l.daterangepicker({
            autoUpdateInput: !1,
            autoApply: !0,
            minDate: new Date,
            locale: {
                cancelLabel: "Clear"
            }
        }), l.on("apply.daterangepicker", function(e, t) {
            s(this).val(t.startDate.format("MM-DD-YY") + "  >  " + t.endDate.format("MM-DD-YY"))
        }), l.on("cancel.daterangepicker", function(e, t) {
            s(this).val("")
        })
    }), s(".carousel_item_1").owlCarousel({
        center: !0,
        items: 1,
        loop: !1,
        addClassActive: !0,
        margin: 0,
        autoplay: !1,
        autoplayTimeout: 6e6,
        autoplayHoverPause: !0,
        animateOut: "fadeOut",
        responsive: {
            0: {
                dots: !0
            },
            991: {
                dots: !0
            }
        }
    }), s(".carousel_item_centered").owlCarousel({
        loop: !0,
        margin: 5,
        nav: !0,
        dots: !1,
        center: !0,
        navText: ["<i class='bi bi-arrow-left-short'></i>", "<i class='bi bi-arrow-right-short'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1e3: {
                items: 2
            }
        }
    }), s(".carousel_item_centered_rooms").owlCarousel({
        loop: !0,
        margin: 5,
        nav: !0,
        dots: !1,
        center: !0,
        navText: ["<i class='bi bi-arrow-left-short'></i>", "<i class='bi bi-arrow-right-short'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            991: {
                items: 2
            }
        }
    }), s(".carousel_item_3").owlCarousel({
        loop: !1,
        margin: 15,
        nav: !0,
        dots: !1,
        center: !1,
        navText: ["<i class='bi bi-arrow-left-short'></i>", "<i class='bi bi-arrow-right-short'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1e3: {
                items: 3
            }
        }
    }), s(".carousel_testimonials").owlCarousel({
          items: 1,
        loop: true,
        autoplay: true, // Enable auto-scroll
        autoplayTimeout: 3000, // Set the autoplay interval to 3 seconds
        animateIn: "slideInRight", // Change to the desired animation for swipe from right to left
    animateOut: "slideOutLeft", // Animation for swiping out
        margin: 40,
        stagePadding: 30,
        smartSpeed: 600,
        autoHeight: !0,
        dots: !0,
        responsiveClass: !0,
        responsive: {
            600: {
                items: 1
            },
            1e3: {
                items: 1,
                nav: !1
            }
        }
    }), s(".fixed_title").theiaStickySidebar({
        minWidth: 991,
        additionalMarginTop: 120
    }), s(".custom_select select").niceSelect(), 1024 <= s(window).width() && s("footer.revealed").footerReveal({
        shadow: !1,
        opacity: .6,
        zIndex: 1
    }), s(".footer_links > ul > li").hover(function() {
        s(this).siblings().stop().fadeTo(300, .6), s(this).parent().siblings().stop().fadeTo(300, .3)
    }, function() {
        s(this).siblings().stop().fadeTo(300, 1), s(this).parent().siblings().stop().fadeTo(300, 1)
    });
    var c = document.querySelector(".progress-wrap path"),
        d = c.getTotalLength();

    function u() {
        var e = s(window).scrollTop(),
            t = s(document).height() - s(window).height(),
            t = d - e * d / t;
        c.style.strokeDashoffset = t
    }
    c.style.transition = c.style.WebkitTransition = "none", c.style.strokeDasharray = d + " " + d, c.style.strokeDashoffset = d, c.getBoundingClientRect(), c.style.transition = c.style.WebkitTransition = "stroke-dashoffset 10ms linear", u(), s(window).scroll(u), s(window).on("scroll", function() {
        50 < jQuery(this).scrollTop() ? jQuery(".progress-wrap").addClass("active-progress") : jQuery(".progress-wrap").removeClass("active-progress")
    }), s(".progress-wrap").on("click", function(e) {
        return e.preventDefault(), jQuery("html, body").animate({
            scrollTop: 0
        }, 550), !1
    })
}(jQuery);