export const requiredFieldsSchema = {
  IsSuccess: { type: "boolean" },
  ErrorMessage: {
    type: ["string", "null"],
  },
};

export const requiredFields = ["IsSuccess", "ErrorMessage"];
