function Card(suitval, val){
  this.suitval = suitval;
  this.val = val;

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
    for(var i in this.hand){
      console.log(this.hand[i].name);
    }
    return this;
  }

}

function Column(start_number){
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

  }

}

function Stack(suit){
  this.suit = suit;
  this.hand = [];

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


function GameLogic() {

  // GAME LOGIC BELOW:

  // SOME SETUP PIECES:
  var my_deck = new Deck();
  var my_player = new Player("Billy");
  var stack_d = new Stack("d");
  var stack_s = new Stack("s");
  var stack_c = new Stack("c");
  var stack_h = new Stack("h");
  var col_1 = new Column(1);
  var col_2 = new Column(2);
  var col_3 = new Column(3);
  var col_4 = new Column(4);
  var col_5 = new Column(5);
  var col_6 = new Column(6);
  var col_7 = new Column(7);
  // Add the draw function via prototype so it always uses the deck we want.
  Player.prototype.draw = function() {
      this.hand.push(my_deck.deal());
      return this;
  }

  // Add a card with logic...AkA when player tries to add card.
  Stack.prototype.addCard = function() {
    // If the suits are equal...
    if(this.hand[this.hand.length-1].suit() == my_player.hand[my_player.hand.length-1].suit()){
      // If the values are one apart in correct direction...
      if(this.hand[this.hand.length-1].val() == (my_player.hand[my_player.hand.length-1].val()-1)){
        // Then add the card.
        this.hand.push(my_player.discard());
      }
    }
    return this;
  }

  // Add a card to column without logic...AkA at start of game.
  Column.prototype.draw = function() {
      this.hand.push(my_deck.deal());
      return this;
  }

  // Add a card with logic...AkA when player tries to place one.
  Column.prototype.addCard = function() {
    // If hand colors are opposites (between column and player):
    if((this.hand[this.hand.length-1].color() == "b" && my_player.hand[my_player.hand.length-1].color() == "r") ||
    (this.hand[this.hand.length-1].color() == "r" && my_player.hand[my_player.hand.length-1].color() == "b")){
      // If the values are one apart in correct direction...
      if(this.hand[this.hand.length-1].val() == (my_player.hand[my_player.hand.length-1].val()+1)){
        // Then add the card.
        this.hand.push(my_player.discard());
      }
    }
    return this;
  }
  // END OF SETUP PIECES.
  // DO GAME LOGIC NOW.

  my_player.draw().printHand();

}

function ResetGame(){
  // ASK USER ABOUT RESETTING GAME HERE. THEN MAKE NEW GAME LOGIC IF YES.
  new GameLogic();
}

// Start game.
new GameLogic();

// If you want to reset game or end it.
// new ResetGame();
