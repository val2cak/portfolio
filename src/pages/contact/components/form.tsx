import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '../../../components/button';
import Input from '../../../components/form/input';
import TextArea from '../../../components/form/text-area';
import { sendEmail } from '../../../utils/send-email';
import { FormData } from '../../../types/form-types';
import { locale, translate } from '../../../locales/translate';

const Form = ({ onIsSubmittingChange }) => {
  const {
    title,
    name,
    phoneMobile,
    email,
    message,
    btnText,
    requestSuccess,
    requestError,
  } = translate.contact;

  const { requiredFields, phoneFormat, emailFormat } = translate.validations;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  async function onSubmit(data: FormData) {
    try {
      onIsSubmittingChange(true);
      await sendEmail({ ...data, language: locale });
      reset();
      toast.success(requestSuccess);
    } catch (error) {
      console.error(error);
      toast.error(requestError);
    } finally {
      onIsSubmittingChange(false);
    }
  }

  const isRequiredFieldMissing = Object.keys(errors).some(
    (key) => errors[key]?.type === 'required'
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='sm:py-8 py-12 sm:px-8 px-20 h-full border-2 border-solid border-yellow rounded-sm sm:w-full lg:w-2/3 w-[46%] text-yellow flex flex-col justify-center items-center gap-6'
    >
      <div className='w-full'>
        <div className='text-lg font-bold uppercase flex justify-center font-minecraft tracking-wider'>
          {title}
        </div>
        {isRequiredFieldMissing && (
          <div className='text-red text-sm font-medium'>{requiredFields}</div>
        )}
      </div>
      <div className='flex flex-col w-full h-full justify-between items-center sm:gap-8 gap-6'>
        <Input
          label={name}
          placeholder={name}
          register={register}
          name={'name'}
          required={true}
          errors={errors?.name}
        />
        <Input
          label={phoneMobile}
          placeholder={phoneMobile}
          register={register}
          name={'phoneMobile'}
          required={true}
          errors={errors?.phoneMobile}
          validations={{
            pattern: {
              value: /^[\+\d\s\-()/]+$/,
              message: phoneFormat,
            },
          }}
        />
        <Input
          label={email}
          placeholder={email}
          register={register}
          name={'email'}
          required={true}
          errors={errors?.email}
          validations={{
            pattern: {
              value: /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/,
              message: emailFormat,
            },
          }}
        />
        <TextArea
          label={message}
          placeholder={message}
          register={register}
          name={'message'}
          required={true}
          errors={errors?.message}
          validations={{
            maxLength: {
              value: 200,
              message: 'Message must not exceed 200 characters',
            },
          }}
        />
      </div>
      <Button
        text={btnText}
        type={'submit'}
        className='text-yellow border-yellow'
      />
    </form>
  );
};

export default Form;
