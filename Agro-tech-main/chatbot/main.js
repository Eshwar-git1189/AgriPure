let chatMessages = document.getElementById('chatMessages');
let userInput = document.getElementById('userInput');

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    // Format the message if it's from the bot and contains structured data
    if (!isUser && message.includes(':')) {
        const formattedMessage = formatBotResponse(message);
        messageDiv.innerHTML = formattedMessage;
    } else {
        messageDiv.textContent = message;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatBotResponse(message) {
    // Split the message into title and content
    const parts = message.split('\n');
    const title = parts[0];
    const content = parts.slice(1);

    // Create formatted HTML
    let formattedMessage = `<div class="bot-response">
        <div class="response-title">${title}</div>
        <div class="response-content">`;

    // Format content based on structure
    content.forEach(line => {
        if (line.trim()) {
            if (line.startsWith('-')) {
                const [label, value] = line.substring(2).split(':');
                formattedMessage += `
                    <div class="info-row">
                        <span class="info-label">${label}:</span>
                        <span class="info-value">${value}</span>
                    </div>`;
            } else {
                formattedMessage += `<div class="plain-text">${line}</div>`;
            }
        }
    });

    formattedMessage += '</div></div>';
    return formattedMessage;
}

function processQuery(query) {
    query = query.toLowerCase();
    
    // Check for crop information
    for (let crop in database.crops) {
        if (query.includes(crop)) {
            const cropInfo = database.crops[crop];
            return `📊 Information about ${cropInfo.name}:
- Soil Type: ${cropInfo.soilType}
- Growing Season: ${cropInfo.season}
- Fertilizers: ${cropInfo.fertilizers}
- Water Needs: ${cropInfo.waterNeeds}
- Tips: ${cropInfo.tips}`;
        }
    }

    // Check for soil type information
    for (let soil in database.soilTypes) {
        if (query.includes(soil)) {
            const soilInfo = database.soilTypes[soil];
            return `🌱 Information about ${soil} soil:
- Description: ${soilInfo.description}
- Suitable Crops: ${soilInfo.suitableCrops}
- Advantages: ${soilInfo.pros}
- Disadvantages: ${soilInfo.cons}
- Management: ${soilInfo.management}`;
        }
    }

    // Check for fertilizer information
    for (let fertilizer in database.fertilizers) {
        if (query.includes(fertilizer)) {
            const fertInfo = database.fertilizers[fertilizer];
            return `💧 Information about ${fertInfo.name}:
- Composition: ${fertInfo.composition}
- Usage: ${fertInfo.usage}
- Benefits: ${fertInfo.benefits}
- Precautions: ${fertInfo.precautions}`;
        }
    }

    // General queries
    if (query.includes('crop') || query.includes('grow')) {
        return `🌾 Available Crops Information:
- Available Crops: ${Object.keys(database.crops).join(', ')}
- Type any crop name to learn more`;
    }
    
    if (query.includes('soil')) {
        return `🌱 Available Soil Types:
- Types: ${Object.keys(database.soilTypes).join(', ')}
- Type any soil name to learn more`;
    }
    
    if (query.includes('fertilizer')) {
        return `💧 Available Fertilizers:
- Types: ${Object.keys(database.fertilizers).join(', ')}
- Type any fertilizer name to learn more`;
    }

    return `❓ Available Topics:
- Crops: rice, wheat, cotton
- Soil Types: clay, loam, sandy
- Fertilizers: NPK, urea, DAP`;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage(message, true);
    const response = processQuery(message);
    addMessage(response);

    userInput.value = '';
}

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});