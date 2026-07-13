export const validUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export const loginScenarios = [
  {
    name: 'standard user',
    username: 'standard_user',
    password: 'secret_sauce',
    shouldLogin: true,
  },
  {
    name: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    shouldLogin: false,
    errorMessage: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    name: 'invalid password',
    username: 'standard_user',
    password: 'wrong_password',
    shouldLogin: false,
    errorMessage: 'Epic sadface: Username and password do not match any user in this service',
  },
];
