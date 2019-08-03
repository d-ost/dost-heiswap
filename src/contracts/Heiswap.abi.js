module.exports = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "base",
				"type": "uint256"
			},
			{
				"name": "e",
				"type": "uint256"
			},
			{
				"name": "m",
				"type": "uint256"
			}
		],
		"name": "powmod",
		"outputs": [
			{
				"name": "o",
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
				"name": "s",
				"type": "uint256"
			}
		],
		"name": "ecMulG",
		"outputs": [
			{
				"name": "retP",
				"type": "uint256[2]"
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
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "modn",
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
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			},
			{
				"name": "y",
				"type": "uint256"
			}
		],
		"name": "onCurve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "p",
				"type": "uint256[2]"
			},
			{
				"name": "s",
				"type": "uint256"
			}
		],
		"name": "ecMul",
		"outputs": [
			{
				"name": "retP",
				"type": "uint256[2]"
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
				"name": "beta",
				"type": "uint256"
			},
			{
				"name": "y",
				"type": "uint256"
			}
		],
		"name": "onCurveBeta",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "P",
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
		"inputs": [],
		"name": "G1y",
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
				"name": "p0",
				"type": "uint256[2]"
			},
			{
				"name": "p1",
				"type": "uint256[2]"
			}
		],
		"name": "ecAdd",
		"outputs": [
			{
				"name": "retP",
				"type": "uint256[2]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "G1x",
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
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "evalCurve",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
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
		"inputs": [],
		"name": "N",
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
				"name": "x",
				"type": "uint256"
			},
			{
				"name": "n",
				"type": "uint256"
			}
		],
		"name": "addmodn",
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
		"name": "A",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
