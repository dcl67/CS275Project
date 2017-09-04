var percentages=$('.percentages');
$(function() {

    var player='X';
    var table = $('table');
    var messages = $('.messages');
    var turn = $('.turn');
    //var percentages=$('.percentages');
    displayNextPlayer(turn, player);

    $('td').click(function() {
        td = $(this);
        var state = getState(td);
        if(!state) {
            var pattern = definePatternForCurrentPlayer(player);
            changeState(td, pattern);
            if(checkIfPlayerWon(table, pattern)) {
                addScore(player);
                messages.html('Player '+player+' has won.');
                turn.html('');
            } else {
                player = setNextPlayer(player);
                displayNextPlayer(turn, player);
            }
        } else {
            messages.html('This box is already checked.');
        }
    });

    $('.reset').click(function() {
        player='X';
        messages.html('');
        reset(table);
        displayNextPlayer(turn, player);
    });

    $('.record').click(function(){
        getPercentage();
    });
});

function getState(td) {
    if(td.hasClass('cross') || td.hasClass('circle')) {
        return 1;
    } else {
        return 0;
    }
}

function changeState(td, pattern) {
    return td.addClass(pattern);
}

function definePatternForCurrentPlayer(player) {
    if(player == 'X') {
        return 'cross';
    } else {
        return 'circle';
    }
}

function setNextPlayer(player) {
    if(player == 'X') {
        return player = 'O';
    } else {
        return player='X';
    }
}

function displayNextPlayer(turn, player) {
    turn.html('Player turn : '+player);
}

function checkIfPlayerWon(table, pattern) {
    var won = 0;
    if(table.find('.item1').hasClass(pattern) && table.find('.item2').hasClass(pattern) && table.find('.item3').hasClass(pattern)) {
        won = 1;
    } else if (table.find('.item1').hasClass(pattern) && table.find('.item4').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
        won = 1;
    } else if (table.find('.item1').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
        won = 1;
    } else if (table.find('.item4').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item6').hasClass(pattern)) {
        won = 1;
    } else if (table.find('.item7').hasClass(pattern) && table.find('.item8').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
        won = 1;
    } else if (table.find('.item2').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item8').hasClass(pattern)) {
        won = 1;
    } else if (table.find('.item3').hasClass(pattern) && table.find('.item6').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
        won = 1;
    } else if (table.find('.item3').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
        won = 1;
    }
    return won;
}

function reset(table) {
    table.find('td').each(function() {
        $(this).removeClass('circle').removeClass('cross');
    });
}

function getPercentage(){
    var URL='http://localhost:8080/getpercentage';
    $.ajax({
        type:'GET',
        url: URL,
        //dataType: JSON,
        success: function(msg){
            //console.log(msg);
            //percentages.html(msg);
            document.getElementById("percentage").innerHTML=msg;
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert(thrownError);
            console.log('client: could not get logs');
        }
    });
}

function addScore(player){
    var URL = 'http://localhost:8080/addscore';
    console.log("Winner: "+player);
    $.ajax({
        type: 'POST',
        url: URL,
        data: {str:player},
        success: function(msg){
            console.log(msg); //log success message
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert('client.js: Could not add score!');
        }
    });
}
