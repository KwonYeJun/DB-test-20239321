import my from 'mysql2'; // ! db패키지 참조
import http from 'http';
import url from 'url';
import qs from 'qs';
console.dir(http);// ? 남이 만든 모듈 객체
import fs from 'fs';
import { json } from 'stream/consumers';



//db 접속 종료




let test =
  `<form action="/post_test" method="post" accept-charset="utf-8">
  <p><input type="text" name="title" placeholder="title"></p>
  <p><textarea name="area" placeholder="test = text"></textarea></p>
  <p><input type="submit"></p>
</form>`

let testwrite = (a, b) => { fs.writeFileSync("./" + a + ".js", b) };

const server = http.createServer((request, response) => {
  // 여기서 작업이 진행됩니다!
  let _url = request.url;
  var pathname = url.parse(_url, true).pathname;

  // ! 비지닉스 로직 부분 내가 만들어야 할 부분
  if (request.method === 'GET' && _url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    let example = test;

    response.write(example);
    response.end();
  }
  // ? 이 함수의 매개변수 request, response 객체이다.
  if (pathname === '/post_test') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      //쿼리스트링형식(문자열혈식으로 온 데이터를)을 객체로 변환 해줘
      console.log(post);
    let  title = post.title;
     let area = post.area;
     let titledecode = decodeURIComponent(title);
      let areadecode =decodeURIComponent(area);
      
      // response.end(`
      //     <!doctype html>
      //     <html>
      //     <head>
      //       <title>POST</title>
      //       <meta charset="utf-8">
      //     </head>
      //     <body>
      //       <p>title : ${title}</p>
      //       <p>description : ${area}</p>
      //     </body>
      //     </html>
      //     `);
      let conn = {
        host: '192.168.0.177', // * db ip 주소
        user: 'idtest',
        password: '1234',
        database: 'newdevstest',
        port: 3306
      };

      var connection = my.createConnection(conn);//*db와 커넥션 상태
      // ! 커넥션은 어떤 것 또는 누군가와 관련이 있는 상태라는 뜻
      connection.connect(); // * db접속
      connection.query(`insert into newtest(name,area) values('${titledecode}','${areadecode}');`,
        (err, results, fields) => {
          if (err) { console.log(err) } console.log(results)
        })
      //* db query를 이용 하여 데이터를 검색 
      connection.end();
      response.end();
      // response.end(testwrite(title, area));
    });
  }
});// * 인자를 전달 받았다.


server.listen(2080, function (error) {
  if (error) {
    console.log('서버 안돌아감');
  }
  else {
    console.log('서버 돌아감');

  }
});