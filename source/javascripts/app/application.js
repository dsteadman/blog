(function($, undefined) {
  'use strict';

  var app = {},
    $el;

  function init() {
    $('a[href=#]').attr('href', 'javascript:;'); // jshint ignore:line
    $("a[href^=http]").click(open);


    if (!Modernizr.input.placeholder) {
      placeholder();
    }
    /*
    yepnope([{
      test:Modernizr.csstransitions,
      nope:'/javascripts/app/css3.js'
    }]);
    */
  }

  function open(e) {
    e.preventDefault();
    var href = this.getAttribute("href"); // jshint ignore:line
    if (window.location.host !== href.split('/')[2]) {
      window.open(href);
    } else {
      window.location = href;
    }
  }

  function placeholder() {
    var attr = 'placeholder';
    $('input[' + attr + '!=""]').each(function(idx, el){
      $el = $(el);
      var d = $el.attr(attr);
      if (d === undefined || $el.attr('type') === 'password') { return; }
      $el
        .focus(function onFocus() {
          $(this).removeClass(attr);
          if (this.value === d) { this.value = ''; }
        })
        .blur(function onBlur() {
          if ($.trim(this.value) === '') {
            $(this).addClass(attr);
            this.value = d;
          }
        }).blur();
    });
  }
  $(init);
} (jQuery));

