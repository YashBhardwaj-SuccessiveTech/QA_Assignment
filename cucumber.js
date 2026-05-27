export default {

  paths: ['src/features/**/*.feature'],

  import: [
    'src/hooks/**/*.ts',
    'src/steps/**/*.ts'
  ],

  loader: ['ts-node/esm'],

  format: [
    'progress-bar',
    'html:reports/report.html',
    'json:reports/report.json'
  ],

  failFast: false,

  parallel: 1,

  formatOptions: {
    snippetInterface: 'async-await'
  }
};