import React from 'react';
import useAggregator from '../hooks/useAggregator'
import { Alert, Button, Card, Navbar} from 'react-bootstrap'
import { useWeb3Context } from 'web3-react';

const networks = {
    100: {
        name: "xdai",
        explorer: "http://blockscout.com/poa/xdai",
    },
    1: {
        explorer: "http://cchain.explorer.avax-test.network", // for some reason metamask reports networkID as 1 even though it should be 43113
        name: "avax-test"
    },
    80: {
        explorer: null,
        name: "plasm-dusty"
    }
}

export default function AggregatorState() {
    const context = useWeb3Context()

    const { aggregator, requester } = useAggregator()
    const [ latestAnswer, setLatestAnswer ] = React.useState(0)
    const [ oracles, setOracles ] = React.useState([])

    const [ events, setEvents ] = React.useState([])

    React.useEffect(() => {
        if (aggregator) {
            aggregator.latestAnswer().then(r =>
                setLatestAnswer(r.toNumber())
            )
            aggregator.getOracles().then(os => {
                setOracles(os)
            })
            aggregator.on("NewRound", (e) => {
                setEvents(events => {
                    var newEvents = [...events]
                    newEvents.push({
                        type: "NewRound",
                        data: e.toString()
                    })
                    return newEvents
                })
            })
            aggregator.on("AnswerUpdated", (e) => {
                setLatestAnswer(e.toNumber())
                setEvents(events => {
                    var newEvents = [...events]
                    newEvents.push({
                        type: "AnswerUpdated",
                        data: e.toString()
                    })
                    return newEvents
                })
            })
        }
    }, [aggregator])

    function requestNewRound() {
        requester.connect(context.library.getSigner()).requestNewRound().then(tx => {
            tx.wait().then(() => {

            })
        }).catch(console.error)
    }

    return (
        <>
            <Navbar>
                <Navbar.Brand>Test Dapp for Chainlink</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        [{networks[context.networkId].name}] Using Aggregator at&nbsp;
                        {
                            networks[context.networkId].explorer?
                                <a href={`${networks[context.networkId].explorer}/address/${aggregator?aggregator.address:"loading"}`}>
                                    {aggregator?aggregator.address:"loading"}
                                </a>
                                :
                                <a href="#no-explorer" onClick={() => alert(`The ${networks[context.networkId].name} network does not support EVM block explorers.`)}>
                                    {aggregator?aggregator.address:"loading"}
                                </a>
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <Alert variant="info">
                Latest answer: {latestAnswer * Math.pow(10, -8)} ({latestAnswer})
            </Alert>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Request a new round
                    </Card.Title>
                    <Card.Text>
                        Using this button, you can request a new price to be retrieved from the public APIs the oracles are using.
                    </Card.Text>
                    <Button variant="primary" onClick={requestNewRound}>
                        requestNewRound()
                    </Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Oracle Updater Addresses
                    </Card.Title>
                    <Card.Text>
                        {oracles.map(o => <span>{o}</span>)}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Events
                    </Card.Title>
                    <Card.Text>
                        {events.map(e => 
                            <p>{e.type}: {e.data}</p>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
