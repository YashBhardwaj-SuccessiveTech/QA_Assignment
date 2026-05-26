// // cucumber.js
// export default {
//   // Where are your feature files?
//   paths: ['src/features/**/*.feature'],

//   // How to run TypeScript step files
//   requireModule: ['ts-node/register'],

//   // Where are your step definitions and hooks?
//   require: [
//     'src/hooks/**/*.ts',
//     'src/steps/**/*.ts'
//   ],

//   // Report format - multiple formats at once
//   format: [
//     'progress-bar',               // shows progress in terminal
//     'html:reports/report.html',   // HTML report you can open in browser
//     'json:reports/report.json'    // JSON (useful for CI/CD)
//   ],

//   // Stop after first failure? false = run all tests
//   failFast: false,

//   // How many scenarios to run in parallel (1 = sequential)
//   parallel: 1,

//   // Show full error messages
//   formatOptions: {
//     snippetInterface: 'async-await'
//   }
// };

// module.exports = {

//   paths: ['src/features/**/*.feature'],

//   requireModule: ['ts-node/register'],

//   require: [
//     'src/hooks/**/*.ts',
//     'src/steps/**/*.ts'
//   ],

//   format: [
//     'progress-bar',
//     'html:reports/report.html',
//     'json:reports/report.json'
//   ],

//   failFast: false,

//   parallel: 1,

//   formatOptions: {
//     snippetInterface: 'async-await'
//   }
// };



// copy 


// cucumber.js
// export default {
//   // Where are your feature files?
//   paths: ['src/features/**/*.feature'],

//   // How to run TypeScript step files
//   requireModule: ['ts-node/register'],

//   // Where are your step definitions and hooks?
//   require: [
//     'src/hooks/**/*.ts',
//     'src/steps/**/*.ts'
//   ],

//   // Report format - multiple formats at once
//   format: [
//     'progress-bar',               // shows progress in terminal
//     'html:reports/report.html',   // HTML report you can open in browser
//     'json:reports/report.json'    // JSON (useful for CI/CD)
//   ],

//   // Stop after first failure? false = run all tests
//   failFast: false,

//   // How many scenarios to run in parallel (1 = sequential)
//   parallel: 1,

//   // Show full error messages
//   formatOptions: {
//     snippetInterface: 'async-await'
//   }
// };


// final for module 
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