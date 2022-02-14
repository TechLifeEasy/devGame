const { ProjectModal } = require('../connections/Schema');

// title: String,
//     description: String,
//     tech: String,
//     demoLink: String,
//     upVote: [String],
//     comment: [CommentSchema],
//     creator: String,
//     state:String,
//     isIdea:Boolean

const Projects = async (req, res) => {
    const data = await ProjectModal.find({}).sort([['createdAt', -1]]);
    console.log(data);
    res.status(200).send(data);
}

const ProjectsByName = async (req, res) => {
    try {
    
    const {name}=req.body;
    // console.log(data1+"sd");
    // const data1= req.body;
    // console.log(data1,'dfdsfdsfd');

    // const name=req.userName;
    const data = await ProjectModal.find({creator:name});
    // console.log(data);
    res.status(200).send(data);
    } catch (error) {
        console.log(error)
        res.status(404).send(error.message);
    }
    
}
const AddProject = async (req, res) => {
    try {
        let data = { ...req.body, creator: req.userName, state: 'on' };
        // console.log(data);
        const instance = await new ProjectModal(data);
        const resp = await instance.save();
        if (resp) {
            res.status(200).send("Added Project")
        } else {
            res.status(404).send("Some Problem Occurred");
        }
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}

const DeleteProject = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        let resp = await ProjectModal.deleteOne({ title: data.title });
        if (resp) {
            res.status(200).send("Project Successfully Deleted");
        } else {
            res.status(404).send("Some Error occurred while deleting");
        }
    }
    catch (e) {
        
        res.status(404).send(e.message);
    }
}
const UpdateProject = async (req, res) => {
    try {
        let title=req.body.title
        let userName=req.userName
        let isf = await ProjectModal.findOne({ title:title });

        if (isf == null) {
            throw new Error('Title Not Exits');
        }

        if (req.body.type == "vote") {

            if (isf.upVote.includes(userName)) {
                isf.upVote.remove(userName)

            } else {

                isf.upVote.push(userName)

            }
            let data = await isf.save();
            console.log(data)

        } else {
            throw new Error("Not Vaild Update");
        }

        isf = await ProjectModal.findOne({ title: title });


        return res.status(200).send('done');
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}

exports.Projects = Projects;
exports.AddProject = AddProject;
exports.DeleteProject = DeleteProject;
exports.UpdateProject = UpdateProject;
exports.ProjectsByName=ProjectsByName