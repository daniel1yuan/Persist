/* -------------------------------------
 * Responsive Circular Progress Bars
 * ------------------------------------- */

/* Based on http://codepen.io/geedmo/pen/InFfd */


$( document ).ready(function() {
    $(".setsize").each(function() {
        $(this).height($(this).width());
    });
});
$(window).on('resize', function(){
    $(".setsize").each(function() {
        $(this).height($(this).width());
    });
});

$(function() {
    $('.row.no-gutters.goals').matchHeight();
});