import React from 'react';
import './App.css';
import {useEffect, useState} from 'react';
import provider from './dataFinder/provider';
import { ethers } from 'ethers';


function App() {

  const [data, setData] = useState([])

  React.useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    let newData = await getBlocks()
    setData(newData)

  }

  async function getBlocks() {
    const blockHeight = ((await provider.getBlock('latest')).number)
    let recent = []
    for (let i = 0; i < 10; i++ ) {
      const block = await provider.getBlock(blockHeight - i)
      recent.push(block)
    }
    return recent
  }

  return (
    <div className="App">
      <header>
        Recent Blocks
      </header>
      <div>
        <button onClick={fetchData}>Get Data!</button>
        <div>
          {data.map((block) => {
            return (
              <div key={block.number}>
            <h3>Block #{block.number}</h3>
            <p>Had {block.transactions.length} transactions</p>
            <p>And was mined by {block.miner}</p>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
