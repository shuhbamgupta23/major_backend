//create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //options for cookie

  const options = {
    expires: new Date(Date.now() + 6000000),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
