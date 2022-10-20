$(".video").on("click touchstart", function(event){
    event.preventDefault();
    $(".video__button").hide(), $(".video__media").hide();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return
    } else {
        let url = $("#video-iframe").prop("src");
        $("#video-iframe").attr("src", url + '&autoplay=1');
    }
});