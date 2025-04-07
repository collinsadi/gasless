# Gasless - ERC 2612 Implementation

Gasless is an experimental tool that leverages **ERC 2612** to enable users to send tokens without the need for ETH to pay for gas. This project aims to simplify token transactions by eliminating the upfront requirement for ETH, creating a seamless experience for users.


## Features

- **Gasless Transactions**: Users can send tokens on supported chains (e.g., Sepolia) without holding ETH for gas.
- **Claim Test Tokens**: Navigate to the **Claim** tab to claim demo tokens for testing the tool. These tokens are available only for test purposes on supported test networks.
- **ERC 2612 Support**: Implements the **EIP-2612** standard, which introduces `permit()` functionality for gasless token approvals.

## How It Works

1. Users claim demo tokens via the **Claim** tab.
2. The Gasless tool calculates the gas fees for transactions and integrates them into the backend.
3. Tokens are transferred without requiring ETH in the user's wallet to pay for gas.

## Known Limitations

- **Fee Calculation**: The current gas fee calculation system may not be entirely accurate. Contributions to improve this system are welcome in the **Backend** folder of the repository.

## Future Improvements

- **Uniswap Integration**: Plan to integrate Uniswap functionality to enhance gas efficiency. The goal is to split charges and swap the amount spent on gas for more ETH using Uniswap.

## Contribute

Gasless is an open-source experimental implementation of **EIP-2612**, and contributions are highly encouraged! If you have any ideas or suggestions to enhance the project, feel free to contribute to the repository.

## Disclaimer

This tool is an **experimental implementation** of the ERC-2612 standard. Use it at your own discretion, and note that it is still in active development.
