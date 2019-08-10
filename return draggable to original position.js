//Draggable items don't keep track of their original position that I know of; 
//only during drag and to be snapped back. 
//You can just do this on your own, though:

$("#draggable").data({
    'originalLeft': $("#draggable").css('left'),
    'origionalTop': $("#draggable").css('top')
});

$(".reset").click(function() {
    $("#draggable").css({
        'left': $("#draggable").data('originalLeft'),
        'top': $("#draggable").data('origionalTop')
    });
});
