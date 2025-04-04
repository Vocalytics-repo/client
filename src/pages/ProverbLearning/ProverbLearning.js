// src/pages/ProverbLearning/ProverbLearning.js
import React, { useState } from 'react';
import './ProverbLearning.css';

const defaultProverb = {
    proverb: "소 잃고 외양간 고친다",
    interpretation: "문제가 발생한 후에 뒤늦게 대책을 세운다",
    example: "그는 문제 발생 후에야 대책을 세웠다. 마치 소 잃고 외양간 고친 것과 같다."
};

const sampleProverbs = [
    {
        proverb: "소 잃고 외양간 고친다",
        interpretation: "문제가 발생한 후에 뒤늦게 대책을 세운다",
        example: "그는 문제 발생 후에야 대책을 세웠다. 마치 소 잃고 외양간 고친 것과 같다."
    },
    // You can add more proverb objects for a richer experience.
];

const quizData = {
    question: "가는 말이 고와야 _ 온다",
    options: ["내온다", "나온다", "오고 간다", "오는다"],
    answer: "나온다"
};

function ProverbLearning() {
    const [currentProverb, setCurrentProverb] = useState(defaultProverb);
    const [searchQuery, setSearchQuery] = useState('');
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizFeedback, setQuizFeedback] = useState('');

    const handleRandomProverb = () => {
        // For now, simply randomize among sampleProverbs.
        const randomIndex = Math.floor(Math.random() * sampleProverbs.length);
        setCurrentProverb(sampleProverbs[randomIndex]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // In a real implementation, add logic to search through proverbs.
        console.log("Searching for:", searchQuery);
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        if (quizAnswer === quizData.answer) {
            setQuizFeedback("Correct!");
        } else {
            setQuizFeedback("Incorrect, please try again.");
        }
    };

    const handleTTS = () => {
        // In a real implementation, integrate Clova Voice TTS.
        alert("Playing TTS for: " + currentProverb.proverb);
    };

    return (
        <div className="proverb-learning-page">
            <h1>한국 속담 학습</h1>

            {/* Random Proverb Card */}
            <div className="proverb-card">
                <h2>{currentProverb.proverb}</h2>
                <p><strong>해석:</strong> {currentProverb.interpretation}</p>
                <p><strong>예문:</strong> {currentProverb.example}</p>
                <div className="card-buttons">
                    <button onClick={handleRandomProverb}>다른 속담 보기</button>
                    <button onClick={handleTTS}>TTS 발음 듣기</button>
                </div>
            </div>

            {/* Proverb Search */}
            <div className="proverb-search">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="속담 키워드 (예: 늦다, 행운)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">검색</button>
                </form>
            </div>

            {/* Proverb Quiz */}
            <div className="proverb-quiz">
                <h2>속담 테스트</h2>
                <p>{quizData.question}</p>
                <form onSubmit={handleQuizSubmit}>
                    {quizData.options.map((option, index) => (
                        <div key={index} className="quiz-option">
                            <input
                                type="radio"
                                id={`option${index}`}
                                name="quiz"
                                value={option}
                                onChange={(e) => setQuizAnswer(e.target.value)}
                            />
                            <label htmlFor={`option${index}`}>{option}</label>
                        </div>
                    ))}
                    <button type="submit">제출</button>
                </form>
                {quizFeedback && <p className="quiz-feedback">{quizFeedback}</p>}
            </div>
        </div>
    );
}

export default ProverbLearning;
