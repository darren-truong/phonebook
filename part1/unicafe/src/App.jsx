import { useState } from "react";

const Button = ({ text, onClickHandler }) => {
  return <button onClick={onClickHandler}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={(good + bad * -1) / (good + neutral + bad)}
      />
      <StatisticLine
        text="positive"
        value={`${(good / (good + neutral + bad)) * 100} %`}
      />
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClickHandler={() => setGood(good + 1)} />
      <Button text="neutral" onClickHandler={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClickHandler={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
