interface ICreds {
  username: string;
  password: string;
  title: string;
}

const invalidCreds: ICreds[] = [
  {
    username: "",
    password: "ValidPassword",
    title: "empty username",
  },
  {
    username: "aValidUserName",
    password: "",
    title: "empty passw",
  },
  {
    username: "ab",
    password: "ValidPass",
    title: "a user name less than 3 symbols",
  },
  {
    username: "nebula_traveler_omega_2025_star_x9q8p7r6s",
    password: "ValidPass",
    title: "a user name more than 40 symbols",
  },
  {
    username: "      ",
    password: "ValidPass",
    title: "a username with the only spaces",
  },
  {
    username: " a User Name ",
    password: "ValidPass",
    title: "a user name with pre and post spaces",
  },
  {
    username: "validUserName",
    password: "small",
    title: "a password less than 8 symbols",
  },
  {
    username: "validUserName",
    password: "aLongPasswordWithmorethan20symbolstest",
    title: "a password more than 20 symbols",
  },
  {
    username: "validUserName",
    password: "smallpassword",
    title: "no upper case in passw",
  },
  {
    username: "validUserName",
    password: "BIGPASSWORD",
    title: "no lower case in passw",
  },
  {
    username: "validUserName",
    password: "     ",
    title: "only spaces in passw",
  },
];

export default invalidCreds;
