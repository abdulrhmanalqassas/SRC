import json

import solcx
from web3 import Web3
from solcx import compile_files, link_code, compile_source

#Sol compiler
solcx.install_solc(version='0.4.21')
solcx.set_solc_version('0.4.21')
# web3.py instance
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))


def deploy_contract(contract_interface):

    w3.eth.default_account = w3.eth.accounts[0]
    # Instantiate and deploy contract
    contract = w3.eth.contract(
        abi=contract_interface['abi'],
    )

    # Get transaction hash from deployed contract
    tx_hash = w3.eth.contract(
        abi=contract_interface['abi'],
        bytecode=contract_interface['bin']).constructor().transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    address = tx_receipt['contractAddress']

    # Get tx receipt to get contract address
    return address

def get_contract_interface():
    solcx.install_solc(version='0.4.21')
    solcx.set_solc_version('0.4.21')
    with open('vaccine-card.sol', 'r') as f:
        source = f.read()
        solcx.compile_source(source)
        contracts = compile_files(['vaccine-card.sol'])
        # separate main file and link file
        main_contract = contracts.pop("vaccine-card.sol:vaccineRecords")
        return main_contract