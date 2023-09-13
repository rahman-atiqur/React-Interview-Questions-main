import React from "react";
import "./App.css";

import InterviewQuestions from "./components/interview/InterviewQuestions";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <InterviewQuestions />
            </div>
        );
    }
}

export default App;
