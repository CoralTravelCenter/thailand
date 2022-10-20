(function () {
    (function ($, window) {
        var Plugin, defaults, locales, pluginName;
        pluginName = 'timer';
        locales = {
            ru: {
                days: ['день', 'дня', 'дней'],
                hours: ['час', 'часа', 'часов'],
                minuts: ['минута', 'минуты', 'минут'],
                seconds: ['секунда', 'секунды', 'секунд']
            },
            eng: {
                days: ['day', 'days', 'days'],
                hours: ['hour', 'hours', 'hours'],
                minuts: ['minut', 'minuts', 'minuts'],
                seconds: ['second', 'seconds', 'seconds']
            }
        };
        defaults = {
            lang: 'ru',
            updateTime: 1000,
            onEnd: $.noop
        };
        Plugin = (function () {
            function Plugin(el, options) {                
                this.el = el;
                this.$el = $(this.el);
                $.extend(this, defaults, this.$el.data(), options);
                if (!this.locale) {
                    this.locale = locales[this.lang];
                }
                this.startDate = new Date();
                this.template = this.$el.html();
                if (Object.prototype.toString.call(this.endDate) !== '[object Date]') {
                    this.endDate = this.parseDate(this.endDate, this.dateFormat);
                }
                this.start();                
            }

            Plugin.prototype.parseDate = function (str, format) {
                var data, now;
                str = str + '';
                str = str.split(/[^\d]/g);                
                format = format + '';
                format = format.split(/[^%yMdhms]/g);
                now = new Date();
                data = {
                    y: now.getFullYear(),
                    M: now.getMonth() + 1,
                    d: now.getDate(),
                    h: 0,
                    m: 0,
                    s: 0
                };
                
                format.forEach(function (val, index) {
                    var key;
                    key = val.slice(1);
                    return data[key] = str[index];
                });
                return new Date(data.y, data.M - 1, data.d, data.h, data.m, data.s);
            };

            Plugin.prototype.start = function () {
                this.interval = setInterval((function (_this) {
                    return function () {
                        return _this.update();
                    };
                })(this), this.updateTime);
                return this.update();
            };

            Plugin.prototype.end = function () {
                clearInterval(this.interval);
                this.$el.trigger("" + pluginName + ":stop");
                return this.onEnd();
            };

            Plugin.prototype.update = function () {
                var days, devider, hours, minuts, now, range, seconds;
                now = new Date();
                range = this.endDate - now;
                if (range <= 0) {
                    this.end();
                    return;
                }
                devider = 1000 * 60 * 60 * 24;
                days = Math.floor(range / devider);
                range = range - days * devider;
                devider = 1000 * 60 * 60;
                hours = Math.floor(range / devider);
                range = range - hours * devider;
                devider = 1000 * 60;
                minuts = Math.floor(range / devider);
                range = range - minuts * devider;
                devider = 1000;
                seconds = Math.floor(range / devider);
                return this.render({
                    days: days,
                    hours: hours,
                    minuts: minuts,
                    seconds: seconds
                }),this.circle(seconds,60,'seconds'),this.circle(minuts,60,'minuts'),this.circle(hours,24,'hours'),this.circle(days,21,'days');
            };

            Plugin.prototype.circle = function (key, value, type) {

                var progressBarSecond = this.$el.prev().find('.timer__circle-second .timer__circle-path'),
                    progressBarMinut = this.$el.prev().find('.timer__circle-minut .timer__circle-path'),
                    progressBarHour = this.$el.prev().find('.timer__circle-hour .timer__circle-path'),
                    progressBarDay = this.$el.prev().find('.timer__circle-day .timer__circle-path'),
                    pathAmount = 36,
                    progressBar,
                    kcoefficient;

                kcoefficient = Math.ceil( pathAmount * key / value );

                if( type == 'seconds'){
                    progressBar = progressBarSecond;                    
                }
                else if(type == 'minuts'){
                    progressBar = progressBarMinut;
                }
                else if(type == 'hours'){
                    progressBar = progressBarHour;
                }
                else {
                    progressBar = progressBarDay;
                };
                
                function update_circle(){                    
                    progressBar.addClass('timer__circle-path-active');
                    progressBar.each(function(){
                        var $bar = $(this),
                            barIndex = $bar.index();
                        if( barIndex < progressBar.length && barIndex >= kcoefficient ){
                            $bar.removeClass('timer__circle-path-active');
                        }
                    });                    
                }
                update_circle();

            };

            Plugin.prototype.render = function (data) {                

                var html;
                html = this.template;

                $.each(this.locale, (function (_this) {
                    return function (key, values) {                        
                        return html = html.replace(new RegExp('%' + key + '%', 'g'),_this.leadingZero(data[key])).replace(new RegExp('%' + key.toUpperCase() + '%', 'g'),_this.spellCount(data[key], values));
                    };
                })(this));
                return this.$el.html(html);
            };

            Plugin.prototype.spellCount = function (num, variants) {
                if ($.isArray(variants)) {
                    if (num % 10 === 1 && num % 100 !== 11) {
                        return variants[0];
                    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
                        return variants[1];
                    } else {
                        return variants[2];
                    }
                } else {
                    return variants;
                }
            };

            Plugin.prototype.leadingZero = function (num) {
                var result = '';

                if (num < 10) {
                    num = '0' + num;
                };
                num = num + '';

                for (var i = 0; i < num.length; i++) {
                    result += '<span>' + num[i] + '</span>';
                };

                return result;
            };

            return Plugin;

        })();
        return $.fn[pluginName] = function (options) {
            return this.each(function () {
                if (!$.data(this, pluginName)) {                    
                    return $.data(this, pluginName, new Plugin(this, options));
                }
            });
        };
    })(jQuery, window);

}).call(this);

var $timer = $('.timer__counter'),
    cur_date = new Date().getTime() / 1000,
    end_date = new Date($timer.data('end-date'));

function flTimerEnd(){    
    $timer.find('div').each(function(){
        var $this = $(this),
            $text = $this.text();
        if( $text == '%days%' || $text == '%hours%' || $text == '%minuts%' || $text == '%seconds%' ){
            $this.text('00');
        }
        else if( $text == '%DAYS%' ){
            $this.text('дней');
        }
        else if( $text == '%HOURS%' ){
            $this.text('часов');
        }
        else if( $text == '%MINUTS%' ){
            $this.text('минут');
        }
        else if( $text == '%SECONDS%' ){
            $this.text('секунд');
        }
    });
}
function flTimer() {    
    $timer.timer({
            endDate: end_date,
            locale: {
            days: ['день', 'дня', 'дней'],
            hours: ['час', 'часа', 'часов'],
            minuts: ['минута', 'минуты', 'минут'],
            seconds: ['секунда', 'секунды', 'секунд']
        },
        onEnd: function (param) {
            flTimerEnd();
        }
    });
	$timer.removeAttr('data-end-date');
}
document.addEventListener('DOMContentLoaded', function(){
    if( cur_date >= end_date/1000 ){
        flTimerEnd();
    }
    else{
        flTimer();
    }
});