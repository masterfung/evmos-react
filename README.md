# Evmos React Project

## Overview

This project utilizes EVMOS node (locally) with Hardhat, Ethers.js, React, Node, React Router, Ant Design (UI), Cosm.JS, Metamask, Github to create a working model of Ethereum on the Cosmos network.

## Installation

Before you get started, please visit: [Evmos](https://evmos.dev/quickstart/run_node.html#). Make sure you have all the dependencies required in the docs.

Next, [Metamask](https://metamask.io/) will be required. It is a Chrome extension (or available on Brave). This repo has only been tested on Chrome (so user discretion advised).

You will need to pull down this repo via either HTTPS or .git and do `npm install` to install all project dependencies. If you do not have `git` installed, I would use [homebrew](https://brew.sh/) for all your needs. Next would be to open up the code to your favorite text editor.

Before you start the `./init.sh` command, you will need to add add a `.env` file at your root level and generate at least three evmosd accounts. Please jot down the mnemonic seed phrase whereby you can use them to recover them (be used to add to your localnet). You will need to load in the private keys (of at least three accounts) to the `.env` file for hardhat.

Run the `./init.sh` file and after a minute, you can stop it to load in all the recovery account (or you can do it in the shell file). Whichever options you choose to follow, make sure afterwards, go to the `app.toml` and change the `enabled-unsafe-cors` to `true`, `enable` to `true`, and `swagger` to `true` in the API section.

The command to get the evmosd started for this project is `evmosd start --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable` on a new terminal tab.

Once you had loaded the evmos node with three accounts and started it, the next step is to deploy the contracts (Simple Storage and Token) to the the node. `npx hardhat run src/backend/scripts/deployTokenContract.js ` and `npx hardhat run src/backend/scripts/deploySimpleContract.js ` will deploy to the node.

In a separate terminal tab/window, launch the React app with `npm start` to `localhost:3000`.

## Challenges and Thoughts

This project has been fun and I learned quite a bit. Though I am completely new to blockchain development, I appreciate the help Evmos team have provided. The documentation and processes are pretty well-documented with each individual project but the integration often requires some finesse and problem solving to get right. For example, I used Create-React-App (CRA) and it uses Webpack 5, which caused a slew of problems since there were many polyfills that were not included in the upgrade from CRA 4 to version 5. I did not encounter the errors until I started using crypto libraries to convert ETH address to Evmos address. Though I originally downgraded to CRA 4, I later ran into another major issue in CRA 4 that required me to return back to CRA 5 (where the bug was address by the CRA team). 

This [link](https://github.com/ChainSafe/web3.js#troubleshooting-and-known-issues) provided steps to resolving this but I had to add [path](https://stackoverflow.com/questions/70559396/webpack-breaking-change) to the overrride to get Webpack to run. User should be aware of what is happening here. Another link that is helpful, if users choose to eject their CRA build, is this [plugin](https://www.npmjs.com/package/node-polyfill-webpack-plugin) to aid their polyfill concerns.

When I read over the requirements, I saw the team suggested the use of a static checker for Javascript (Flow) or the use of Typescript. I chose to continue with the development of Javascript since I was not familiar with Typescript. It is on top of my list of things I will learn in the next two months. I do believe there are huge advantages for one to utilize strongly typed language (like TS). However, there were many new tools to learn (and the onset of a terrible flu) that I felt the best use of my time needed to localize with my getting started on the project.

Working on the Ethereum side, the overall project tooling has been good and this project so far has been able to highlight that side. However, at this time, I am stuck at the Evmos implementation side and cannot move forward without utilizing Golang.