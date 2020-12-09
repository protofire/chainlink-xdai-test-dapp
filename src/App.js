import React from 'react';
import { useWeb3Context } from 'web3-react'
import AggregatorState from './components/AggregatorState'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap'


function App() {
  const context = useWeb3Context()

  React.useEffect(() => {
    if (!context.active) {
      context.setFirstValidConnector(['MetaMask'])
    }
  }, [context])

  let content = null
  if (!context.active && !context.error) {
    content = <div>'Loading...'</div>
  } else if (context.error) {
  content = <div>'There was an error: {context.error.toString()}'</div>
  } else {
    content = <AggregatorState />
  }

  return (
    <Container>
      <div className="App">
        {content}
      </div>
    </Container>
  );
}

export default App;
