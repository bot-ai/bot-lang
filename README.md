# bot-lang
A collection of common keywords or commands a user might use while interacting with a bot

Use these to create pattern matching systems OR to seed your training data for a machine learning system

##API
You'll need to run your node app with ES6. Start by installing :

 - `npm install --save-dev babel`
 - `npm install babel-cli --save-dev`
 - `npm install babel-preset-es2015 --save-dev`
 - `npm install babel-preset-env --save-dev`

## Installation
Clone the **bot-lang** repo and import

    import lang from './path/to/bot-lang/src'
### Clean interface

    var cleanedString = lang.clean.all(string)
    // Removes extra spaces
    // lang.clean.all('this    is     spaced     out')
    // => 'this is spaced out'
    //
    // Fix numbers
    // lang.clean.all('how much is 1,000.00')
    // => 'how much is 1000.00'
    //
    // Fix Unicode characters
    // lang.clean.all('œ')
    // => ''

### Replace Interface

  var cleanedString = lang.replace.all(string)
  // replace subsitutes
  // lang.replace.all('Nov 1st I weighed 90 kgs. total')
  // => 'November 1st I weighed 90 kilograms total'
  //
  // expand contractions
  // lang.replace.all("I'll listen to y'all")
  // => 'I will listen to you all'
  //
  // swap british / canadian words'
  // lang.replace.all('armour axe coloured gold')
  // => 'armor ax colored gold'
  //
  // fix spelling
  // lang.replace.all('are we sceduled thrsday for teh restraunt')
  // => 'are we scheduled Thursday for the restaurant'
  

## Contributing

Add new keywords to the keywords folder as a text file.  Add as many variations of that keyword as you can!

OR

Find an existing keyword and add more variations!
