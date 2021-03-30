import React from 'react'
import { Contract } from 'ethers'
import { useWeb3Context } from 'web3-react'
import aggregatorABI from '../abi/aggregator.abi.json'
import requesterABI from '../abi/requester.abi.json'

const networkConfig = {
    100: {
        aggregator: "0xC3eFff1B3534Ab5e2Ce626DCF1783b7E83154eF4",
        requester: "0xb798723AD7009A637f6C385693b898dAf9311dBB"
    },
    1: {
        aggregator: "0x88c85C8B64F15c1E65e71a366025007d09818dF7",
        requester: "0xbAc955DD10EE42635Fb7D8096871Ab52e0aAA92d" 
    }
}

function useAggregator() {
    const [aggregator, setAggregator] = React.useState(null)
    const [requester, setRequester] = React.useState(null)
    const context = useWeb3Context()

    React.useEffect(() => {
        const aggregator = new Contract(networkConfig[context.networkId].aggregator, aggregatorABI, context.library)
        setAggregator(
            aggregator
        )

        const requester = new Contract(networkConfig[context.networkId].requester, requesterABI, context.library)
        setRequester(
            requester
        )

    }, [setAggregator, setRequester, context])

    return {
        aggregator,
        requester,
    }
}

export default useAggregator;