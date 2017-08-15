var curTurn = 'X';
var boxes = ["0","0","0","0","0","0","0","0","0"];
var turnCount = 0;
var over = false;

function place(){
    if(!over) {
        if (isValid(event.target)) {
            turnCount += 1;
            event.target.value = curTurn;
            logBox(event.target.id,curTurn);
            checkGameState();
            if (!over) {
                advanceTurn();
            }
        }
    }
}

function logBox(bId,turn) {
    switch(bId) {
        case "tl":
            boxes[0] = turn;
            break;
        case "tm":
            boxes[1] = turn;
            break;
        case "tr":
            boxes[2] = turn;
            break;
        case "ml":
            boxes[3] = turn;
            break;
        case "mm":
            boxes[4] = turn;
            break;
        case "mr":
            boxes[5] = turn;
            break;
        case "bl":
            boxes[6] = turn;
            break;
        case "bm":
            boxes[7] = turn;
            break;
        case "br":
            boxes[8] = turn;
            break;
    }
}

function checkGameState() {
    if (_checkHorizantal(boxes) || _checkVetical(boxes) || _checkDiaganol(boxes)) {
        document.getElementById("turn").innerHTML = curTurn + " wins!";
        over = true;
    } else if (turnCount >= 9) {
        document.getElementById("turn").innerHTML = "It is a tie!";
        over = true;
    }

}

function _checkHorizantal() {
    return (boxes[0] == boxes[1] && boxes[1] == boxes[2] && boxes[0] != "0") || (boxes[3] == boxes[4] && boxes[4] == boxes[5] && boxes[3] != "0") || (boxes[6] == boxes[7] && boxes[7] == boxes[8] && boxes[6] != "0");
}

function _checkVetical() {
    return (boxes[0] == boxes[3] && boxes[6] == boxes[3] && boxes[0] != "0") || (boxes[1] == boxes[4] && boxes[4] == boxes[7] && boxes[1] != "0") || (boxes[2] == boxes[5] && boxes[5] == boxes[8] && boxes[2] != "0");
}

function _checkDiaganol() {
    return (boxes[0] == boxes[4] && boxes[4] == boxes[8] && boxes[0] != "0") || (boxes[2] == boxes[4] && boxes[4] == boxes[6] && boxes[4] != "0");
}

function isValid(button) {
    if (button.value == ""){
        return true;
    } else {
        return false;
    }
}

function advanceTurn() {
    if (curTurn == "X"){
        curTurn = "O";
    } else if (curTurn == "O") {
        curTurn = "X";
    }
    document.getElementById("turn").innerHTML = "Current Turn: " + curTurn;
}

function resetGame() {
    curTurn = 'X';
    boxes = ["0","0","0","0","0","0","0","0","0"];
    turnCount = 0;
    over = false;
    document.getElementById("turn").innerHTML = "Current Turn: " + curTurn;
    $(".button_field").each(function() {
        $(this).attr("value","");
    });
}