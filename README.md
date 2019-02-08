# ddd_project

This file presents blockchain based demo's. In order to run these examples the user needs to have nodejs installed on their machine.
You can install nodejs via https://nodejs.org/en/download/ or you can install node via command line with homebrew, an open-source free
package management system.

After you have installed node follow one of the following installation scripts / demo.

> Ganache Demo

For this demo the user is required to download the local blockchain application called Ganache. Ganache can be downloaded at:
https://truffleframework.com/ganache

After installing Ganache, open the application and copy the RPC server address. Place this exact address inside the ganache_demo.js file, as the value of the ganacheURL (line 6). Then copy two addresses and place them inside the same file (ganache_demo) on line 23 / 24.

Your ganache setup is now ready. For the following step we need an external module called web3js, to install this external module run the following script:

```
npm install
```

Or to save the modules in the folder run:

```
npm install --save

```

After npm installed all the required modules we can run the ganache_demo.js file with node. We can do so by running the following script:

```
node ganache_demo.js
```

Congrats, you just made your first local blockchain transaction. You can now detect a transaction from address 1 specified on line 23, to address 2, specified on line 24.

> JS Blockchain demo

For the JS blockchain demo another external module is required. If you ran the command;

```
npm install
```

or:

```
npm install --save
```

You are good to go, if not, please do so. For the JS Blockchain demo we also require an external module called sha256.
The sha256 package allows us to created hashes based on values of an object. In order to execute the file, run the following script:

```
node js_blockchain.js
```

Inside your console you can now detect; a genisis block (initial block of the chain), first block mined and a second block mined.
You will also find the output; is my chain valid? first resulting to true and after to false. This is due to the concept of 'tempering' on line 112.

resources: Stephen Grider && Xavier decuyper
