document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginForm').style.bottom = '0';
    document.getElementById('signupForm').style.bottom = '-100%';
});

document.getElementById('signupBtn').addEventListener('click', function() {
    document.getElementById('signupForm').style.bottom = '0';
    document.getElementById('loginForm').style.bottom = '-100%';
});

document.getElementById('cancelLogin').addEventListener('click', function() {
    document.getElementById('loginForm').style.bottom = '-100%';
});

document.getElementById('cancelSignup').addEventListener('click', function() {
    document.getElementById('signupForm').style.bottom = '-100%';
});