// import "%components%/scrollfix/scrollfix.js";
// import "%components%/preloader/preloader.js";
// import "%components%/animator/animator.js";


document.addEventListener('DOMContentLoaded', function(){

    $(document).on('click', '.dm-btn--js', function(e){
        e.preventDefault();
        var $this = $(this);
        var $href = $this.attr('href');
        var $target = $( '#hotels-set' );
        var $trigger;
        if( $href == "#Rayong" ){
            $trigger = 'Районг (Rayong)';
        }
        else if( $href == "#Chang" ){
            $trigger = 'о. Ко Чанг (Koh Chang)';
        }
        else if( $href == "#pattayya" ){
            $trigger = '*';
        }
        if( $target.length ){
            $('html, body').stop().animate( {
                'scrollTop': $target.offset().top - 120
                }, 900, 'swing', function () {
                $( '[data-group="' +  $trigger + '"]' ).trigger('click');
            });
        }
    });

});