import Input from 'cleave.js/react';
import Jo from 'joi';
import { useState } from 'react';
import { StyledElement } from './StyledElements';
const Joi = () => {
   const [form, setForm] = useState({
      age: '',
      bio: '',
      birthDate: '',
      email: '',
      name: '',
      url: '',
   });
   const [errors, setErrors] = useState({});
   const {
      age: ageError,
      bio: bioError,
      birthDate: birthDateError,
      email: emailError,
      name: nameError,
      url: urlError,
   } = errors;
   const { age, bio, birthDate, email, name, url } = form;
   const onSubmit = e => {
      e.preventDefault();
      const schema = Jo.object({
         age: Jo.number().required().max(70).min(18).messages({
            'number.base': 'Age must be number',
            'number.empty': 'Age is required',
            'number.min': 'Age must be greater than 18',
            'number.max': 'Age must be smaller than 70',
         }),
         bio: Jo.string().empty('').messages({
            'string.base': 'Bio must be string',
         }),
         birthDate: Jo.date().format('DD-MM-YYYY').messages({
            'date.base': 'birthDate must be string',
            'date.empty': 'birthDate is required',
            'date.format': 'birthDate is invalid',
         }),
         // email: Jo.string().required().email().messages({
         //    'string.base': 'Email must be string',
         //    'string.empty': 'Email is required',
         //    'string.email': 'Email is invalid',
         // }),
         // name: Jo.string().required().min(3).messages({
         //    'string.base': 'Name must be string',
         //    'string.empty': 'Name is required',
         //    'string.min': 'Name length must be greater than 3',
         // }),
         // url: Jo.string().required().url().messages({
         //    'string.base': 'Website must be string',
         //    'string.empty': 'Website is required',
         //    'string.url': 'Website is invalid',
         // }),
      });
      console.log(new Date(birthDate || '').toISOString());
      const validate = schema.validate(
         { age, bio, birthDate },
         { abortEarly: false }
      );
      console.log(validate);
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
            {nameError && <h6>{nameError?.message}</h6>}
            <label>Age</label>
            <input
               type='text'
               value={age}
               onChange={e => {
                  setForm({ ...form, age: e.target.value });
                  setErrors({ ...errors, age: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, age: null });
               }}
            />
            {ageError && <h6>{ageError?.message}</h6>}
            <label>BirthDate</label>
            <Input
               type='text'
               value={birthDate}
               options={{
                  date: true,
                  datePattern: ['d', 'm', 'Y'],
                  delimiter: '.',
               }}
               onChange={e => {
                  setForm({ ...form, birthDate: e.target.value });
                  setErrors({ ...errors, birthDate: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, birthDate: null });
               }}
            />
            {birthDateError && <h6>{birthDateError?.message}</h6>}
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
            {emailError && <h6>{emailError?.message}</h6>}
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
            {urlError && <h6>{urlError?.message}</h6>}
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
            {bioError && <h6>{bioError?.message}</h6>}
            <button type='submit'>Send</button>
         </form>
      </StyledElement>
   );
};
export default Joi;
