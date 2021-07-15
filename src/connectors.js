import { Connectors } from 'web3-react'

const { InjectedConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [100, 43113, 1, 80, 44787, 1666700000] })

export const connectors = { MetaMask }
