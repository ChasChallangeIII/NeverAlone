import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByReportId, postComment } from '../../store/slices/CommentsSlice';
import '../../components/CommentSection/CommentSection.css'

const CommentSection = ({ reportId, adminId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.reportComments.commentsByReport[reportId] || []);
    const [text, setText] = useState('');

    useEffect(() => {
        dispatch(fetchCommentsByReportId(reportId));
    }, [dispatch, reportId]);

    const handlePost = () => {
        if (!text.trim()) return;
        dispatch(postComment({ report_id: reportId, admin_id: adminId, comment: text }));
        setText('');
    };

    return (
        <div>
        <h4>Kommentarer</h4>
        <ul>
            {comments.map((c, i) => (
            <li key={i}>{c.comment} - {new Date(c.created_at).toLocaleString()}</li>
            ))}
        </ul>

        <textarea
            className="comment-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Skriv kommentar..."
        />
        <button className="comment-button" onClick={handlePost}>Skicka kommentar</button>
                </div>
    );
};

export default CommentSection;
