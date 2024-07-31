document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const startCallButton = document.getElementById('startCallButton');


    // Chat Form Submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

   
    // Start Jitsi Call
    startCallButton.addEventListener('click', () => {
        const domain = 'meet.jit.si';
        const options = {
            roomName: 'virtual-classroom', // Use a unique room name
            width: 800,
            height: 600,
            parentNode: document.querySelector('#jitsi-container'),
            configOverwrite: { startWithVideoMuted: false },
            interfaceConfigOverwrite: { filmStripOnly: false }
        };

        const api = new JitsiMeetExternalAPI(domain, options);
    });
});


//Quiz section
function submitPoll() {
    const pollForm = document.getElementById('pollForm');
    const pollResults = document.getElementById('pollResults');
    const formData = new FormData(pollForm);
    const pollAnswer = formData.get('poll');

    if (pollAnswer) {
        pollResults.innerHTML = `<p>Thank you for voting! You selected: ${pollAnswer}</p>`;
    } else {
        pollResults.innerHTML = `<p>Please select an option before submitting.</p>`;
    }
}

function submitQuiz() {
    const quizForm = document.getElementById('quizForm');
    const quizResults = document.getElementById('quizResults');
    const formData = new FormData(quizForm);
    let score = 0;
    
    if (formData.get('q1') === 'Hypertext Markup Language') {
        score++;
    }
    if (formData.get('q2') === 'Yes') {
        score++;
    }
    if (formData.get('q3') === 'h1') {
        score++;
    }

    quizResults.innerHTML = `<p>You scored ${score} out of 3.</p>`;
}


//upload resource section
document.addEventListener("DOMContentLoaded", loadResources);

function uploadResource() {
    const fileUpload = document.getElementById('fileUpload');
    const uploadStatus = document.getElementById('uploadStatus');
    const resourceList = document.getElementById('resourceList');
    const file = fileUpload.files[0];
    
    if (file) {
        const url = URL.createObjectURL(file);
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="${url}" download="${file.name}">${file.name}</a>
            <button onclick="deleteResource('${file.name}', this)">Delete</button>
        `;
        resourceList.appendChild(listItem);
        
        uploadStatus.textContent = 'File uploaded successfully!';
        saveResource(file.name, url);
        fileUpload.value = '';  // Clear the file input
    } else {
        uploadStatus.textContent = 'Please select a file to upload.';
    }
}

function saveResource(name, url) {
    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources.push({ name, url });
    localStorage.setItem('resources', JSON.stringify(resources));
}

function loadResources() {
    const resourceList = document.getElementById('resourceList');
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    
    resourceList.innerHTML = ''; // Clear existing list
    resources.forEach(resource => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="${resource.url}" download="${resource.name}">${resource.name}</a>
            <button onclick="deleteResource('${resource.name}', this)">Delete</button>
        `;
        resourceList.appendChild(listItem);
    });
}

function deleteResource(name, element) {
    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources = resources.filter(resource => resource.name !== name);
    localStorage.setItem('resources', JSON.stringify(resources));
    element.parentElement.remove();  // Remove the corresponding list item from the DOM
}
