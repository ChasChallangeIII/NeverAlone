import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByReportId, postComment } from '../../store/slices/CommentsSlice';
import '../../components/CommentSection/CommentSection.css';

const CommentSection = ({ reportId, adminId, closeModal }) => { 
    const dispatch = useDispatch();
    const comments = useSelector(state => state.reportComments.commentsByReport[reportId] || []);
    const [text, setText] = useState('');

        useEffect(() => {
            dispatch(fetchCommentsByReportId(reportId));
        }, [dispatch, reportId]);


const handlePost = async () => {
    if (!text.trim()) return;

    await dispatch(postComment({
        report_id: reportId,
        admin_id: adminId,
        comment: text,
    }));

    setText('');
        closeModal(); 
    };

    return (
        <div className="comment-section">
            <h4 className='notes-title'>Noteringar:</h4>
            <ul className="comment-list">
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((c) => (
                        <li key={c.id}>
                            {new Date(c.created_at).toLocaleString()}: {c.comment}
                        </li>
                    ))
                ) : (
                    <li>Inga noteringar i ärendet ännu.</li>
                )}
            </ul>
            <textarea
                className="comment-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Skriv kommentar..."
            />

            <button className="comment-button" onClick={handlePost}>Skicka notering</button>
        </div>
    );
};

export default CommentSection;
