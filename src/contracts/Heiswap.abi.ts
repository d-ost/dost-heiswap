export default [
  {
    "constant": false,
    "inputs": [
      {
        "name": "publicKey",
        "type": "uint256[2]"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "amountEther",
        "type": "uint256"
      },
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "c0",
        "type": "uint256"
      },
      {
        "name": "keyImage",
        "type": "uint256[2]"
      },
      {
        "name": "s",
        "type": "uint256[]"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "etherAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "idx",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "amountEther",
        "type": "uint256"
      }
    ],
    "name": "getCurrentRingIdx",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "amountEther",
        "type": "uint256"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getParticipants",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      },
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "amountEther",
        "type": "uint256"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getPublicKeys",
    "outputs": [
      {
        "name": "",
        "type": "bytes32[2][6]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "amountEther",
        "type": "uint256"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRingHash",
    "outputs": [
      {
        "name": "",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getRingMaxParticipants",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "relayerUrl",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
