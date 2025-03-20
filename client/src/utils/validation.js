// Simple email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Check if name only contains letters, spaces, and basic punctuation
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  return nameRegex.test(name);
};

// Check if password meets minimum requirements
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Main form validation for the login/signup page
export const validateLoginForm = (formData, isLoginMode) => {
  const errors = {};
  const trimmedEmail = formData.email.trim();
  const trimmedPassword = formData.password;

  // Email validation
  if (!trimmedEmail) {
    errors.email = "Email is required";
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!trimmedPassword) {
    errors.password = "Password is required";
  } else if (!isValidPassword(trimmedPassword)) {
    errors.password = "Password must be at least 6 characters long";
  }

  // Name validation (only for signup)
  if (!isLoginMode) {
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      errors.name = "Name is required";
    } else if (trimmedName.length < 2) {
      errors.name = "Name must be at least 2 characters long";
    } else if (!isValidName(trimmedName)) {
      errors.name = "Name can only contain letters, spaces, hyphens and apostrophes";
    }
  }

  return errors;
}; 