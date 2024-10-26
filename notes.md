## Concepts
- Node: It's a very popular and powerful runtime environment for JavaScript. It was developed to enable computers to run JavaScript out of the browser environment specially for servers.
- NPM: It stands for Node Package Manager. This program is used to manage all the Node dependencies that a project need to run correctly.
- NVM: Node Version Manager. This program helps managing different versions of Node. It is possible to have different versions running on a single server.
- ExpressJs: This is a server
- API: Application Programming Interface. Provide a way for different applications and systems to communicate with each other, extracting data and enabling functionalities. There are several types of API's, for instance, RESTful, Web Sockets.
- API RESTful: This type of API follows the next principles:
  - Client-server architecture
  - Utilices the HTTP protocol
  - Uses cache for a better performance
  - Uses JSON, XML and plain text to interchange information
  - Able to perform GET, PUT, POST, DELETE

## Snippets

### Verify if node is installed
1. Open CLI
2. Type `node -v` and hit enter
3. If the output is something like `v20.x.x` it means Node is installed and there is nothing to do

### Install Node on Linux
1. Read the official documentation
2. Read the official documentation
3. Read the official documentation
### Install ExpressJs
1. Execute `npm install express`

### Hello world width Node and Express

1. Navigate to the project using CLI
2. Run `npm init` and input the required information. This will create a `package.json` file with all information previously entered. Among other important parameters withing the json file, the entry point is the file where the app will start. It is typically `index.js` but we can modify it as needed.
3. Run `npm install express` and wait for the installation.
4. Open the entry point file and add the following code:
   1. const express = require('express')
   2. const app = express()
   3. const port = 5000
   4. app.get('/', (req, res) => {res.send('Hello world!')})
   5. app.listen(port, () =>{console.log(`Example app listening on port ${port}`)})
5. Start the server by running the command `node index.js`
6. Open any browser and type the URL: localhost:5000