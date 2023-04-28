# uptime-monitor

## Introduction

This a Node.js project that uses playwright and the [PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) to determine how much time it takes to complete the uptime check.

## Configuration

The uptime monitor configuration is located inside the `uptime-monitor.config.json` file.

Example config,

```js
{
  checks: [
    {
      url: 'http://www.google.com',
      contentRequirements: [
        {
          type: 'text',
          value: 'google',
        },
      ],
    },
    {
      url: 'http://localhost:3000',
      contentRequirements: [
        {
          type: 'text',
          value: 'google',
        },
      ],
    },
  ],
  interval: 60, //seconds
}
```

| Parameter | Description |
| --- | --- |
| `checks` | Array of checks to run against the website set using the *url* field |
' `url` | Website address |
| `interval` | Frequency of running the monitor checks |
| `contentRequirements` | Arry of checks to run against the website  |



