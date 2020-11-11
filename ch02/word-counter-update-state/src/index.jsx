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

  countWords = (text) => {
    return text ? text.match(/\w+/g).length : 0
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
                  text={text} />
          <Counter count={wordCount} />
          <ProgressBar completion={progress} />
        </form>
      )
    }
  }
  
  ReactDOM.render(
    <WordCounter  targetWordCount={10} />,
    document.getElementById('app')
  )

  
  
  
  
  