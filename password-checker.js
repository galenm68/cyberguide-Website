
// ================================
// PASSWORD STRENGTH CHECKER
// ================================

// Get the HTML elements
const passwordInput = document.getElementById("passwordInput");
const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const strengthBar = document.getElementById("strengthBar");
const strengthMessage = document.getElementById("strengthMessage");
const showPassword = document.getElementById("showPassword");


// Check password strength whenever someone types
passwordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    // Reset the checker if the field is empty
    if (password.length === 0) {

        strengthText.textContent = "Not Tested";
        strengthFill.style.width = "0%";
        strengthFill.className = "";
        strengthBar.setAttribute("aria-valuenow", "0");

        strengthMessage.textContent =
            "Enter a password to check its strength.";

        return;
    }


    // Password requirements
    const requirements = [
        password.length >= 8,
        password.length >= 12,
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password)
    ];

    // Count how many requirements are met
    let score = requirements.filter(Boolean).length;


    // Check for some commonly used passwords
    const commonPasswords = [
        "password",
        "password123",
        "12345678",
        "qwerty123",
        "admin123",
        "welcome123",
        "letmein",
        "iloveyou"
    ];

    const isCommon = commonPasswords.includes(
        password.toLowerCase()
    );

    // Reduce the score for a commonly used password
    if (isCommon) {
        score = 0;
    }


    // Determine the strength rating
    let rating;
    let message;
    let color;
    let percentage;

    if (score <= 1) {

        rating = "Very Weak";
        message = "This password is easy to guess. Try making it longer.";
        color = "strength-very-weak";
        percentage = 15;

    } else if (score === 2) {

        rating = "Weak";
        message = "Your password needs improvement. Add more characters and variety.";
        color = "strength-weak";
        percentage = 35;

    } else if (score === 3) {

        rating = "Moderate";
        message = "Getting better! Try adding more character types.";
        color = "strength-moderate";
        percentage = 60;

    } else if (score === 4) {

        rating = "Strong";
        message = "Good job! Your password meets most security recommendations.";
        color = "strength-strong";
        percentage = 80;

    } else {

        rating = "Very Strong";
        message = "Excellent! Your password meets all of these basic requirements.";
        color = "strength-very-strong";
        percentage = 100;

    }


    // Update the strength rating
    strengthText.textContent = rating;

    // Update the strength bar
    strengthFill.style.width = percentage + "%";
    strengthFill.className = color;
    strengthBar.setAttribute("aria-valuenow", percentage);

    // Display the recommendation
    if (isCommon) {
        message = "This is a commonly used password. Choose something unique.";
    }

    strengthMessage.textContent = message;

});


// Show or hide the password
showPassword.addEventListener("change", function () {

    if (showPassword.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }

});
