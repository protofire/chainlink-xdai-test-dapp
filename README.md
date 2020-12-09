# Test dapp for Chainlink on xDAI

This is a sample application which connects to an AccessControlledAggregator running on the xDAI chain.  
To run it, simply install the dependencies and run the application:
```bash
$ yarn
$ yarn start
```

You need to have your Metamask extenson configured for use with the xDAI sidechain. For instructions, head over to [xdaichain.com](https://xdaichain.com)

## Stack

- [create-react-app](https://github.com/facebook/create-react-app) was used for the initial React setup
- [web3-react](https://github.com/NoahZinsmeister/web3-react/tree/v5) is used for connecting to ethereum. Notice that we
  are using v5.
- [ethers.js](https://docs.ethers.io/ethers.js/html/) is used as the web3 library. We are using v4.
