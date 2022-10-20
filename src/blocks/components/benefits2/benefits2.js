document.addEventListener('DOMContentLoaded', function(){

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('.');
    }
    var $link = $('a.dm-benefits2__btn');

    var days = parseInt($link.attr('data-days')) || 1;

    if( $link.length ){
        var $date = new Date();
        $date.setDate($date.getDate() + days);
        console.log($date)
        var $href = $link.attr('href');
        $date = formatDate($date);
        $href = $href.replaceAll('000000' , $date);

        $link.attr('href', $href);


    }
});