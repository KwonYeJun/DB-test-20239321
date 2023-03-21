import my from 'mysql2'; // ! db패키지 참조

let conn = {
  host : '192.168.0.177', // * db ip 주소
  user : 'idtest',  
  password : '1234',
  database : 'newdevstest',
  port : 3306
};

var connection = my.createConnection(conn);//*db와 커넥션 상태
   // ! 커넥션은 어떤 것 또는 누군가와 관련이 있는 상태라는 뜻
connection.connect(); // * db접속


connection.query('select * from newtest',
(err,results,fields) => {
  if(err){console.log(err)} console.log(results)
});
//* db query를 이용 하여 데이터를 검색 

connection.end();
//db 접속 종료