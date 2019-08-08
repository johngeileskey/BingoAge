var winRank = 0;
function Anumber(num, called) {
  this.num = num;
  this.called = called;
}

var Card = [
  new Anumber(10, false)
  //  new Anumber(2, false),
  //  new Anumber(3, false)
];
//console.log(Card);

function checkNumber(n) {
  var outStr = "";
  for (let c in this.card) {
    // console.log(this.card[c].num);
    if (this.card[c].num === n) {
      needToUpdateWinnerTable = true;   // WE need to adjust the winnerTable
      //console.log("MATCH with " + this.name);
      this.card[c].called = true;
      //if (this.card[c].called == true) {
      this.calledCount++;
      ///////////////////////////////////}
      // return n + " is on " + this.name + "s card!";

      outStr += n + " is on " + this.name + "s card!,";

      var uncalled = this.card.length - this.calledCount;
      if (uncalled > 0) {
        var numStr = uncalled > 1 ? "numbers" : "number";
        outStr +=
          this.name + " has " + uncalled + " " + numStr + " ,left to call! ";
      }

      //console.log(this.stillPlaying);
      this.waitingOn--;
      //////// update the winnertable


      if (this.waitingOn === 0) {
        // rank ++;  // not needed as rank is adjusted when a new number is called and tested
        this.rank = idxNumber + 1; /////ranking number which is the number of numbers called so far ;
        console.log("," + this.name + " HAS FINISHED WITH RANK, " + this.rank);
        winRank++;
        if (winRank === 1) {
          outStr += ",BINGO! BINGO! Bingo, " + this.name + " has WON!!";
        } else {
          outStr +=
            "BINGO! " + this.name + " has finished in position " + winRank;
        }
      }
    }
  }

  return outStr;
}

function resetPlayer() {
  this.rank = 100;
  this.calledCount = 0;
  for (c in this.card) {
    this.card[c].called = false; //**** none of the numbers have been called ///////////////*/
  }
  this.waitingOn = this.card.length; //////////// waiting for all numbers on the card!!!!!!
}

function Player(name, card, playing, rank) {
  this.name = name;
  this.card = card;
  this.playing = true;
  this.rank = rank;
  this.calledCount = 0;
  this.waitingOn = this.card.length; /////this.card.length ;   // EXPERIMENTAL

  this.check = checkNumber; // method call checkNumber(n)

  this.reset = resetPlayer; // method call resetPlayer()
}
// create an array of Cards which for this experiment hold 5 consecutive NUMBERS
function createCards() {
  var CardArr = [];
  for (i = 1; i <= 90; i += 3) {
    Card = [
      new Anumber(i, false),
      new Anumber(i + 1, false),
      new Anumber(i + 2, false)
      // new Anumber(i + 3, false),
      // new Anumber(i + 4, false)
    ];
    CardArr.push(Card);
  }
  return CardArr;
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// this section of code has for the moment been by passed
// it was giving players a set of custom chosen numbers
var player1 = new Player("Bev Cameron", Card, true, 0);
Card = [new Anumber(5, false), new Anumber(6, false), new Anumber(10, false)];
var player2 = new Player("Betty Day", Card, true, 0);
Card = [new Anumber(15, false), new Anumber(16, false), new Anumber(5, false)];
var player3 = new Player("Bruce Macdonald", Card, true, 0);
// This is the experimental replacement SECTION
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// cardSet is an array of 5 sequential numbers which can be allocated to a player
// 1,2,3,4,5 is a cardset and this continues to 86,87,88,89,90

var cardSet = createCards();

// THIS EXPERIMENTAL CODE SHIFTED TO load
// var allPlayers = [];
// for (aPlayer in myArray) {
//   if (aPlayer.play === 'Y'){
//     console.log("CREATING PLAYER DATA" + aPlayer.name);
//     var cardNum = Number(aPlayer.level);
//     allPlayers.push(new Player("aPlayer.name", cardSet[cardNum], true, 0));
//   }
// }

// This was sucessful test code!!!!!!///////////////////////////////
// player1 = new Player("Cheryl Flory", cardSet[0], true, 0);
// player2 = new Player("Meigan Russel", cardSet[1], true, 0);
// player3 = new Player("Kylie Phylips", cardSet[2], true, 0);
// var player4 = new Player("John Galeskey", cardSet[3], true, 0);
// var allPlayers = [player1, player2, player3, player4];
