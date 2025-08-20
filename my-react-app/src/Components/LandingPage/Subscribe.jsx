import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe=()=>{
    const matches = useMediaQuery('(max-width: 639px)');
    const matches1 = useMediaQuery('(max-width: 475px)');
    return (
        <div className="mt-20 flex items-center gap-2 justify-around flex-wrap bg-mine-shaft-900 mx-20 sm-mx:mx-5 p-4 rounded-xl">
             <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5 text-center font-semibold text-mine-shaft-100">Never Wants to Miss Any <span className="text-bright-sun-400">Job News</span></div>
             <div className="flex gap-4 bg-mine-shaft-700 xs-mx:flex-col px-3 py-2 xs:items-center rounded-xl ">
             <TextInput
                className="[&_input]:text-mine-shaft-100 font-semibold"
                variant="unstyled"
                placeholder="your@gmail.com"
                size={matches1?"sm":matches?"md":"lg"}
                />
                <Button className="!rounded-lg text-mine-shaft-200" size={matches1?"xs":matches?"sm":"md"} color="bright-sun.5" variant="filled">Subscribe ?</Button>
             </div>
        </div>
    )

}
export default Subscribe;