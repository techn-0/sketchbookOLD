import React from "react";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">회원가입</h1>
      <form className="flex flex-col space-y-4">
        <input type="text" placeholder="아이디" className="border p-2 rounded" />
        <input type="password" placeholder="비밀번호" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
