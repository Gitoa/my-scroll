export default {
  _touchstart (e) {
    console.log('_touchstart')
    if (!this.options.scrollable) {
      return
    }
    let mark = this.options.direction
    let point = e.touches[0]
    this.prePos = point['client' + mark]
    this.startTime = Date.now()
    this.velocity = 0
  },

  _touchmove (e) {
    e.preventDefault()
    if (!this.options.scrollable) {
      return
    }
    let mark = this.options.direction
    let point = e.touches[0]
    this.currentPos = point['client' + mark]
    this.currentTime = Date.now()
    let delta = this.currentPos - this.prePos
    let duration = this.currentTime - this.startTime
    this.velocity = (delta/duration)
    if (this.pos <= (this.minScrollPos - this.options.bottomBounceDistance)) {//超出上拉边界
      if (delta < 0) return
    } else if (this.pos >= (this.maxScrollPos + this.options.topBounceDistance)) {//超出下拉边界
      if (delta > 0) return
    }
    if (this.pos >= this.maxScrollPos || this.pos <= this.minScrollPos) {
      delta /= 3
    }
    this.pos += delta
    this.prePos = this.currentPos
    this.startTime = this.currentTime
    this.scrollEl.style = `transform: translate${mark}(${this.pos}px)`
    console.log('velocity:', this.velocity)
  },

  _touchend (e) {
    if (this.pos <= this.minScrollPos) {
      this._scrollTo(this.minScrollPos)
    } else if (this.pos >= this.maxScrollPos) {
      this._scrollTo(this.maxScrollPos)
    }
    if (this.velocity !== 0) {
      let distance = this._computedDistance(this.velocity)
      let finalPos = this.pos + distance
      console.log(finalPos)
      finalPos = finalPos > this.topBound ? this.topBound : finalPos
      finalPos = finalPos < this.bottomBound ? this.bottomBound : finalPos
      if (finalPos > this.maxScrollPos) { //惯性超出顶部值
        this._scrollTo(finalPos, 800, 'linear')
      } else if (finalPos < this.minScrollPos) {  //惯性超出底部值
        this._scrollTo(finalPos, 800, 'linear')
      } else {
        this._scrollTo(finalPos, 2500, 'ease-out')
      }
    }
  },

  _touchcancel (e) {
    console.log('_touchcancel')
    this._touchend(e)
  },

  _transitionend (e) {
    console.log('_transitionend')
    this.pos = this._getPos()
    console.log(this.pos)
  }
}