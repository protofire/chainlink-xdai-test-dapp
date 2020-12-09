import React from 'react'
import { Contract } from 'ethers'
import { useWeb3Context } from 'web3-react'
import aggregatorABI from '../abi/aggregator.abi.json'
import requesterABI from '../abi/requester.abi.json'

function useAggregator() {
    const [aggregator, setAggregator] = React.useState(null)
    const [requester, setRequester] = React.useState(null)
    const context = useWeb3Context()

    React.useEffect(() => {
        const aggregator = new Contract("0xC3eFff1B3534Ab5e2Ce626DCF1783b7E83154eF4", aggregatorABI, context.library)
        setAggregator(
            aggregator
        )

        const requester = new Contract("0xb798723AD7009A637f6C385693b898dAf9311dBB", requesterABI, context.library)
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