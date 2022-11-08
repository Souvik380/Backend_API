const {sequelize,aadharCardDetails,Address,User,Role,UserRole,Image,Video,Comment}=require("./models")
const express=require("express")
const role = require("./models/role")

const app=express()

app.use(express.json())

app.post("/users",async(req,res)=>{
    const {fullName,countryCode}=req.body
    try{
        const user=await User.create({fullName,countryCode})
        return res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

app.get("/users",async(req,res)=>{
    try{
        const users=await User.findAll()
        return res.json(users)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

app.get("/users/:id",async(req,res)=>{
    const userID=req.params.id
    try{
        const user=await User.findOne({
            where:{id:userID},
            include:[aadharCardDetails]
        })
        return res.json(user)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

app.put("/users/:id",async(req,res)=>{
    try{
        const user=await User.update(req.body,{where:{id:req.params.id}})
        res.json("User Updated!")
    }catch(err){
        res.status(500).json(err)
    }
})

app.delete("/users/:id",async(req,res)=>{
    try{
        await User.destroy({where:{id:req.params.id}})
        res.json("User deleted!")
    }catch(err){
        res.status(500).json(err)
    }
})

app.post("/users/:id/aadhar",async(req,res)=>{
    const {aadharNumber}=req.body

    try{
        const user=await User.findOne({where:{id:req.params.id}})
        if(!user) return res.json("Invalid User")
        const aadhar=await aadharCardDetails.create({aadharNumber,name:user.fullName})
        await user.update({aadharId:aadhar.id})
        await user.save()
        res.json(aadhar)
    }catch(err){
        res.status(500).json(err)
    }
})

app.get("/users/:id/aadhar",async(req,res)=>{
    try{
        const user=await User.findOne({where:{id:req.params.id}})
        const aadhar=await aadharCardDetails.findOne({where:{id:user.aadharId}})
        res.json(aadhar)
    }catch(err){
        return res.status(500).json(err)
    }
})

app.post("/users/:id/addresses",async(req,res)=>{
    const {street,city,country}=req.body
        try{
            const user=await User.findOne({where:{id:req.params.id}})
            if(!user) return res.json("Invalid User")
            const address=await Address.create({name:user.fullName,street,city,country,userId:user.id})
            res.json(address)
        }catch(err){
            console.log("err",err)
            res.status(500).json(err)
        }

    
})


app.get("/users/:id/addresses",async(req,res)=>{
    try{
        const addresses=await User.findAll(
            {
                where:{id:req.params.id},
                include:Address
            })

        res.json(addresses)

    }catch(err){
        res.status(500).json(err)
    }
})

app.get("/users/:userId/addresses/:addressId",async(req,res)=>{
    try{
        const user=await User.findOne({
            where:{id:req.params.userId},
            include:{
                model:Address,
                where:{id:req.params.addressId}
            }
        })
        res.json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

app.put("/users/:userId/addresses/:addressId",async(req,res)=>{
    try{
        const address=await Address.update(req.body,{where:{id:req.params.addressId}})
        res.json("Address updated!")

    }catch(err){
        res.json(err)
    }
})

app.post("/users/:id/roles",async(req,res)=>{
    try{
        const role=await Role.create({name:req.body.name})
        const userrole=await UserRole.create({roleId:role.id,userId:req.params.id})
        res.json(userrole)
    }catch(err){
        res.status(500).json(err)
    }
})

app.get("/users/:id/roles",async(req,res)=>{
    try{
        
        const userRoles=await UserRole.findAll(
            { where:{userId:req.params.id},
            include:Roles
         })
       
        res.json(userRoles)
    }catch(err){
        res.status(500).json(err)
    }
})

app.post("/images",async(req,res)=>{
    const {url,height,width}=req.body
    try{
        const image=await Image.create({url,height,width})
        res.json(image)
    }catch(err){
        res.json(err)
    }
})

app.post("/images/:imageId/comments",async(req,res)=>{
    const {text}=req.body
    const {imageId}=req.params

    try{
        const image=await Image.findOne({where:{id:imageId}})

        if(!image) return res.json("Invalid Image")
            
        const comment=await Comment.create({text,commentableType:'image',commentableId:image.id})
        res.json(comment)
    }catch(err){
        res.status(500).json(err)
    }
})

app.get("/images/:imageId/comments",async(req,res)=>{
    const {imageId}=req.params
    try{
        const comment = await Image.findOne({where:{id:imageId},include:Comment})
        res.json(comment)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

app.post("/videos",async(req,res)=>{
    const {url,duration}=req.body
    try{
        const video=await Video.create({url,duration})
        res.json(video)
    }catch(err){
        res.status(500).json(err)
    }
})

app.post("/videos/:videoId/comments",async(req,res)=>{
    const {text}=req.body
    const {videoId}=req.params

    try{
        const video=await Video.findOne({where:{id:videoId}})
        if(!video) return res.json("Invalid Video")
        const comment=await Comment.create({text,commentableType:'video',commentableId:video.id})
        res.json(comment)
    }catch(err){
        res.status(500).json(err)
    }
})

app.get("/videos/:videoId/comments",async(req,res)=>{
    const {videoId}=req.params
    try{
        const comment = await Video.findOne({where:{id:videoId},include:Comment})

        res.json(comment)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})

app.listen(5000,async()=>{
    await sequelize.authenticate()
    console.log("server started!")
})