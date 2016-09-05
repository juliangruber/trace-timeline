'use strict'

const render = require('.')

const now = new Date()

document.body.appendChild(render({
  id: 'trace-id',
  spans: [
    {
      id: 'span-1',
      start: new Date(now - 2000),
      end: new Date(now - 1000),
      annotations: [
        {
          ts: now - 1800,
          title: 'cache miss'
        },
        {
          ts: now - 1400,
          title: 'db result'
        }
      ]
    },
    {
      id: 'span-2',
      start: new Date(now - 1000),
      end: now,
      annotations: [
        {
          ts: now - 800,
          title: 'cache hit'
        },
        {
          ts: now - 200,
          title: 'template rendered'
        }
      ]
    },
    {
      id: 'span-3',
      start: new Date(now - 750),
      end: new Date(now - 250),
      annotations: [
        {
          ts: now - 500,
          title: 'calculated'
        }
      ]
    }
  ]
}))
