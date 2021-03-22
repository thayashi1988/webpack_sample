// pugins
// import '../css/style.css';
import '../css/common.scss';
// import Swiper from "swiper/bundle";
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar]);
import jQuery from 'jquery';

// modules
// import bar from './modules/bar';
// import api from './modules/api';
// import question from './modules/question';
import fetchSmaple from './modules/fetch';
import swiper from './modules/swiper';
import jquery from './modules/jquery';
import typeScriptTest from './modules/test.ts';

// bar();
// api();
// question();
fetchSmaple();
// swiper(Swiper);
swiper(SwiperCore);
jquery(jQuery);
typeScriptTest();
