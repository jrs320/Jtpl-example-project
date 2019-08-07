import popup from '@/components/popup/index.html'
import { apiGetList, apiUpdate } from '@/api/agent'

export default {
  name: 'agent',
  components: {
    popup
  },
  data() {
    return {
      stat: {
        building: 0,
        idle: 0,
        physical: 0,
        virtual: 0,
        all: 0,
      },
      listType: 0,
      searchValue: '',
      osLogos: {
        'windows': require('@/assets/images/windows.png'),
        'ubuntu': require('@/assets/images/ubuntu.png'),
        'debian': require('@/assets/images/debin.png'),
        'suse': require('@/assets/images/suse.png'),
        'centos': require('@/assets/images/cent_os.png')
      },
      list: []
    }
  },
  computed: {
    clsRotate() {
      return this.stat.building > 0 ? 'rotate' : ''
    }
  },
  mounted() {
    this.popup = this.refs['popup']
    this.httpGetList('')
  },
  methods: {
    httpGetList(type){
      apiGetList(type).then(res => {
        this.list = res || []
        let stat = {
          building: 0,
          idle: 0,
          physical: 0,
          virtual: 0,
          all: res.length,
        }
        res.forEach(item => {
          stat[item.status]++
          stat[item.type]++
        })
        Object.assign(this.stat, stat)
      })
    },
    handleChangeList(index) {
      let type = ['', 'physical', 'virtual']
      this.listType = index
      this.httpGetList(type[index])
    },
    handlePopup(index, event) {
      let target = event.target.parentNode
      while(!target.classList.contains('list-item')){
        target = target.parentNode
      }
      this.popup.show({
        target,
        index
      })
    },
    handleAddRes(res, index) {
      let item = this.list[index]
      item.resources = item.resources.concat(res)
      apiUpdate(item)
    },
    handleDelRes(item, index) {
      item.resources.splice(index, 1)
      apiUpdate(item)
    }
  },
  watch: {
    listType(newValue, oldValue) {
      console.log('----watch listType')
      console.log(`newValue: ${newValue}, oldValue: ${oldValue}`)
    },
    stat: {
      handler (newValue, oldValue) {
        newValue = JSON.stringify(newValue)
        oldValue = JSON.stringify(oldValue)
        console.log('----watch stat')
        console.log(`newValue: ${newValue}, oldValue: ${oldValue}`)
      },
      deep: true
    },
    "stat.building" (newValue, oldValue) {
      console.log('----watch stat.building')
      console.log(`newValue: ${newValue}, oldValue: ${oldValue}`)
    }
  }
}