// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        onLogin(); // 로그인 성공 시 콜백 호출
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setMessage('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setShowRegister(false); // 회원가입 후 양식 닫기
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setMessage('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">로그인</h2>
      {message && <div className="text-red-500 mb-2">{message}</div>}
      <input
        type="text"
        placeholder="아이디"
        className="border rounded mb-2 p-2"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        className="border rounded mb-4 p-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">로그인</button>
      <button onClick={() => setShowRegister(!showRegister)} className="mt-4 text-blue-500">회원가입</button>

      {showRegister && (
        <div className="mt-4">
          <h3 className="text-lg">회원가입</h3>
          <input
            type="text"
            placeholder="아이디"
            className="border rounded mb-2 p-2"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="border rounded mb-4 p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister} className="bg-green-500 text-white p-2 rounded">회원가입</button>
        </div>
      )}
    </div>
  );
};

export default Login;
