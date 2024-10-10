// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        onLogin();  // 로그인 성공 시 호출
        navigate("/sketchbook");  // 로그인 성공 후 스케치북으로 이동
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setMessage('로그인 중 오류가 발생했습니다.');
    }
  };

  const goToRegister = () => {
    navigate("/register");  // 회원가입 페이지로 이동
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
      
      {/* 회원가입 버튼 */}
      <button onClick={goToRegister} className="mt-4 text-blue-500">회원가입</button>
    </div>
  );
};

export default Login;
