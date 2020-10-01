 const scrolldown = () => {

  const checked1 = document.getElementById("tab-1");
  const checked2 = document.getElementById("tab-2");
  const checked3 = document.getElementById("tab-3");
  const arrows1 = document.getElementById("arrows1");
  const arrows2 = document.getElementById("arrows2");
  const arrows3 = document.getElementById("arrows3");
  checked1.checked = true;



    // ------------- VARIABLES ------------- //
    var ticking = false;
    var isFirefox = (/Firefox/i.test(navigator.userAgent));
    var isSafari = (/safari/i.test(navigator.userAgent));
    var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
    var isChrome = (/chrome/.test( navigator.userAgent));
    var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
    var slideDurationSetting = 600; //Amount of time for which slide is "locked"
    var currentSlideNumber = 0;
    var totalSlideNumber = $(".background").length;

    // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
    function parallaxScroll(evt) {
      if (isFirefox) {
        //Set delta for Firefox
        var delta = evt.detail * (-120);
      } else if (isIe) {
        //Set delta for IE
        var delta = -evt.deltaY;
      } else if (isSafari) {
        console.log("coucou safari");
        //Set delta for safari
        var delta = evt.detail * (-120);
      } else if (isChrome) {
        //Set delta for chrome
        var delta = evt.detail
      } else {
        //Set delta for all other browsers
        var delta = evt.wheelDelta;
      }

      if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
          //Down scroll
          ticking = true;
          if (currentSlideNumber !== totalSlideNumber - 1) {
            currentSlideNumber++;
            nextItem();
          }
          slideDurationTimeout(slideDurationSetting);
        }
        if (delta >= scrollSensitivitySetting) {
          //Up scroll
          ticking = true;
          if (currentSlideNumber !== 0) {
            currentSlideNumber--;
          }
          previousItem();
          slideDurationTimeout(slideDurationSetting);
        }
      }
    }

    function parallaxScrollBottom(evt) {
      ticking = true;
      if (currentSlideNumber == 0) {
        currentSlideNumber++;
        nextItem();
      }
      if (currentSlideNumber == 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }


    function parallaxScrollTop(evt) {
      ticking = true;
      if (currentSlideNumber == 2) {
        currentSlideNumber--;
       previousItem();
      }
      if (currentSlideNumber == 1) {
        currentSlideNumber--;
        previousItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }

    function parallaxScrollMidle(evt) {
      ticking = true;
      if (currentSlideNumber == 2) {
        currentSlideNumber--;
       previousItem();
      }
      if (currentSlideNumber == 0) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }

    // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
    function slideDurationTimeout(slideDuration) {
      setTimeout(function() {
        ticking = false;
      }, slideDuration);
    }

    // ------------- ADD EVENT LISTENER ------------- //
    var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
    window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
    var mousewheelEvent2 = isChrome ? "DOMMouseScroll" : "wheel";
    window.addEventListener(mousewheelEvent2, _.throttle(parallaxScroll, 60), false);
    var mousewheelEvent3 = isSafari ? "DOMMouseScroll" : "wheel";
    window.addEventListener(mousewheelEvent3, _.throttle(parallaxScroll, 60), false);

      checked2.addEventListener("click", _.throttle(parallaxScrollMidle, 60), false);
      checked3.addEventListener("click", _.throttle(parallaxScrollBottom, 60), false);
      checked1.addEventListener("click", _.throttle(parallaxScrollTop, 60), false);

      arrows1.addEventListener("click", _.throttle(parallaxScrollMidle, 60), false);
      arrows2.addEventListener("click", _.throttle(parallaxScrollBottom, 60), false);
      arrows3.addEventListener("click", _.throttle(parallaxScrollTop, 60), false);

    function nextItemBottom() {
      var $previousSlide = $(".background").eq(currentSlideNumber - 1);
      $previousSlide.removeClass("up-scroll").addClass("down-scroll");
      var $previousSlide = $(".background").eq(currentSlideNumber - 2);
      $previousSlide.removeClass("up-scroll").addClass("down-scroll");
    }
    function previousItemTop() {
      var $currentSlide = $(".background").eq(currentSlideNumber);
      $currentSlide.removeClass("down-scroll").addClass("up-scroll");
      var $currentSlide = $(".background").eq(currentSlideNumber + 1);
      $currentSlide.removeClass("down-scroll").addClass("up-scroll");
    }

// ------------- SLIDE MOTION ------------- //
    function nextItem() {
      var $previousSlide = $(".background").eq(currentSlideNumber - 1);
      $previousSlide.removeClass("up-scroll").addClass("down-scroll");

      // ----------- Transition menu au scroll down---------------------------------
      const backgrounds = document.querySelectorAll("section");
        if ((backgrounds[0].classList.contains('down-scroll')) ){
          checked1.checked = false;
          checked2.checked = true;
        }
        if ((backgrounds[1].classList.contains('down-scroll')) ){
          checked2.checked = false;
          checked3.checked = true;
        }
    }
      // -----------------------------------------------------------------------
    function previousItem() {
      var $currentSlide = $(".background").eq(currentSlideNumber);
      $currentSlide.removeClass("down-scroll").addClass("up-scroll");

      // ----------- Transition menu au scroll up---------------------------------

      const backgrounds = document.querySelectorAll("section");
      checked3.checked = false
      if ((backgrounds[1].classList.contains('up-scroll')) ){
        checked2.checked = false;
        checked2.checked = true;
      }
      if ((backgrounds[0].classList.contains('up-scroll')) ){
        checked2.checked = false;
        checked1.checked = true;
      }
    }
// -----------------------------------------------------------------------
// ----------- Transition menu au click---------------------------------

}

export {scrolldown}
