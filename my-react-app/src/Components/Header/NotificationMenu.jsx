import { Menu, Indicator } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Notification } from "@mantine/core";
import { getNotifications, readNotifications } from "../../services/NotiService";
import { useNavigate } from "react-router-dom";

const NotificationMenu=()=>{
    const navigate = useNavigate();
        const user =  useSelector((state)=>state.user);
        const [notifications, setNotifications] = useState([]);
        useEffect(()=>{
            getNotifications(user.id).then((res)=>{
                setNotifications(res);
            }).catch((error)=>{
                console.log(error);
            })
        }, [user])
        const unread=(index)=>{
            let noti = [...notifications];
            noti = noti.filter((noti, i)=>i!==index);
            setNotifications(noti);
            readNotifications(notifications[index].id).then((res)=>{
                console.log(res);
                }).catch((error)=>{
                    console.log(error);
                })
        }
        const [opened, setOpened] = useState(false);
    return <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 rounded-full p-1.5">
            <Indicator disabled={notifications.length<=0} color="bright-sun.4" offset={6} size={8} processing>
            <IconBell stroke={1.5}/>
            </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <div className="flex flex-col gap-1">
            {notifications.map((noti, index)=><Notification key={index} onClose={()=>unread(index)} className="hover:bg-mine-shaft-900 cursor-pointer" icon={<IconCheck  size={20} />} color="teal" title={noti.action} mt="md" onClick={()=>{navigate(noti.route); unread(index); setOpened(false)}}>
                    {noti.message}
                </Notification>
            )}
            {
                notifications.length===0&& <div className="text-gray-400 text-center text-sm">No notifications</div>
            }
        </div>
      </Menu.Dropdown>
    </Menu>
}

export default NotificationMenu;