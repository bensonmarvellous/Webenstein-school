document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatContainer = document.querySelector('.chat-sidebar');

    const userName = prompt("Enter your name:");

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            const messageData = {
                user: userName,
                message: message,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            db.ref('messages').push(messageData);
            chatInput.value = '';
        }
    });

    db.ref('messages').on('child_added', (snapshot) => {
        const messageData = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.textContent = `${messageData.user}: ${messageData.message}`;
        messageElement.classList.add(messageData.user === 'User1' ? 'user1' : 'user2');
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
});
});