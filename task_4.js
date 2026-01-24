
const form = document.querySelector("form");

const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const dob = document.getElementById("dob");
const phone = document.getElementById("phone_number");

function showError(input, message) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error")) {
        error = document.createElement("small");
        error.className = "error";
        input.after(error);
    }
    error.innerText = message;
    error.style.color = "red";
}

function clearError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error")) {
        error.innerText = "";
    }
}

function validateName(input) {
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(input.value.trim())) {
        showError(input, "Only alphabets allowed");
        return false;
    }
    clearError(input);
    return true;
}

function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value.trim())) {
        showError(email, "Invalid email format");
        return false;
    }
    clearError(email);
    return true;
}

function validatePassword() {
    const value = password.value;
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    const percent = Math.min((strength / 5) * 100, 100);

    let message = "Weak";
    if (percent >= 80) message = "Strong";
    else if (percent >= 60) message = "Medium";

    showError(password, `Password Strength: ${message}`);

    return percent >= 80;
}

function validateDOB() {
    const birthDate = new Date(dob.value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        showError(dob, "You must be at least 18 years old");
        return false;
    }
    clearError(dob);
    return true;
}

function validatePhone() {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phone.value)) {
        showError(phone, "Phone number must be 10 digits");
        return false;
    }
    clearError(phone);
    return true;
}

firstName.addEventListener("input", () => validateName(firstName));
lastName.addEventListener("input", () => validateName(lastName));
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
dob.addEventListener("change", validateDOB);
phone.addEventListener("input", validatePhone);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValid =
        validateName(firstName) &&
        validateName(lastName) &&
        validateEmail() &&
        validatePassword() &&
        validateDOB() &&
        validatePhone();

    if (isValid) {
        alert("Form submitted successfully!");
        form.reset();
    } else {
        alert("Please fix the errors before submitting");
    }
});
