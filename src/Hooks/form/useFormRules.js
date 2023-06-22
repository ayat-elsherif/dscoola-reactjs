// import { useTranslation } from 'react-i18next'

function useFormRules() {
  // const { t } = useTranslation()

  const rules = {
    phoneNumber: [
      {
        required: true,
        message: 'this field is Required!',
      },
      {
        min: 8,
        message: 'The phone must consist of at least 8 digits',
      },
      {
        max: 11,
        message: 'The phone cannot be longer than 11 digits',
      },
      {
        pattern: /^[0-9\b]+$/,
        message: 'The phone number must contain only numbers.',
      },
    ],
    payCardNumber: [
      {
        required: true,
        message: 'this field is Required!',
      },
      {
        min: 4,
        message: 'It cannot be less than 4 digits',
      },
      {
        pattern: /^[0-9\b]+$/,
        message: 'This field must contain numbers only',
      },
    ],
    code: [
      {
        required: true,
        message: 'this field is Required!',
      },
      {
        len: 4,
        message: 'code must be exactly 4 digits',
      },
    ],
    email: [
      {
        required: true,
        message: 'this field is Required!',
      },
      {
        type: 'email',
        message: 'email address is not a valid email',
      },
    ],
    password: [
      {
        required: true,
        message: 'this field is Required!',
      },
      {
        min: 9,
        message: 'password must be greater than 8 characters',
      },
      {
        max: 20,
        message: 'password must be less than 20 characters',
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: 'this field is Required!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (
            !value ||
            getFieldValue('password') === value ||
            getFieldValue('newPassword') === value
          ) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error(`'the two passwords that you entered do not match!'`)
          );
        },
      }),
    ],
    agreement: [
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error('should accept agreement')),
      },
    ],
    minLen: num => [
      {
        required: true,
        min: num,
        message: `This field must be at least ${num} characters.`,
      },
    ],
    maxLen: num => [
      {
        required: true,
        max: num,
        message: `This field must be no more than ${num} characters.`,
      },
    ],
    required: [
      {
        required: true,
        message: 'this field is Required!',
      },
    ],
  };
  return rules;
}
export default useFormRules;
