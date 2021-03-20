// import '../css/style.css';
// import '../css/common.scss';
// import 'swiper/swiper-bundle.css';
// import 'regenerator-runtime/runtime';
import Swiper from 'swiper/bundle';
import jQuery from 'jquery';

// import bar from './modules/bar';
// import api from './modules/api';
// import question from './modules/question';
import fetchSmaple from './modules/fetch';
import swiper from './modules/swiper';
import jquery from './modules/jquery';

// bar();
// api();
// question();
fetchSmaple();
swiper(Swiper);
jquery(jQuery);
