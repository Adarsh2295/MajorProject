import { useState } from "react";
import axiosInstance from "../Interceptor/AxiosInterceptor"

const TestApiConnection = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const testEndpoint = async (endpoint, description) => {
        try {
            setLoading(true);
            setError("");
            console.log(`Testing ${description}:`, endpoint)

            const response = await axiosInstance.get(endpoint);
            console.log(`${description} Response:`, response.data)

            setResult({
                endpoint,
                description,
                success: true,
                data: response.data
            });
        } catch (err) {
            console.error(`${description} Error:`, err);
            setError(err.response?.data?.message || err.message || 'Unknown error');
            setResult({
                endpoint,
                description,
                success: false,
                error: err.response?.data || err.message
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-5 bg-mine-shaft-950 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-5">Test API Connection</h1>
            
            <div className="space-y-3 mb-5">
                <button 
                    onClick={() => testEndpoint('/api/jobs/test', 'Jobs Test Endpoint')}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-3"
                    disabled={loading}
                >
                    Test Jobs API
                </button>
                
                <button 
                    onClick={() => testEndpoint('/api/jobs', 'Get All Jobs')}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mr-3"
                    disabled={loading}
                >
                    Test Get Jobs
                </button>
                
                <button 
                    onClick={() => testEndpoint('/api/profiles/all', 'Get All Profiles')}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded mr-3"
                    disabled={loading}
                >
                    Test Get Profiles
                </button>
            </div>

            {loading && (
                <div className="bg-yellow-800 p-4 rounded mb-5">
                    Loading...
                </div>
            )}

            {error && (
                <div className="bg-red-800 p-4 rounded mb-5">
                    <h3 className="font-semibold">Error:</h3>
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className={`p-4 rounded mb-5 ${result.success ? 'bg-green-800' : 'bg-red-800'}`}>
                    <h3 className="font-semibold mb-2">
                        {result.description} - {result.success ? 'SUCCESS' : 'FAILED'}
                    </h3>
                    <p><strong>Endpoint:</strong> {result.endpoint}</p>
                    
                    {result.success ? (
                        <div>
                            <p><strong>Data Type:</strong> {Array.isArray(result.data) ? `Array (${result.data.length} items)` : typeof result.data}</p>
                            <details>
                                <summary className="cursor-pointer hover:underline mt-2">View Response Data</summary>
                                <pre className="bg-black p-3 rounded mt-2 overflow-auto text-sm">
                                    {JSON.stringify(result.data, null, 2)}
                                </pre>
                            </details>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Error Details:</strong></p>
                            <pre className="bg-black p-3 rounded mt-2 overflow-auto text-sm">
                                {JSON.stringify(result.error, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}

            <div className="bg-blue-900 p-4 rounded">
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Click each button to test different API endpoints</li>
                    <li>Check browser console for detailed logs</li>
                    <li>If all tests pass, the Find Talent page should work</li>
                    <li>If profiles test fails, that's the source of the 400 error</li>
                </ul>
            </div>
        </div>
    );
}

export default TestApiConnection;

