
const express = require('express');
const app = express();
const port = 3000;

const goodsRoutes = require('./routes/goods.js');
const connect = require("./schemas")
connect();

app.use(express.json());
app.use("/api",[goodsRoutes]);

app.post("/",(req,res) =>{
  console.log(req.body);

  res.send("기본 URL에 POS  T 메소드가 정상적으로 실행되었습니다.")
}

)

app.get("/", (req,res) => {
  console.log(req.query)

  res.status(200).json({
    "keykey" : "value   입니다.",
    "이름입니다." : "이름일까요?",
    });
});

app.get("/:id", (req,res) => {
  console.log(req.params)

  res.send(":id urld에 정상적으로 반환되었습니다.");
})

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use("/api",goodsRoutes)

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});