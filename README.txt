Infrastructure Decision Tool

Description:
This program is written in Node.js and contains two tools:
1. Subnet Host Checker
2. Compute Environment Selector

Requirements:
- Node.js
- readline-sync

Installation:
1. Open the project folder in VS Code.
2. Run: npm install
3. Run: node infrastructure.js

PART A - SUBNET HOST CHECKER

Example 1: Sufficient subnet

VPC CIDR: /16
Subnet CIDR: /24
Required devices: 200

Total IP addresses: 256
AWS reserved addresses: 5
Usable IP addresses: 251
Unused IP addresses: 51

Result: Subnet is sufficient.

Example 2: Insufficient subnet

VPC CIDR: /16
Subnet CIDR: /24
Required devices: 300

Total IP addresses: 256
AWS reserved addresses: 5
Usable IP addresses: 251
Additional IP addresses needed: 49

Result: Subnet is not sufficient.

PART B - COMPUTE ENVIRONMENT SELECTOR

The program recommends an AWS architecture based on:
- Application name
- Monthly users
- Monthly budget
- High availability requirements

Possible recommendations:
- Single EC2
- EC2 + Load Balancer
- EC2 + Load Balancer + Auto Scaling

The program also displays budget warnings
based on the assignment guidelines.

Author: [Carlo Parada]