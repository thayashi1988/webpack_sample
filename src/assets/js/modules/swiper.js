import Swiper from 'swiper/bundle';

export default function swiper() {
  const option = {
    loop: true,
    // autoplay: true,
    navigation: {
      //ナビゲーションのオプション（矢印ボタンの要素を指定）
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination', //ページネーションの要素
      type: 'bullets', //ページネーションの種類
      clickable: true, //クリックに反応させる
    },
  };
  const swiper = new Swiper('.swiper-container', option);
}
