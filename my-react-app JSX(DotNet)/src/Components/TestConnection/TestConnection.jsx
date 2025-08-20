import React, { useState, useEffect } from 'react';

const TestConnection = () => {
    const [connectionStatus, setConnectionStatus] = useState({ success: false, message: 'Testing connection...' });
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        // Simulate connection test
        setTimeout(() => {
            setConnectionStatus({ success: true, message: 'Connection successful!' });
            setLoading(false);
        }, 1000);
    };

    const handleRetryConnection = () => {
        testConnection();
    };

    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '600px', 
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif' 
        }}>
            <h2>Backend Connection Test</h2>
            
            {loading && (
                <div style={{ 
                    padding: '10px', 
                    backgroundColor: '#f0f8ff', 
                    border: '1px solid #0066cc',
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}>
                    Testing connection...
                </div>
            )}

            {!loading && (
                <div style={{ 
                    padding: '15px', 
                    backgroundColor: connectionStatus.success ? '#d4edda' : '#f8d7da',
                    border: `1px solid ${connectionStatus.success ? '#c3e6cb' : '#f5c6cb'}`,
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}>
                    <h3>Connection Status</h3>
                    <p><strong>Status:</strong> {connectionStatus.success ? '✅ Connected' : '❌ Failed'}</p>
                    <p><strong>Message:</strong> {connectionStatus.message}</p>
                </div>
            )}

            <button 
                onClick={handleRetryConnection}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {loading ? 'Testing...' : 'Test Connection'}
            </button>
        </div>
    );
};

export default TestConnection;

