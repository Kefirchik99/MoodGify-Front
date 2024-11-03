

const errorMessages = {
    'auth/invalid-email': 'The email address is invalid.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password, please try again.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/invalid-credential': 'The credentials are invalid. Please check and try again.',
    // Add more errors as needed
    default: 'An unknown error occurred. Please try again.'
};

export const getErrorMessage = (errorCode) => {
    return errorMessages[errorCode] || errorMessages.default;
};
