/*closestchild*/

(function ($) {
   $.fn.closestChild = function (selector) {
      var $children, $results;

      $children = this.children();

      if ($children.length === 0) return $();

      $results = $children.filter(selector);

      if ($results.length > 0) return $results;
      else return $children.closestChild(selector);
   };
})(window.jQuery);

/* /. closestchild*/

$(function () {
   if (window.devicePixelRatio > 1) {
      var lowresImages = $("img[data-retinasrc]"),
         thiswidth,
         thisheight;

      lowresImages.each(function (i) {
         thiswidth = $(this).width();
         thisheight = $(this).height();

         $(this).attr("width", thiswidth);
         $(this).attr("height", thisheight);

         var lowres = $(this).attr("src");
         var highres = $(this).data("retinasrc");
         $(this).attr("src", highres);
      });
   }

   var hPanelHide = 50;
   var top_show = 280;
   var speed = 500;
   var $backButton = $("#up");

   var tempScrollTop,
      currentScrollTop = 0;

   $(window).scroll(function () {
      if (
         $(this).scrollTop() > top_show &&
         $(this).scrollTop() < $(document).height() - $(window).height() - 60
      ) {
         $backButton.fadeIn();
      } else {
         $backButton.fadeOut();
      }

      currentScrollTop = jQuery(window).scrollTop();

      if (tempScrollTop < currentScrollTop) {
         if ($(this).scrollTop() > hPanelHide) {
            $(".header-wrapper").addClass("hPanelHide");
         } else {
            $(".header-wrapper").removeClass("hPanelHide");
         }
      } else if (tempScrollTop > currentScrollTop) {
         $(".header-wrapper").removeClass("hPanelHide");
      } else if (tempScrollTop > currentScrollTop) {
         $(".header-wrapper").removeClass("hPanelHide");
      }
      tempScrollTop = currentScrollTop;
   });

   $backButton.click(function () {
      scrollto(0, speed);
   });

   // scrollto
   window.scrollto = function (destination, speed) {
      if (typeof speed == "undefined") {
         speed = 800;
      }
      jQuery("html:not(:animated),body:not(:animated)").animate(
         { scrollTop: destination - 60 },
         speed
      );
   };
   $("a.scrollto").click(function () {
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top;
      scrollto(destination);
      return false;
   });
   // end scrollto

   // fancybox
   $(".fancybox").fancybox({
      padding: 0,
      openEffect: "fade",
      closeEffect: "fade",
      nextEffect: "none",
      prevEffect: "none",
      helpers: {
         overlay: {
            locked: false,
         },
      },
   });

   $(".fancyboxModal").fancybox({
      autoResize: true,
      padding: 0,
      openEffect: "fade",
      closeEffect: "fade",
      nextEffect: "none",
      prevEffect: "none",
      fitToView: false,
      maxWidth: "100%",
      scrolling: "no",
      helpers: {
         overlay: {
            locked: false,
         },
      },
   });

   // end fancybox

   // validation

   $(".rf").each(function () {
      var item = $(this),
         btn = item.find(".btn");

      function checkInput() {
         item.find("select.required").each(function () {
            if ($(this).val() == "") {
               $(this).parents(".form-group").addClass("error");
               $(this)
                  .parents(".form-group")
                  .find(".error-message")
                  .show();
            } else {
               $(this).parents(".form-group").removeClass("error");
            }
         });

         item.find("input[type=text].required").each(function () {
            if ($(this).val() != "") {
               $(this).removeClass("error");
            } else {
               $(this).addClass("error");
               $(this).parent(".form-group").find(".error-message").show();
            }
         });

         item.find("input[type=file].required").each(function () {
            if ($(this).val() != "") {
               $(this).parents("fieldset").removeClass("error");
            } else {
               $(this).parents("fieldset").addClass("error");
            }
         });

         item.find("textarea.required").each(function () {
            if ($(this).val() != "") {
               $(this).removeClass("error");
            } else {
               $(this).addClass("error");
               $(this).parent(".form-group").find(".error-message").show();
            }
         });

         item.find("input[type=email]").each(function () {
            var regexp =
               /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
            var $this = $(this);
            if ($this.hasClass("required")) {
               if (regexp.test($this.val())) {
                  $this.removeClass("error");
               } else {
                  $this.addClass("error");
                  $(this)
                     .parent(".form-group")
                     .find(".error-message")
                     .show();
               }
            } else {
               if ($this.val() != "") {
                  if (regexp.test($this.val())) {
                     $this.removeClass("error");
                  } else {
                     $this.addClass("error");
                     $(this)
                        .parent(".form-group")
                        .find(".error-message")
                        .show();
                  }
               } else {
                  $this.removeClass("error");
               }
            }
         });

         item.find("input[type=checkbox].required").each(function () {
            if ($(this).is(":checked")) {
               $(this).removeClass("error");
            } else {
               $(this).addClass("error");
               $(this).parent(".form-group").find(".error-message").show();
            }
         });
      }

      btn.click(function () {
         checkInput();
         var sizeEmpty = item.find(".error:visible").length;
         if (sizeEmpty > 0) {
            return false;
         } else {
            item.submit();
            $.fancybox.close();
         }
      });
   });

   $("select").change(function () {
      if ($(this).val() == "") {
         $(this).parents(".form-group").removeClass("selected");
      } else {
         $(this).parents(".form-group").addClass("selected");
         $(this).parents(".form-group").removeClass("error");
      }
   });

   // end validation

   // tabs

   $("ul.tabs").on("click", "li:not(.current)", function () {
      $(this)
         .addClass("current")
         .siblings()
         .removeClass("current")
         .closest("div.section")
         .closestChild("div.box")
         .removeClass("visible")
         .eq($(this).index())
         .addClass("visible");
   });

   $("ul.tabs.mobile li").click(function () {
      $(this)
         .parent()
         .hide()
         .siblings(".mobile-tab-header")
         .html($(this).html());
      $(".mobile-tab-header").removeClass("active");
   });

   $(".mobile-tab-header").click(function (e) {
      $(this).toggleClass("active");
      $(this).siblings(".tabs.mobile").toggle();
      e.stopPropagation();
   });

   $("body").click(function () {
      if ($(".mobile-tab-header").is(":visible")) {
         $(".tabs.mobile").hide();
         $(".mobile-tab-header").removeClass("active");
      }
   });

   // end tabs

   // Animation

   if (!$("body").hasClass("no-animate")) {
      $(
         ".about-section .row > div, .services-section, .action-section .row > div, .features-section, .team-section"
      ).addClass("hidden");

      $(".about-section .row > div").viewportChecker({
         classToAdd: "visible animated fadeIn",
         offset: 300,
      });

      $(".services-section").viewportChecker({
         classToAdd: "visible animated fadeIn",
         offset: 300,
      });

      $(".features-section").viewportChecker({
         classToAdd: "visible animated fadeInUp",
         offset: 300,
      });

      $(".action-section .row > div:first-of-type").viewportChecker({
         classToAdd: "visible animated fadeInLeft",
         offset: 200,
      });

      $(".action-section .row > div:last-of-type").viewportChecker({
         classToAdd: "visible animated fadeInRight",
         offset: 200,
      });

      $(".team-section").viewportChecker({
         classToAdd: "visible animated fadeIn",
         offset: 500,
      });
   }

   // End animation

   // Carousels
   $(".top-slider").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 800,
      arrows: true,
      prevArrow: '<a href="#" class="slick-prev"></a>',
      nextArrow: '<a href="#" class="slick-next"></a>',
      dots: true,
      responsive: [
         {
            breakpoint: 1365,
            settings: {
               arrows: false,
            },
         },
      ],
   });

   $(".specialist-slider").slick({
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 800,
      arrows: true,
      dots: true,
      prevArrow: $("#specialist-slider-prev"),
      nextArrow: $("#specialist-slider-next"),
      responsive: [
         {
            breakpoint: 991,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
            },
         },
         {
            breakpoint: 751,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   });

   $(".review-slider").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 800,
      arrows: true,
   });

   $(".team-carousel").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      swipeToSlide: true,
      autoplaySpeed: 4000,
      speed: 800,
      arrows: true,
      prevArrow: '<a href="#" class="slick-prev"></a>',
      nextArrow: '<a href="#" class="slick-next"></a>',
      dots: false,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 500,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });

   $(".services-carousel.morethen-4").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      swipeToSlide: true,
      autoplaySpeed: 4000,
      speed: 800,
      arrows: false,
      dots: false,
      responsive: [
         {
            breakpoint: 1440,
            settings: {
               slidesToShow: 4,
            },
         },
         {
            breakpoint: 1240,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });

   // End Carousels

   // проверка на Internet Explorer 6-11
   var isIE = /*@cc_on!@*/ false || !!document.documentMode;

   if (isIE) {
      $("body").addClass("ie");
   }
   // end

   // accordeon
   var $thisElement, $thisElementContent, $elements, $elementsContent;

   $(".accordeon .title").click(function () {
      $thisElement = $(this).parent();
      $thisElementContent = $thisElement.find(".element-content");
      $elements = $thisElement.siblings();
      $elementsContent = $elements.find(".element-content");

      $elements.removeClass("active");
      $elementsContent.slideUp();
      if (!$thisElement.hasClass("active")) {
         $thisElement.addClass("active");
         $thisElementContent.slideDown();
      } else {
         $thisElement.removeClass("active");
         $thisElementContent.slideUp();
      }
   });

   // end accordeon
   $(".top-menu .uMenuH > ul > li").has("ul").addClass("down");

   $(".menu-button").click(function () {
      $(".menu-button").toggleClass("active");
      $(".mobile-menu").toggleClass("open");
   });
   $(".mobile-menu, .menu-button").click(function (e) {
      if ($(e.target).hasClass("fancyboxModal") == false) {
         e.stopPropagation();
      }
   });
   $("body").click(function () {
      $(".mobile-menu").removeClass("open");
      $(".menu-button").removeClass("active");
   });

   $(".mobile-menu ul > li").has("ul").addClass("down");
   $(".mobile-menu .down > ul").before(
      '<span class="dropdown-button"></span>'
   );

   $(".mobile-menu .dropdown-button").click(function () {
      $(this).toggleClass("active");
      if ($(this).siblings("ul").is(":visible")) {
         $(this).siblings("ul").slideUp();
      } else {
         $(this).siblings("ul").slideDown();
      }
   });

   // styler

   var option = [
      {
         value: "",
         name: "",
         timepicker: {
            minTime: "10",
            defaultTime: "10",
            maxTime: "9:00pm",
            startTime: "10:00",
         },
         beforeShowDay: undefined,
      },
      {
         value: 1,
         name: "ул.Фёдора Полетаева д.9А",
         timepicker: {
            minTime: "10",
            defaultTime: "10",
            maxTime: "9:00pm",
            startTime: "10:00",
         },
         beforeShowDay: undefined,
      },
      {
         value: 2,
         name: "ул.2ая-Мелитопольская д.21 к.3",
         timepicker: {
            minTime: "10",
            defaultTime: "10",
            maxTime: "9:00pm",
            startTime: "10:00",
         },
         beforeShowDay: undefined,
      },
      {
         value: 3,
         name: "ул.Скобелевская д.25",
         timepicker: {
            minTime: "9",
            defaultTime: "9",
            maxTime: "9:00pm",
            startTime: "9:00",
         },
         beforeShowDay: undefined,
      },
      {
         value: 4,
         name: "Северный бульвар д.7Б",
         timepicker: {
            minTime: "10",
            defaultTime: "10",
            maxTime: "9:00pm",
            startTime: "10:00",
         },
         beforeShowDay: function (date) {
            var day = date.getDay();
            return [day != 0, ""];
         },
      },
   ];
   var myTimepicker = $("#begintime");
   var myDatepicker = $("#datepicker");
   option.forEach(function (item, i, arr) {
      $("#service").append(
         $("<option>", {
            value: item.value,
            text: item.name,
         })
      );
   });

   if ($(".select-styler").length > 0) {
      $(".select-styler").styler({
         selectSearch: false,
         onSelectOpened: function () {
            $(this).find(".jq-selectbox__dropdown ul").jScrollPane({
               verticalDragMinHeight: 30,
               verticalDragMaxHeight: 50,
            });
         },
      });
   }

   $(document.body).on("change", ".select-styler", function (e) {
      //doStuff
      var optVal = option[$(".select-styler option:selected").val()];
      myDatepicker.datepicker("destroy");
      myDatepicker.datepicker({
         dateFormat: "dd.mm.yy",
         monthNames: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
         ],
         monthNamesShort: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
         ],
         dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
         firstDay: 1,
         changeYear: true,
         changeMonth: true,
         yearRange: "-1:+1",
         minDate: 0,
         beforeShowDay: optVal.beforeShowDay,
      });

      myTimepicker.timepicker("destroy");
      myTimepicker.timepicker({
         timeFormat: "HH:mm",
         interval: 30,
         minTime: optVal.timepicker.minTime,
         maxTime: optVal.timepicker.maxTime,
         defaultTime: optVal.timepicker.defaultTime,
         startTime: optVal.timepicker.startTime,
         dynamic: false,
         dropdown: true,
         scrollbar: false,
      });
   });

   // end styler
}); // end ready

function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(";").shift();
}

function checkCookies() {
   let cookieBtn = document.getElementById("cookie-accept-btn");

   if (getCookie("cookie-accept") == "true") {
      $("#cookieNotification").hide();
      return;
   }

   if (getCookie("cookie-accept") == undefined) {
      cookieBtn.addEventListener("click", function () {
         $("#cookieNotification").hide();
         const date = new Date();
         date.setFullYear(date.getFullYear() + 1);
         document.cookie = `cookie-accept=true;Expires=${date}`;
      });
   }

}

$(window).on("load", function (e) {
   if (!$("html").hasClass("touch")) {
      $(".num-section").parallax("50%", -0.07);
   }

   $("header").load("/inc/header.html", function (response, status, xhr) {})
   $("#mobmenu-paste").load("/inc/mobmenu.html", function (response, status, xhr) {})

   $("footer").load("/inc/footer.html", function (response, status, xhr) {
      const date = new Date();
      document.getElementById(
         "footerCopyright"
      ).innerText = `© 2000 - ${date.getFullYear()} Стоматология Дентал Медикал Центр`;
      checkCookies();
   })
});
