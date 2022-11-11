document.addEventListener('DOMContentLoaded', function(){	

    window.preload = function(what, fn) {
        var lib;
        if (!Array.isArray(what)) {
            what = [what];
        }
        return $.when.apply($, (function() {
            var i, len1, results;
            results = [];
            for (i = 0, len1 = what.length; i < len1; i++) {
                lib = what[i];
                results.push($.ajax(lib, {
                    dataType: 'script',
                    cache: true
                }));
            }
            return results;
        })()).done(function() {
            return typeof fn === "function" ? fn() : void 0;
        });
    };
    
    (function() {
        var $scrollToReady, showCardWithSelector;
        $scrollToReady = $.Deferred();
        preload('https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.3/jquery.scrollTo.min.js', function() {
            $scrollToReady.resolve();
            return $(document).on('click', '[data-scrollto]', function() {
                return $(window).scrollTo($(this).data('scrollto'), 500, {
                    margin: true,
                    offset: -50
                });
            });
        });
        showCardWithSelector = function($sel, clicked) {
            var content_marker, idx;
            $sel.addClass('selected').siblings('.selected').removeClass('selected');
            content_marker = $sel.attr('data-show');
            idx = $sel.index();
            return $("[data-content-for='" + content_marker + "']").slideDown().siblings().slideUp();
        };
        showCardWithSelector($('[data-show].selected'));
        return $('[data-show]').on('click', function() {
            return showCardWithSelector($(this), 'clicked');
        });
    })();
    
    });