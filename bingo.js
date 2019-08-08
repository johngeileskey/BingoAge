var nums = document.getElementsByClassName("square");
var needToUpdateWinnerTable = false;
var numToCall = []; // numbers 0 to 89
for (var i = 0; i < nums.length; i++) {
  numToCall[i] = i;
}
var idxNumber = 0; // the index into the array of numsToCallFrom
var isSpeaking = false;

// utility function to randomize bingo number call sequence
function shuffle(originalArray) {
  var array = [].concat(originalArray);
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // starts at 90 but max array index is 89

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// shuffle the numbers into the numsToCallFrom array
var numsToCallFrom = shuffle(numToCall);
console.log(numsToCallFrom);

var nextButton = document.getElementById("next");
var infoButton = document.getElementById("counter"); // use to track how many numbers have been called
infoButton.value = "99";

nextButton.addEventListener("click", function() {
  if (idxNumber < numsToCallFrom.length && !isSpeaking) {
    if (idxNumber > 0) {
      // make sure at LEAST TWO numbers called so a previous number exists
      // then show the current number called in yellow and change previous number from yellow to red
      nums[numsToCallFrom[idxNumber - 1]].classList.add("picked");
      nums[numsToCallFrom[idxNumber - 1]].classList.remove("currentNumber");
    }
    // numsToCallFrom[idxNumber] is the ACTUAL number being called (less 1 for array mapping)
    // then we modify the corresponding DOM element
    nums[numsToCallFrom[idxNumber]].classList.add("currentNumber");
    console.log("idxNumber = " + idxNumber);
    console.log("numsToCallFrom[idxNumber] = " + numsToCallFrom[idxNumber]);
    console.log(numBingoCall[numsToCallFrom[idxNumber]]);
    isSpeaking = true;
    utterance = new SpeechSynthesisUtterance(
      numBingoCall[numsToCallFrom[idxNumber]]
    );
    // trial code to prevent the next number to start processing before the previous call has finished
    utterance.onend = function() {
      isSpeaking = false;
    };

    //////TEST SECTION
    var numCalled = numsToCallFrom[idxNumber];
    numCalled += 1; // THIS IS THE NUMBER CALLED! as the numbers in the array are 0 to 89 representing 1 to 90

    // allPlayers variable is an array of Player instances

    allPlayers.forEach(function(member) {
      var checkResult = member.check(numCalled);
      if (typeof checkResult !== "undefined") {
        // note how we need to check for 'undefined'
        utterance.text += " , " + checkResult;

      }
    });

    if (needToUpdateWinnerTable) {
      updateWinnerTable();
      needToUpdateWinnerTable = false;
    }
    ////END TEST SECTION

    //synth.speak(utterance);
    idxNumber++;
    infoButton.innerHTML = "Counter: <br>" + idxNumber; //////////////////////////////////////////////
    if (idxNumber % 10 === 0) {
      // isSpeaking = true;
      if (idxNumber === 90) {
        utterance.text += " ,-- , ALL NUMBERS HAVE BEEN CALLED!";
      } else {
        utterance.text +=
          " , , So far, " + idxNumber + " numbers have been called out";
      }
    }
    if (idxNumber > 84 && idxNumber != 90) {
      var str = "";
      if (idxNumber === 89) {
        str = ", , JUST ONE MORE NUMBER TO CALL!!!!!";
      } else {
        str = ", JUST, " + (90 - idxNumber) + " numbers left to call!";
      }

      utterance.text += str;
    }
    synth.speak(utterance);
    // NEED TO CHECK THIS SECTION (next number is being actioned before this sentence is completed.)
  }
});

var newgameButton = document.getElementById("newGame");
newgameButton.addEventListener("click", function() {
  newgameButton.value = "NEW"; //////////////////////////////////
  for (var i = 0; i < 90; i++) {
    nums[i].classList.remove("picked", "currentNumber");
  }
  numsToCallFrom = shuffle(numToCall);
  idxNumber = 0;

  //////////////////////////////////////////// reset all player's cards
  allPlayers.forEach(function(member) {
    member.reset();
  });
  winRank = 0; ////////// no winner at start of a new game!!!!!
});
///////////////////////////////////////////////////////////////////////////
var synth = speechSynthesis;
var utterance = new SpeechSynthesisUtterance(" This is a test");
utterance.voice = synth.getVoices()[0];

var numBingoCall = [
  " BY, ITSELF, NUMBER, 1",
  "BY, ITSELF, NUMBER, 2",
  "BY, ITSELF, NUMBER, 3",
  "BY, ITSELF, NUMBER, 4",
  "BY, ITSELF, NUMBER, 5",
  "BY, ITSELF, NUMBER, 6",
  "BY, ITSELF, NUMBER, 7",
  "BY, ITSELF, NUMBER, 8",
  "BY, ITSELF, NUMBER, 9",
  "1, AND 0, DOWNING STREET, NUMBER 10",
  "1, AND 1, LEGS, 11",
  "1, AND 2, ONE DOZEN, 12",
  "1, AND 3, UNLUCKY FOR SOME, 13",
  "1, AND 4, 14",
  "1, AND 5, 15",
  "1, AND 6, SWEET 16",
  "1, AND 7, NOT SO SWEET 17",
  "1, AND 8, 18",
  "1, AND 9, 19",
  "2, AND 0, BLIND 20",
  "2, AND 1, COMMING OF AGE, 21",
  "ALL, THE, TWOS, 2, AND 2, 22",
  "2, AND 3, 23",
  "2, AND 4, 24",
  "2, AND 5, QUARTER OF A CENTURY, 25",
  "2, AND 6, 26",
  "2, AND 7, 27",
  "2, AND 8, 28",
  "2, AND 9, 29",
  "3, AND 0, BLIND 30",
  "3, AND 1, 31",
  "3, AND 2, 32",
  "3, AND 3, 33",
  "3, AND 4, 34",
  "3, AND 5, 35",
  "3, AND 6, 36",
  "3, AND 7, 37",
  "3, AND 8, 38",
  "3, AND 9, 39",
  "4, AND 0, BLIND 40",
  "4, AND 1, 41",
  "4, AND 2, 42",
  "4, AND 3, 43",
  "4, AND 4, 44",
  "4, AND 5, 45",
  "4, AND 6, 46",
  "4, AND 7, 47",
  "4, AND 8, 48",
  "4, AND 9, 49",
  "5, AND 0, BLIND 50",
  "5, AND 1, 51",
  "5, AND 2, 52",
  "5, AND 3, 53",
  "5, AND 4, 54",
  "5, AND 5, 55",
  "5, AND 6, 56",
  "5, AND 7, 57",
  "5, AND 8, 58",
  "5, AND 9, 59",
  "6, AND 0, BLIND 60",
  "6, AND 1, 61",
  "6, AND 2, 62",
  "6, AND 3, 63",
  "6, AND 4, 64",
  "6, AND 5, 65",
  "6, AND 6, 66",
  "6, AND 7, 67",
  "6, AND 8, 68",
  "6, AND 9, 69",
  "7, AND 0, BLIND 70",
  "7, AND 1, 71",
  "7, AND 2, 72",
  "7, AND 3, 73",
  "7, AND 4, 74",
  "7, AND 5, 75",
  "7, AND 6, 76",
  "7, AND 7, 77",
  "7, AND 8, 78",
  "7, AND 9, 79",
  "8, AND 0, BLIND 80",
  "8, AND 1, 81",
  "8, AND 2, 82",
  "8, AND 3, 83",
  "8, AND 4, 84",
  "8, AND 5, 85",
  "8, AND 6, 86",
  "8, AND 7, 87",
  "8, AND 8, 88",
  "8, AND 9, 89",
  "TOP, OF THE HOUSE!, 9, AND 0, 90"
];

var numBingoCallAlternate = [
  " BY, ITSELF, NUMBER, 1",
  "BY, ITSELF, NUMBER, 2",
  "BY, ITSELF, NUMBER, 3",
  "BY, ITSELF, NUMBER, 4",
  "BY, ITSELF, NUMBER, 5",
  "BY, ITSELF, NUMBER, 6",
  "BY, ITSELF, NUMBER, 7",
  "BY, ITSELF, NUMBER, 8",
  "BY, ITSELF, NUMBER, 9",
  "1, AND, 0, DOWNING STREET, NUMBER 10",
  "1, AND, 1, LEGS, 11",
  "1, AND, 2, ONE DOZEN, 12",
  "1, AND, 3, UNLUCKY FOR SOME, 13",
  "1, AND, 4, 14",
  "1, AND, 5, 15",
  "1, AND, 6, SWEET 16",
  "1, AND, 7, NOT SO SWEET 17",
  "1, AND, 8, 18",
  "1, AND, 9, 19",
  "2, AND, 0, BLIND 20",
  "2, AND, 1, COMMING OF AGE, 21",
  "ALL, THE, TWOS, 2, AND, 2, 22",
  "2, AND, 3, 23",
  "2, AND, 4, 24",
  "2, AND, 5, QUARTER OF A CENTURY, 25",
  "2, AND, 6, 26",
  "2, AND, 7, 27",
  "2, AND, 8, 28",
  "2, AND, 9, 29",
  "3, AND 0, BLIND 30",
  "3, AND 1, 31",
  "3, AND 2, 32",
  "3, AND 3, 33",
  "3, AND 4, 34",
  "3, AND 5, 35",
  "3, AND 6, 36",
  "3, AND 7, 37",
  "3, AND 8, 38",
  "3, AND 9, 39",
  "4, AND 0, BLIND 40",
  "4, AND, 1, 41",
  "4, AND, 2, 42",
  "4, AND, 3, 43",
  "4, AND, 4, 44",
  "4, AND, 5, 45",
  "4, AND, 6, 46",
  "4, AND, 7, 47",
  "4, AND, 8, 48",
  "4, AND, 9, 49",
  "5, AND 0, BLIND 50",
  "5, AND, 1, 51",
  "5, AND, 2, 52",
  "5, AND, 3, 53",
  "5, AND, 4, 54",
  "5, AND, 5, 55",
  "5, AND, 6, 56",
  "5, AND, 7, 57",
  "5, AND, 8, 58",
  "5, AND, 9, 59",
  "6, AND 0, BLIND 60",
  "6, AND, 1, 61",
  "6, AND, 2, 62",
  "6, AND, 3, 63",
  "6, AND, 4, 64",
  "6, AND, 5, 65",
  "6, AND, 6, 66",
  "6, AND, 7, 67",
  "6, AND, 8, 68",
  "6, AND, 9, 69",
  "7, AND 0, BLIND 70",
  "7, AND, 1, 71",
  "7, AND, 2, 72",
  "7, AND, 3, 73",
  "7, AND, 4, 74",
  "7, AND, 5, 75",
  "7, AND, 6, 76",
  "7, AND, 7, 77",
  "7, AND, 8, 78",
  "7, AND, 9, 79",
  "8, AND 0, BLIND 80",
  "8, AND, 1, 81",
  "8, AND, 2, 82",
  "8, AND, 3, 83",
  "8, AND, 4, 84",
  "8, AND, 5, 85",
  "8, AND, 6, 86",
  "8, AND, 7, 87",
  "8, AND, 8, 88",
  "8, AND, 9, 89",
  "TOP, OF, THE, HOUSE!, 9, AND 0, 90"
];

//nums[70].classList.add("picked");

//nums[24].classList.add("picked");
