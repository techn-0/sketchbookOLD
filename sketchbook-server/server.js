const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS 패키지 가져오기

const app = express();
app.use(cors()); // CORS 미들웨어 추가
app.use(bodyParser.json());

// MongoDB 모델 정의
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/sketchbook', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB에 성공적으로 연결되었습니다.');
    app.listen(5000, () => {
      console.log('서버가 5000 포트에서 실행 중입니다.');
    });
  })
  .catch(err => console.error('MongoDB 연결 오류:', err));

// 회원가입 API
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 존재 여부 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '사용자가 이미 존재합니다.' });
    }

    // 새 사용자 저장
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
  }
});

// 로그인 API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
    }

    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
  }
});
