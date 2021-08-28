var photoCounter = 1;
var photoElem = $('#photo');
var scoreElem = $('#scoreSection');
var score = 0;
var nations = ["china", "japan", "korea", "thai"];
var shownPhotos = [];

$(document).ready(function () {
    refreshScore(0);
});

$("#photo").draggable({
    opacity: 0.7,
    // helper: "clone"
    start: function () {
        photoElem.stop(true);
    },
    stop: function () {

    }
});

$(".dropable-box").droppable({
    drop: function (event, ui) {
        $(this).css('background', 'white');
        var targetBoxId = $(this).attr('id');
        var photoPath = photoElem.attr('src');

        calculateScore(targetBoxId, photoPath);

        var target = event.target || event.srcElement;
        var TargetBoxId = target.id;
        var targetBoxElem = $('#' + TargetBoxId)

        photoElem.stop(true);
        photoElem.animate({
            top: targetBoxElem.offset().top + targetBoxElem.innerHeight() / 2,
            left: targetBoxElem.offset().left + targetBoxElem.innerWidth() / 2,
            width: 20,
        }, 500, function () {
            nextPhoto();
        });
    },
    over: function () {
        $(this).css('background', '#D0E1F5');
    },
    out: function () {
        $(this).css('background', 'white');
    }
});

function nextPhoto() {
    photoElem.stop(true);
    photoCounter++;

    if (photoCounter <= 10) {
        var photoPath = getNextPhotoPath();

        photoElem.attr("src", photoPath);
        photoElem.css({
            top: '10px',
            left: '40%',
            width: '19%',
        });

        movePhoto();
    } else {
        stopGame();
    }
};

function movePhoto() {
    var scoreOffset = scoreElem.offset();

    photoElem.animate({
        top: scoreOffset.top - photoElem.outerHeight() - 10,
    }, 3000, function () {
        refreshScore(-5);

        if (photoCounter > 10) {
            stopGame();
        } else {
            nextPhoto();
        }
    });
};

$("#tryAgain").click(function () {
    $('.overlay').hide();
    resetGame();
    nextPhoto();
});

function resetGame() {
    score = 0;
    refreshScore(0);
};

function stopGame() {
    $('.overlay').show();
    photoCounter = 1;
    photoElem.attr("src", 'img/default.jpg');
    photoElem.css({
        top: '10px'
    });
    shownPhotos = [];
};

function calculateScore(targetBoxId, photoPath) {
    if (targetBoxId == 'chineseBox') {
        if (photoPath.indexOf('china') != -1) {
            refreshScore(20);
        } else {
            refreshScore(-5);
        }
    } else if (targetBoxId == 'japaneseBox') {
        if (photoPath.indexOf('japan') != -1) {
            refreshScore(20);
        } else {
            refreshScore(-5);
        }
    } else if (targetBoxId == 'koreanBox') {
        if (photoPath.indexOf('korea') != -1) {
            refreshScore(20);
        } else {
            refreshScore(-5);
        }
    } else if (targetBoxId == 'thaiBox') {
        if (photoPath.indexOf('thai') != -1) {
            refreshScore(20);
        } else {
            refreshScore(-5);
        }
    } else {
        refreshScore(-5);
    }
};

function refreshScore(scoreToAdd) {
    score += scoreToAdd;
    $('.scoreSpan').text(score);
};