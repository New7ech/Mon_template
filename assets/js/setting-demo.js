"use strict";

// Setting Color

$(window).resize(function () {
  $(window).width();
});

getCheckmark();

$(".changeBodyBackgroundFullColor").on("click", function () {
  if ($(this).attr("data-color") == "default") {
    $("body").removeAttr("data-background-full");
  } else {
    $("body").attr("data-background-full", $(this).attr("data-color"));
  }

  $(this).parent().find(".changeBodyBackgroundFullColor").removeClass("selected");
  $(this).addClass("selected");
  localStorage.setItem('bodyBackgroundFullColor', $(this).attr("data-color"));
  layoutsColors();
  getCheckmark();
});

$(".changeLogoHeaderColor").on("click", function () {
  var color = $(this).attr("data-color");
  if (color == "default") {
    $(".logo-header").removeAttr("data-background-color");
  } else {
    $(".logo-header").attr("data-background-color", color);
  }

  localStorage.setItem('logoHeaderColor', color);
  $(this).parent().find(".changeLogoHeaderColor").removeClass("selected");
  $(this).addClass("selected");
  customCheckColor();
  layoutsColors();
  getCheckmark();
});

$(".changeTopBarColor").on("click", function () {
  var color = $(this).attr("data-color");
  if (color == "default") {
    $(".main-header .navbar-header").removeAttr("data-background-color");
  } else {
    $(".main-header .navbar-header").attr("data-background-color", color);
  }
  localStorage.setItem('topBarColor', color);
  $(this).parent().find(".changeTopBarColor").removeClass("selected");
  $(this).addClass("selected");
  layoutsColors();
  getCheckmark();
});

$(".changeSideBarColor").on("click", function () {
  var color = $(this).attr("data-color");
  if (color == "default") {
    $(".sidebar").removeAttr("data-background-color");
  } else {
    $(".sidebar").attr("data-background-color", color);
  }
  localStorage.setItem('sideBarColor', color);
  $(this).parent().find(".changeSideBarColor").removeClass("selected");
  $(this).addClass("selected");
  layoutsColors();
  getCheckmark();
});

$(".changeBackgroundColor").on("click", function () {
  var color = $(this).attr("data-color");
  $("body").removeAttr("data-background-color");
  $("body").attr("data-background-color", color);
  localStorage.setItem('bodyBackgroundColor', color);
  $(this).parent().find(".changeBackgroundColor").removeClass("selected");
  $(this).addClass("selected");
  getCheckmark();
});

// Dark Mode Toggle
$(".changeDarkMode").on("click", function () {
  var isDarkMode = $(this).attr("data-dark-mode") === 'true';
  if (isDarkMode) {
    $("body").addClass("dark-mode");
    localStorage.setItem('darkMode', 'true');
  } else {
    $("body").removeClass("dark-mode");
    localStorage.setItem('darkMode', 'false');
  }
  $(this).parent().find(".changeDarkMode").removeClass("selected");
  $(this).addClass("selected");
  // Potentially call functions that might need to re-evaluate styles after dark mode change
  customCheckColor(); 
  layoutsColors(); 
  getCheckmark();
});

function customCheckColor() {
  var logoHeader = $(".logo-header").attr("data-background-color");
  if (logoHeader !== "white") {
    $(".logo-header .navbar-brand").attr("src", "assets/img/kaiadmin/logo_light.svg");
  } else {
    $(".logo-header .navbar-brand").attr("src", "assets/img/kaiadmin/logo_dark.svg");
  }
}

var toggle_customSidebar = false,
  custom_open = 0;

if (!toggle_customSidebar) {
  var toggle = $(".custom-template .custom-toggle");

  toggle.on("click", function () {
    if (custom_open == 1) {
      $(".custom-template").removeClass("open");
      toggle.removeClass("toggled");
      custom_open = 0;
    } else {
      $(".custom-template").addClass("open");
      toggle.addClass("toggled");
      custom_open = 1;
    }
  });
  toggle_customSidebar = true;
}

function getCheckmark() {
  var checkmark = `<i class="gg-check"></i>`;
  $(".btnSwitch").find("button").empty();
  $(".btnSwitch").find("button.selected").append(checkmark);
}

// Apply settings from localStorage on page load
$(document).ready(function() {
  function applyStoredSettings() {
    var bodyBackgroundFullColor = localStorage.getItem('bodyBackgroundFullColor');
    if (bodyBackgroundFullColor) {
      if (bodyBackgroundFullColor == "default") {
        $("body").removeAttr("data-background-full");
      } else {
        $("body").attr("data-background-full", bodyBackgroundFullColor);
      }
      $(".changeBodyBackgroundFullColor").removeClass("selected");
      $('.changeBodyBackgroundFullColor[data-color="' + bodyBackgroundFullColor + '"]').addClass("selected");
    }

    var logoHeaderColor = localStorage.getItem('logoHeaderColor');
    if (logoHeaderColor) {
      if (logoHeaderColor == "default") {
        $(".logo-header").removeAttr("data-background-color");
      } else {
        $(".logo-header").attr("data-background-color", logoHeaderColor);
      }
      $(".changeLogoHeaderColor").removeClass("selected");
      $('.changeLogoHeaderColor[data-color="' + logoHeaderColor + '"]').addClass("selected");
      customCheckColor(); // Ensure logo image updates
    }

    var topBarColor = localStorage.getItem('topBarColor');
    if (topBarColor) {
      if (topBarColor == "default") {
        $(".main-header .navbar-header").removeAttr("data-background-color");
      } else {
        $(".main-header .navbar-header").attr("data-background-color", topBarColor);
      }
      $(".changeTopBarColor").removeClass("selected");
      $('.changeTopBarColor[data-color="' + topBarColor + '"]').addClass("selected");
    }

    var sideBarColor = localStorage.getItem('sideBarColor');
    if (sideBarColor) {
      if (sideBarColor == "default") {
        $(".sidebar").removeAttr("data-background-color");
      } else {
        $(".sidebar").attr("data-background-color", sideBarColor);
      }
      $(".changeSideBarColor").removeClass("selected");
      $('.changeSideBarColor[data-color="' + sideBarColor + '"]').addClass("selected");
    }
    
    var bodyBackgroundColor = localStorage.getItem('bodyBackgroundColor');
    if (bodyBackgroundColor) {
      $("body").removeAttr("data-background-color"); // Clear existing first
      $("body").attr("data-background-color", bodyBackgroundColor);
      $(".changeBackgroundColor").removeClass("selected");
      $('.changeBackgroundColor[data-color="' + bodyBackgroundColor + '"]').addClass("selected");
    }

    // Call layoutsColors if any of the relevant settings were restored
    if (bodyBackgroundFullColor || logoHeaderColor || topBarColor || sideBarColor) {
      layoutsColors();
    }
    getCheckmark(); // Update all checkmarks
  }

  applyStoredSettings();

  // Dark Mode Setting
  var darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    $("body").addClass("dark-mode");
    $(".changeDarkMode").removeClass("selected");
    $('.changeDarkMode[data-dark-mode="true"]').addClass("selected");
  } else {
    // Default to light mode if not set or set to false
    $("body").removeClass("dark-mode");
    $(".changeDarkMode").removeClass("selected");
    $('.changeDarkMode[data-dark-mode="false"]').addClass("selected");
  }

  // Ensure these are called after dark mode is potentially applied
  // to allow them to react to the new theme.
  if (logoHeaderColor || topBarColor || sideBarColor || darkMode) { // Added darkMode check
    customCheckColor();
    layoutsColors();
  }
  getCheckmark(); // Update all checkmarks again after dark mode button selection
});
