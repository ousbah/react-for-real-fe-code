const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const WAITING = 'WAITING';
const IDLE = 'IDLE';

countWords = text => {
  return text ? text.match(/\w+/g).length : 0;
};

// Simulates a network request
makeFakeRequest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Generate a random number between 0 and 1
      // Make the promise error out half the time
      if (Math.random() > 0.5) {
        resolve('Success!');
      } else {
        reject('Failure');
      }
      // To simulate the time needed to send data across the network, we'll 
      // wait a bit (the promise delay: 8000ms) before returning a result 
    }, 8000);
  });
};

Counter = ({ count }) => {
  return React.createElement(
    'p',
    { className: 'mb2' },
    'Word count: ',
    count
  );
};

ProgressBar = ({ completion }) => {
  const percentage = completion * 100;
  return React.createElement(
    'div',
    { className: 'mv2 flex flex-column' },
    React.createElement(
      'label',
      { htmlFor: 'progress', className: 'mv2' },
      'Progress'
    ),
    React.createElement(
      'progress',
      { value: completion, id: 'progress', className: 'bn' },
      percentage,
      '%'
    )
  );
};

Editor = ({ text, onTextChange }) => {

  handleChange = event => {
    onTextChange(event.target.value);
  };

  return React.createElement(
    'div',
    { className: 'flex flex-column mv2' },
    React.createElement(
      'label',
      { htmlFor: 'editor', className: 'mv2' },
      'Enter your text:'
    ),
    React.createElement('textarea', { value: text,
      onChange: handleChange,
      id: 'editor' })
  );
};

SaveButton = ({ onClick }) => {
  return React.createElement(
    'button',
    { className: 'pv2 ph3', onClick: onClick },
    'Save'
  );
};

AlertBox = ({ status }) => {
  if (status === FAILURE) {
    return React.createElement(
      'div',
      { className: 'mv2' },
      'Save failed'
    );
  } else if (status === SUCCESS) {
    return React.createElement(
      'div',
      { className: 'mv2' },
      'Save successful'
    );
  } else if (status === WAITING) {
    return React.createElement(
      'div',
      { className: 'mv2' },
      'Saving...'
    );
  } else {
    return null;
  }
};

class SaveManager extends React.Component {
  constructor() {
    super();

    this.save = event => {
      event.preventDefault(); // Stop the form from submitting
      this.setState(() => ({ saveStatus: WAITING }));
      this.props.saveFunction(this.props.data).then(success => this.setState(() => ({ saveStatus: SUCCESS })), failure => this.setState(() => ({ saveStatus: FAILURE })));
    };

    this.state = { saveStatus: IDLE };
  }

  render() {
    return React.createElement(
      'div',
      { className: 'flex flex-column mv2' },
      React.createElement(SaveButton, { onClick: this.save }),
      React.createElement(AlertBox, { status: this.state.saveStatus })
    );
  }
}

class WordCounter extends React.Component {
  constructor() {
    super();

    this.handleTextChange = currentText => {
      this.setState(() => ({ text: currentText }));
    };

    this.state = { text: '' };
  }

  // currentText represents the current contents 
  // of the input box


  render() {
    // uses destructuring
    const { targetWordCount } = this.props;
    // uses destructuring
    const { text } = this.state;
    const wordCount = countWords(text);
    const progress = wordCount / targetWordCount;

    return React.createElement(
      'form',
      { className: 'measure pa4 sans-serif' },
      React.createElement(Editor, { onTextChange: this.handleTextChange,
        text: text
      }),
      React.createElement(Counter, { count: wordCount }),
      React.createElement(ProgressBar, { completion: progress }),
      React.createElement(SaveManager, { saveFunction: makeFakeRequest, data: this.state })
    );
  }
}

ReactDOM.render(React.createElement(WordCounter, { targetWordCount: 10 }), document.getElementById('app'));
