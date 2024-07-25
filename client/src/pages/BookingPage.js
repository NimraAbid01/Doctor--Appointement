import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { DatePicker, TimePicker, message } from 'antd';
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        setError(res.data.message); // Assuming the API returns an error message
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };




  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        {
          doctorId: params.doctorId,
          date: date, // Ensure the date is in "DD-MM-YYYY" format
          time: time, // Ensure the time is in "HH:mm" format
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        setIsAvailable(true);
      } else {
        message.error(res.data.message);
        setIsAvailable(false);
      }
    } catch (error) {
      message.error("Error in checking availability");
      dispatch(hideLoading());
      console.log(error);
    }
  };
  
  


  
  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Error in booking");
      console.log(error);
    }
  };
  



  const handleDateChange = (value) => {
    console.log("Selected Date:", value.format("DD-MM-YYYY"));
    setDate(value.format("DD-MM-YYYY")); // Ensure consistent date format
  };
  
  const handleTimeChange = (value) => {
    if (typeof value === 'object' && value.$isDayjsObject) {
      const hours = String(value.hour()).padStart(2, '0');
      const minutes = String(value.minute()).padStart(2, '0');
      const selectedTime = `${hours}:${minutes}`;
      console.log("Selected Time:", selectedTime);
      setTime(selectedTime);
      console.log("Selected Time format is:", typeof selectedTime);
    } else {
      console.error("Invalid time format:", value);
    }
  };
  


  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card shadow'>
              <div className='card-body'>
                <h2 className='text-center mb-4'>Book an Appointment</h2>
                {doctors && (
                  <>
                    <h4 className='mb-3'>
                      Dr. {doctors.firstName} {doctors.lastName}
                    </h4>
                    <p>Fees for Consultation: {doctors.feePerConsultation}</p>
                    {doctors.timings ? (
                      <p>
                        Timings: {doctors.timings.start} - {doctors.timings.end}
                      </p>
                    ) : (
                      <p>No available timings.</p>
                    )}
                  </>
                )}
                
                <div className='form-group'>
                  <DatePicker
                    format='DD-MM-YYYY'
                    className='form-control'
                    onChange={handleDateChange}
                    placeholder='Select Date'
                  />
                </div>
                <div className='form-group'>
                  <TimePicker
                    format='HH:mm'
                    className='form-control'
                    onChange={handleTimeChange}
                    placeholder='Select Time'
                  />
                </div>


                <button className='btn btn-primary btn-block' onClick={handleAvailability}>
                  Check Availability
                </button>
                
                 <button className='btn btn-dark btn-block mt-3' onClick={handleBooking}>
                  Book Now
                </button> 
                   
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
