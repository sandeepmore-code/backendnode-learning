export const Login = (req,res)=>{
  try {
    const {name,email,password,confirmpassword } = req.body;
    console.log(name,email,password,confirmpassword ,"all data");
    res.send(true);
  } catch (error) {
    return res.status(500).json({sucess : false, error: error});
  }
};


export const register = (req,res)=>{
  try {
    const {name,email,password,confirmpassword } = req.body;
    console.log(name,email,password,confirmpassword ,"all data");
    res.send(true);
  } catch (error) {
    return res.status(500).json({sucess : false, error: error});
  }
};

export const Logout = (req,res)=>{
  try {
    const {name,email,password,confirmpassword } = req.body;
    console.log(name,email,password,confirmpassword ,"all data");
    res.send(true);
  } catch (error) {
    return res.status(500).json({sucess : false, error: error});
  }
};