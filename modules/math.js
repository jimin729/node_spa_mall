function add(a,b) {
    return a + b;
}

/** 익명 함수 exports **/

// // 모듈을 호출했을 때, add 키 값에는 (a,b){return a + b;} 익명 함수가 할당되는 방법
// exports.add = function (a, b) {
//     return a + b;
//   }

//   /** Module.exports = Object **/

// // 모듈을 호출했을 때, add 키 값에는 add 함수가 들어가는 방법이다.
// function add(a, b) {
//     return a + b;
//   }
  module.exports = { add: add };

//   /** module.exports = Function **/

// // 모듈 그 자체를 add 함수로 할당
// function add(a, b) {
//     return a + b;
//   }
//   module.exports = add;