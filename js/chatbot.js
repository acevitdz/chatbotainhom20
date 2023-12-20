function toggleChat() {
    var chatInterface = document.getElementById('chat-interface');
    chatInterface.style.display = chatInterface.style.display === 'none' ? 'block' : 'none';
}
async function sendMessage() {
    var userInput = document.getElementById('user-input');
    var message = userInput.value.trim();
    if (message) {
        // Hiển thị tin nhắn của người dùng
        displayMessage(message, 'user');

        const url = 'https://chatgpt146.p.rapidapi.com/q';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '9457e4852fmsh0229ef9eba3064ap1c58c1jsna63359cdaac0',
                'X-RapidAPI-Host': 'chatgpt146.p.rapidapi.com'
            },
            body: JSON.stringify({
                prompt: message
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result && result.content) {
                displayMessage(result.content, 'bot');
            }
        } catch (error) {
            console.error(error);
            displayMessage("Xin lỗi, có lỗi xảy ra khi kết nối với chatbot.", 'bot');
        }

        userInput.value = '';
    }
}



function displayMessage(message, sender) {
    var chatMessages = document.getElementById('chat-messages');
    var messageElement = document.createElement('li');
    messageElement.textContent = message;
    messageElement.className = sender;
    chatMessages.appendChild(messageElement);


    // Kiểm tra và kích hoạt thanh cuộn nếu cần
    var chatBody = document.getElementById('chat-body');
    if (chatBody.scrollHeight > chatBody.clientHeight) {
        chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
    }
}





