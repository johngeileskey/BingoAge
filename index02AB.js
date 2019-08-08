

      var allPlayers = [];  // to store player data /////
      var sortedAllPlayers = []; // to display results

// what to do when the setup button is clicked
      $(document).ready(function(){
        $("#setup").click(function(){
          $(".setup").toggle();
          //$("#wrapper").toggle();

        });
      });


    function loadData() {
      myArray = localStorage.getItem('Players');
      myArray = myArray? JSON.parse(myArray) : {"name":" ","level":" ","play":" "};

      /////////////////////// load up the player data
      console.log("In loadData function ");
      //////////////experiment 2019/08/07 EXPERIMENT to fix duplication
      if (allPlayers.length > 0) {
        allPlayers.splice(0,allPlayers.length );
        /////// clears allPlayers prior to reloading it
      }
      resetWinnerTable(); // reset the winnerTable to empty prior to setting it up!!!!
      myArray.forEach(setupPlayers);

      // NOW load up the 'winnerTable' in which we we show the results as the game progresses


      // for (aPlayer in myArray) {
      //   if (aPlayer.play.trim() === 'Y'){
      //     console.log("CREATING PLAYER DATA" + aPlayer.name);
      //     var cardNum = Number(aPlayer.level.trim());
      //     allPlayers.push(new Player("aPlayer.name", cardSet[cardNum], true, 0));
      //   }
      // }
      ////////////////////////////////////
    }

    function sortPlayers(){
      function compare (a,b){
        var n1 = Number(a.rank)+ Number(a.waitingOn);
        var n2 = Number(b.rank)+ Number(b.waitingOn);
        if (n1 < n2){
          return -1;
        }
        if (n1 > n2){
          return +1;
        }
        return 0;
      }
      if (allPlayers.length > 0){
          sortedAllPlayers = allPlayers.sort(compare);
      }
    }

    function updateWinnerTable() {
      resetWinnerTable();
      sortPlayers();
      sortedAllPlayers.forEach(addWinnerTableRow);
    }
    function addWinnerTableRow(item, index){

      var htmltext = "";
      var backColor = "background-color:"
      if (item.waitingOn === 0){
        backColor += "red;";
      } else if (item.waitingOn === 1) {
        backColor += "purple;";
      } else if (item.waitingOn === 2){
        backColor += "green;";

      } else {
        backColor += "navy;";
      }



      htmltext = "<tr id='tableWin" +i+"'  style="+backColor+"><td>"+
      item.name+
      "</td><td>"+
      item.waitingOn+
      "</td><td>"+
      item.calledCount+
      "</td></tr>";
      // "</td><td class='setup'><button onclick='edit("+i+")'>Edit</button><button onclick='remove("+i+")'>Remove</button></td></tr>";
     document.getElementById("tbodyWinner").innerHTML += htmltext;
    }

    function setupPlayers(item, index){
        // add a player on the array list to the allPlayer array of Player instances
        // also add that Player to the winnertable list
        // so that it can be used to display results as the game progresses.

        if (item.play.trim() === 'Y'){
          console.log(item.name + " ** " + item.level+ " ** " + item.play);
          var cardNum = Number(item.level.trim());
          currentPlayer = new Player(item.name, cardSet[cardNum], true, 100);
          //allPlayers.push(new Player(item.name, cardSet[cardNum], true, 100));
          allPlayers.push(currentPlayer);
          /// add player to 'winnerTable' which will show results as game progresses
          var htmltext = "";
          htmltext = "<tr id='tableWin"+i+"'><td>"+
          currentPlayer.name+
          "</td><td>"+
          +currentPlayer.waitingOn+
          "</td><td>"+
          currentPlayer.calledCount+
          "</td></tr>";
          // "</td><td class='setup'><button onclick='edit("+i+")'>Edit</button><button onclick='remove("+i+")'>Remove</button></td></tr>";
         document.getElementById("tbodyWinner").innerHTML += htmltext;
        }
    }
    function resetWinnerTable() {
      // reset the winnerTable to empty - required when setting it up!!!!!
      document.getElementById("tbodyWinner").innerHTML = "";
    }

    function saveData() {
      localStorage.setItem('Players', JSON.stringify(myArray));
    }


    // var myArray = [{ "name": "John", "level": "1", "play": "N" }, { "name": "Peter", "level": "2", "play": "Y" },
    //                 { "name": "Fred", "level": "3", "play": "N"}, { "name": "George", "level": "4" , "play": "Y"}
    //                 ,{ "name": "Tom", "level": "5" , "play": "Y"},{ "name": "Joe", "level": "6", "play": "Y" },
    //                 { "name": "Bruce MacDonald", "level": "7", "play": "Y" }];
    var myArray = {};  //////////////////////********///////

    function display() {
      /////////////  loadData();  ////////////////////////
        var length = myArray.length;
        var htmltext = "";
        var myArraySorted =[];
        function compare (a,b){
          if (Number(a.level) < Number(b.level)){
            return +1;
          }
          if (Number(a.level) > Number(b.level)){
            return -1;
          }
          return 0;
        }
        if (myArray.length > 0){
            myArraySorted = myArray.sort(compare);
        }
        for (var i = 0; i < length; i++) {
            console.log(myArray[i]);
            htmltext += "<tr id='table"+i+"'><td>"+
            myArraySorted[i].name+
            "</td><td>"+
            myArraySorted[i].level+
            "</td><td>"+
            myArraySorted[i].play+
            "</td><td class='setup'><button onclick='edit("+i+")'>Edit</button><button onclick='remove("+i+")'>Remove</button></td></tr>";
        }
        document.getElementById("tbody").innerHTML = htmltext;
    }
    function addRow() {
      console.log("Before " + myArray.length);
      myArray.push({"name":" ","level":" ","play":" "});
      console.log("After " + myArray.length);
      saveData(); //////////////////
      display();
      edit(myArray.length - 1); // immediately edit the newly added row


    }


    function edit(indice) {
        var htmltext = "<tr><td><input id='inputname"+indice+"' type='text' value='"
            +myArray[indice].name+
            "'></td><td><input id='inputlevel"+indice+"' type='text' value='"
            +myArray[indice].level+
            "'></td><td><input id='inputplay"+indice+"' type='text' value='"
            +myArray[indice].play+
            "'></td><td><button onclick='save("+indice+")'>Save</button><button onclick='remove("+indice+")'>Remove</button></td></tr>";
        document.getElementById("table"+indice).innerHTML = htmltext;

    }


    function save(indice) {
        myArray[indice].name = document.getElementById("inputname"+indice).value;
        myArray[indice].level = document.getElementById("inputlevel"+indice).value;
        myArray[indice].play= document.getElementById("inputplay"+indice).value.toUpperCase();
        var htmltext = "<tr id='table"+indice+"'><td>"
            +myArray[indice].name+
            "</td><td>"
            +myArray[indice].level+
            "</td><td>"
            +myArray[indice].play+
            "</td><td><button onclick='edit("
            +indice+")'>Edit</button><button onclick='remove("
            +indice+")'>Remove</button></td></tr>";
        document.getElementById("table"+indice).innerHTML = htmltext;
        display();
    }

    function remove(indice) {
        console.log(myArray);
        myArray.splice(indice, 1);
        display();
    }
