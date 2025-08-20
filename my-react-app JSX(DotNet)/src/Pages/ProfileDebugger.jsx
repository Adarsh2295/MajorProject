import React, { useState } from 'react';
import { Button, Paper, Text, Code, Group } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateProfile } from '../services/ProfileService';
import { setProfile, changeProfile } from '../Slices/ProfileSlice'

const ProfileDebugger = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.profile);
    const [logs, setLogs] = useState([])

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [`${timestamp}: ${message}`, ...prev].slice(0, 20));
        console.log(`ProfileDebugger - ${message}`);
    }

    const loadProfileData = async () => {
        try {
            addLog('🔍 Loading profile data...');
            addLog(`User object: ${JSON.stringify(user)}`);
            addLog(`User profileId: ${user?.profileId} (type: ${typeof user?.profileId})`)

            if (user?.profileId) {
                const data = await getProfile(user.profileId);
                addLog(`✅ Profile data loaded: ${JSON.stringify(data)}`);
                addLog(`Profile ID: ${data?.id} (type: ${typeof data?.id})`);
                dispatch(setProfile(data));
            } else {
                addLog('❌ No profileId found in user object');
            }
        } catch (error) {
            addLog(`❌ Error loading profile: ${error.message}`);
        }
    }

    const testUpdate = async () => {
        try {
            addLog('🔄 Testing profile update...');
            addLog(`Current profile state: ${JSON.stringify(profile)}`);
            addLog(`Profile ID in state: ${profile?.id} (type: ${typeof profile?.id})`)

            if (!profile?.id && user?.profileId) {
                addLog(`Using user.profileId (${user.profileId})`);
                profile.id = user.profileId;
            }

            const updatedProfile = {
                ...profile,
                about: `Test update at ${new Date().toLocaleTimeString()}`
            }

            addLog(`About to update profile: ${JSON.stringify(updatedProfile)}`)

            const result = await updateProfile(updatedProfile);
            addLog(`✅ Update successful: ${JSON.stringify(result)}`)

            dispatch(changeProfile(updatedProfile));
        } catch (error) {
            addLog(`❌ Update failed: ${error.message}`);
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">🐛 Profile ID Debugger</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <Paper p="md">
                    <Text size="lg" fw={500} mb="sm">Redux State</Text>
                    <Code block>
                        User: {JSON.stringify(user, null, 2)}
                    </Code>
                    <Code block mt="sm">
                        Profile: {JSON.stringify(profile, null, 2)}
                    </Code>
                </Paper>

                <Paper p="md">
                    <Text size="lg" fw={500} mb="sm">Actions</Text>
                    <Group>
                        <Button onClick={loadProfileData}>
                            Load Profile Data
                        </Button>
                        <Button onClick={testUpdate} color="orange">
                            Test Update
                        </Button>
                        <Button onClick={() => setLogs([])} color="red">
                            Clear Logs
                        </Button>
                    </Group>
                </Paper>
            </div>

            <Paper p="md">
                <Text size="lg" fw={500} mb="sm">📋 Debug Logs</Text>
                <div className="bg-gray-100 p-3 rounded max-h-96 overflow-y-auto">
                    {logs.map((log, index) => (
                        <div key={index} className="text-sm font-mono mb-1">
                            {log}
                        </div>
                    ))}
                </div>
            </Paper>
        </div>
    );
}

export default ProfileDebugger;

