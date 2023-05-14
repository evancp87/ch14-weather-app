const Joi = require("joi");

// Define a custom validation function for the value not found in the API call
const validateValue = async (value) => {
  // Perform API call or custom logic to validate the value
  // For example, check if the value exists in the database
  const valueExists = await checkValueExists(value);

  if (!valueExists) {
    throw new Error("Value not found");
  }

  return value;
};

// Define the validation schema
const schema = Joi.object({
  value: Joi.string().required().custom(validateValue),
});

// Validate the input data
const data = { value: "example" };

try {
  const validatedData = await schema.validateAsync(data);
  console.log("Validation passed:", validatedData);
} catch (error) {
  console.error("Validation failed:", error.message);
}
