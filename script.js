let isDragStart = false, isDragging=false, prevPageX, prevScrollLeft, positionDiff;
let canclick = true;
function initScriptValues(){
    const carousel = document.querySelector(".carousel");
    const firstCard = document.querySelectorAll(".CardsCard")[0];
    const arrowIcons = document.querySelectorAll(".wrapper i");

    const showHideIcons = () =>{
        //showing and hiding prev and next icon according to width and scroll values
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //getting max scrollable width
        arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    }
    
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", ()=>{
            let firstImgWidth = firstCard.clientWidth + 14; //get first img width and add margin value
            console.log("CLICKING");
            carousel.scrollLeft += icon.id =="left" ? -firstImgWidth : firstImgWidth;
            setTimeout(()=>showHideIcons(),60) // calling showHideIcons after 60 sec
        })
    })
    
    const autoSlide = () =>{
        if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;
        positionDiff = Math.abs(positionDiff); //convert to positive value
        let firstImgWidth = firstCard.clientWidth + 14;
        //getting value to add or reduce from the carousel to go to the middle
        let valDifference = firstImgWidth - positionDiff;
    
        if(carousel.scrollLeft > prevScrollLeft){
            //scrolling t the right
            return carousel.scrollLeft += positionDiff > firstImgWidth/3 ? valDifference : -positionDiff;
        }else{
            //scrolling to the left
            return carousel.scrollLeft -= positionDiff > firstImgWidth/3 ? valDifference : -positionDiff;
        }
    }
    
    const dragStart = (e) =>{
        //updating global variables value on mouse down event;
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    }
    
    
    const dragging = (e) =>{
        //scrolling images/carousel to left according to mouse pointer
        if(!isDragStart) return;
        e.preventDefault();
        isDragging=true

        canclick = false;

        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    }
    
    const dragStop = () =>{
        isDragStart = false;
        carousel.classList.remove("dragging");
        setTimeout(()=>canclick=true,60);
        if(!isDragging) return;
        isDragging = false;
        autoSlide();
    }
    
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);
    
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);
    
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);
}

function addProjectLinks(){
    var bike = document.getElementById("biking-improver");
    var myGame = document.getElementById("my-videogame");
    var  butler = document.getElementById("butler");
    var meteo = document.getElementById("meteo");

    addListenerToCard(bike,"https://github.com/DigitalCommonsLab/bikingimprover");
    addListenerToCard(myGame, "https://francescow.itch.io/my-videogame");
    addListenerToCard(butler,"https://francescow.itch.io/its-always-the-butler");
    addListenerToCard(meteo, "https://meteo-website-group19.onrender.com/");
}

function addContactLinks(){
    var linkedin = document.getElementsByClassName("linkedinButton");
    var instagram = document.getElementsByClassName("instagramButton");
    var github = document.getElementsByClassName("githubButton");

    canclick = true;

    for(var i=0; i<linkedin.length;i++){
        addListenerToCard(linkedin[i],"https://www.linkedin.com/in/francesco-weikmann-8494a8252/");
        addListenerToCard(instagram[i], "https://www.instagram.com/francesco_weikmann/");
        addListenerToCard(github[i],"https://github.com/FrancescoWeik");
        linkedin[i].style.cursor = "pointer";
        instagram[i].style.cursor = "pointer";
        github[i].style.cursor = "pointer";

    }
}

function addListenerToCard(element,url){
    element.addEventListener("click", function(event){
        console.log(canclick);
        if(canclick){
            //window.location = url;
            window.open(url, '_blank');
        }else{
            return;
        }
    })
}
