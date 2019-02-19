import VueMaterial from 'vue-material';
import Axios from 'axios';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';


import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.use(VueMaterial);

new Vue({
    render: h => h(App),
}).$mount('#app');
