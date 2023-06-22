import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Button, message, Tabs } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import OneToOneServices from '../../../../../../../services/OneToOneServices';
// import { useBuySlot } from './hooks/useOneOnOne';
// import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';
// import { useAddToCartList } from '../../../../../../../helpers/dropdownCart/hooks/useCartList';
import './style.scss';
import useApi from 'Hooks/network/useApi';
import { AvaliableDays } from './AvaliableDays';
import useCartAdd from 'api-hooks/cart/useCartAdd';

function RequestAppointment({ myCourse, instructorId, handleClose }) {
  const { cartAdd, cartAddLod } = useCartAdd();

  const [availableDays, setAvailableDays] = useState(null);
  const [buyIsLoading, setbuyIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [instructorWorkingHours, setInstructorWorkingHours] = useState([]);
  const [currentTime, setCurrentTime] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [avilabilityId, setAvilabilityId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pricePlan, setPricePlan] = useState(null);
  const api = useApi();
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const getAvailableDays = (id) => {
    return OneToOneServices.getAvailableDays(id);
  };

  const getAvailableDaysForInstractor = (id) => {
    return OneToOneServices.getAvailableDaysForInstractor(id);
  };

  const onSuccess = (data) => {
    // let onlyDays = Object.keys(data.data);
  };

  const onError = (data) => {};

  // eslint-disable-next-line no-unused-vars
  const { isLoading, data } = useQuery(
    [`get-available-days`],
    () => getAvailableDays(myCourse?.course.id),
    {
      onSuccess: onSuccess,
      onError: onError,
      enabled: !!myCourse,
    },
  );
  // eslint-disable-next-line no-unused-vars
  const { isLoading: instractorIsLoading } = useQuery(
    [`get-available-days-for-instractor`],
    () => getAvailableDaysForInstractor(instructorId),
    {
      onSuccess: onSuccess,
      onError: onError,
      enabled: !!instructorId,
    },
  );

  // eslint-disable-next-line no-unused-vars
  // const { isLoading: hoursIsLoading, data: hoursData } = useQuery(
  //   [`get-available-sluts`],
  //   () => getAvailableSluts(selectedDay),
  //   {
  //     onSuccess: onHoursSuccess,
  //     onError: onHoursError,
  //     enabled: !!selectedDay,
  //   },
  // );

  const convertTime = (timeString) => {
    const convertedTime = dayjs(timeString, 'h:mm A').format('HH:mm:ss');
    console.log({ convertedTime });
    return convertedTime;
  };

  // const onSuccsses = (data) => {
  //   console.log(data, 'suc data');

  //   message.success(data.data.message, 5);

  //   queryClient.invalidateQueries([`cart-info`]);
  // };

  // const onFail = (data) => {
  //   message.error(data.response.data.message, 5);
  // };

  // const { mutate: addToCart } = useAddToCartList(onSuccsses, onFail);

  const onFinish = (values) => {
    if (!currentTime) {
      message.error('You have to pick a time slot');
      return;
    }

    values.instructor_id = instructorId
      ? instructorId
      : myCourse?.course?.author.id;
    values.avilability_id = !currentTime?.isBooked ? 1 : 0;

    if (myCourse) {
      values.course_id = myCourse?.course?.id;
    }
    setbuyIsLoading(true);
    const body = new FormData();
    body.append('instructor_id', instructorId);
    body.append('appointment_type', 1);

    body.append('payment_type', 'cod');
    body.append('appointment_date', dayjs(selectedDay).format('DD/MM/YYYY'));
    body.append('start_time', convertTime(currentTime?.time?.split(' - ')[0]));
    body.append('end_time', convertTime(currentTime?.time?.split(' - ')[1]));
    body.append('speciality_id', 1);
    body.append('selected_slots', 1);
    body.append('title', values?.booking_title);
    body.append('description', values?.description);

    api
      .post('appointment/create', body)
      .then((res) => {
        message.success('Appointment created successfully');
        const reqData = {
          item_id: res?.data?.id,
          item_type: 'appointment',
        };

        cartAdd({
          reqData,
          onSuc: (res) => {
            // // console.log('cartAdd  res', res);
            handleClose(false);
          },
        });
      })
      .catch(() => message.error('Something went wrong'))
      .finally(() => {
        setbuyIsLoading(false);
      });
  };

  // const onBuySuccsses = (data) => {
  //   if (pricePlan === 'paid') {
  //     addToCart({
  //       item_id: avilabilityId,
  //       item_type: 'ono',
  //     });
  //   }
  //   // queryClient.invalidateQueries([`get-available-sluts`]);
  //   navigate('/student-dashboard/one-to-one');
  //   swal('Done!', 'slut picked successfully', 'success');
  // };

  const handleGetAvailableTimeByDay = (date, dateString) => {
    console.log({ dateString: dayjs(dateString).format('DD/MM/YYYY') });
    setSelectedDay(dateString);
    api
      .get(
        `appointment/schedule/listfor/student?provider_id=${instructorId}&selected_date=${dayjs(
          dateString,
        ).format('DD/MM/YYYY')}`,
      )
      .then((res) => {
        setAvailableDays(res?.data);
      });
  };

  const handleFetchList = () => {
    api
      .get(
        `appointment/schedule/list?provider_id=${instructorId}&language_id=1&is_schedule_timing=1`,
      )
      .then((res) => {
        if (res) {
          const daysArray = {
            sunday: 0,
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
          };
          const daysList = res?.data?.list?.[0]?.working_hours;
          const disabledWorkingDays = [];
          const disabledDates = [];
          for (const day in daysList) {
            if (daysList[day].length === 0) disabledDates.push(day);
          }
          disabledDates?.forEach((item) => {
            disabledWorkingDays.push(daysArray[item?.toLowerCase()]);
          });
          console.log({ disabledWorkingDays });
          setInstructorWorkingHours(disabledWorkingDays);
        }
      });
  };

  useEffect(() => {
    handleFetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructorId]);

  const disabledDate = (current) => {
    // Disable dates that are in the disabledDates array or before today
    return (
      instructorWorkingHours?.includes(current.day()) ||
      current.isBefore(dayjs(), 'day')
    );
  };

  return (
    <div>
      <Form
        className="one-on-one-form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="full-width"
          label="Title"
          name="booking_title"
          rules={[
            {
              required: true,
              message: 'Please enter a title for your Appointment',
            },
          ]}
        >
          <Input className="title-input" placeholder="Enter Your Title" />
        </Form.Item>

        <Form.Item
          className="full-width"
          label="Description"
          name="description"
        >
          <Input.TextArea rows={2} placeholder="Enter Your Description" />
        </Form.Item>

        <Form.Item className="full-width" label="Select date" name="date">
          <DatePicker
            value={selectedDay}
            disabledDate={disabledDate}
            onChange={handleGetAvailableTimeByDay}
          />
        </Form.Item>

        {availableDays && selectedDay ? (
          <div className="select-date">
            <span className="available-times">Available times for {' - '}</span>
            <span className="available-times available-for">{selectedDay}</span>
          </div>
        ) : null}

        {availableDays && (
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: 'Morning',
                key: '1',
                children: (
                  <AvaliableDays
                    days={availableDays?.morning}
                    onPickDay={setCurrentTime}
                  />
                ),
              },
              {
                label: 'Afternoon',
                key: '2',
                children: (
                  <AvaliableDays
                    days={availableDays?.afternoon}
                    onPickDay={setCurrentTime}
                  />
                ),
              },
              {
                label: 'Evening',
                key: '3',
                children: (
                  <AvaliableDays
                    days={availableDays?.evening}
                    onPickDay={setCurrentTime}
                  />
                ),
              },
            ]}
          />
        )}

        <div className="text-end mt-5 mb-5">
          <Button
            loading={buyIsLoading}
            type="primary"
            // onClick={onFinish}
            htmlType="submit"
          >
            Request Appointment
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RequestAppointment;
