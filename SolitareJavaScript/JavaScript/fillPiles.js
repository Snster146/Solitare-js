import { HeartCards, SpadeCards, ClubCards, DiamondCards,Allcard } from "./CardMaps.js";
import{ SelectRandomCard ,Select_i_RandomCards,visitedCards} from "./Random.js";

let stockCards=[];

// function which returns an 2d array containing cards drawn for each tableau pile there are 7 
function selectTableauCards(){
     return [Select_i_RandomCards(Allcard,1),Select_i_RandomCards(Allcard,2),
         Select_i_RandomCards(Allcard,3),Select_i_RandomCards(Allcard,4),
         Select_i_RandomCards(Allcard,5),Select_i_RandomCards(Allcard,6),
         Select_i_RandomCards(Allcard,7)]
 }

// function returns an array of all card names for example "H2"
function getAllCardKeys(){
    let allCardKeys =[] 
    for (let i=0;i<Allcard.length;i++){
        Allcard[i].keys().forEach(element => {
        allCardKeys.push(element);    

    });    
    }
    return allCardKeys;
}
// function to append all cards that are'nt visited to an array stockCards
function selectStockCards(){
    let allCardKeys=getAllCardKeys();

    for (let i=0;i<allCardKeys.length;i++){
        if (!(visitedCards.includes(allCardKeys[i]))){
             stockCards.push(allCardKeys[i]);
             visitedCards.push(allCardKeys[i]);
         }
     }
}

let selectedCards=selectTableauCards();

let tableau1=selectedCards[0];
let tableau2=selectedCards[1];
let tableau3=selectedCards[2];
let tableau4=selectedCards[3];
let tableau5=selectedCards[4];
let tableau6=selectedCards[5];
let tableau7=selectedCards[6];

selectStockCards();

export {tableau1,tableau2,tableau3,tableau4,tableau5,tableau6,tableau7,stockCards};