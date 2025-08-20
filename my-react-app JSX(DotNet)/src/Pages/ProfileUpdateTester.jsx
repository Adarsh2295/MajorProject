import React, { useState, useEffect } from 'react';
import { Button, TextInput, Group, Stack, Paper, Text, Code, Alert } from '@mantine/core';
import { getProfile, updateProfile } from '../services/ProfileService'

const ProfileUpdateTester = () => {
    const [profileId, setProfileId] = useState('1');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        about: '',
        jobTitle: '',
        company: '',
        location: ''
    })

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [`${timestamp}: ${message}`, ...prev].slice(0, 10));
    }

    const fetchProfile = async () => {
        try {
            setLoading(true);
            addLog(`🔍 Fetching profile ${profileId}...`);
            const data = await getProfile(profileId);
            setProfile(data);
            setFormData({
                name: data.name || '',
                email: data.email || '',
                about: data.about || '',
                jobTitle: data.jobTitle || '',
                company: data.company || '',
                location: data.location || ''
            });
            addLog(`✅ Profile fetched successfully: ${data.name}`);
        } catch (error) {
            addLog(`❌ Error fetching profile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const updateProfileData = async () => {
        try {
            setLoading(true);
            const updatedProfile = {
                ...profile,
                ...formData,
                about: formData.about + ` (Updated at ${new Date().toLocaleTimeString()})`
            }

            addLog(`🔄 Updating profile ${profileId}...`);
            await updateProfile(updatedProfile);
            addLog(`✅ Profile updated successfully!`)

            // Fetch again to verify persistence
            await fetchProfile();
        } catch (error) {
            addLog(`❌ Error updating profile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">🧪 Profile Update Persistence Tester</h1>
            
            <Paper p="md" mb="md">
                <Group>
                    <TextInput
                        label="Profile ID"
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
                        style={{ width: '100px' }}
                    />
                    <Button onClick={fetchProfile} loading={loading}>
                        Fetch Profile
                    </Button>
                    <Button onClick={updateProfileData} loading={loading} color="green">
                        Update & Test Persistence
                    </Button>
                </Group>
            </Paper>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Paper p="md">
                    <Text size="lg" fw={500} mb="sm">Current Profile Data</Text>
                    {profile && (
                        <Code block>
                            {JSON.stringify(profile, null, 2)}
                        </Code>
                    )}
                </Paper>

                <Paper p="md">
                    <Text size="lg" fw={500} mb="sm">Edit Profile</Text>
                    <Stack>
                        <TextInput
                            label="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <TextInput
                            label="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <TextInput
                            label="About"
                            value={formData.about}
                            onChange={(e) => setFormData({...formData, about: e.target.value})}
                        />
                        <TextInput
                            label="Job Title"
                            value={formData.jobTitle}
                            onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                        />
                        <TextInput
                            label="Company"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                        <TextInput
                            label="Location"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </Stack>
                </Paper>
            </div>

            <Paper p="md" mt="md">
                <Text size="lg" fw={500} mb="sm">📋 Test Logs</Text>
                <Alert>
                    <Text size="sm">
                        This tester will update the profile data and immediately fetch it again to verify that changes persist in the database.
                    </Text>
                </Alert>
                <div className="bg-gray-100 p-3 rounded mt-2 max-h-60 overflow-y-auto">
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

export default ProfileUpdateTester;

