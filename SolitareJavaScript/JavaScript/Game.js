//import necessary maps and arrays
import { HeartCards, SpadeCards, ClubCards, DiamondCards,Allcard } from "./CardMaps.js";
//create arrays to store cards that are in piles ,stacks and game
var DrawCards=[];

var pile1=[];var pile2=[];
var pile3=[];var pile4=[];

var stack1=[];var stack2=[];
var stack3=[];var stack4=[];
var stack5=[];var stack6=[];var stack7=[];

var CardsInGame=[];

var finishedDrawing=false;

var AllStacks=[stack1,stack2,stack3,stack4,stack5,stack6,stack7];

var cardDisplayCounter=0;
var DrawCounter=24;

var AllStacksImg=[];

var NumofCardClicks=0;

var cardsForDrcawing=24;
//function to draw a random card from AllCards Array
//then access a random card from the keys of associated map
function RandomCard(){
    //chooses random index from array of maps
    while (true){
        const random=Math.floor(Math.random()*Allcard.length);
    //selects random map from the array
        var randomset=Allcard[random];
        var randomsetDup=Allcard[random];
    //converts random set to an array (able to select a random cards)
        randomset=Array.from(randomset.keys());
    //selects random index in map to select random card
        var randomcard=Math.floor(Math.random()*randomset.length);
    //selects random card (f.e 'H2')
        randomcard=randomset[randomcard]
    //select the file path of the image associated to the card selected
        var randomsrc=randomsetDup.get(randomcard);

        if (!CardsInGame.some(card => card[0] === randomcard)) {
            break;
        }
        else{
            continue;
        }

    //adds random card to array of all cards in the game
    }
    

    return [randomcard,randomsrc]
};

function DrawDrawCards(DrawingCards){
    while (DrawCards.length<DrawingCards){
        let card= RandomCard();  
        if (! pile1.includes(card)&& ! pile2.includes(card)
        && ! pile3.includes(card) && ! pile4.includes(card)
    && ! stack1.includes(card) && ! stack2.includes(card)
&& ! stack3.includes(card) && ! stack4.includes(card)
&& ! stack5.includes(card) && ! stack6.includes(card)
&& ! stack7.includes(card) ){
    DrawCards.push(card);
}         
    else{
        continue;
    }
        
    }
}

