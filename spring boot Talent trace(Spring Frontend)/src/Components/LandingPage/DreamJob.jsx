import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DreamJob = () =>{
    const [jobTitle, setJobTitle] = useState("");
    const [jobType, setJobType] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        // Navigate to find jobs page with search parameters
        const searchParams = new URLSearchParams();
        if (jobTitle.trim()) {
            searchParams.append('title', jobTitle.trim());
        }
        if (jobType.trim()) {
            searchParams.append('type', jobType.trim());
        }
        
        // Navigate to find jobs page with search parameters
        navigate(`/find-jobs?${searchParams.toString()}`);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex sm-mx:flex-col-reverse items-center px-16 bs-mx:px-10 md-mx:px-5 sm-mx:gap-3">
            <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">

                {/* Text */}

                <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-bold text-mine-shaft-900 dark:text-mine-shaft-100 [&>span]:text-bright-sun-400"> Find your <span>dream job</span> with us</div>
                <div className="text-lg md-mx:text-base sm-mx:text-sm text-mine-shaft-700 dark:text-mine-shaft-200">Good life begins witha good company. Start explore thousands of jobs in one place.</div>

                {/* Search Area */}

                <div className="flex gap-3 mt-5 items-center">
                <TextInput
                className="bg-white dark:bg-mine-shaft-900 rounded-lg py-1 px-2 text-mine-shaft-900 dark:text-mine-shaft-100 [&_input]:text-mine-shaft-900 dark:[&_input]:text-mine-shaft-100 border border-gray-300 dark:border-mine-shaft-700"
                variant="unstyled"
                label="Job Title"
                placeholder="Software Engineer"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.currentTarget.value)}
                onKeyPress={handleKeyPress}
                />
                <TextInput
                className="bg-white dark:bg-mine-shaft-900 rounded-lg py-1 px-2 text-mine-shaft-900 dark:text-mine-shaft-100 [&_input]:text-mine-shaft-900 dark:[&_input]:text-mine-shaft-100 border border-gray-300 dark:border-mine-shaft-700"
                variant="unstyled"
                label="Job Type"
                placeholder="Full Time"
                value={jobType}
                onChange={(event) => setJobType(event.currentTarget.value)}
                onKeyPress={handleKeyPress}
                />
                <div 
                    className="flex items-center justify-center w-20 bg-bright-sun-500 text-white rounded-lg p-2 hover:bg-bright-sun-600 cursor-pointer transition-colors"
                    onClick={handleSearch}
                >
                    <IconSearch className="h-[85%] w-[85%]"/>
                </div>
                </div>
            </div>

            {/* Boy Image */}
            <div className="w-[55%] sm-mx:w-full flex items-center justify-center">
                <div className="w-[30rem] relative">
                    <img src="/boy.png" alt="Boy" />

                    {/* Cards */}
                    <div className="absolute -right-8 w-fit top-[40%] bs-mx:-right-3 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md bg-white/10 dark:bg-black/10">
                        <div className="text-center mb-1 text-sm text-mine-shaft-900 dark:text-mine-shaft-100">10K+ got job</div>
                        <Avatar.Group>
                        <Avatar src="avatar-7.png" />
                        <Avatar src="avatar-8.png" />
                        <Avatar src="avatar.png" />
                        <Avatar>+9K</Avatar>
                        </Avatar.Group>
                    </div>
                    <div className="absolute -left-20 w-fit sm-mx:w-32 sm-mx:h-32 top-[19%] sm-mx:top-[12%] xs-mx:top-[5%] sm-mx:left-[-3%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md bg-white/10 dark:bg-black/10 flex flex-col">
                        <div className="flex gap-2 items-center mb-2">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-mine-shaft-900 p-2 rounded-lg shrink-0"> <img src="/Google.png" alt="" /></div>
                            <div className="text-sm text-mine-shaft-900 dark:text-mine-shaft-100">
                                <div>Software Engineer</div>
                                <div className="text-mine-shaft-600 dark:text-mine-shaft-200 text-xs">New York</div>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-around text-mine-shaft-600 dark:text-mine-shaft-200 text-xs">
                            <span>1 day ago</span>
                            <span>120 Applicants</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DreamJob;