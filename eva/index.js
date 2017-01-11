var Alexa = require('alexa-sdk');

var handlers = {
  rickRoll: function() {
    var name = this.event.request.intent.slots.firstName.value; // Notice singular intent. You only have

    this.emit(':tell', `Hi ${name}, here's a wonderful song for you. <audio src="https://s3.amazonaws.com/programming-with-alexa/rick-roll.mp3"/><break/>Hahahaha`)
  },

  destroyCity: function()   {
    // https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#audio
    var cityName = this.event.request.intent.slots.cityName.value;
    var fireBomb = `<audio src="https://s3.amazonaws.com/programming-with-alexa/blast.mp3"/>`;
    var atomicExplosion = `<audio src="https://s3.amazonaws.com/programming-with-alexa/atomic-bomb-explosion.mp3"/>`;
    var message = `${fireBomb}${fireBomb}<s> I've fired bombs at ${cityName}</s> <s>${atomicExplosion} and there it is</s> Muhahaha. <break/> Damn <break/> got to work on that evil laugh.`;

    if(!cityName) {
      this.emit(':tell', 'Dude, I need a city to destroy');
    } else {
      this.emit(':tell', message);
    }
  },

  Unhandled: function() {
    this.emit(':ask', `<s>My name is Eva <audio src="https://s3.amazonaws.com/programming-with-alexa/directive-question.mp3"/></s> <s>What evil plans do you have today?</s>`, `Come on, you must have evil plans`)
  },
}

exports.handler = function(event, context, callback, fetch){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
