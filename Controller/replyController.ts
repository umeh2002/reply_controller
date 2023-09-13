import express, {Request, Response} from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createReply = async(req: Request, res: Response)=>{
    try {
        const {commentID, userID} = req.params
        const {reply} = req.body
        const comment = await prisma.commentModel.findUnique({
            where:{id:commentID},
            include:{reply:true}

        })

        const user = await prisma.authModel.findUnique({
            where:{id:userID},
        })
        if (user && comment) {
            const replied = await prisma.replyModel.create({
                data:{
                    reply, commentID
                }
            })
            comment.reply.push(replied)
            return res.status(200).json({
                message:"successfully replied to a comment",
                data:replied
            })
        } else {
            return res.status(404).json({
                message:"error",
            }) 
        }
    } catch (error:any) {
        return res.status(404).json({
            message:"error creating reply",
            data:error.message
        })
    }
}

export const viewReply = async(req: Request, res: Response)=>{
    try {
        const {commentID, userID} = req.params
        const {reply} = req.body
        const comment = await prisma.commentModel.findUnique({
            where:{id:commentID}
        })

        const user = await prisma.authModel.findUnique({
            where:{id:userID}
        })
        if (user && comment) {
            const replied = await prisma.replyModel.findMany({})
            comment.reply.push(replied)
            return res.status(200).json({
                message:"successfully replied to a comment",
                data:replied
            })
        } else {
            return res.status(404).json({
                message:"error",
            }) 
        }
    } catch (error:any) {
        return res.status(404).json({
            message:"error viewing replies",
            data:error.message
        })
    }
}

export const viewOneReply = async(req: Request, res: Response)=>{
    try {
        const {replyID} = req.params
        const replied = await prisma.replyModel.findUnique({
            where:{id: replyID}
        })
        return res.status(200).json({
            message:"success",
            data:replied
        })
    } catch (error:any) {
        return res.status(404).json({
            message:"error viewing one reply",
            data:error.message
        })
    }
}

export const viewCommentReply =async(req:Request, res:Response)=>{
    try {
      const {commentID} =req.params  
      const comment = await prisma.commentModel.findUnique({
        where:{id:commentID},
        include:{reply:true}
      })
      return res.status(200).json({
        message:"success",
        data:comment
    })
    } catch (error) {
        return res.status(404).json({
            message:"error creating reply",
            data:error.message
        })
    }
}

export const deleteReply = async(req: Request, res: Response)=>{
    try {
        const {replyID, userID} = req.params
        const user = await prisma.authModel.findUnique({
            where:{id:userID}
        })

        const reply = await prisma.replyModel.findUnique({
            where:{id:replyID},
        })
       if (user?.id=== reply?.userID) {
        await prisma.replyModel.delete({
where:{id:replyID}
        })
        return res.status(201).json({
            message:"successfully deleted reply"
        })
       } else {
        return res.status(404).json({
            message:"you did not have permission to delete this reply"
        })
       }
    } catch (error:any) {
        return res.status(404).json({
            message:"error creating reply",
            data:error.message
        })
    }
}  

//nnnhji