import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";

import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";

import { IconUserCircle } from "@tabler/icons-react";
import { searchFields } from "../../Data/TalentData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar=()=>{
    const matches = useMediaQuery('(max-width: 475px)');
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState([0, 50]);
    const [name, setName] = useState('');
    const handleChange=(name, event)=>{
        if(name==="exp"){
            dispatch(updateFilter({exp:event}));
        }
        else{
            dispatch(updateFilter({name:event.target.value}));
            setName(event.target.value);
        }
    }
    return(
        <div>
                <div className="flex justify-end">
                {matches&&<Button onClick={toggle} radius={"lg"} m={"sm"} variant="outline" autoContrast color="bright-sun.4">{opened?"Close":"Filter"}</Button>}
                </div>
            <Collapse in={(opened || !matches)}>
        <div className="flex px-5 py-8 lg-mx:flex-wrap items-center !text-mine-shaft-100">
            <div className="w-1/5 lg-mx:w-1/4 xs-mx:w-full xs-mx:mb-1 bs-mx:w-[30%] sm-mx:w-[48%] flex items-center">
                <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20}/></div>
                <Input defaultValue={name} onChange={(e)=> handleChange("name", e)} className="[&_input]:!placeholder-mine-shaft-400" variant="unstyled" placeholder="Talent Name" />
            </div>
            <Divider className="sm-mx:hidden" mr="sm" size="xs" orientation="vertical" />
            {
                searchFields.map((item,index)=>{return <React.Fragment key={index}><div key={index} className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
                    <MultiInput {...item}/>
                </div>
                <Divider className="sm-mx:hidden" mr="sm" size="xs" orientation="vertical" />
                </React.Fragment>
            })
            }
            <div className="w-1/5 lg-mx:mt-7 lg-mx:w-1/4 bs-mx:w-[30%] xs-mx:w-full xs-mx:mb-1 sm-mx:w-[48%] text-sm text-mine-shaft-400 [&_.mantine-Slider-label]:!translate-y-10">
                <div className="flex text-sm mb-3 justify-between">
                    <div>Experience (Years)</div>
                    <div>&nbsp;{value[0]} - &nbsp;{value[1]}</div>
                </div>
                <RangeSlider minRange={1} onChangeEnd={(e)=>handleChange("exp", e)} size="xs" max={50} min={1} color="bright-sun.4" value={value}  labelTransitionProps={{transition: 'skew-down',
                    duration: 150, timingFunction: 'linear'
                }} onChange={setValue} />
            </div>
        </div>
        </Collapse>
        </div>
    )
}

export default SearchBar;