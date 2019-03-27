<template>
  <div class='container'>
    <div class='middle' style='width:100%; background-color:red;'>
      <div v-for='(a, index) in arr' class='item'>{{ index }}</div>
    </div>
  </div>
</template>

<script>
import Scroll from '../../myscroll/index'
export default {
  data () {
    return {
      arr: [1, 2],
      startY: 0,
      startX: 0,
      pageY: 0,
      pageX: 0,
      el: {}
    }
  },
  mounted () {
    let myScroll = new Scroll(document.querySelector('.container'))
  },
  methods: {
    touchmoveF (e) {
      console.log(e.changedTouches[0].pageY)
      let newY = e.changedTouches[0].pageY
      let delta = newY - this.startY
      this.startY = newY
      this.pageY += delta
      console.log(this.pageY, delta)
      this.el.style = `transform: translateY(${this.pageY}px)`

    },
    touchstartF (e) {
      this.startY = e.changedTouches[0].pageY
      console.log('touchstart')
      console.log(e)
    }
  }
}
</script>

<style lang='scss' scoped>
  div {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container {
    height: 400px;
    width: 300px;
    border: solid 2px #ccc;
    overflow: hidden;
  }
  .item {
    background: linear-gradient(red, yellow);
    border: solid 1px #fff;
    height: 400px;
    width: 100%;
  }
</style>