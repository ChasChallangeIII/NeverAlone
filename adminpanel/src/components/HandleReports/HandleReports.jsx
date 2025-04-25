    import React, { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { fetchReports, markReportAsHandled } from '../../store/slices/reportSlice'
    import '../../components/HandleReports/HandleReports.css'

    const Reports = () => {
        const dispatch = useDispatch();
        const { items, loading, error } = useSelector(state => state.reports);
        const [openMessages, setOpenMessages] = useState({});
        
            useEffect(() => {
            dispatch(fetchReports());
            }, [dispatch]);
        
            const toggleMessage = (id) => {
            setOpenMessages(prev => ({
                ...prev,
                [id]: !prev[id]
            }));
            };
        
            const handleStatusClick = (id, isHandled) => {
            if (!isHandled) {
                dispatch(markReportAsHandled(id));
            }
            };
        
            if (loading) return <p>Laddar rapporter...</p>;
            if (error) return <p>Ett fel inträffade: {error}</p>;
        
            return (
            <div className="reports-container">
                <h2>Inkomna rapporter</h2>
                <table className="reports-table">
                <thead>
                    <tr>
                    <th>Tid</th>
                    <th>Orsak</th>
                    <th>Meddelande</th>
                    <th>Hanterad</th>
                    </tr>
                </thead>
                    <tbody>
                    {items.map(report => (
                        <React.Fragment key={report.id}>
                        <tr>
                            <td>{new Date(report.time).toLocaleString()}</td>
                            <td>{report.cause}</td>
                            <td>
                            <button onClick={() => toggleMessage(report.id)}>
                                {openMessages[report.id] ? 'Dölj meddelande' : 'Visa meddelande'}
                            </button>
                            </td>
                            <td
                            className="status-cell"
                            onClick={() => handleStatusClick(report.id, report.is_handled)}
                            title={report.is_handled ? 'Hanterad' : 'Inte hanterad – klicka för att markera'}
                            >
                            <span className={`status-icon ${report.is_handled ? 'handled' : 'not-handled'}`} />
                            </td>
                        </tr>
                        {openMessages[report.id] && (
                            <tr className="message-row">
                            <td colSpan="4">
                                <strong>Meddelande:</strong> {report.text}
                            </td>
                            </tr>
                        )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
            );
        };
        
        export default Reports;