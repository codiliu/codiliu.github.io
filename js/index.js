$('.navbar .nav > li > a').click(function() {
    console.log("click");
    var elementClicked = $(this).attr("href");
    var destination = $(elementClicked).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 50}, 1500 );
    return false;
});