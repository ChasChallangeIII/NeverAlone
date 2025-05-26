import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports, markReportAsHandled } from '../../store/slices/reportSlice';
import '../../components/HandleReports/HandleReports.css';
import CommentSection from '../CommentSection/CommentSection';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';

const Reports = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.reports);
    const [activeReport, setActiveReport] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);

    const handleStatusClick = (reportId, currentStatus) => {
        const statusCycle = ['pending', 'handled', 'closed'];
        const currentIndex = statusCycle.indexOf(currentStatus || 'pending');
        const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

        dispatch(markReportAsHandled(reportId, nextStatus));
    };

    const closeModal = () => {
        setActiveReport(null);
    };

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = items.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(items.length / reportsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    if (loading) return <div><Spinner /></div>;
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
                        <th>Ärendestatus</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReports.map(report => {
                        const status = report.status || 'pending';

                        return (
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
                                    onClick={() => handleStatusClick(report.id, status)}
                                    title="Klicka för att ändra status"
                                >
                                    <span className={`status-icon ${status}`}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Föregående
                </button>
                <span>Sida {currentPage} av {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Nästa
                </button>
            </div>

            {activeReport && (
                <Modal isOpen={!!activeReport} onClose={closeModal}>
                    <h3><strong>Rapportdetaljer</strong></h3>
                    <p><strong>Tid:</strong> {new Date(activeReport.time).toLocaleString()}</p>
                    <p><strong>Orsak:</strong> {activeReport.cause}</p>
                    <p><strong>Meddelande:</strong> {activeReport.message}</p>
                    <p><strong>Ärendestatus:</strong> {activeReport.status}</p>

                    <div style={{ marginTop: '20px' }}>
                        <CommentSection 
                            reportId={activeReport.id} 
                            adminId={1} 
                            closeModal={closeModal} 
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Reports;
