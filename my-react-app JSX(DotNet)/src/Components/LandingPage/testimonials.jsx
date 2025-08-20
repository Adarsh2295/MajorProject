import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../../Data/Data";
const Testimonials = ()=>{
    return (
        <div className="mt-20 pb-5 p-5">
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl  text-center font-semibold mb-3 text-mine-shaft-100">What <span className="text-bright-sun-400">User</span> says about us ?</div>
            <div className="flex gap-2 justify-evenly md-mx:flex-wrap mt-10">
            {
            testimonials.map((data, index) => 
            <div key={index} className="flex flex-col w-[23%] md-mx:w-[48%] gap-5 xs-mx:w-full border-bright-sun-400 p-3 border rounded-lg">
                <div className="flex gap-2">
                    <Avatar className="!h-12 !w-12" src="avatar.png" />
                    <div className="">
                        <div className="text-lg sm-mx:text-base xs-mx:text-sm text-mine-shaft-100 font-semibold">{data.name}</div>
                        <Rating value={data.rating} fractions={2} readOnly />
                    </div>
                </div>
                <div className="text-sm text-mine-shaft-300">
                    {data.testimonial}
                </div>
            </div>
            )}
            </div>
        </div>
        
        
    )
}

export default Testimonials;