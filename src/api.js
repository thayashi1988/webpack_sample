import 'core-js';
import 'regenerator-runtime/runtime';

export default function api() {
  let res = '';
  async function callApi() {
    try {
      let test = await fetch('https://jsonplaceholder.typicode.com/posts');
      console.log('test:', test);
      res = await test.json();
      return res;
    } catch (err) {
      alert('eeeeeeee');
      console.log('err:', err);
    }
  }
  window.addEventListener('DOMContentLoaded', () => {
    callApi();
  });
}
