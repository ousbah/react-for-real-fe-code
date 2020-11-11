function Counter({ count }) {
  return(
    <p className="mb2">
      Word count: {count}
    </p>
  )
}

function ProgressBar({ completion }) {
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

function Editor({ text }) {
  return(
    <div className="flex flex-column mv2">
      <label htmlFor="editor" className="mv2">
        Enter your text:
      </label>
      <textarea value={text} id="editor" />
    </div>
  )
}

// Counts the words in a string
function countWords(text) {
  return text ? text.match(/\w+/g).length : 0
}

// Takes an object with a text and targetWordCount properties...
function WordCounter({ text, targetWordCount }) {
  
  // WordCounter calculates the word count and progress...
  const wordCount = countWords(text)
  // Calculates the progress for ProgressBar
  const progress = wordCount / targetWordCount

  return(
    // Displays the complete interface, passing the appropriate
    // props to each child element
    <form className="measure pa4 sans-serif">
      <Editor text={text} />
      {/* ...and passes these values as props to Counter
             and ProgressBar */}
      <Counter count={wordCount} />
      <ProgressBar completion={progress} />
    </form>
  )
}

// Render the word counter on the page: render the word counter 
// in a div with the app id.
ReactDOM.render(
  // Pass a string as the text prop and a number  
  // as the targetWordCount prop
  <WordCounter text="Count the words in here. " targetWordCount={10} />,
  document.getElementById('app')
)




