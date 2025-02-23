import React, { useState, useEffect } from "react";
import axios from 'axios';
import useBackgroundSetter from "../../useBackgroundSetter";
import defaultWorkerIcon from '../../img/icons/header-default-user-icon.png';
import ChoiceModalWorker from "./ChoiceWorkerModal";
import ParametrsModal from "./ParametrsModal";
import './ChoiceWorker.css';

function ChoiceWorker() {
    useBackgroundSetter();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isParametrsModalOpen, setParametrsModalOpen] = useState(false);
    const [workers, setWorkers] = useState([]);  // State to store fetched workers
    const [loading, setLoading] = useState(true);  // Loading state

    // Fetch worker data from the back-end
    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACK_API+'/api/employer/get_worker_info', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
                    }
                });
                // Response from the server
                const workersData = response.data.workers_info || [];
                setWorkers(workersData); // Using the correct field from the response
                console.log(workersData); // Logging the data for verification

                setLoading(false);
            } catch (error) {
                console.error("Error fetching workers:", error);
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    const openModal = (worker) => {
        setSelectedWorker(worker);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedWorker(null);
        setModalOpen(false);
    };

    const closeModalParametrs = () => {
        setParametrsModalOpen(false);
    };

    const getAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const month = today.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const filteredWorkers = workers
        .filter(worker =>
            worker.name && worker.name.toLowerCase().includes(searchTerm.toLowerCase())  // Added check for undefined
        )
        .sort((a, b) => b.similarity - a.similarity);

    const getClassBySimilarity = (similarity) => {
        const sim = Math.max(0, similarity); // Remove negative values
        if (sim >= 75) return "worker--suitable";
        if (sim >= 50) return "worker--average";
        return "worker--unsuitable";
    };

    const getTextBySimilarity = (similarity) => {
        if (similarity >= 75) return "The most suitable";
        if (similarity >= 50) return "Less suitable";
        return "Inappropriate";
    };

    return (
        <div className="choice-worker__container">
            <button className="choice-worker__parametrs" onClick={() => setParametrsModalOpen(true)}>Параметры</button>
            <div className="choice-worker__search">
                <input
                    type="text"
                    className="choice-worker__search-input"
                    placeholder="Enter the employee's name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Загрузка...</p>
            ) : filteredWorkers.length > 0 ? (
                <div className="worker-resume-grid">
                    {filteredWorkers.map((worker) => (
                        <div
                            key={worker.id}
                            className={`worker-resume-block`}
                            onClick={() => openModal(worker)}
                        >
                            <div className={`worker-resume-block__points ${getClassBySimilarity(worker.similarity)}`}>
                                <p className="worker-resume-block__points-text">
                                    {getTextBySimilarity(worker.similarity)} {Math.round(worker.similarity)}
                                </p>
                            </div>
                            <div className="worker-resume__icon">
                                <img
                                    className="worker-resume__icon-image"
                                    src={worker.icon || defaultWorkerIcon}  // Use the worker's icon, fallback to default
                                    alt={`Photo ${worker.name}`}
                                />
                            </div>
                            <div className="worker-resume__description">
                                <h2 className="worker-resume__name">{worker.name}</h2>
                               <p className="worker-resume__description-text">{getAge(worker.age)} years</p>
                                <p className="worker-resume__description-text">{worker.role !== "Not specified" ? worker.role : "The role is not specified"}</p>
                                <p className="worker-resume__description-text">{worker.experience} {worker.experience % 10 < 5 && worker.experience % 10 !== 0 ? 'years' : 'years'} experience</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="choice-worker__no-results">No employees found</p>
            )}

            {isModalOpen && (
                <ChoiceModalWorker
                    worker={selectedWorker}
                    onClose={closeModal}
                />
            )}

            {isParametrsModalOpen && (
                <ParametrsModal onClose={closeModalParametrs} />
            )}
        </div>
    );
}

export default ChoiceWorker;
