const axios = require('axios');

async function whatsappMsg(mobile, userName) {


    const recipientNumber = "sandbox_number@whatsapp.net"; // Replace with your test recipient number
    const messageBody = "This is a test message from the Sandbox.";

    const url = "https://graph.facebook.com/v18.0/272694079269682/messages"; // Replace with actual endpoint (not available in Sandbox)
    // const data = {
    //     messaging_product: "whatsapp",
    //     to: recipientNumber,
    //     type: "text",
    //     text: {
    //         body: messageBody,
    //     },
    // };

    const data = {
        "messaging_product": "whatsapp",
        "to": mobile,
        "type": "template",
        "template": {
            "name": "hello_world2",
            "language": {
                "code": "en_US"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": userName
                        },
                    ]
                }
            ]
        }
    }

    // Simulate the POST request (not functional in Sandbox)
    await axios.post(url, data, {
        headers: {
            "Authorization": `Bearer EABrg34t6bPMBOZBTkNkVauUWgWzK7QoMvV85FK4pNU53usZBxwlwNANQHmlVpxrFA39Ya08Fgrd3elilUz4ihZBwJRsEqNG17EqjVkUeRxKuGnURIPu5N5wPmKIwdnBxx0k4mDUbjfA69uAD46dACKcWdwrDfJXZAU592vTg7SbaveNyIgoZCJeiypZCPWFGYxCOvWM9jgFVUleMLW`, // Replace with your access token
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log("Simulated API request successful:", response.data);

            return response.data + " - Successfully Submitted"
        })
        .catch((error) => {
            console.error("Simulated API request failed:", error);
        });

}

module.exports = whatsappMsg;