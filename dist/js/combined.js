$(document).ready(function(){var e=$("#header"),n=!1,t=$(".header__menu"),o=$(".nav");$(window).on("scroll",function(){$(this).scrollTop()>20?e.addClass("header-fixed"):e.removeClass("header-fixed")}),t.on("click",function(e){e.preventDefault(),n?(o.slideUp(),t.text("menu"),n=!1):(o.slideDown(),t.text("Hide menu"),$(".nav a").on("click",function(e){e.preventDefault(),o.slideUp(),t.text("menu"),n=!1}),$(document).bind("mouseup",function(e){e.stopPropagation,o.is(e.target)||0!==o.has(e.target).length||t.is(e.target)||(o.slideUp(),t.text("menu"),n=!1,$(document).unbind("mouseup"))}),n=!0)}),$(window).resize(function(){var e=$(window).width();e>568&&(o.removeAttr("style"),t.text("menu"),n=!1)}),$(".nav li a").on("click",function(e){e.preventDefault();var n=this.hash;$("html, body").animate({scrollTop:$(n).offset().top},900,function(){window.location.hash=n})})});