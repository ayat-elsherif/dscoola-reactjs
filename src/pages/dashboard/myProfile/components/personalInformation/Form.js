import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Switch } from 'antd';

import { forIn } from 'lodash';
import {
  DownArrowIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../../../../../assets/svg';

import { normalizeDataToFields, normalizeErrors } from './Helpers';
import { useUpdateProfileInfo } from './hooks/usePersonalInfo';
import DashboardButton from '../../../../../components/common/dashboard/components/button';
import { useGetLockupsList } from '../../../../../Hooks/UseLockups';
import SweetAlert from '../../../../../components/common/dashboard/components/sweetAlert.js';
import { useQueryClient } from '@tanstack/react-query';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { setCurrentUser } from 'features/user/user';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const PersonalInfoForm = ({ data, premium }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [states, setStates] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state?.user);
  console.log(currentUser, 'dfgdfgdfg');

  const { data: countriesData } = useGetLockupsList(
    'my-countries',
    'my/countries',
  );

  useEffect(() => {
    if (countriesData?.length) setCountriesList(countriesData);
  }, [countriesData]);

  const onSuccess = (data) => {
    console.log(data, 'sdsdfsdf');
    dispatch(
      setCurrentUser({ ...currentUser, photo_url: data?.data?.photo_url }),
    );
    queryClient.invalidateQueries(`profile-info`);
    SweetAlert('Done!', 'Profile Updated Successfully');
  };

  const onError = (data) => {
    form.setFields(normalizeErrors(data));
    form.scrollToField('name', { behavior: 'smooth' });
  };

  const { mutate: updataProfile, isLoading } = useUpdateProfileInfo(
    onSuccess,
    onError,
  );

  const onFinish = (values) => {
    updataProfile({ ...values, phone: phoneNumber });
  };

  const onSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    let countryCode = null;
    if (data)
      countryCode = countriesList?.find((i) => i?.name === data?.country);

    if (countryCode) handleGetCities(countryCode.iso2);
  }, [data, countriesList]);

  const handleGetCities = (value) => {
    let myHeaders = new Headers();
    myHeaders.append(
      'X-CSCAPI-KEY',
      'YjZVMHlkbGtrN3JCek5QMEpkWGlOUDdsVFRrWkh4NjhVSVU4dWM1VQ==',
    );
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    fetch(
      `https://api.countrystatecity.in/v1/countries/${value}/states`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => setStates(result))
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    if (data) {
      if (data.social_media_urls.facebook) {
        data.social_media_urls.facebook_check = true;
      }
      if (data.social_media_urls.twitter) {
        data.social_media_urls.twitter_check = true;
      }
      if (data.social_media_urls.youtube) {
        data.social_media_urls.youtube_check = true;
      }
      if (data.social_media_urls.linkedin) {
        data.social_media_urls.linkedin_check = true;
      }
      setFields(normalizeDataToFields(data));
      const newSocial = socialInputs?.map((item) => {
        let newItem = item;
        forIn(data.social_media_urls, function (value, key) {
          if (item.key === key && value) {
            newItem = {
              ...newItem,
              checked: true,
            };
          }
        });
        return newItem;
      });
      setSocialInputs(newSocial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [socialInputs, setSocialInputs] = useState([
    {
      key: 'facebook',
      icon: FacebookIcon,
      input: '',
      checked: false,
    },
    {
      key: 'twitter',
      icon: TwitterIcon,
      input: '',
      checked: false,
    },
    {
      key: 'youtube',
      icon: YoutubeIcon,
      input: '',
      checked: false,
    },
    {
      key: 'linkedIn',
      icon: LinkedInIcon,
      input: '',
      checked: false,
    },
  ]);

  return (
    <>
      <Form
        layout="vertical"
        className="dashboard-form"
        name="personal-info"
        form={form}
        fields={fields}
        initialValues={{}}
        onFinish={onFinish}
      >
        <div className="inner-form-container">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Full Name is required' }]}
          >
            <Input />
          </Form.Item>
          {!premium && (
            <Form.Item
              name="job_title"
              label="Headline"
              rules={[{ required: true, message: 'Headline is required' }]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: !premium, message: 'Email is required' },
              { type: 'email', message: 'Must be a valid Email' },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <div className="row">
            {!premium && (
              <div className="col-md-6">
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Gender is required' }]}
                >
                  <Select allowClear={false} suffixIcon={<DownArrowIcon />}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </div>
            )}

            <div className={!premium ? 'col-md-6' : 'col-md-12'}>
              <Form.Item
                name="phone"
                label="Mobile"
                className="Mobile"
                rules={[{ required: true, message: 'Mobile is required' }]}
              >
                <PhoneInput
                  value={phoneNumber}
                  countryCode={'eg'}
                  onChange={(val) => setPhoneNumber(val)}
                />
              </Form.Item>
            </div>
          </div>
          {!premium && (
            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: 'Country is required',
                    },
                  ]}
                >
                  <Select
                    allowClear={false}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      return (
                        option?.props?.children
                          ?.toLowerCase()
                          ?.indexOf(input?.toLowerCase()) >= 0
                      );
                    }}
                    onChange={(val, option) => {
                      const countryCode = countriesList?.find(
                        (i) => i?.id === option?.id,
                      );
                      handleGetCities(countryCode?.iso2);
                    }}
                    suffixIcon={<DownArrowIcon />}
                  >
                    {countriesList?.map((country) => {
                      return (
                        <Option
                          value={country?.name}
                          id={country?.id}
                          key={country?.id}
                        >
                          {country?.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  name="city"
                  label="City"
                  rules={[{ required: true }]}
                >
                  <Select
                    allowClear={false}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      return (
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    suffixIcon={<DownArrowIcon />}
                  >
                    {states?.map((state) => {
                      return (
                        <Option value={state?.name} key={state?.id}>
                          {state?.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            </div>
          )}
          <Form.Item
            name="about_me"
            label="Bio"
            rules={[{ required: true, message: 'Bio is required' }]}
          >
            <Input.TextArea autoSize={{ minRows: 3.4, maxRows: 5 }} />
          </Form.Item>
        </div>

        {!premium && (
          <>
            <div className="form-section-title">Social media</div>
            {socialInputs?.map((item, index) => {
              return (
                <div key={item.key}>
                  <div className="social-container">
                    <Form.Item
                      className="social-form-input"
                      name={item?.key}
                      rules={[
                        {
                          pattern: new RegExp(
                            `(?:(?:http|https)://)?(?:www.)?${item?.key}.com/?`,
                          ),
                          message: 'must be a Valid URl https://www.url.com',
                        },
                      ]}
                    >
                      <Input
                        prefix={<item.icon className="site-form-item-icon" />}
                        disabled={!item?.checked}
                      />
                    </Form.Item>
                    <Form.Item name={`${item.key}_check`}>
                      <Switch
                        checked={item.checked}
                        onChange={(checked) => {
                          let resulte = [...socialInputs];
                          resulte[index].checked = checked;
                          setSocialInputs(resulte);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="custom-divider"></div>
                </div>
              );
            })}
          </>
        )}
      </Form>

      <Row gutter={[16]} justify="end">
        <Col>
          <Button onClick={() => form.resetFields()}>Discard</Button>
        </Col>
        <Col>
          {' '}
          <Button onClick={onSubmit} type="primary" loading={isLoading}>
            Save
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PersonalInfoForm;
