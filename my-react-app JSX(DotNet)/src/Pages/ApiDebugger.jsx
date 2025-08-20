import { useEffect, useState } from "react";
import axiosInstance from "../Interceptor/AxiosInterceptor"

const ApiDebugger = () => {
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false)

    const addLog = (message) => {
        console.log(message);
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    }

    const testAllEndpoints = async () => {
        setIsRunning(true);
        setLogs([])

        addLog("🔍 Starting comprehensive API test...")

        // Test Jobs endpoints
        try {
            addLog("✅ Testing Jobs API...")

            const jobsTest = await axiosInstance.get('/api/jobs/test');
            addLog(`✅ Jobs test endpoint: ${jobsTest.data.message}`)

            const allJobs = await axiosInstance.get('/api/jobs');
            addLog(`✅ Get all jobs: ${allJobs.data.length} jobs found`)

        } catch (error) {
            addLog(`❌ Jobs API error: ${error.message}`);
        }

        // Test Profiles endpoints
        try {
            addLog("🔍 Testing Profiles API...")

            // Test the all profiles endpoint
            const allProfiles = await axiosInstance.get('/api/profiles/all');
            addLog(`✅ Get all profiles: ${allProfiles.data.length} profiles found`)

            // Test individual profile endpoints with valid IDs
            const profileIds = [1, 2, 10002, 20002];
            for (const id of profileIds) {
                try {
                    const profile = await axiosInstance.get(`/api/profiles/${id}`);
                    addLog(`✅ Get profile ${id}: ${profile.data.name}`);
                } catch (error) {
                    addLog(`❌ Get profile ${id} failed: ${error.response?.status} ${error.response?.statusText}`);
                }
            }

            // Test with invalid IDs to see the 400 error
            const invalidIds = [null, undefined, 'undefined', '', 0, -1, 'invalid'];
            for (const id of invalidIds) {
                try {
                    addLog(`🔍 Testing invalid profile ID: "${id}"`);
                    const profile = await axiosInstance.get(`/api/profiles/${id}`);
                    addLog(`⚠️ Unexpected success for invalid ID "${id}": ${profile.data.name}`);
                } catch (error) {
                    addLog(`❌ Expected error for invalid ID "${id}": ${error.response?.status} ${error.response?.statusText}`);
                }
            }
            
        } catch (error) {
            addLog(`❌ Profiles API error: ${error.message} - Status: ${error.response?.status}`);
            addLog(`❌ Error details: ${JSON.stringify(error.response?.data)}`);
        }

        addLog("🏁 API test completed!");
        setIsRunning(false);
    }

    // Monitor axios interceptor logs
    useEffect(() => {
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error

        console.log = (...args) => {
            originalConsoleLog(...args);
            if (args[0]?.includes?.('Axios Debug') || args[0]?.includes?.('ProfileService')) {
                setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${args.join(' ')}`]);
            }
        }

        console.error = (...args) => {
            originalConsoleError(...args);
            if (args[0]?.includes?.('ProfileService')) {
                setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ❌ ${args.join(' ')}`]);
            }
        }

        return () => {
            console.log = originalConsoleLog;
            console.error = originalConsoleError;
        };
    }, [])

    return (
        <div className="p-5 bg-mine-shaft-950 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-5">🔧 API Debugger</h1>
            
            <div className="mb-5">
                <button 
                    onClick={testAllEndpoints}
                    disabled={isRunning}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded text-white font-semibold"
                >
                    {isRunning ? '🔄 Running Tests...' : '🚀 Test All API Endpoints'}
                </button>
            </div>

            <div className="bg-black p-4 rounded-lg max-h-96 overflow-y-auto">
                <h3 className="text-green-400 font-semibold mb-2">📋 API Test Log:</h3>
                {logs.length === 0 ? (
                    <p className="text-gray-400">No logs yet. Click the button above to start testing.</p>
                ) : (
                    <div className="space-y-1">
                        {logs.map((log, index) => (
                            <div key={index} className="text-sm font-mono">
                                {log.includes('❌') ? (
                                    <span className="text-red-400">{log}</span>
                                ) : log.includes('✅') ? (
                                    <span className="text-green-400">{log}</span>
                                ) : log.includes('⚠️') ? (
                                    <span className="text-yellow-400">{log}</span>
                                ) : log.includes('🔍') ? (
                                    <span className="text-blue-400">{log}</span>
                                ) : (
                                    <span className="text-gray-300">{log}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-5 bg-blue-900 p-4 rounded">
                <h3 className="font-semibold mb-2">💡 What this test does:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Tests all major API endpoints (jobs, profiles)</li>
                    <li>Tests valid and invalid profile IDs</li>
                    <li>Shows which exact API calls are causing 400 errors</li>
                    <li>Captures all axios interceptor debug logs</li>
                    <li>Helps identify the source of the problem</li>
                </ul>
            </div>
        </div>
    );
}

export default ApiDebugger;

