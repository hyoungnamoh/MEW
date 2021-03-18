const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSessin = require('express-session');
const dotenv = require('dotenv');
const prod = process.env.NODE_ENV === 'production';

dotenv.config(); //.env 실행 password 읽어옴

const app = express(prod);

//cors 에러 middleware
app.use(cors({//cors 오류 잡아줌 도메인이 다른데 요청을 할 경우 서버에서 거절함. 이걸 해결 해 줌
  origin: true, //요청 주소와 같게       **// server의 url이 아닌, 요청하는 client의 url ??
  credentials: true,
}));
// }

//request.body 관련 middleware
app.use(express.json()); //json으로 변환해줌
app.use(express.urlencoded({ extended: true })); //body로 넣어줌

//login 관련 middleware
app.use(cookieParser(process.env.COOKIE_SECRET)); //cookie를 알아서 parsing
app.use(expressSessin({ //session 사용하게 해 줌
  //resave, saveInitialized 무조건 넣어줘야함 보통 false로 함
  resave: false, //매번 세션 강제저장
  saveUninitialized: false, //빈 값도 저장
  secret: process.env.COOKIE_SECRET, //암호화 키
  cookie: {
    httpOnly: true, //쿠키를 자바스크립트에서 접근 못하게 함
    secure: false, //https 사용 시 true로 해야함
  },
  name: 'hyoungnam'
}));

//이미지 업로드
app.use('/', express.static('uploads')); //이미지 미리보기, express 안에 static 미들웨어 사용, 경로(두번째 인자)를 지정하면 다른서버에서 자유롭게 가져갈 수 있게 해줌, 첫번째 인자는 uploads 폴더를 루트처럼 사용할 수 있게 하겠다. . .

const mysql = require('mysql2');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1004',
  database: 'mew',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get('/', (req, res) => {
  res.send('백엔드 정상 동작!');
});

app.get('/words', async (req, res, next) => {
  try {
    const sql = 'select * from word';
    connection.query(sql, function (err, topics, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send({ words: topics });
      }
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

app.listen(prod ? process.env.PORT : 3603, () => {
  console.log(`server is running on ${process.env.PORT}`);
});