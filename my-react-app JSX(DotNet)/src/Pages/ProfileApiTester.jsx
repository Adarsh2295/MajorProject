import { useState } from "react";
import { getProfile, updateProfile, getAllProfiles } from "../services/ProfileService";
import axiosInstance from "../Interceptor/AxiosInterceptor"

const ProfileApiTester = () => {
    const [logs, setLogs] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [isRunning, setIsRunning] = useState(false)

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        const logMessage = `${timestamp}: ${message}`;
        console.log(logMessage);
        setLogs(prev => [...prev, logMessage]);
    }

    const testAllProfileApis = async () => {
        setIsRunning(true);
        setLogs([]);

        addLog("🚀 Starting comprehensive Profile API testing...");

        // Test 1: getAllProfiles
        try {
            addLog("1️⃣ Testing getAllProfiles()...");
            const allProfiles = await getAllProfiles();
            addLog(`✅ getAllProfiles SUCCESS: Found ${allProfiles.length} profiles`, 'success');

            // Show first profile details
            if (allProfiles.length > 0) {
                addLog(`   First profile=${allProfiles[0].id}, Name="${allProfiles[0].name}"`);
            }
        } catch (error) {
            addLog(`❌ getAllProfiles ERROR: ${error.message}`, 'error');
        }

        // Test 2: Get individual profiles
        const testIds = [1, 2, 10002, 20002];
        for (const id of testIds) {
            try {
                addLog(`2️⃣ Testing getProfile(${id})...`);
                const profile = await getProfile(id);
                addLog(`✅ getProfile(${id}) SUCCESS: "${profile.name}" - About: "${profile.about || 'No about'}"`, 'success')

                if (id === 1) {
                    setProfileData(profile); // Store profile 1 for update test
                }
            } catch (error) {
                addLog(`❌ getProfile(${id}) ERROR: ${error.message}`, 'error');
            }
        }

        // Test 3: Update profile
        if (profileData) {
            try {
                addLog("3️⃣ Testing updateProfile()...");
                const testUpdate = {
                    ...profileData,
                    about: `Updated at ${new Date().toLocaleTimeString()}`
                }

                addLog(`   Updating profile ${profileData.id} with new about: "${testUpdate.about}"`);
                const updatedProfile = await updateProfile(testUpdate);
                addLog(`✅ updateProfile SUCCESS: Updated profile ${profileData.id}`, 'success')

                // Verify the update by fetching again
                addLog("4️⃣ Verifying update by fetching profile again...");
                const verifyProfile = await getProfile(profileData.id);
                addLog(`✅ Verification: About section is now: "${verifyProfile.about}"`, 'success')

                if (verifyProfile.about === testUpdate.about) {
                    addLog(`🎉 UPDATE VERIFICATION SUCCESSFUL: Changes persisted!`, 'success');
                } else {
                    addLog(`⚠️ UPDATE VERIFICATION FAILED: Changes not persisted!`, 'error');
                }
                
            } catch (error) {
                addLog(`❌ updateProfile ERROR: ${error.message}`, 'error');
            }
        }

        // Test 4: Direct API calls
        try {
            addLog("5️⃣ Testing direct API calls...");

            // Test /api/profiles/all
            const directAllProfiles = await axiosInstance.get('/api/profiles/all');
            addLog(`✅ Direct /api/profiles/all: ${directAllProfiles.data.length} profiles`, 'success');

            // Test /api/profiles/1
            const directProfile1 = await axiosInstance.get('/api/profiles/1');
            addLog(`✅ Direct /api/profiles/1: "${directProfile1.data.name}"`, 'success');

        } catch (error) {
            addLog(`❌ Direct API calls ERROR: ${error.message}`, 'error');
        }

        // Test 5: Frontend Redux state test (simulate)
        addLog("6️⃣ Testing frontend state management...");
        addLog("   Note: Check browser console for Redux state logs")

        setIsRunning(false);
        addLog("🏁 Profile API testing completed!");
    }

    const testSingleProfileUpdate = async () => {
        setIsRunning(true);
        addLog("🔄 Testing single profile update flow...")

        try {
            // Step 1: Get current profile
            const currentProfile = await getProfile(1);
            addLog(`Current profile 1: "${currentProfile.name}" - About: "${currentProfile.about}"`);

            // Step 2: Create test update
            const newAbout = `Test update at ${new Date().toLocaleString()}`;
            const updatedData = { ...currentProfile, about: newAbout };

            addLog(`Updating with new about: "${newAbout}"`);
            await updateProfile(updatedData);

            // Step 3: Verify the update
            const afterUpdate = await getProfile(1);
            addLog(`After update: "${afterUpdate.name}" - About: "${afterUpdate.about}"`);

            if (afterUpdate.about === newAbout) {
                addLog("✅ Profile update working correctly!", 'success');
            } else {
                addLog("❌ Profile update not working - changes not saved!", 'error');
            }
            
        } catch (error) {
            addLog(`❌ Profile update test failed: ${error.message}`, 'error');
        }
        
        setIsRunning(false);
    }

    return (
        <div className="p-5 bg-mine-shaft-950 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-5">🧪 Profile API Tester</h1>
            
            <div className="flex gap-4 mb-5">
                <button 
                    onClick={testAllProfileApis}
                    disabled={isRunning}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded text-white font-semibold"
                >
                    {isRunning ? '🔄 Running...' : '🧪 Test All Profile APIs'}
                </button>
                
                <button 
                    onClick={testSingleProfileUpdate}
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded text-white font-semibold"
                >
                    {isRunning ? '🔄 Running...' : '🔄 Test Profile Update'}
                </button>
            </div>

            <div className="bg-black p-4 rounded-lg max-h-96 overflow-y-auto">
                <h3 className="text-green-400 font-semibold mb-2">📋 Test Results:</h3>
                {logs.length === 0 ? (
                    <p className="text-gray-400">No tests run yet. Click a button above to start testing.</p>
                ) : (
                    <div className="space-y-1">
                        {logs.map((log, index) => (
                            <div key={index} className="text-sm font-mono">
                                {log.includes('❌') ? (
                                    <span className="text-red-400">{log}</span>
                                ) : log.includes('✅') || log.includes('🎉') ? (
                                    <span className="text-green-400">{log}</span>
                                ) : log.includes('⚠️') ? (
                                    <span className="text-yellow-400">{log}</span>
                                ) : log.includes('🔄') || log.includes('🔍') ? (
                                    <span className="text-blue-400">{log}</span>
                                ) : (
                                    <span className="text-gray-300">{log}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900 p-4 rounded">
                    <h3 className="font-semibold mb-2">🎯 What this tests:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>getAllProfiles() API call</li>
                        <li>getProfile(id) for each profile</li>
                        <li>updateProfile() with test data</li>
                        <li>Verification that updates persist</li>
                        <li>Direct axios API calls</li>
                        <li>End-to-end update flow</li>
                    </ul>
                </div>
                
                <div className="bg-purple-900 p-4 rounded">
                    <h3 className="font-semibold mb-2">🔍 Common Issues:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Profile not loading after update</li>
                        <li>Redux state not syncing</li>
                        <li>API calls failing silently</li>
                        <li>Data not persisting to backend</li>
                        <li>Component not re-rendering</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfileApiTester;

