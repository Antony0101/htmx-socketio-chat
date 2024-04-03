let layout = {};


function layoutFunction(){
    // global vars and constants
    let currentImage = 0
    const imageList = ["kenny-cinders.jpg","malena-gonzalez.jpg","mars-plex.jpg"]
    let timeRef = null;

    // html elements
    const layoutImage = document.getElementById('layout-image');
    const dotContainer = document.getElementById('dot-container');
    const dotUnselected = document.createElement('div');
    const dotSelected = document.createElement('div');

    // add styles to dots
    dotUnselected.classList.add("w-2","h-2","rounded-full","bg-white/50");
    dotSelected.classList.add("w-5","h-2","rounded-full","bg-white");

    // functions
    const changeImage = (imageIndex) => {
        layoutImage.src = `/images/${imageList[imageIndex]}`;
        const elementArray = imageList.map((image, index) => {
            if(index===imageIndex){
                return dotSelected.cloneNode(true);
            }
            return dotUnselected.cloneNode(true);
        });
        dotContainer.replaceChildren(...elementArray);
    }

    const restartInterval = () => {
        if(timeRef) clearInterval(timeRef);
        timeRef = setInterval(() => {
            currentImage = (currentImage + 1) % imageList.length;
            changeImage(currentImage);
        }, 3000);
    }

    const onClickPrev = () => {
        currentImage = currentImage - 1
        if(currentImage<0){
            currentImage = imageList.length - 1;
        }
        changeImage(currentImage);
        restartInterval();
    };

    const onClickNext = () => {
        currentImage = (currentImage + 1) % imageList.length;
        changeImage(currentImage);
        restartInterval();
    }

    // main code

    console.log('layout.js loaded');
    changeImage(0);
    restartInterval();

    return{
        onClickPrev,
        onClickNext,
    }
}

document.addEventListener('DOMContentLoaded', function() {
    layout = layoutFunction();
});