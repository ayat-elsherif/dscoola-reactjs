import { Form } from 'antd';
// import dayjs from 'dayjs/dayjs';

function useSetFormValues() {
  const [form] = Form.useForm();

  const setFormValues = (dataObj) => {
    if (!dataObj) return;
    const formValues = { ...dataObj };
    form.setFieldsValue(formValues);
  };

  return { form, setFormValues };
}

export default useSetFormValues;
