# Run The Server

cd into the server `cd /server`
`npm install`  Install the node modules and neccessary libraries
`npm start`   Starts the application which is production ready.
`npm run dev` Run the developemnt server
`npm run test` To run the server side tests

## Here is the folder structure

---
```
server
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── index.js
│   ├── index.ts
│   ├── socket.test.js
│   └── socket.ts
└── tsconfig.json
---
```

Building the application
'tsc' This will compile the Typescript code into JS and store it in the build folder.
The folder structure should be
```
├── build
│   ├── config
│   │   └── config.js
│   ├── index.js
│   └── socket.js
├── index.js
├── package.json
├── package-lock.json
├── public
│   └── build
│       ├── asset-manifest.json
│       ├── favicon.ico
│       ├── index.html
│       ├── logo192.png
│       ├── logo512.png
│       ├── manifest.json
│       ├── robots.txt
│       └── static
│           ├── css
│           │   ├── main.073c9b0a.css
│           │   └── main.073c9b0a.css.map
│           └── js
│               ├── 787.29be20b0.chunk.js
│               ├── 787.29be20b0.chunk.js.map
│               ├── main.5e2d0d3a.js
│               ├── main.5e2d0d3a.js.LICENSE.txt
│               └── main.5e2d0d3a.js.map
├── README.md
├── src
│   ├── config
│   │   └── config.ts
│   ├── index.ts
│   ├── socket.test.js
│   └── socket.ts
└── tsconfig.json
```

To run the application after the build with `tsc` which will happen immediately after `npm install` command, use the `npm start`
