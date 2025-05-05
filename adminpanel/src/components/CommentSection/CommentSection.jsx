import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByReportId, postComment } from '../../store/slices/CommentsSlice';
import '../../components/CommentSection/CommentSection.css';

const CommentSection = ({ reportId, adminId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.reportComments.commentsByReport[reportId] || []);
    const [text, setText] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        dispatch(fetchCommentsByReportId(reportId));
    }, [dispatch, reportId]);

    const handlePost = () => {
        if (!text.trim()) return;

        dispatch(postComment({
            report_id: reportId,
            admin_id: adminId,
            comment: text,
            status: status, // status skickas med
        }));

        setText('');
        setStatus('pending'); // återställ status om du vill
    };

    return (
        <div className="comment-section">
            <h4>Noteringar</h4>
            <ul className="comment-list">
                {comments.map((c, i) => (
                    <li key={i}>
                        {c.comment} – {new Date(c.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>

            <textarea
                className="comment-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Skriv kommentar..."
            />

            <label htmlFor="status-select">Ärendestatus:</label>
            <select
                id="status-select"
                className="status-dropdown"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="handled">Hanterad</option>
                <option value="closed">Avslutad</option>
            </select>

            <button className="comment-button" onClick={handlePost}>Skicka notering</button>
        </div>
    );
};

export default CommentSection;
