import config from './config'
import event from './core/event'
import init from './core/init'
import method from './core/method'
import scrollbar from './core/scrollbar'

export default function MyScroll (el, options) {
  let _this = this
  console.log(el)
  this.wrapEl = typeof el === 'string' ? document.querySelector(el) : el
  console.log(this.wrapEl)
  if (!this.wrapEl) {
    console.log('can not resolve the wrap dom')
    return 
  }
  this.options = Object.assign({}, config, options)
  //获取滚动节点，即第一个子节点
  let scrollEl = this.options.scrollEl
  if(!scrollEl) {
    this.scrollEl = this.wrapEl.firstElementChild
  } else {
    this.scrollEl = (typeof scrollEl === 'string') ? this.wrapEl.querySelector(scrollEl) : scrollEl
  }
  if (!this.scrollEl) {
    console.log('the wrapEl need a scroll element')
    return 
  }

  this.scrollStyle = this.scrollEl.style

  this.scrollStyle.transitionProperty = 'transform'
  this.scrollStyle.transitionDuration = '0s'
  this.scrollStyle.transitionTimingFunction = 'ease-out'
  this.scrollStyle.transitionDelay = '0s'
  this.translateZ = this.options.gpu ? 'translateZ(0)' : ''



  this.computedStyle = window.getComputedStyle(this.scrollEl)
  this.pos = 0  //元素当前位置
  this.prePos = 0 //滚动事件触发的前一位置（相对值
  this.currentPos = 0 //滚动是件触发的后一位置（相对值
  this.pagePos = 0  //
  this.minScrollPos = 0   //最小位置，超出回弹（上拉为负，对应底部位置
  this.minScrollPos = this.wrapEl.offsetHeight - this.scrollEl.offsetHeight
  this.maxScrollPos = 0   //最大位置，超出回弹（下拉为正，对应顶部位置
  this.topBounceDistance = 0  //顶部下拉最大距离（相对值
  this.bottomBounceDistance = 0 //底部上拉时最大距离（相对值
  this.topBound = this.maxScrollPos + this.topBounceDistance  //顶部下拉最大位置
  this.bottomBound = this.minScrollPos + this.bottomBounceDistance  //底部上拉最小位置

  this.startTime = 0
  this.currentTime = 0
  this.distance = 0
  this.velocity = 0

  this.scrollEl.addEventListener('touchstart', function(e) {
    _this._touchstart(e)
  }, false)
  this.scrollEl.addEventListener('touchmove', function(e) {
    console.log(e.target)
    console.log('touchmove')
  }, false)
  this.scrollEl.addEventListener('touchend', function(e) {
    console.log(e.target)
    console.log('touchend')
  }, false)
  this.scrollEl.addEventListener('transitionend', function(e) {
    _this._transitionend(e)
  }, false)
  this.scrollEl.addEventListener('touchcancel', function(e) {
    _this._touchcancel(e)
  }, false)
}

Object.assign(MyScroll.prototype, init, event, method, scrollbar)