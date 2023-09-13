import React, { useState, useEffect } from "react";
// import axios from 'axios';
import style from "./InterviewQuestions.module.css";
import Data from "./data.json";

const InterviewQuestions = () => {
    const [questions, setQuestions] = useState([""]);
    const [answers, setAnswers] = useState([""]);
    const [answer, setAnswer] = useState()
    const [serial, setSerial] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDisabledTextBox, setIsDisabledTextBox] = useState(false);
    const [isDisabledNext, setIsDisabledNext] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [fileName, setFileName] = useState(['']);
    const [data1, setData1] = useState([])

    const focusRef = React.useRef(null);
    useEffect(() => {

        // axios.get(fileName)
        // .then((res) => {
        //     setData1(res)

        // })
        // console.log(data1, 'data1')

        makeRandom();
        focusRef.current.focus();

    }, []);

    const dataFile = () => {

        console.log(fileName, 'fnaaaa')
    }

    const makeRandom = () => {
        focusRef.current.focus();

        const getDatas = Data.map((item) => item);

        getDatas.sort(() => Math.random() - 0.5);
        setQuestions(getDatas);
        setAnswers(getDatas);
        // setAnswer("")

        setIsDisabled(true);
        setIsReset(false);
        setIsDisabledNext(false);
        setIsDisabledTextBox(false)
        setIsSaved(false)

        // setAnswer("");
        setSerial(0);

    };

    const handleSelect = (e) => {

        const df = e.target.files[0].name
        // console.log(df,'df')
    }

    const handleChange = (event) => {

        questions[serial].answer = event.target.value;
        setAnswers((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        focusRef.current.focus();
        setAnswer("")
    };

    const saveAnswer = () => {
        setQuestions(questions);

        setAnswers((prevState) => ({
            ...prevState,
            questions,
        }));
        setIsSaved(true)
    };

    const goPrev = () => {
        serial > 0 && setSerial(serial - 1);
        setIsDisabledNext(false);
        serial === 1 && setIsDisabled(true);
        // setAnswers(questions[serial].answer);
        setAnswer(answers[serial].answer);

        focusRef.current.focus();
    };

    const goNext = () => {
        !isSaved && (questions[serial].answer = '');
        setAnswer(answers[serial].answer);
        setIsSaved(false)
        setIsDisabledNext(false);
        setSerial(serial + 1);


        serial === questions.length - 2 && setIsDisabledNext(true);

        if (serial === questions.length - 1) {
            setIsDisabled(true);
            setSerial(0);
        } else {
            setIsDisabled(false);
            setSerial(serial + 1);
        }
        focusRef.current.focus();
        // setIsDisabledTextBox(false);
        // setAnswer(answers[serial].answer);


    };
    const resetQuestions = () => {
        setIsReset(true);
        setIsDisabled(true);
        setIsDisabledNext(true);
        setIsDisabledTextBox(true)
        setAnswer("")

    };
    const noReset = () => {
        setIsReset(false);
        setIsDisabled(false);
        setIsDisabledNext(false);
        setIsDisabledTextBox(false)
        focusRef.current.focus();
    };

    const handleClick = (e) => {
        serial + 1 === 1 ? setIsDisabled(true) : setIsDisabled(false);

        const id = e.target.id;


        switch (id) {
            case "start":
                return dataFile();
            case "prev":
                return goPrev();
            case "next":
                return goNext();
            case "save":
                return saveAnswer();
            case "reset":
                return resetQuestions();
            case "yesReset":
                return makeRandom();
            case "noReset":
                return noReset();
            default:
                return false;
        }
    };

    return (
        <>
            <form id="frm" name="" onSubmit={handleSubmit}>
                <main className={style.container}>
                    {/* <h1>PRO-TEK Consulting</h1> */}
                    <h1>ReactJS</h1>
                    <h2>Randomized Interview Questions</h2>
                    <section className={style.section}>
                        <div>

                            <p>Q-{serial + 1}</p>
                            <p>{questions[serial].question}</p>
                        </div>
                        <div>
                            <label htmlFor="answer">Write your answer:</label>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                id="answer"
                                name="answer"
                                form="frm"
                                disabled={isDisabledTextBox}
                                placeholder="Write your Answer...."
                                ref={focusRef}
                                onChange={handleChange}
                                // value={questions[serial].answer}
                                value={answers[serial].answer}

                            />
                        </div>
                        {/* <div>
                            <input type="file" id="srcFile" name="srcFile" onChange={handleSelect}></input>
                            <button type="submit" id="start" name="start" onClick={handleClick}>Start</button>
                        </div> */}
                        {isReset && (
                            <div className={style.msgbox}>
                                <div> You are going to reset, all data will be lost. Are you sure?</div>
                                <div>
                                    <button
                                        type="submit"
                                        id="yesReset"
                                        name="yesReset"
                                        onClick={handleClick}
                                    >
                                        Yes
                                    </button>
                                    <button type="submit" id="noReset" name="noReset" onClick={handleClick}>
                                        No
                                    </button>
                                </div>
                            </div>
                        )}

                    </section>

                    <div>
                        <button
                            type="submit"
                            id="prev"
                            name="prev"
                            disabled={isDisabled}
                            onClick={handleClick}
                        >
                            Prev
                        </button>
                        <button
                            type="submit"
                            id="next"
                            name="next"
                            disabled={isDisabledNext}
                            onClick={handleClick}
                        >
                            Next
                        </button>
                        <button
                            type="submit"
                            id="save"
                            name="save"
                            disabled={isDisabled && isReset}
                            onClick={handleClick}
                        >
                            Save
                        </button>
                        <button
                            type="submit"
                            id="reset"
                            name="reset"
                            disabled={isDisabled}
                            onClick={handleClick}
                        >
                            Reset
                        </button>
                    </div>
                </main>

            </form>

            {isSaved > 0 && (
                <div>
                    <h4>Answer:</h4>
                    <h4>[ {questions[serial].answer} ]</h4>
                </div>
            )}
        </>
    );
};

export default InterviewQuestions;
