function Counter({ count }) {
  return React.createElement(
    "p",
    { className: "mb2" },
    "Word count: ",
    count
  );
}

function ProgressBar({ completion }) {
  const percentage = completion * 100;
  return React.createElement(
    "div",
    { className: "mv2 flex flex-column" },
    React.createElement(
      "label",
      { htmlFor: "progress", className: "mv2" },
      "Progress"
    ),
    React.createElement(
      "progress",
      { value: completion, id: "progress", className: "bn" },
      percentage,
      "%"
    )
  );
}

function Editor({ text }) {
  return React.createElement(
    "div",
    { className: "flex flex-column mv2" },
    React.createElement(
      "label",
      { htmlFor: "editor", className: "mv2" },
      "Enter your text:"
    ),
    React.createElement("textarea", { value: text, id: "editor" })
  );
}

// Counts the words in a string
function countWords(text) {
  return text ? text.match(/\w+/g).length : 0;
}

// Takes an object with a text and targetWordCount properties...
function WordCounter({ text, targetWordCount }) {

  // WordCounter calculates the word count and progress...
  const wordCount = countWords(text);
  // Calculates the progress for ProgressBar
  const progress = wordCount / targetWordCount;

  return (
    // Displays the complete interface, passing the appropriate
    // props to each child element
    React.createElement(
      "form",
      { className: "measure pa4 sans-serif" },
      React.createElement(Editor, { text: text }),
      React.createElement(Counter, { count: wordCount }),
      React.createElement(ProgressBar, { completion: progress })
    )
  );
}

// Render the word counter on the page: render the word counter 
// in a div with the app id.
ReactDOM.render(
// Pass a string as the text prop and a number  
// as the targetWordCount prop
React.createElement(WordCounter, { text: "Count the words in here. ", targetWordCount: 10 }), document.getElementById('app'));
