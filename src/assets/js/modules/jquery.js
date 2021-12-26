export default function jquery(arg) {
  window.addEventListener('load', () => {
    const $ = arg;
    const btnMore = $('#js-more-btn');
    btnMore.on('click', () => {
      alert('aaaaaaaaaaaaaaa');
      const list = $('li');
      // console.log('list:', list);
      let arrays = [];
      let arrrayss = [];
      arrrayss.push(list);
      arrays = [...list];
      console.log('arrays:', arrays);
      return false;
    });

    btnMore
      .on('mouseenter', () => {
        console.log(`ボタンにホバーした`);
      })
      .mouseleave(function () {
        console.log(`ボタンからマウスを離した`);
      });

    $(document).on('contextmenu', function (e) {
      e.preventDefault();
      alert('右クリックを押した');
      return false;
    });
  });
}
