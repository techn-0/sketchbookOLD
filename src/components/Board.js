import React from 'react';

const Board = ({ onLogout }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">게시판</h2>
      <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded">로그아웃</button>
      {/* 게시판 내용 추가 */}
    </div>
  );
};

export default Board;
