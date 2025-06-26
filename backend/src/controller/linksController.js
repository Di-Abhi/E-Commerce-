const Links = require("../model/Links");

const linksController = {
    create: async (req,res)=>{
        const { campaign_title,original_url,category }= req.body;
        try {
            const link = new Links({
                campaignTitle: campaign_title,
                originalUrl: original_url,
                category: category,
                user: req.user.id
            });

            await link.save();
            res.status(200).json({
                data: { id: link._id },
                message: 'Link created'
            });
        }catch (error){
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
    getAll: async (req,res)=>{
        try{
            const links = await Links.find({ user: req.user.id }).sort({ createdAt: -1 });
            return res.status(200).json({
                data: links
            });
        }catch (error){
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
    getById: async (req,res)=>{
        try{
            const linkId = req.params.id;
            if(!linkId){
                return res.status(401).json({error: 'Link ID is required'});
            }
            const link = await Links.findById(linkId);
            if(!link){
                return res.status(404).json({error: 'Link does not exist with the given id'});
            }
            if(link.user.toString() !== req.user.id){
                return res.status(401).json({error: 'You are not authorized to access this link'});
            }
            res.json({data: link})
        }catch (error){
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
    update: async (req,res)=>{
        try{
            const linkId = req.params.id;
            if(!linkId){
                return res.status(401).json({error: 'Link ID is required'});
            }
            let link = await Links.findById(linkId);
            if(!link){
                return res.status(404).json({error: 'Link does not exist with the given id'});
            }
            if(link.user.toString() !== req.user.id){
                return res.status(401).json({error: 'You are not authorized to update this link'});
            }
            const { campaign_title, original_url, category } = req.body;
            link = await Links.findByIdAndUpdate(linkId, {
                campaignTitle: campaign_title,
                originalUrl: original_url,
                category: category
            }, { new: true });
            res.status(200).json({
                data: link
            });
        }catch (error){
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
    delete: async(req,res)=>{
        try{
            const linkId = req.params.id;
            if(!linkId){
                return res.status(401).json({error: 'Link ID is required'});
            }
            let link = await Links.findById(linkId);
            if(!link){
                return res.status(404).json({error: 'Link does not exist with the given id'});
            }
            if(link.user.toString() !== req.user.id){
                return res.status(401).json({error: 'You are not authorized to delete this link'});
            }
            await link.deleteOne();
            res.status(200).json({
                message: 'Link deleted successfully'
            });
        }catch (error){
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
    redirect: async (req, res) => {
        try{
            const linkId = req.params.id;
            if(!linkId){
                return res.status(401).json({error: 'Link ID is required'});
            }
            let link = await Links.findById(linkId);
            if(!link){
                return res.status(404).json({error: 'Link does not exist with the given id'});
            }
            link.clickCount+=1;
            await link.save();
            res.redirect(link.originalUrl);
        }catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}
module.exports = linksController;