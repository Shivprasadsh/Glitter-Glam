const verifyAdmin = (req,res,next)=>{
  if(req.role !== 'admin'){
  return res.status(403).send({sucess:false,message:"your not authorized to perfrom this action"})
  }
  next()
}

module.exports = verifyAdmin