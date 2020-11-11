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

function countWords(text) {
  return text ? text.match(/\w+/g).length : 0;
}

class WordCounter extends React.Component {

  constructor() {
    super();
    this.state = { text: 'Coucou c\'est moi le chef' };
  }

  render() {
    // uses destructuring
    const { targetWordCount } = this.props;
    // uses destructuring
    const { text } = this.state;
    const wordCount = countWords(text);
    const progress = wordCount / targetWordCount;

    return React.createElement(
      "form",
      { className: "measure pa4 sans-serif" },
      React.createElement(Editor, { text: text }),
      React.createElement(Counter, { count: wordCount }),
      React.createElement(ProgressBar, { completion: progress })
    );
  }
}

ReactDOM.render(React.createElement(WordCounter, { targetWordCount: 10 }), document.getElementById('app'));
