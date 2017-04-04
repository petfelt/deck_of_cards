function Card(suitval, val){
  this.suitval = suitval;
  this.val = val;

  // Set suitval for card picture picker.
  if(this.suitval == 0){
    this.suit = "h";
    this.suitprint = "Hearts";
  } else if (this.suitval == 1) {
    this.suit = "c";
    this.suitprint = "Clubs";
  } else if (this.suitval == 2) {
    this.suit = "s";
    this.suitprint = "Spades";
  } else {
    this.suit = "d";
    this.suitprint = "Diamonds";
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

  // DISABLE FOR FINAL: TEST FUNCTION.
  this.printDeck = function() {
    for(var card =0; card < deck.length; card++){
      console.log(deck[card].name);
    }
  }
}

var my_deck = new Deck();
var my_card = my_deck.deal();
my_deck.printDeck();
console.log(my_card.name);
my_deck.shuffle();
my_deck.printDeck();
