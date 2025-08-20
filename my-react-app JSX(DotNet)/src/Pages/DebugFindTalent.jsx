import { useEffect, useState } from "react";
import { getAllProfiles } from "../services/ProfileService"

const DebugFindTalent = () => {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                setLoading(true);
                const result = await getAllProfiles();
                console.log("All profiles received:", result);
                setProfiles(result);

                // Apply the same filtering logic
                const filtered = result.filter((profile) => {
                    return profile.jobTitle || profile.skills?.length > 0 || profile.experience?.length > 0;
                });

                console.log("Filtered profiles (applicant-like):", filtered);
                setFilteredProfiles(filtered);

            } catch (err) {
                console.error('Error fetching profiles:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch profiles');
            } finally {
                setLoading(false);
            }
        }

        fetchProfiles();
    }, [])

    if (loading) return <div className="p-5">Loading profiles...</div>

    return (
        <div className="p-5 bg-mine-shaft-950 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-5">Debug: Find Talent</h1>
            
            {error && (
                <div className="bg-red-500 text-white p-3 rounded mb-5">
                    Error: {error}
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">All Profiles ({profiles.length})</h2>
                {profiles.length > 0 ? (
                    <div className="space-y-3">
                        {profiles.map((profile) => (
                            <div key={profile.id} className="bg-mine-shaft-800 p-4 rounded">
                                <h3 className="font-semibold">{profile.name}</h3>
                                <p>Email: {profile.email}</p>
                                <p>Job Title: {profile.jobTitle || 'Not specified'}</p>
                                <p>Company: {profile.company || 'Not specified'}</p>
                                <p>Location: {profile.location || 'Not specified'}</p>
                                <p>Total Experience: {profile.totalExp || 'Not specified'}</p>
                                <p>Skills: {profile.skills?.length > 0 ? profile.skills.join(', ') : 'None'}</p>
                                <p>Experiences: {profile.experiences?.length > 0 ? profile.experiences.length + ' entries' : 'None'}</p>
                                <p>Certifications: {profile.certifications?.length > 0 ? profile.certifications.length + ' entries' : 'None'}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No profiles found</p>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Filtered Profiles (Would show in Find Talent) ({filteredProfiles.length})</h2>
                {filteredProfiles.length > 0 ? (
                    <div className="space-y-3">
                        {filteredProfiles.map((profile) => (
                            <div key={profile.id} className="bg-green-900 p-4 rounded">
                                <h3 className="font-semibold">{profile.name}</h3>
                                <p>Email: {profile.email}</p>
                                <p>Job Title: {profile.jobTitle || 'Not specified'}</p>
                                <p>Why included: {
                                    profile.jobTitle ? 'Has job title' :
                                    profile.skills?.length > 0 ? 'Has skills' :
                                    profile.experience?.length > 0 ? 'Has experience' :
                                    'Fallback (no filter match)'
                                }</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-red-800 p-4 rounded">
                        <p><strong>This is why "No Talents Found" appears!</strong></p>
                        <p>No profiles match the filtering criteria:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>profile.jobTitle exists</li>
                            <li>OR profile.skills has items</li>
                            <li>OR profile.experience has items</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="bg-blue-800 p-4 rounded">
                <h3 className="font-semibold mb-2">Recommendations:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Profiles need more data (job titles, skills, experiences)</li>
                    <li>Consider removing or relaxing the filtering criteria</li>
                    <li>Add sample data to profiles for testing</li>
                    <li>Show all profiles regardless of completeness</li>
                </ul>
            </div>
        </div>
    );
}

export default DebugFindTalent;

