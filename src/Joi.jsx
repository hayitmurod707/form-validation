import Input from 'cleave.js/react';
import Jo from 'joi';
import { useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { StyledElement } from './StyledElements';
const Joi = () => {
   const [form, setForm] = useState({
      age: '',
      bio: '',
      birthday: '',
      email: '',
      name: '',
      password: '',
      url: '',
   });
   const [errors, setErrors] = useState({});
   const {
      age: ageError,
      bio: bioError,
      birthday: birthdayError,
      email: emailError,
      name: nameError,
      url: urlError,
      password: passwordError,
   } = errors;
   const { age, bio, birthday, email, name, url, password } = form;
   const onSubmit = e => {
      e.preventDefault();
      const schema = Jo.object({
         name: Jo.string().required().min(3).messages({
            'string.base': 'name-string',
            'string.empty': 'name-required',
            'string.min': 'name-greater',
         }),
         age: Jo.number().required().max(70).min(18).messages({
            'number.base': 'age-number',
            'number.empty': 'age-required',
            'number.min': 'age-greater',
            'number.max': 'age-smaller',
         }),
         birthday: Jo.string()
            .required()
            .pattern(/^\d{2}([./-])\d{2}\1\d{4}$/)
            .messages({
               'string.base': 'birthday-string',
               'string.empty': 'birthday-required',
               'string.pattern.base': 'birthday-invalid',
            }),
         email: Jo.string().required().email({ tlds: false }).messages({
            'string.base': 'email-string',
            'string.email': 'email-invalid',
            'string.empty': 'email-required',
         }),
         password: Jo.string()
            .required()
            .pattern(/[0-9]/, { name: 'password-number' })
            .pattern(/[a-z]/, { name: 'password-lowercase' })
            .pattern(/[A-Z]/, { name: 'password-uppercase' })
            .pattern(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, {
               name: 'password-special',
            })
            .min(8)
            .messages({
               'string.base': 'password-string',
               'string.empty': 'password-required',
               'string.min': 'password-length',
               'string.pattern.name': '{{#name}}',
            }),
         url: Jo.string()
            .required()
            .pattern(
               /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
            )
            .messages({
               'string.base': 'website-string',
               'string.empty': 'website-required',
               'string.pattern.base': 'website-invalid',
            }),
         bio: Jo.string().empty('').messages({
            'string.base': 'bio-string',
         }),
      });
      const validate = schema.validate(form, { abortEarly: false });
      const details = validate?.error?.details;
      const error = (Array.isArray(details) ? details : [])[0];
      if (error) {
         const key = error?.context?.key;
         const message = error?.message;
         setErrors({ ...errors, [key]: message });
      } else {
         console.log(form);
      }
   };
   return (
      <StyledElement>
         <form onSubmit={onSubmit}>
            <h2>Joi</h2>
            <label>Name</label>
            <input
               type='text'
               value={name}
               onChange={e => {
                  setForm({ ...form, name: e.target.value });
                  setErrors({ ...errors, name: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, name: null });
               }}
            />
            {nameError && <h6>{nameError}</h6>}
            <label>Age</label>
            <ReactInputMask
               formatChars={{ b: '[0-9]' }}
               mask='bb'
               maskChar=''
               onChange={e => {
                  setForm({ ...form, age: parseInt(e.target.value) });
                  setErrors({ ...errors, age: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, age: null });
               }}
               value={age}
            />
            {ageError && <h6>{ageError}</h6>}
            <label>Birthday</label>
            <Input
               type='text'
               value={birthday}
               options={{
                  date: true,
                  datePattern: ['d', 'm', 'Y'],
                  delimiter: '.',
               }}
               onChange={e => {
                  setForm({ ...form, birthday: e.target.value });
                  setErrors({ ...errors, birthday: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, birthday: null });
               }}
            />
            {birthdayError && <h6>{birthdayError}</h6>}
            <label>Email</label>
            <input
               type='text'
               value={email}
               onChange={e => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, email: null });
               }}
            />
            {emailError && <h6>{emailError}</h6>}
            <label>Password</label>
            <input
               type='text'
               value={password}
               onChange={e => {
                  setForm({ ...form, password: e.target.value });
                  setErrors({ ...errors, password: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, password: null });
               }}
            />
            {passwordError && <h6>{passwordError}</h6>}
            <label>Bio</label>
            <input
               type='text'
               value={bio}
               onChange={e => {
                  setForm({ ...form, bio: e.target.value });
                  setErrors({ ...errors, bio: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, bio: null });
               }}
            />
            {bioError && <h6>{bioError}</h6>}
            <label>Website</label>
            <input
               type='text'
               value={url}
               onChange={e => {
                  setForm({ ...form, url: e.target.value });
                  setErrors({ ...errors, url: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, url: null });
               }}
            />
            {urlError && <h6>{urlError}</h6>}
            <button type='submit'>Send</button>
         </form>
      </StyledElement>
   );
};
export default Joi;
