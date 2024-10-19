import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmBox = ({ isOpen, onConfirm, onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [isWrong, setIsWrong] = useState(false);

    const handleSubmit = () => {
        // Simulate correct OTP for demo purposes
        if (inputValue === '7860') {
            onConfirm(); // Call the onConfirm prop function to delete            
            toast.success('OTP confirmed! Product will be deleted.');
            onClose(); // Close the popup after confirmation
        } else {
            setIsWrong(true); // Show an error if OTP is wrong   
        }
    };

    return (
        isOpen && (
            <div className="popup">
                <ToastContainer />
                <div className="popup-inner">
                    <h2>Delete Confirmation!</h2>
                    <form>
                        <label>
                            Enter OTP:
                            <input
                                type="text"
                                name="otp"
                                value={inputValue}
                                onChange={(e) => { setIsWrong(false); setInputValue(e.target.value); }}
                            />
                        </label>
                        {isWrong && <p style={{ color: 'red' }}>Invalid OTP, please try again.</p>}
                        <div className="popup-buttons">
                            <button type="button" onClick={handleSubmit}>Confirm</button>
                            <button type="button" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ConfirmBox;
