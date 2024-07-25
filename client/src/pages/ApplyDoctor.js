import React from 'react';
import Layout from '../components/Layout';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());

      // Format timings as an object with start and end properties
      const timings = {
        start: values.timings[0].format('HH:mm'),
        end: values.timings[1].format('HH:mm'),
      };

      const res = await axios.post(
        '/api/v1/user/apply-doctor',
        { ...values, userId: user._id, timings },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.success);
        navigate('/');
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>

      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className=""> Personal Details:</h4>
        <br></br>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your First name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Phone number"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your contact number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='Enter your Email Address' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='Enter your Address' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Website"
              name="website"
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='Enter your website name' />
            </Form.Item>
          </Col>
        </Row>
        <h4 className=''> Profesional Details:</h4>
        
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='Enter your specialization' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='Enter your experience' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Fees Per Consultation"
              name="feePerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='specify your consultant fee' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label="Timmings"
              name="timings"
              required
            
            >
              <TimePicker.RangePicker format= "HH:mm" />
            </Form.Item>
          </Col>
          <Col  xs={24} sm={24} md={8}></Col>
          <Col xs={24} sm={24} md={8}>
          <button className="btn btn-primary form-btn" type="submit">Submit</button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
