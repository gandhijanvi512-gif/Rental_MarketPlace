import Contact from "../model/contactmodel.js";

export const createContact=async(req,res)=>{
    try{
        const {name,email,subject,category,message}=req.body;

        if(!name || !email || !subject || !category || !message){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const contact=await Contact.create({
            name,
            email,
            subject,
            category,
            message
        })

        return res.status(200).json({
            success:true,
            message:"Your message has been sent successfully",
            data:contact
        })
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// get all message

export const getAllContacts=async(req,res)=>{
    try{
        const contacts=await Contact.find().sort({createdAt:-1})

        return res.status(200).json({
            success:true,
            data:contacts
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// admin update the status

export const updateContactStatus=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;

        const message=await Contact.findById(id);

        if(!message){
            return res.status(404).json({
                success:false,
                message:"Message Not Found"
            })
        }

        if(message.status==="new" && status==="read"){
            message.status="read"
        }
        else if(message.status==="read" && status==="resolved"){
            message.status="resolved"
        }else{
            return res.status(400).json({
                success:false,
                message:`Cannot change status fron ${message.status} to ${status}`
            })
        }
        await message.save()

        return res.status(200).json({
            success:true,
            message:"Message status updated",
            data:message
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// delete message

export const deleteContact=async(req,res)=>{
    try{
        const {id}=req.params

        const contact=await Contact.findByIdAndDelete(id)

        if(!contact){
            return res.status(404).json({
                success:false,
                message:"Message Not Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Message deleted successfully!"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// contact details 

export const getContactById = async (req, res) => {
    try {

        const { id } = req.params;

        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            data: contact
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};