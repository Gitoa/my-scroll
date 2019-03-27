export default {
  _translate (pos) {
    let mark = this.options.direction
    this.scrollStyle.transform = `translate${mark}(${pos}px) ${this.translateZ}`
  },
  _transition (duration, timingfunction) {
    this.scrollStyle.transitionDuration = duration
    this.scrollStyle.transitionTimingFunction = timingfunction
  },
  _scrollTo (pos, duration, style) {
    if (this.pos === pos) {
      return
    }
    if (duration > 0) {
      this._transition(
        duration + 'ms',
        style
      )
    }
    this._translate(pos)
  },

  _getPos () {
    let mark = this.options.direction
    return mark === 'Y' ? this._getTranslateY() : this._getTranslateX
  },

  _getTranslateX () {
    let matrix = new WebKitCSSMatrix(this.computedStyle.webkitTransform)
    return matrix.m41
  },

  _getTranslateY () {
    let matrix = new WebKitCSSMatrix(this.computedStyle.webkitTransform)
    return matrix.m42
  },

  _computedDistance (velocity) {
    return velocity * 100
  }
}