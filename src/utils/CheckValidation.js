export const inValidEmail = (email) => {
    if (email.length <= 0) {
      return 'Please enter email';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
  
    return null;
  };
  
  export const inValidPassword = (password) => {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return 'Password should be at least 8 characters long';
    }
  
    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
      return 'Password should contain at least a number';
    }
  
    // If all validations pass
    return null;
  };

  export const inValidNum = (num) => {
    // Only allow digits, remove anything else like commas or special characters
    const cleanedNum = num.replace(/[^0-9]/g, '');
  
    // Check if the cleaned number is exactly 10 digits
    if (cleanedNum.length !== 10) {
      return 'Please enter a valid 10-digit mobile number';
    }
  
    // If valid, return an empty string or null (indicating no error)
    return '';
  };
  
  
  
  