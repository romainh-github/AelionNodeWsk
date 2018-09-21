# AelionNodeWsk
Server websocket with node

Install instructions:

$: cd [YourFolder]
$: npm init
$: npm i ws express --save

Check if typescript package is already installed:
$: npm list -g typescript

If not:
$: npm i typescript -g

Install express and node @types as dev dependencies:
$: npm i @types/ws @types/express -D

Compile command:
$ cd [YourFolder]
$: ./node_modules/.bin/tsc
$: node ./dist/server/ws.server



