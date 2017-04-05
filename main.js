$(document).ready(function() {
    // all custom jQuery will go here

  function Card(suitval, val){
    this.suitval = suitval;
    this.val = val;
    this.owner = deck;

    // Set suitval for card picture picker.
    if(this.suitval == 0){
      this.suit = "h";
      this.suitprint = "Hearts";
      this.color = "r";
    } else if (this.suitval == 1) {
      this.suit = "c";
      this.suitprint = "Clubs";
      this.color = "b";
    } else if (this.suitval == 2) {
      this.suit = "s";
      this.suitprint = "Spades";
      this.color = "b";
    } else {
      this.suit = "d";
      this.suitprint = "Diamonds";
      this.color = "r";
    }

    if(this.val == 11){
      this.valprint = "Jack";
    } else if(this.val == 12){
      this.valprint = "Queen";
    } else if(this.val == 13){
      this.valprint = "King";
    } else if(this.val == 1){
      this.valprint = "Ace";
    } else {
      this.valprint = this.val+"";
    }

    this.name = "The "+this.valprint+" of "+this.suitprint;

  }


  // Deck Constructor:
  function Deck(){
    var deck = [];

    this.name = "Deck";
    this.reset = function(){
      deck = [];
      for(var suit=0; suit <=3; suit++){
        for(var val=1; val<= 13; val++){
          deck.push(new Card(suit, val));
        }
      }
      return this;
    }
    // Reset the deck when you ask for one.

    // Deal function.
    this.deal = function(){
      if(deck){
        return deck.pop();
      }
    }

    // Add shuffle function.
    this.shuffle = function() {
      for(var idx = deck.length-1; idx >= 0; idx--){
        var randIdx = Math.floor(Math.random()*deck.length);
        var temp = deck[randIdx];
        deck[randIdx] = deck[idx];
        deck[idx] = temp;
      }
      return this;
    }

    this.reset();
    this.shuffle();

    // DISABLE FOR FINAL: TEST FUNCTION.
    this.printDeck = function() {
      console.log("The Deck:");
      for(var card =0; card < deck.length; card++){
        console.log(deck[card].name);
      }
    }
  }

  // Player Constructor:
  function Player(name){
    this.name = name;
    this.hand = [];

    this.discard = function(){
      if(this.hand){
        // Return the "discarded" card.
        // This happens when you play a card from your hand.
        return this.hand.pop();
      }
    }

    this.printHand = function(){
      console.log("Your hand:");
      for(var i in this.hand){
        console.log(this.hand[i].name);
      }
      return this;
    }

  }

  function Column(name, start_number){
    this.name = name;
    this.num_cards = start_number;
    this.hand = [];

    this.discard = function(){
      if(this.hand){
        // Return the "discarded" card.
        // This happens when you play a card from your hand.
        this.num_cards = this.num_cards-1;
        return this.hand.pop();
      }
    }

    // Make each column at the start.
    this.setup = function() {
      for(var i = 0; i < start_number; i++){
        this.draw();
      }
    }

    this.printColumn = function(){
      if(this.hand){
        console.log("Column "+start_number+" has "+this.num_cards+" cards left.");
        console.log("Cards left: ");
        for(var i = 0; i < this.hand.length; i++){
          console.log(this.hand[i].name);
        }
      }
    }

  }

  function Stack(suit){
    this.suit = suit;
    this.hand = [];

    // For debugging.
    this.printStack = function(){
      if(this.hand){
        console.log("Stack of "+this.suit+":");
        for(var i = 0; i < this.hand.length; i++){
          console.log(this.hand[i].name);
        }
      }
    }

  }

  // All reset functions:
  function DeckReset() {
    return new Deck();
    // Seven columns, 1,2,3,4,5,6,7.
    // 4 empty stacks
  }
  function PlayerReset(player){
    return new Player(player.name);
  }
  function StackReset(stack){
    return new Stack(stack.suit);
  }
  function ColumnReset(column){
    return new Column(column.start_number);
  }


  // Basically the main program.
  function GameLogic() {
    // Add a card to column without logic...AkA at start of game.
    Column.prototype.draw = function() {
        var temp = my_deck.deal();
        temp.owner = this;
        this.hand.push(temp);
        return this;
    }

    // GAME LOGIC BELOW:

    // SOME SETUP PIECES:
    var temp_card = "none";
    var my_deck = new Deck();
    var my_player = new Player("Billy");
    var stack_d = new Stack("d");
    var stack_s = new Stack("s");
    var stack_c = new Stack("c");
    var stack_h = new Stack("h");
    var col_1 = new Column("col_1",1);
    var col_2 = new Column("col_2",2);
    var col_3 = new Column("col_3",3);
    var col_4 = new Column("col_4",4);
    var col_5 = new Column("col_5",5);
    var col_6 = new Column("col_6",6);
    var col_7 = new Column("col_7",7);
    col_1.setup();
    col_2.setup();
    col_3.setup();
    col_4.setup();
    col_5.setup();
    col_6.setup();
    col_7.setup();
    stack_h.hand.push(new Card(0,0));
    stack_c.hand.push(new Card(1,0));
    stack_s.hand.push(new Card(2,0));
    stack_d.hand.push(new Card(3,0));

    // BUNCH OF PROTOTYPE SETUP:
    // Add the draw function via prototype so it always uses the deck we want.
    Player.prototype.draw = function() {
        var temp = my_deck.deal();
        temp.owner = this;
        this.hand.push(temp);
        return this;
    }

    // Add a card with logic...AkA when player tries to add card.
    Stack.prototype.addCard = function(player) {
      if(this.hand.length > 0){
        // If the suits are equal...
        if(this.hand[this.hand.length-1].suit == player.hand[player.hand.length-1].suit){
          // If the values are one apart in correct direction...
          if(this.hand[this.hand.length-1].val == (player.hand[player.hand.length-1].val-1)){
            // Then add the card.
            var temp = player.discard();
            temp.owner = this;
            return this.hand.push(temp);
          }
        }
      }
      return false;
    }

    // Add a card with logic...AkA when player tries to place one.
    Column.prototype.addCard = function(player) {
      if(this.hand.length > 0 && player.hand.length > 0){
        // If hand colors are opposites (between column and player):
        if((this.hand[this.hand.length-1].color == "b" && player.hand[player.hand.length-1].color == "r") ||
        (this.hand[this.hand.length-1].color == "r" && player.hand[player.hand.length-1].color == "b")){
          // If the values are one apart in correct direction...
          if(this.hand[this.hand.length-1].val == (player.hand[player.hand.length-1].val+1)){
            // Then add the card.
            var temp = player.discard();
            temp.owner = this;
            return this.hand.push(temp);
          }
        }
      }
      return false;
    }
    // END OF SETUP PIECES.
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // DO GAME LOGIC NOW.
    my_player.draw().printHand();
    col_1.printColumn();
    col_2.printColumn();
    col_3.printColumn();
    col_4.printColumn();
    col_5.printColumn();
    col_6.printColumn();
    col_7.printColumn();
    stack_h.printStack();
    stack_d.printStack();
    stack_c.printStack();
    stack_s.printStack();

    $("#my_player").html(CardToHTML(my_player.hand[0].suit, my_player.hand[0].val));
    $("#selected").html("<b>Currently Selected: None</b>");

    $("#col_1").html(CardToHTML(col_1.hand[0].suit, col_1.hand[0].val))
    $("#col_2").html(CardTopHTML(1)+''+CardToHTML(col_2.hand[1].suit, col_2.hand[1].val))
    $("#col_3").html(CardTopHTML(2)+''+CardToHTML(col_3.hand[2].suit, col_3.hand[2].val))
    $("#col_4").html(CardTopHTML(3)+''+CardToHTML(col_4.hand[3].suit, col_4.hand[3].val))
    $("#col_5").html(CardTopHTML(4)+''+CardToHTML(col_5.hand[4].suit, col_5.hand[4].val))
    $("#col_6").html(CardTopHTML(5)+''+CardToHTML(col_6.hand[5].suit, col_6.hand[5].val))
    $("#col_7").html(CardTopHTML(6)+''+CardToHTML(col_7.hand[6].suit, col_7.hand[6].val))



    $("#deck").click(function(){
      if(my_player.hand.length < 30){
        my_player.draw();
        var temp = "";
        for(var i=0; i<my_player.hand.length; i++){
          temp += CardToHTML(my_player.hand[i].suit, my_player.hand[i].val);
        }
        $("#my_player").html(temp+"");
      }
      // Currently broken code that makes deck go down in value.
      // Broken because deck is a private value currently, and I cant check length.
      // if(my_deck.deck_length >= 2){
      //   $("#deck").html('<img class="card_top" src="cards/b1pt.png" alt="card top"><img class="card_top" src="cards/b1pt.png" alt="card top"><img class="card" src="cards/b1fv.png" alt="card">');
      // } else if(my_deck.deck_length == 2){
      //   $("#deck").html('<img class="card_top" src="cards/b1pt.png" alt="card top"><img class="card" src="cards/b1fv.png" alt="card">');
      // } else if(my_deck.deck_length == 1){
      //   $("#deck").html('<img class="card" src="cards/b1fv.png" alt="card">');
      // } else {
      //   $("#deck").html('<p>Empty Deck</p>');
      // }
      temp_card = "none";
      $("#selected").html("<b>Currently Selected: None</b>");
    });
    $("#my_player").click(function(){
      if(temp_card == "none"){
        if(my_player.hand.length > 0){
          temp_card = my_player.hand[my_player.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#col_1").click(function(){

      if(temp_card == "none"){
        if(col_1.hand.length > 0){
          // If you have no temp card, make it this one.
          temp_card = col_1.hand[col_1.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        // Save the owner of the card you are moving before it gets reset by addCard.
        var temp = temp_card.owner;
        // If you have a temp card, try to add to this pile.
        if(col_1.addCard(temp_card.owner)){
          $("#col_1").html(ColumnToHTML(col_1.hand.length, temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        // Lose temp card no matter what.
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#col_2").click(function(){
      if(temp_card == "none"){
        if(col_2.hand.length > 0){
          temp_card = col_2.hand[col_2.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        var temp = temp_card.owner;
        if(col_2.addCard(temp_card.owner)){
          $("#col_2").html(ColumnToHTML(col_2.hand.length, temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#col_3").click(function(){
      if(temp_card == "none"){
        if(col_3.hand.length > 0){
          temp_card = col_3.hand[col_3.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        var temp = temp_card.owner;
        if(col_3.addCard(temp_card.owner)){
          $("#col_3").html(ColumnToHTML(col_3.hand.length, temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#col_4").click(function(){
      if(temp_card == "none"){
        if(col_4.hand.length > 0){
          temp_card = col_4.hand[col_4.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        var temp = temp_card.owner;
        if(col_4.addCard(temp_card.owner)){
          $("#col_4").html(ColumnToHTML(col_4.hand.length, temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#col_5").click(function(){
      if(temp_card == "none"){
        if(col_5.hand.length > 0){
          temp_card = col_5.hand[col_5.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        var temp = temp_card.owner;
        if(col_5.addCard(temp_card.owner)){
          $("#col_5").html(ColumnToHTML(col_5.hand.length, temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#col_6").click(function(){
      if(temp_card == "none"){
        if(col_6.hand.length > 0){
          temp_card = col_6.hand[col_6.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        var temp = temp_card.owner;
        if(col_6.addCard(temp_card.owner)){
          $("#col_6").html(ColumnToHTML(col_6.hand.length, temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#col_7").click(function(){
      if(temp_card == "none"){
        if(col_7.hand.length > 0){
          temp_card = col_7.hand[col_7.hand.length-1];
          $("#selected").html("<b>Currently Selected: "+temp_card.name+"</b>");
        }
      } else{
        var temp = temp_card.owner;
        if(col_7.addCard(temp_card.owner)){
          $("#col_7").html(ColumnToHTML(col_7.hand.length, temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });

    $("#stack_s").click(function(){
      if(temp_card != "none"){
        var temp = temp_card.owner;
        if(stack_s.addCard(temp_card.owner)){
          $("#stack_s").html(StackToHTML(temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#stack_h").click(function(){
      if(temp_card != "none"){
        var temp = temp_card.owner;
        if(stack_h.addCard(temp_card.owner)){
          $("#stack_h").html(StackToHTML(temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#stack_c").click(function(){
      if(temp_card != "none"){
        var temp = temp_card.owner;
        if(stack_c.addCard(temp_card.owner)){
          $("#stack_c").html(StackToHTML(temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });
    $("#stack_d").click(function(){
      if(temp_card != "none"){
        var temp = temp_card.owner;
        if(stack_d.addCard(temp_card.owner)){
          $("#stack_d").html(StackToHTML(temp_card));
          if(temp != "my_player"){
            $("#"+temp.name).html(ColumnToHTML(temp.hand.length, temp.hand[temp.hand.length-1]));
          } else {
            console.log("hello");
            // Need to write hand reset code here.
          }
        }
        temp_card = "none";
        $("#selected").html("<b>Currently Selected: None</b>");
      }
      console.log(temp_card);
    });


    $("#reset").click(function(){
      location.reload();
    });
    // TO DO:
    // Make stacks clickable/add cards to them.
    // Make hand update when you take cards out of it (Not just when you draw.)
    // Make deck decrease shown cards.
    // Win screen?
    // Showing multiple cards in one column and being able to move them all...ouch.
    // King in blank space rule?...
    // Reset button...just refresh page.

  }



  function CardToHTML(suit, val){
    return '<img class="card" src="cards/'+suit+val+'.png" alt="'+val+' '+suit+'">';
  }
  function CardTopHTML(num_times){
    var temp = '';
    for(var i = 0; i < num_times; i++){
      temp += '<img class="card_top" src="cards/b1pt.png" alt="card top">';
    }
    return temp+'';
  }
  function ColumnToHTML(num_cards, last_card){
    var temp = '';
    for(var i = 1; i < num_cards; i++){
      temp += '<img class="card_top" src="cards/b1pt.png" alt="card top">';
    }
    // Need scenario if there are no cards left.
    console.log(last_card);
    if(last_card != undefined){
      temp += '<img class="card" src="cards/'+(last_card.suit)+(last_card.val)+'.png" alt="card">'
    } else {
      temp += '<p class="selected2">Empty</p>'
    }
    return temp+'';
  }

  function StackToHTML(last_card){
    return '<img class="card" src="cards/'+(last_card.suit)+(last_card.val)+'.png" alt="card">';
  }

  function ResetGame(){
    // ASK USER ABOUT RESETTING GAME HERE. THEN MAKE NEW GAME LOGIC IF YES.
    new GameLogic();
  }

  // Start game.
  new GameLogic();

  // If you want to reset game or end it.
  // new ResetGame();


});
