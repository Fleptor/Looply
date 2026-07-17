import { normalizeText } from "./utils.js";


function createValidationResult(errors) {
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}


export function isRequired(value) {
    return normalizeText(value) !== "";
}


export function isValidUsername(username) {
    const normalizedUsername = normalizeText(username);

    return /^[a-zA-Z0-9_]{3,20}$/.test(normalizedUsername);
}


export function isValidPassword(password) {
    return (
        typeof password === "string" &&
        password.trim().length >= 6
    );
}


export function isValidEmail(email) {
    const normalizedEmail = normalizeText(email);

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
}


export function isValidPhone(phone) {
    const normalizedPhone = normalizeText(phone).replace(/\s+/g, "");

    return /^07\d{8}$/.test(normalizedPhone);
}


export function isValidNationalId(nationalId) {
    const normalizedNationalId = normalizeText(nationalId);

    return /^\d{10}$/.test(normalizedNationalId);
}


export function isPositiveNumber(value) {
    const number = Number(value);

    return Number.isFinite(number) && number > 0;
}


export function isPositiveInteger(value) {
    const number = Number(value);

    return Number.isInteger(number) && number > 0;
}


export function isValidDate(value) {
    if (!isRequired(value)) {
        return false;
    }

    const date = new Date(value);

    return !Number.isNaN(date.getTime());
}


export function isEndDateAfterStartDate(startDate, endDate) {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return false;
    }

    return new Date(endDate).getTime() > new Date(startDate).getTime();
}


export function validateLoginForm(data = {}) {
    const errors = {};
    const username = normalizeText(data.username);
    const password = String(data.password ?? "");

    if (!isRequired(username)) {
        errors.username = "Username is required.";
    } else if (!isValidUsername(username)) {
        errors.username =
            "Username must contain 3 to 20 letters, numbers, or underscores.";
    }

    if (!isRequired(password)) {
        errors.password = "Password is required.";
    }

    return createValidationResult(errors);
}


export function validateContactForm(data = {}) {
    const errors = {};
    const fullName = normalizeText(data.fullName ?? data.name);
    const email = normalizeText(data.email);
    const subject = normalizeText(data.subject);
    const message = normalizeText(data.message);

    if (!isRequired(fullName)) {
        errors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
        errors.fullName =
            "Full name must contain at least 3 characters.";
    }

    if (!isRequired(email)) {
        errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!isRequired(subject)) {
        errors.subject = "Subject is required.";
    } else if (subject.length < 3) {
        errors.subject =
            "Subject must contain at least 3 characters.";
    }

    if (!isRequired(message)) {
        errors.message = "Message is required.";
    } else if (message.length < 10) {
        errors.message =
            "Message must contain at least 10 characters.";
    }

    return createValidationResult(errors);
}


export function validateStudentForm(data = {}) {
    const errors = {};
    const fullName = normalizeText(data.fullName);
    const username = normalizeText(data.username);
    const password = String(data.password ?? "");
    const phone = normalizeText(data.phone);
    const nationalId = normalizeText(data.nationalId);
    const gender = normalizeText(data.gender);

    if (!isRequired(fullName)) {
        errors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
        errors.fullName =
            "Full name must contain at least 3 characters.";
    }

    if (!isRequired(username)) {
        errors.username = "Username is required.";
    } else if (!isValidUsername(username)) {
        errors.username =
            "Username must contain 3 to 20 letters, numbers, or underscores.";
    }

    if (!isRequired(password)) {
        errors.password = "Password is required.";
    } else if (!isValidPassword(password)) {
        errors.password =
            "Password must contain at least 6 characters.";
    }

    if (!isRequired(phone)) {
        errors.phone = "Phone number is required.";
    } else if (!isValidPhone(phone)) {
        errors.phone =
            "Phone number must start with 07 and contain 10 digits.";
    }

    if (!isRequired(nationalId)) {
        errors.nationalId = "National ID is required.";
    } else if (!isValidNationalId(nationalId)) {
        errors.nationalId =
            "National ID must contain exactly 10 digits.";
    }

    if (!["male", "female"].includes(gender.toLowerCase())) {
        errors.gender = "Select a valid gender.";
    }

    return createValidationResult(errors);
}


export function validateProfileForm(data = {}) {
    const errors = {};
    const fullName = normalizeText(data.fullName);
    const phone = normalizeText(data.phone);
    const password = String(data.password ?? "");

    if (!isRequired(fullName)) {
        errors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
        errors.fullName =
            "Full name must contain at least 3 characters.";
    }

    if (!isRequired(phone)) {
        errors.phone = "Phone number is required.";
    } else if (!isValidPhone(phone)) {
        errors.phone =
            "Phone number must start with 07 and contain 10 digits.";
    }

    if (password && !isValidPassword(password)) {
        errors.password =
            "Password must contain at least 6 characters.";
    }

    return createValidationResult(errors);
}


export function validateExamForm(data = {}) {
    const errors = {};
    const title = normalizeText(data.title);
    const description = normalizeText(data.description);
    const instructions = normalizeText(data.instructions);
    const startAt = data.startAt;
    const endAt = data.endAt;
    const durationMinutes = data.durationMinutes;

    if (!isRequired(title)) {
        errors.title = "Exam title is required.";
    } else if (title.length < 3) {
        errors.title =
            "Exam title must contain at least 3 characters.";
    }

    if (!isRequired(description)) {
        errors.description = "Exam description is required.";
    } else if (description.length < 10) {
        errors.description =
            "Exam description must contain at least 10 characters.";
    }

    if (!isRequired(instructions)) {
        errors.instructions = "Exam instructions are required.";
    }

    if (!isValidDate(startAt)) {
        errors.startAt = "Select a valid start date.";
    }

    if (!isValidDate(endAt)) {
        errors.endAt = "Select a valid end date.";
    }

    if (
        isValidDate(startAt) &&
        isValidDate(endAt) &&
        !isEndDateAfterStartDate(startAt, endAt)
    ) {
        errors.endAt =
            "End date must be later than start date.";
    }

    if (!isPositiveInteger(durationMinutes)) {
        errors.durationMinutes =
            "Exam duration must be a positive whole number.";
    }

    return createValidationResult(errors);
}


export function validateQuestionForm(data = {}) {
    const errors = {};
    const text = normalizeText(data.text);
    const type = normalizeText(data.type);
    const points = data.points;
    const options = Array.isArray(data.options)
        ? data.options
        : [];
    const correctAnswer = normalizeText(data.correctAnswer);

    const allowedTypes = [
        "multiple-choice",
        "true-false"
    ];

    if (!isRequired(text)) {
        errors.text = "Question text is required.";
    }

    if (!allowedTypes.includes(type)) {
        errors.type = "Select a valid question type.";
    }

    if (!isPositiveNumber(points)) {
        errors.points =
            "Question points must be greater than zero.";
    }

    if (type === "multiple-choice") {
        const validOptions = options
            .map((option) => {
                if (typeof option === "string") {
                    return normalizeText(option);
                }

                return normalizeText(option?.text);
            })
            .filter(Boolean);

        if (validOptions.length < 2) {
            errors.options =
                "A multiple-choice question needs at least two options.";
        }

        if (!isRequired(correctAnswer)) {
            errors.correctAnswer =
                "Select the correct answer.";
        }
    }

    if (
        type === "true-false" &&
        !["true", "false"].includes(correctAnswer.toLowerCase())
    ) {
        errors.correctAnswer =
            "The correct answer must be true or false.";
    }

    return createValidationResult(errors);
}


export function getFirstError(errors = {}) {
    return Object.values(errors)[0] ?? "";
}