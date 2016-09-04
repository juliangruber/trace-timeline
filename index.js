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

  return yo`
    <div style="${css({
      position: 'relative',
      width: `${width}px`,
      height: '400px'
    })}">
      ${trace.spans.map((span, i) => yo`
        <div style="${css({
          position: 'absolute',
          top: `${i * 2}em`,
          left: `${(span.start - start) / dt * width}px`,
          right: `${width * (1 - (span.end - start) / dt)}px`,
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
              left: `${(annotation.ts - span.start) / dt * width + 1}px`,
              borderLeft: '1px solid lightblue',
              paddingLeft: '4px',
              top: '1.5em',
              lineHeight: '1em',
              paddingTop: '0.5em'
            })}>
              ${annotation.title}
            </span>
          `)}
        </div>
      `)}
    </div>
  `
}
