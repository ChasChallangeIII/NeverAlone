import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports, markReportAsHandled } from '../../store/slices/reportSlice';
import '../../components/HandleReports/HandleReports.css';
import CommentSection from '../CommentSection/CommentSection';
import Modal from '../../components/Modal/Modal';

const Reports = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.reports);

    const [activeReport, setActiveReport] = useState(null);

    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);

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
                        <th>Detaljer</th>
                        <th>Hanterad</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(report => (
                        <tr key={report.id}>
                            <td>{new Date(report.time).toLocaleString()}</td>
                            <td>{report.cause}</td>
                            <td>
                                <button
                                    className="report-button"
                                    onClick={() => setActiveReport(report)}
                                >
                                    Visa detaljer
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
                    ))}
                </tbody>
            </table>

            {activeReport && (
                <Modal isOpen={!!activeReport} onClose={() => setActiveReport(null)}>
                    <h3>Rapportdetaljer</h3>
                    <p><strong>Tid:</strong> {new Date(activeReport.time).toLocaleString()}</p>
                    <p><strong>Orsak:</strong> {activeReport.cause}</p>
                    <p><strong>Meddelande:</strong> {activeReport.message}</p>

                    <div style={{ marginTop: '20px' }}>
                        <CommentSection reportId={activeReport.id} adminId={1} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Reports;
