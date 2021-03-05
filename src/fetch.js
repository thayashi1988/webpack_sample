import 'core-js';
import 'regenerator-runtime/runtime';

export default function fetchSmaple() {
  let res = '';
  let users = '';
  let body = document.body;
  let btn = document.querySelector('button');
  let showLen = 10;
  let jsonHtml = document.querySelector('#json ul');
  let loading = document.querySelector('#loading');

  async function callApiFetch() {
    try {
      //fetchをするとpromiseオブジェクトが返ってくる
      //async、awaitでfetchするとresponseオブジェクトが返ってくる
      res = await fetch('https://jsonplaceholder.typicode.com/posts');
      console.log('res:', res);
      users = await res.json();

      // for(let num = 0; num < users.length; num++) {
      for (let num = 0; num < showLen; num++) {
        let div = document.createElement('li');
        div.classList.add('border-b-2', 'border-fuchsia-600', 'mb-2');
        let text = users[num].title;
        div.innerHTML = text;
        jsonHtml.appendChild(div);
      }

      loading.style.display = 'none';

      return users;
    } catch (error) {
      console.log('error:', error);
      // alert('エラーです。');
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    callApiFetch();
    // .then((users) => {
    //   console.log('users:', users);
    // })
    // .catch((error) => {
    //   console.log('失敗しました');
    // });

    let count = 0;
    btn.addEventListener('click', function () {
      count++;
      showLen = 10 * count;
      for (let i = showLen; i < showLen + 10; i++) {
        console.log('i:', i);
        if (users.length <= i) {
          let heading2 = document.createElement('h2');
          heading2.innerHTML = 'データはありません';
          heading2.classList.add('text-3xl', 'font-bold', 'mb-5');
          btn.parentNode.insertBefore(heading2, btn);
          // btn.style.display = 'none'
          btn.remove();
          break;
        }
        let div = document.createElement('li');
        div.classList.add('border-b-2', 'border-fuchsia-600', 'mb-2');
        let text = users[i].title;
        div.innerHTML = text;
        jsonHtml.appendChild(div);
        console.log('btn:', btn.getBoundingClientRect());
        scrollTo(btn.getBoundingClientRect());
      }
    });
  });
}
