


module.exports = (app) => {
    //test route
    app.route("/api/v1/test").get((req,res)=>{
        return res.status(200).json({
            message:'tested'
        })
    });
  
    
  };
  