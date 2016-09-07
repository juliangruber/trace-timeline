'use strict'

const yo = require('yo-yo')
const css = require('yo-css')

module.exports = (trace) => {
  const width = 800
  const start = trace.spans.reduce((acc, span) =>
    Math.min(acc, span.start.getTime()), Infinity)
  const end = trace.spans.reduce((acc, span) =>
    Math.max(acc, span.end.getTime()), 0)
  const dt = end - start
  const lineDt = 200
  const paddedDt = dt + lineDt

  return yo`
    <div style="${css({
      position: 'relative',
      width: `${width}px`,
      height: '400px'
    })}">
      <div style="${css({
        backgroundColor: 'lightblue',
        position: 'absolute',
        height: '1em',
        width: '100%'
      })}">
      </div>
      ${Array(Math.floor(dt / lineDt) + 1).fill(0).map((_, i, arr) => yo`
        <span style="${css({
          position: 'absolute',
          left: `${width / arr.length * i - 1}px`,
          height: '100%',
          borderLeft: '1px solid lightgray',
          paddingLeft: '4px'
        })}">
          ${lineDt * i}ms
        </span>
      `)}
      ${trace.spans.map((span, i) => yo`
        <div style="${css({
          position: 'absolute',
          top: `${i * 5 + 2}em`,
          left: `${(span.start - start) / paddedDt * width - 1}px`,
          right: `${width * (1 - (span.end - start) / paddedDt)}px`,
          backgroundColor: '#ff8',
          border: '1px solid lightblue',
          paddingLeft: '7px',
          height: '1.5em',
          lineHeight: '1.5em'
        })}">
          ${span.id}
          ${span.annotations.map(annotation => yo`
            <span style=${css({
              position: 'absolute',
              left: `${(annotation.ts - span.start) / paddedDt * width - 1}px`,
              borderLeft: '1px solid lightblue',
              paddingLeft: '4px',
              top: '1.5em',
              lineHeight: '1em',
              paddingTop: '0.5em',
              backgroundColor: 'white',
              marginTop: '1px'
            })}>
              ${annotation.title}
            </span>
          `)}
        </div>
      `)}
    </div>
  `
}
