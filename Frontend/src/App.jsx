import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-c"; 
import "prismjs/components/prism-cpp"; 
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';
import Home from './Home';

function CodeReview() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int result = factorial(5);
    cout << "Factorial of 5 is: " << result << endl;
    return 0;
}`);

  const [review, setReview] = useState('');

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post('https://review-mu-neon.vercel.app/ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      console.error('Error reviewing code:', error);
      setReview('Error fetching review. Please try again.');
    }
  }

  return (
   <main className="main-container">
  <div className="left-panel">
    <div className="code-editor">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => prism.highlight(code, prism.languages.cpp, "cpp")}
        padding={15}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 16,
          outline: 'none',
          backgroundColor: 'transparent',
          minHeight: '100%',
          color: '#fff',
        }}
      />
    </div>
    <button
      className="review-button"
      onClick={reviewCode}
    >
       Review Code
    </button>
  </div>
  <div className="right-panel">
    <Markdown rehypePlugins={[rehypeHighlight]}>
      {review}
    </Markdown>
  </div>
</main>

  );
}

function App() {
  return (
    <Router>
      <nav className="nav-bar">
  <Link to="/" className="nav-link">Home</Link>
  <Link to="/review" className="nav-link">Code Review</Link>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={
         
            <CodeReview />
         
        } />
      </Routes>
    </Router>
  );
}

export default App;