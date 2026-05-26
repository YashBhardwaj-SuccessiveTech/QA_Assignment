{
  "name": "qa_assignment",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "cucumber-js",
    "test:headed": "cucumber-js --world-parameters '{\"headless\":false}'",
    "test:parallel": "cucumber-js --parallel 2"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "devDependencies": {
    "@cucumber/cucumber": "^12.9.0",
    "@playwright/test": "^1.60.0",
    "@types/node": "^25.9.1",
    "ts-node": "^10.9.2",
    "typescript": "^6.0.3"
  }
}


first package.json 

{
  "name": "playwright_assignment",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "cucumber-js",
    "test:headed": "HEADLESS=false cucumber-js",
    "test:tags": "cucumber-js --tags"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@cucumber/cucumber": "^12.9.0",
    "@playwright/test": "^1.60.0",
    "@types/node": "^25.9.1",
    "ts-node": "^10.9.2"
  },
  "dependencies": {
    "@faker-js/faker": "^10.4.0",
    "typescript": "^6.0.3"
  }
}


ts-config.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "node16",
    "moduleResolution": "node16",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "resolveJsonModule": true,
    "noImplicitAny": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
