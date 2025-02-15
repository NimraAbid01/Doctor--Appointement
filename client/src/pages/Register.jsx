import React from 'react';
import "../styles/RegisterStyle.css" ;
import { Form, Input, message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
    //form handler
    const onFinishHandler = async (values) => {
      try {
        dispatch(showLoading());
        console.log("Form Values:", values); // Add this line
        const res = await axios.post("/api/v1/user/register", values);
        dispatch(hideLoading());
        if (res.data.success) {
          message.success("Register Successfully!");
          navigate("/login");
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error("Something Went Wrong");
      }
    };
    return (
      <>
        <div className="form-container ">
          <Form
            layout="vertical"
            onFinish={onFinishHandler} className="card p-4">
            
          
            <h3 className="text-center">Register From</h3>
            <Form.Item label="Name" name="name">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <Link to="/login" className="m-2">
              Already user login here
            </Link><br></br>
            <button className="btn btn-success" type="submit">
              Register
            </button>
            <br></br>
          </Form>
        </div>
      </>
    );
  };
  export default Register;