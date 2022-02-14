const {FindModal} =require('../connections/Schema');

const Finds=async(req,res)=>{
    try {
        const data=await FindModal.find({}).sort([['createdAt', -1]]);
        if(data)
        res.status(200).send(data);
        else
        res.status(404).send("Some Error Occurred");
    } catch (e) {
        res.status(404).send(e)
    }
}

const AddFind=async(req,res)=>
{
    try{
        const data=await req.body;
        console.log(data);
        const instance=await new FindModal({...data,creator:req.userName});
        const resp=await instance.save();
        if (resp) {
            res.status(200).send("Added Hackathon")
        }else{
            res.status(404).send("Some Problem Occurred");
        }
    }catch(e){
        res.status(404).send(e);
    }
}

const DeleteFind=async(req,res)=>{
    try{
        const data=await req.body;
        console.log(data);
        let resp=await FindModal.deleteOne({creator:data.name,link:data.link});    
        if(resp){
            res.status(200).send("Hackathon Successfully Deleted");
        }else{
            res.status(404).send("Some Error occurred while deleting");
        }
    }
    catch(e){
            res.status(404).send(e.message);
    }
}

exports.Finds=Finds;
exports.AddFind=AddFind;
exports.DeleteFind=DeleteFind;