const sendMessage = async (apiKey, number, text, endPoint) => {

    const response = await fetch(endPoint, {
        method: "POST",
        headers: {
            "apiKey": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            number,
            text
        })
    });

    if (!response.ok) {
        throw new Error(`Evolution API error: ${response.status}`);
    }

    return await response.json();
};

module.exports = {
    sendMessage
};