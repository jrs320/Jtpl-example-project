import '@/assets/css/app.scss'
import Jtpl from 'jtpl'
import main from '@/views/main/index.html'

Jtpl.load({
  el: '#app',
  tpl: main,
  store: {},
  router: {}
})