$(document).ready(function(){

    if (finishedDrawing==false){
        if (stack1.length<1){
            while (stack1.length<1){
                let card = RandomCard();
                CardsInGame.push(card);
                stack1.push(card);
                }
            }
        }
        if (stack2.length<2){
            while (stack2.length<2){
                let card = RandomCard();
                CardsInGame.push(card);
                stack2.push(card);
                
            }
        }
        if (stack3.length<3){
            while (stack3.length<3){
                let card=RandomCard();
                CardsInGame.push(card);
                stack3.push(card);
                
            }
        }
        if (stack4.length<4){
            while (stack4.length<4){
                let card=RandomCard();
                CardsInGame.push(card);
                stack4.push(card);
                
            }
        }
        if (stack5.length<5){
            while (stack5.length<5){
                let card=RandomCard();
                CardsInGame.push(card);
                stack5.push(card);
                
            }
        }
        if (stack6.length<6){
            while (stack6.length<6){
                let card=RandomCard();
                CardsInGame.push(card);
                stack6.push(card);
                
            
        }

        if (stack7.length<7){
            while (stack7.length<7){
                let card = RandomCard();
                    CardsInGame.push(card);
                    stack7.push(card);
                
            }
        }

        finishedDrawing=true;
    }

    //code to display cards in designated divs
    //loops through each stack and index of array containg all stack arrays
    
    AllStacks.forEach((stack,stackindex)=>
        {
            //gets div assocaited with stack stores in variable
            let img_container=document.getElementById(`stack${stackindex + 1}`);
         //loops through each card and index in each stack
            stack.forEach((card,index)=>{
                //creates img element for each card in the stack
                let img = document.createElement("img");
                //if the index is the last index then that will be the one that shows the card in the beginnning 
                if (index==cardDisplayCounter){
                    img.src = card[1];
                    cardDisplayCounter++;
                }
                //otherwise will display card backwards as per rules of solitare
                else{
                    img.src="../images/BackOfCard.png";
                }
                img.style.height="100px";
                img.style.width="150px";
                img.style.marginTop="-60px";
                //adds created img to div container for associated stack
                img_container.appendChild(img);

                img.addEventListener("click",function(){
                   // alert("Card clicked! Index: "+index+" stack"+(index+1));
                    NumofCardClicks++;
                    if (NumofCardClicks==1){
                        var pressedCardStack=index+1;
                        var PressedCardIndex=index;
                        var PressedCardSet=card[0].slice(0,1);
                        var PressedCardNum=card[0].slice(1);
                        
                        if (PressedCardNum=="A"){
                            alert("AA");
                            
                            if (pile1.length<1){
                                var pile1container=document.getElementById("pile1");
                                pile1container.appendChild(img);
                                pile1.push(card);

                            }
                            else if (pile2.length<1){
                                var pile2container=document.getElementById("pile2");
                                pile2container.appendChild(img);
                                pile2.push(card);

                            }
                            else if (pile3.length<1){
                                var pile3container=document.getElementById("pile3");
                                pile3container.appendChild(img);
                                pile3.push(card);

                            }
                            else{
                                var pile4container=document.getElementById("pile4");
                                pile4container.appendChild(img);
                                pile4.push(card);

                            }
                            NumofCardClicks=0;
                        }
                        
                     //  alert(pressedCardStack +""+ PressedCardIndex+" "+PressedCardSet+" num "+PressedCardNum);

                    }
                    if (NumofCardClicks==2){
                        var curr_pressedCardStack=index+1;
                        var curr_pressedCardIndex=index;
                        var curr_PressedCardSet=card[0].slice(0,1);
                        var curr_PressedCardNum=card[0].slice(1);
                       // alert(curr_pressedCardStack+""+curr_pressedCardIndex+" "+curr_PressedCardSet+" num "+ curr_PressedCardNum);
                        NumofCardClicks=0;

                        if (curr_PressedCardNum=="A"){
                            alert("AAA");
                            if (pile1.length<1){
                                var pile1container=document.getElementById("pile1");
                                pile1container.appendChild(img);
                                pile1.push(card);

                            }
                            else if (pile2.length<1){
                                var pile2container=document.getElementById("pile2");
                                pile2container.appendChild(img);
                                pile2.push(card);

                            }
                            else if (pile3.length<1){
                                var pile3container=document.getElementById("pile3");
                                pile3container.appendChild(img);
                                pile3.push(card);

                            }
                            else{
                                var pile4container=document.getElementById("pile4");
                                pile4container.appendChild(img);
                                pile4.push(card);

                            }
                            NumofCardClicks=0;
                            
                        }
                    }
                });
            }
        )
        } 
        );
    DrawDrawCards(cardsForDrcawing);

    DrawCards.forEach((card,index)=>{
        let container = document.getElementById("draw-cards");
        let ImageCard=document.createElement("img");
        if (index==DrawCards.length-1){
            ImageCard.src=card[1];
            ImageCard.style.width="150px";
            ImageCard.style.height="175px";
            container.appendChild(ImageCard);

            let imgbc=document.createElement("img");
            imgbc.src="../images/BackOfCard.png";
            imgbc.style.height=("175px");
            imgbc.style.width=("150px");
            imgbc.style.paddingLeft=("5px");
            container.appendChild(imgbc);
        }
        ImageCard.addEventListener("click",function(){
            var Draw_CardPress=card[0];
            var Draw_PressedCardSet=card[0].slice(0,1);
            var Draw_PressedCardNum=card[0].slice(1);

            if (Draw_PressedCardNum=="A"){
                ImageCard.style.height="100px";
                ImageCard.style.width="150px";
                ImageCard.style.marginTop="-60px";
                

                if (pile1.length<1){
                    var pile1container=document.getElementById("pile1");
                    pile1container.appendChild(ImageCard);
                    pile1.push(card);

                }
                else if (pile2.length<1){
                    var pile2container=document.getElementById("pile2");
                    pile2container.appendChild(ImageCard);
                    pile2.push(card);

                }
                else if (pile3.length<1){
                    var pile3container=document.getElementById("pile3");
                    pile3container.appendChild(ImageCard);
                    pile3.push(card);

                }
                else{
                    var pile4container=document.getElementById("pile4");
                    pile4container.appendChild(ImageCard);
                    pile4.push(card);

                }
                alert(card+" "+DrawCards);
                const index = DrawCards.indexOf(card);
                DrawCards.splice(index,1);
                ImageCard.remove();
                cardsForDrcawing-=1;

            }
        });
    }
    );
//function to update card on top of draw pile based off button click
    $("#Draw").click(function(){
        //gets div to put images in 
        let container = document.getElementById("draw-cards");
        //decrements fraw counter , next card
        DrawCounter--;
       
        //creates image element
        let ImageCard=document.createElement("img");
        //sets src attribute of img element
        ImageCard.src=DrawCards[DrawCounter][1];
        ImageCard.style.height="175px";
        ImageCard.style.width="150px";
        ImageCard.style.position="absolute";
        ImageCard.style.left="0";
        ImageCard.style.top="0";

        container.appendChild(ImageCard);
        
        let DrawCard_set=DrawCards[DrawCounter][0].slice(0,1);
        let DrawCard_num=DrawCards[DrawCounter][0].slice(1);

        if (DrawCounter==0){
            DrawCounter=DrawCards.length;
            ImageCard.src="../images/BackOfCard.png";
            container.appendChild(ImageCard);
        }

        ImageCard.addEventListener("click",function(){
            
            if (DrawCard_num=="A"){
                alert(DrawCards[DrawCounter]+" "+DrawCards[DrawCounter][0]+" - "+DrawCards[DrawCounter][1]);

                if (pile1.length<1){
                    var pile1container=document.getElementById("pile1");
                    pile1container.appendChild(ImageCard);
                    pile1.push(DrawCards[DrawCounter]);
                    //must remove drawcard
                }
                else if (pile2.length<1){
                    var pile2container=document.getElementById("pile2");
                    pile2container.appendChild(ImageCard);
                    pile2.push(DrawCards[DrawCounter]);
    
                }
                else if (pile3.length<1){
                    var pile3container=document.getElementById("pile3");
                    pile3container.appendChild(ImageCard);
                    pile3.push(DrawCards[DrawCounter]);
    
                }
                else{
                    var pile4container=document.getElementById("pile4");
                    pile4container.appendChild(ImageCard);
                    pile4.push(DrawCards[DrawCounter]);
    
                }
                alert(card+" "+DrawCards);

                const index = DrawCards.indexOf(card);
                DrawCards.splice(index,1);
                ImageCard.remove();
                cardsForDrcawing-=1;
                DrawDrawCards(cardsForDrcawing);
    
            }
    
    
        }); 

        
    });

    
    
});