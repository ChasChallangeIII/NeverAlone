import {
    findReportCommentsByReportId,
    insertReportComment
} from "../services/reportCommentService.js";


export const getComments = async (req, res) => {
    const { reportId } = req.params; 

    try {
        const comments = await findReportCommentsByReportId(reportId);
        res.status(200).json(comments); JSON
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Error fetching comments" });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (err) {
        console.error("Error fetching comments: ", err);
        res.status(500).json({ message: "Error fetching comments" });
    }
};


export const createComment = async (req, res) => {
    const { reportId } = req.params;  
    const { adminId, comment } = req.body; 

    if (!adminId || !comment) {
        return res.status(400).json({ message: "Admin ID and comment text are required" });
    }

    try {

        const newComment = await insertReportComment(reportId, adminId, comment);
        res.status(201).json(newComment); 
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Error creating comment" });
    }
};


export const updateComment = async (req, res) => {
    const { commentId } = req.params;  
    const { comment } = req.body;  n

    if (!comment) {
        return res.status(400).json({ message: "Comment text is required" });
    }

    try {

        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Error updating comment" });
    }
};


export const deleteComment = async (req, res) => {
    const { commentId } = req.params;  

    try {

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Error deleting comment" });
    }
};
