import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";

import MultiInput from "./MultiInput";
import { useState, useEffect } from "react";
import { dropdownData } from "../../Data/JobsData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

const SearchBar=()=>{
    const matches = useMediaQuery('(max-width: 475px)');
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState([0, 300]);
    const location = useLocation();
    
    // Handle URL search parameters on component mount
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const title = searchParams.get('title');
        const type = searchParams.get('type');
        
        if (title || type) {
            // Update the filter state with search parameters
            const filterUpdate = {};
            if (title) {
                filterUpdate.jobTitle = [title];
            }
            if (type) {
                filterUpdate.jobType = [type];
            }
            dispatch(updateFilter(filterUpdate));
        }
    }, [location.search, dispatch]);
    const handleChange=(event)=>{
        dispatch(updateFilter({salary:event}));
    }
    return (
    <div>
        <div className="flex justify-end">
        {matches&&<Button onClick={toggle} radius={"lg"} m={"sm"} variant="outline" autoContrast color="bright-sun.4">{opened?"Close":"Filter"}</Button>}
        </div>
    <Collapse in={(opened || !matches)}>
    <div className="flex px-5 lg-mx:flex-wrap py-8 items-center !text-mine-shaft-900 dark:!text-mine-shaft-100">
            {
                dropdownData.map((item,index)=>{return <React.Fragment><div key={index} className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:mb-1">
                    <MultiInput {...item}/>
                </div>
                <Divider className="sm-mx:hidden" mr="sm" size="xs" orientation="vertical" />
                </React.Fragment>
            })
            }
            <div className="w-1/5 lg-mx:mt-7 lg-mx:w-1/4 bs-mx:w-[30%] xs-mx:mb-1 sm-mx:w-[48%] text-sm text-mine-shaft-600 dark:text-mine-shaft-400 [&_.mantine-Slider-label]:!translate-y-10">
                <div className="flex mb-1 text-sm justify-between">
                    <div>Salary</div>
                    <div>&#8377;&nbsp;{value[0]} LPA - &#8377;&nbsp;{value[1]} LPA</div>
                </div>
                <RangeSlider size="xs" color="bright-sun.4" value={value}  onChangeEnd={handleChange} labelTransitionProps={{transition: 'skew-down',
                    duration: 150, timingFunction: 'linear'
                }} onChange={setValue} />
            </div>
        </div>
        </Collapse>
        </div>
    )
}

export default SearchBar;