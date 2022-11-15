// import "%components%/scrollfix/scrollfix.js";
// import "%components%/tab/tab.js";
import "%components%/tab/tab.js";
document.addEventListener('DOMContentLoaded', function(){

    // $(document).on('click', '.dm-btn.dm-btn--benefits4', function(e){
    //     e.preventDefault();
    //     var $this = $(this);
    //     var $href = $this.attr('href');
    //     var $target = $( '#hotels-set' );
    //     var $trigger;
    //     if( $href == "#turkie" ){
    //         $trigger = 'Турция';
    //     }
    //     else if( $href == "#uae" ){
    //         $trigger = 'ОАЭ';
    //     }
    //     else if( $href == "#egypt" ){
    //         $trigger = 'Египет';
    //     }
    //     else if( $href == "#maldives" ){
    //         $trigger = 'Мальдивы';
    //     }
    //     else if( $href == "#shrilanka" ){
    //         $trigger = 'Шри-Ланка';
    //     }
    //     else if( $href == "#russia" ){
    //         $trigger = 'Россия';
    //     }
    //     if( $target.length ){
    //         $('html, body').stop().animate( {
    //             'scrollTop': $target.offset().top - 120
    //             }, 900, 'swing', function () {
    //             $( '[data-group="' +  $trigger + '"]' ).trigger('click');
    //         });
    //     }
    // });

    $('.dm-tab__title').on('click', function(){
        var $this = $(this);
        var $name = $this.data('show');
        $('[data-content-for="' + $name +  '"] [data-group="*" ]').trigger('click');
    });

});