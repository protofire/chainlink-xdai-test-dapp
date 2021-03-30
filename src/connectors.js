import { Connectors } from 'web3-react'

const { InjectedConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [100, 43113, 1] })

export const connectors = { MetaMask }
