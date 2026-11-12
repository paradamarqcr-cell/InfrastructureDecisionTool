
const readline = require("readline-sync");

// Validate CIDR input
function getCIDR(prompt) {
    while (true) {
        let cidr = readline.question(prompt);

        if (/^\/(1[6-9]|2[0-9]|30)$/.test(cidr)) {
            return parseInt(cidr.substring(1));
        }

        console.log("Invalid CIDR. Enter a value between /16 and /30.");
    }
}

// Validate positive integer
function getDevices() {
    while (true) {
        let devices = readline.question("Enter number of devices required: ");
        let number = Number(devices);

        if (Number.isInteger(number) && number > 0) {
            return number;
        }

        console.log("Please enter a positive whole number.");
    }
}

// Part A: Subnet Host Checker
function subnetHostChecker() {
    console.log("\n--- Subnet Host Checker ---");

    const vpcCIDR = getCIDR("Enter VPC CIDR (example /16): ");
    const subnetCIDR = getCIDR("Enter Subnet CIDR (example /24): ");
    const devices = getDevices();

    // Check if subnet fits inside VPC
    if (subnetCIDR < vpcCIDR) {
        console.log("\nSubnet CIDR is NOT consistent with the VPC CIDR.");
        console.log("The subnet cannot be larger than the VPC.");
        return;
    }

    console.log("\nSubnet CIDR is consistent with the VPC CIDR.");

    // Calculate IP addresses
    const totalIPs = Math.pow(2, 32 - subnetCIDR);
    const usableIPs = totalIPs - 5;

    console.log("Total IP addresses: " + totalIPs);
    console.log("AWS reserved addresses: 5");
    console.log("Usable IP addresses: " + usableIPs);

    if (usableIPs >= devices) {
        console.log("\nThe subnet is SUFFICIENT for the required devices.");

        const unusedIPs = usableIPs - devices;
        console.log("Unused IP addresses: " + unusedIPs);
    } else {
        console.log("\nThe subnet is NOT SUFFICIENT for the required devices.");

        const additionalIPs = devices - usableIPs;
        console.log("Additional IP addresses needed: " + additionalIPs);
    }
}

// Validate application name
function getApplicationName() {
    while (true) {
        let name = readline.question("Enter application name: ").trim();

        if (name.length > 0) {
            return name;
        }

        console.log("Application name cannot be empty.");
    }
}

// Validate monthly users
function getMonthlyUsers() {
    while (true) {
        let users = readline.question("Enter monthly users: ").trim();
        let number = Number(users);

        if (users !== "" && Number.isInteger(number) && number >= 0) {
            return number;
        }

        console.log("Please enter a non-negative whole number.");
    }
}

// Validate monthly budget
function getMonthlyBudget() {
    while (true) {
        let budget = readline.question("Enter monthly budget ($): ").trim();
        let number = Number(budget);

        if (budget !== "" && Number.isFinite(number) && number >= 0) {
            return number;
        }

        console.log("Please enter a valid non-negative budget.");
    }
}

// Validate high availability answer
function getHighAvailability() {
    while (true) {
        let answer = readline.question("Does the application require high availability? (yes/no): ")
            .trim().toLowerCase();

        if (answer === "yes" || answer === "no") {
            return answer === "yes";
        }

        console.log("Please enter yes or no.");
    }
}

// Part B: Compute Environment Selector
function computeEnvironmentSelector() {
    console.log("\n--- Compute Environment Selector ---");

    const applicationName = getApplicationName();
    const monthlyUsers = getMonthlyUsers();
    const monthlyBudget = getMonthlyBudget();
    const highAvailability = getHighAvailability();

    let architecture;

    // Determine recommended architecture
    if (monthlyUsers > 10000 || highAvailability) {
        architecture = "EC2 + Load Balancer + Auto Scaling";
    } else if (monthlyUsers >= 1000) {
        architecture = "EC2 + Load Balancer";
    } else {
        architecture = "Single EC2";
    }

    // Display recommendation
    console.log("\n--- Infrastructure Recommendation ---");
    console.log("Application: " + applicationName);
    console.log("Monthly users: " + monthlyUsers);
    console.log("Monthly budget: $" + monthlyBudget.toFixed(2));
    console.log("High availability: " + (highAvailability ? "Yes" : "No"));

    console.log("\nRecommended architecture:");
    console.log(architecture);

    // Check budget warnings
    console.log("\n--- Budget Analysis ---");

    if (monthlyBudget < 1000 && architecture !== "Single EC2") {
        console.log("WARNING: Your budget is under $1,000.");
        console.log("The recommended architecture requires more than a single EC2 instance.");
    } else if (monthlyBudget >= 1000 &&
               monthlyBudget <= 3000 &&
               architecture.includes("Auto Scaling")) {
        console.log("WARNING: Your budget is between $1,000 and $3,000.");
        console.log("The recommended architecture includes Auto Scaling.");
    } else {
        console.log("No budget warning based on the assignment guidelines.");
    }
}

// Main menu
function main() {
    let running = true;

    while (running) {
        console.log("\n===== Infrastructure Decision Tool =====");
        console.log("1. Subnet Host Checker");
        console.log("2. Compute Environment Selector");
        console.log("3. Exit");

        const choice = readline.question("Choose an option: ");

        switch (choice) {
            case "1":
                subnetHostChecker();
                break;

            case "2":
                computeEnvironmentSelector();
                break;

            case "3":
                running = false;
                console.log("Exiting Infrastructure Decision Tool. Goodbye!");
                break;

            default:
                console.log("Invalid selection. Please choose 1, 2, or 3.");
        }
    }
}

main();
