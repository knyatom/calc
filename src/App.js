/// App.js
import React, { useState } from 'react';
import './App.css'; // 계산기의 스타일링을 위한 CSS 파일을 가져옵니다.

// App 컴포넌트: React 애플리케이션의 메인 컴포넌트
function App() {
  // 상태 변수들을 선언합니다. useState 훅을 사용해 상태를 관리합니다.
  // displayValue: 화면에 표시될 현재 값. 초기값은 '0'입니다.
  const [displayValue, setDisplayValue] = useState('0');
  
  // firstOperand: 첫 번째 피연산자(계산에 사용되는 숫자)를 저장합니다.
  const [firstOperand, setFirstOperand] = useState(null);
  
  // operator: 현재 선택된 연산자(+, -, *, /)를 저장합니다.
  const [operator, setOperator] = useState(null);
  
  // waitingForSecondOperand: 첫 번째 피연산자와 연산자가 입력된 후,
  // 다음 숫자(두 번째 피연산자) 입력을 기다리는 상태인지 여부를 나타냅니다.
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // handleDigit 함수: 숫자 버튼을 클릭했을 때 호출됩니다.
  const handleDigit = (digit) => {
    // waitingForSecondOperand가 true이면 (연산자 입력 후),
    // 새로운 숫자로 화면 값을 설정합니다.
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      // 그렇지 않으면, 현재 화면 값에 새로운 숫자를 추가합니다.
      // displayValue가 '0'일 경우, 새로운 숫자로 대체합니다.
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  // handleOperator 함수: 연산자 버튼(+, -, *, /)을 클릭했을 때 호출됩니다.
  const handleOperator = (nextOperator) => {
    // 현재 화면 값을 숫자로 변환합니다.
    const inputValue = parseFloat(displayValue);

    // firstOperand가 아직 설정되지 않았다면 (첫 번째 연산자 입력),
    // 현재 입력 값을 firstOperand로 설정합니다.
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      // firstOperand가 이미 있고, 이전에 연산자가 선택되었다면,
      // 이전 계산을 수행하고 결과를 firstOperand에 저장합니다.
      const result = performCalculation();
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    // 다음 피연산자를 기다리는 상태로 변경합니다.
    setWaitingForSecondOperand(true);
    // 선택된 연산자를 operator 상태에 저장합니다.
    setOperator(nextOperator);
  };

  // performCalculation 함수: 실제 계산 로직을 수행합니다.
  const performCalculation = () => {
    const inputValue = parseFloat(displayValue);
    // 현재 operator 값에 따라 적절한 계산을 수행합니다.
    if (operator === '+') {
      return firstOperand + inputValue;
    }
    if (operator === '-') {
      return firstOperand - inputValue;
    }
    if (operator === '*') {
      return firstOperand * inputValue;
    }
    if (operator === '/') {
      return firstOperand / inputValue;
    }
    // 다른 연산자가 추가될 수 있습니다.
  };

  // handleEquals 함수: '=' 버튼을 클릭했을 때 최종 계산을 수행합니다.
  const handleEquals = () => {
    // 계산을 수행하고 결과를 displayValue에 표시합니다.
    const result = performCalculation();
    setDisplayValue(String(result));
    
    // 계산 결과를 다음 계산의 첫 번째 피연산자로 설정합니다.
    setFirstOperand(result);
    // 연산자 상태를 초기화합니다.
    setOperator(null);
    // 다음 피연산자 대기 상태를 false로 설정합니다.
    setWaitingForSecondOperand(false);
  };

  // clearCalculator 함수: 'AC' 버튼을 클릭했을 때 모든 상태를 초기화합니다.
  const clearCalculator = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // 렌더링 부분: 컴포넌트의 UI 구조를 정의합니다.
  return (
    <div className="calculator">
      <h2> React 계산기 앱</h2>
      {/* 계산기 화면 */}
      <div className="calculator-display">{displayValue}</div>
      {/* 계산기 버튼들 */}
      <div className="calculator-buttons">
        {/* 각 버튼들은 onClick 이벤트 핸들러를 통해 위에서 정의한 함수들을 호출합니다. */}
        {/* onClick으로 되어 있는 부분은 React의 onClick 이벤트로 수정해야 합니다. */}
        <button onClick={() => handleDigit(7)}>7</button>
        <button onClick={() => handleDigit(8)}>8</button>
        <button onClick={() => handleDigit(9)}>9</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleDigit(4)}>4</button>
        <button onClick={() => handleDigit(5)}>5</button>
        <button onClick={() => handleDigit(6)}>6</button>
        <button className="operator" onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleDigit(1)}>1</button>
        <button onClick={() => handleDigit(2)}>2</button>
        <button onClick={() => handleDigit(3)}>3</button>
        <button className="operator" onClick={() => handleOperator('*')}>&times;</button>
        <button className="all-clear" onClick={clearCalculator}>AC</button>
        <button onClick={() => handleDigit(0)}>0</button>
        <button className="equal-sign" onClick={handleEquals}>=</button>
        <button className="operator" onClick={() => handleOperator('/')}>&divide;</button>
      </div>
    </div>
  );
}

export default App; // 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보냅니다.