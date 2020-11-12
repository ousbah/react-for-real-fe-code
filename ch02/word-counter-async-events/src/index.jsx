const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const WAITING = 'WAITING';
const IDLE = 'IDLE';

countWords = (text) => {
  return text ? text.match(/\w+/g).length : 0
}

// Simulates a network request
makeFakeRequest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Generate a random number between 0 and 1
      // Make the promise error out half the time
      if (Math.random() > 0.5) {
        resolve('Success!')
      } else {
        reject('Failure')
      }
    // To simulate the time needed to send data across the network, we'll 
    // wait a bit (the promise delay: 8000ms) before returning a result 
    }, 8000)
  })
}

Counter = ({ count }) => {
    return(
      <p className="mb2">
        Word count: {count}
      </p>
    )
  }
  
  ProgressBar = ({ completion }) => {
    const percentage = completion * 100
    return(
      <div className="mv2 flex flex-column">
        <label htmlFor="progress" className="mv2">
          Progress
        </label>
        <progress value={completion} id="progress" className="bn">
          {percentage}%
        </progress>
      </div>
    )
  }

  Editor = ({ text, onTextChange }) => {
    
    handleChange = (event) => {
      onTextChange(event.target.value)
    }

    return(
      <div className="flex flex-column mv2">
        <label htmlFor="editor" className="mv2">
          Enter your text:
        </label>
        <textarea value={text} 
                  onChange={handleChange} 
                  id="editor" />
      </div>
    )
  }

  SaveButton = ({ onClick }) => {
    return (
      <button className="pv2 ph3" onClick={onClick}>
        Save
      </button>
    )
  }

  AlertBox = ({ status }) => {
    if (status === FAILURE) {
      return <div className="mv2">Save failed</div>
    } else if (status === SUCCESS) {
      return <div className="mv2">Save successful</div>
    } else if (status === WAITING) {
      return <div className="mv2">Saving...</div>
    } else {
      return null
    } 
  }

  class SaveManager extends React.Component {
    constructor() {
      super()
      this.state = { saveStatus: IDLE }
    }

    save = (event) => {
      event.preventDefault() // Stop the form from submitting
      this.setState(() => ({ saveStatus: WAITING }))
      this.props
        .saveFunction(this.props.data)
        .then(success => this.setState(() => ({ saveStatus: SUCCESS })),
              failure => this.setState(() => ({ saveStatus: FAILURE }))
        )
    }

    render() {
      return (
        <div className="flex flex-column mv2">
          <SaveButton onClick={this.save} />
          <AlertBox status={this.state.saveStatus} />
        </div>
      )
    }
  }
  

  class WordCounter extends React.Component {
    constructor() {
      super()
      this.state = { text: '' }
    }

    // currentText represents the current contents 
    // of the input box
    handleTextChange = (currentText) => {
      this.setState(() => ({ text: currentText }))
    }

    render() {
      // uses destructuring
      const { targetWordCount } = this.props
      // uses destructuring
      const { text } = this.state
      const wordCount = countWords(text)
      const progress = wordCount / targetWordCount
      
      return(
        <form className="measure pa4 sans-serif">
          <Editor onTextChange={this.handleTextChange} 
                  text={text} 
          />
          <Counter count={wordCount} />
          <ProgressBar completion={progress} />
          <SaveManager saveFunction={makeFakeRequest} data={this.state} />
        </form>
      )
    }
  }
  
  ReactDOM.render(
    <WordCounter  targetWordCount={10} />,
    document.getElementById('app')
  )

  
  
  
  
  