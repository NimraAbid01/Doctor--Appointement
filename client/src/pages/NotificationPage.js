import React from 'react';
import Layout from '../components/Layout';
import { Tabs, message, notification } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import{showLoading,hideLoading} from "../redux/features/alertSlice";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    //read all notification
    const handleMarkAllRead = async() =>{
      try{
        dispatch(showLoading());
        const res = await axios.post('api/v1/user/get-all-notification', 
        {
        userId: user._id,
      },{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
        );
        dispatch(hideLoading());
        if(res.data.success){
          message.success(res.data.message);
        }else{
          message.error(res.data.message);
        }
      }catch(error){
        dispatch(hideLoading());
        console.log(error);
    message.error("Something went wrong !Oops try again");
  }  
    };
    //delete all notification
    const handleDeleteAllRead = async() =>{
      try{
        dispatch(showLoading());
        const res = await axios.post('api/v1/user/delete-all-notification', {userId:user._id},{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        dispatch(hideLoading());
        if(res.data.success){
          message.success(res.data.message);
        }
        else {
          message.error(res.data.message);
        }
      }
      catch(error){
        console.log(error);
        message.error("Something went wrong !Oops try again");
      }
    };
    
  return (
    <Layout>
    <div style={{ paddingLeft: '20px' }}>
      <h1>Notification Page</h1>
    </div>
    <Tabs>
        <Tabs.TabPane tab={<div style={{ paddingLeft: '20px' }}>Unread</div>} key={0}>
    <div className='d-flex justify-content-end'>
      <h6 className='p-2' onClick={handleMarkAllRead}>
        Mark All Read
      </h6>
        </div>
        {user?.notification.map(notificationMgs =>(
        <div className='card'
         style={{cursor:'pointer'}}
         >
         <div className='card-text'
         onClick={() =>navigate(notificationMgs.onClickPath)
        }
         >{notificationMgs.message}
         </div>
        </div>
        ))
        }
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
        <div className='d-flex justify-content-end'>
            <h6 className='p-2 text-primary'style={{cursor:'pointer'}}
             onClick={handleDeleteAllRead}> Delete All Read
            </h6>
        </div>
        {user?.seennotification.map(notificationMgs =>(
        <div className='card'
         style={{cursor:'pointer'}}>
         <div className='card-text'
         onClick={() =>navigate(notificationMgs.onClickPath)
        }
         >{notificationMgs.message}
         </div>
        </div>
        ))
        }

        </Tabs.TabPane>

    </Tabs>
    </Layout>
  )
}

export default NotificationPage;