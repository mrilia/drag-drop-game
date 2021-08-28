function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getNewPhotoPath() {
    var randomNationIndex = getRandomInteger(0, 3);
    var randomFileIndex = getRandomInteger(1, 10);
    var photoPath = 'img/'.concat(nations[randomNationIndex], '/', randomFileIndex, '.jpg');

    return photoPath;
};

function getNextPhotoPath() {
    var newPhotoPath = getNewPhotoPath();

    while (shownPhotos.indexOf(newPhotoPath) > -1) {
        newPhotoPath = getNewPhotoPath();
    }

    shownPhotos.push(newPhotoPath);
    return newPhotoPath;
};