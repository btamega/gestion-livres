
module.exports ={
  secret : 'azertyuiokijuhgfd'
}
const User = require("../models/user");
 Register = async(req, res) => {
  const { firstName,lastName, email, password, confPassword } = req.body;
  if(password !== confPassword) return res.status(400).json({msg: "Erreur, les mots de passe ne correspondent pas"});
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
      await User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
          statut: "User",
      });
      res.json({msg: "Un utilisateur a été créé avec succès"});
  } catch (error) {
      console.log(error);
  }
}

 Login = async(req, res) => {
  try {
      const user = await User.findAll({
          where:{
              email: req.body.email
          }
      });
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if(!match) return res.status(400).json({msg: "Erreur, le mot de passe saisi est incorrect"});
      const userId = user[0].id;
      const firstName = user[0].firstName;
      const lastName = user[0].lastName;
      const statut = user[0].statut;
      const email = user[0].email;
      const accessToken = jwt.sign({userId, firstName,lastName, email,password}, process.env.ACCESS_TOKEN_SECRET,{
          expiresIn: '15s'
      });
      const refreshToken = jwt.sign({userId, firstName, email}, process.env.REFRESH_TOKEN_SECRET,{
          expiresIn: '1d'
      });
      await User.update({refresh_token: refreshToken},{
          where:{
              id: userId
          }
      });
      res.cookie('refreshToken', refreshToken,{
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
      });
      res.json({ accessToken });
  } catch (error) {
      res.status(404).json({msg:"Email not found"});
  }
}

 Logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.sendStatus(204);
  const user = await User.findAll({
      where:{
          refresh_token: refreshToken
      }
  });
  if(!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await User.update({refresh_token: null},{
      where:{
          id: userId
      }
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}