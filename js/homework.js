document.addEventListener('DOMContentLoaded', () => {
    const subjectHeaders = document.querySelectorAll('.subject-header');
    subjectHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const assignment = header.nextElementSibling;
            assignment.style.display = assignment.style.display === 'block' ? 'none' : 'block';
        });
    });
});

function submitAssignment(assignmentId) {
    const fileInput = document.getElementById('fileInput' + assignmentId.slice(-1));
    const file = fileInput.files[0];
    const statusElement = document.querySelector(`#${assignmentId} .status`);
    
    if (file) {
        const url = URL.createObjectURL(file);
        statusElement.textContent = 'Submitted';
        statusElement.className = 'status submitted';
        console.log(`File URL for ${assignmentId}:`, url); // Debugging log
        alert('File uploaded successfully!');
    } else {
        alert('Please select a file to upload.');
    }
}

document.addEventListener("DOMContentLoaded", loadPage);

function uploadHomework(inputId, subject) {
    const fileInput = document.getElementById(inputId);
    const file = fileInput.files[0];
    const statusElement = document.getElementById(subject.toLowerCase() + 'Status');
    
    if (file) {
        const url = URL.createObjectURL(file);
        // Simulate file upload and feedback
        setTimeout(() => {
            statusElement.textContent = 'Submitted';
            statusElement.style.color = '#28a745';
            // Save to localStorage (or send to server in a real application)
            saveHomework(subject, url);
            // Hide file input and button after submission
            fileInput.style.display = 'none';
            fileInput.nextElementSibling.style.display = 'none';
        }, 1000);
    } else {
        alert('Please select a file to upload.');
    }
}

function saveHomework(subject, url) {
    let homework = JSON.parse(localStorage.getItem('homework')) || [];
    homework.push({ subject, url, date: new Date().toISOString() });
    localStorage.setItem('homework', JSON.stringify(homework));
    loadReminders();
}

function loadPage() {
    loadReminders();
    loadDiscussions();
}

function loadReminders() {
    const reminderList = document.getElementById('reminderList');
    const homework = JSON.parse(localStorage.getItem('homework')) || [];
    reminderList.innerHTML = '';
    homework.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.subject}</td><td>${new Date(item.date).toLocaleDateString()}</td>`;
        reminderList.appendChild(row);
    });
}


//TIME MANAGEMENT
document.addEventListener("DOMContentLoaded", loadTimetable);

function loadTimetable() {
    const timetable = [
        { time: '9:00 - 10:00', monday: 'Math', tuesday: 'Science', wednesday: 'History', thursday: 'English', friday: 'Physics' },
        { time: '10:00 - 11:00', monday: 'Chemistry', tuesday: 'Math', wednesday: 'Science', thursday: 'History', friday: 'English' },
        { time: '11:00 - 12:00', monday: 'English', tuesday: 'Physics', wednesday: 'Math', thursday: 'Science', friday: 'History' },
        { time: '12:00 - 1:00', monday: 'Physics', tuesday: 'Chemistry', wednesday: 'English', thursday: 'Math', friday: 'Science' },
    ];

    const timetableElement = document.getElementById('timetable');

    timetable.forEach(slot => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${slot.time}</td>
            <td class="timetable-slot monday">${slot.monday}</td>
            <td class="timetable-slot tuesday">${slot.tuesday}</td>
            <td class="timetable-slot wednesday">${slot.wednesday}</td>
            <td class="timetable-slot thursday">${slot.thursday}</td>
            <td class="timetable-slot friday">${slot.friday}</td>
        `;

        timetableElement.appendChild(row);
    });
}

function syncWithCalendar() {
    alert('Syncing with personal calendar...');
    // Logic to sync with personal calendar (e.g., Google Calendar) would go here
}

function setReminders() {
    alert('Setting reminders...');
    // Logic to set reminders (e.g., notifications or email alerts) would go here
}


//DISUSSION SECTION
let discussions = [];

function searchDiscussions() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const filteredDiscussions = discussions.filter(discussion => 
        discussion.text.toLowerCase().includes(searchQuery)
    );
    displayDiscussions(filteredDiscussions);
}

function showAskQuestionModal() {
    document.getElementById('askQuestionModal').style.display = 'block';
}

function closeAskQuestionModal() {
    document.getElementById('askQuestionModal').style.display = 'none';
}

function postDiscussion() {
    const questionText = document.getElementById('questionText').value;
    const newDiscussion = {
        id: discussions.length + 1,
        studentName: "Student Name", // Placeholder name
        info: "Class Info", // Placeholder info
        text: questionText,
        replies: []
    };
    discussions.push(newDiscussion);
    displayDiscussions(discussions);
    document.getElementById('questionText').value = '';
    closeAskQuestionModal();
}

function postReply(discussionId) {
    const replyText = document.getElementById(`replyText-${discussionId}`).value;
    const discussion = discussions.find(disc => disc.id === discussionId);
    if (discussion) {
        discussion.replies.push(replyText);
        displayDiscussions(discussions);
    }
}

function displayDiscussions(discussions) {
    const discussionList = document.getElementById('discussionList');
    discussionList.innerHTML = '';
    discussions.forEach(discussion => {
        const discussionPost = document.createElement('div');
        discussionPost.classList.add('discussion-post');
        discussionPost.innerHTML = `
            <div class="student-info">${discussion.studentName} - ${discussion.info}</div>
            <div class="question">${discussion.text}</div>
            <div class="reply-section">
                <textarea id="replyText-${discussion.id}" placeholder="Write a reply..."></textarea>
                <button onclick="postReply(${discussion.id})">Reply</button>
                <div class="replies">
                    ${discussion.replies.map(reply => `<p>${reply}</p>`).join('')}
                </div>
            </div>
        `;
        discussionList.appendChild(discussionPost);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Display initial discussions if any
    displayDiscussions(discussions);
});

