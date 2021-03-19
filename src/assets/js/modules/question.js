export default function question() {
  // 問２
  // 配列（Array1）について”６”以上の数値を抽出し、新たな配列（Array２）を生成してください。
  const Array1 = [3, 5, 8, 0, 10, 6];
  // let Array2 = Array1.filter(function (value, index, array) {
  let Array2 = Array1.filter(function (value) {
    return value > 6;
  });

  // 結果 [8,10]
  console.log('question.js_問２', Array2);

  // 問３
  // obj1から２０歳以上の人を抽出して、新たなオブジェクトobj2を生成してください。
  const obj1 = [
    { name: 'hoge', gender: 'man', age: 25 },
    { name: 'fuga', gender: 'woman', age: 30 },
    { name: 'foo', gender: 'man', age: 15 },
    { name: 'bar', gender: 'woman', age: 40 },
  ];
  // let obj2 = obj1.filter(function (value, index, array) {
  let obj2 = obj1.filter(function (value) {
    return value.age > 20;
  });

  //結果
  // 0: {name: "hoge", gender: "man", age: 25}
  // 1: {name: "fuga", gender: "woman", age: 30}
  // 2: {name: "bar", gender: "woman", age: 40}
  console.log('question.js_問3', obj2);

  const h1 = document.querySelector('h1');
  console.log('h1:', h1);
}
