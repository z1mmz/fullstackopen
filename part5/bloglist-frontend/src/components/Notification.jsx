import React from 'react';

const Notification = ({ message, type }) => {
    if (!message) return null;
    const notificationStyle = {
        color: type === 'error' ? 'red' : 'green',
    };

    return (
        <div style={notificationStyle} className="notification">
            {message}
        </div>
    );
};

export default Notification;