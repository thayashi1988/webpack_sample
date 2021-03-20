export default function jquery(arg) {
  window.addEventListener('load', () => {
    const $ = arg;
    const test = $('#js-more-btn');
    test.on('click', () => {
      alert('aaaaaaaaaaaaaaa');
      return false;
    });
    const list = $('li');
    // console.log('list:', list);

    let arrays = [];
    let arrrayss = [];
    arrrayss.push(list);
    arrays = [...list];
    // console.log('arrrayss:', arrrayss);
    console.log('arrays:', arrays);
  });
}
