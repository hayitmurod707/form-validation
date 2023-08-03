import Input from 'cleave.js/react';
import { useState } from 'react';
import { date, number, object, string } from 'yup';
import { StyledElement } from './StyledElements';
const Yup = () => {
   const [form, setForm] = useState({
      age: '',
      bio: '',
      birthday: '',
      email: '',
      name: '',
      password: '',
      sex: '',
      url: '',
   });
   const [errors, setErrors] = useState({});
   const {
      age: ageError,
      bio: bioError,
      birthday: birthdayError,
      email: emailError,
      name: nameError,
      password: passwordError,
      url: urlError,
   } = errors;
   const { age, bio, birthday, email, name, url, password } = form;
   const onSubmit = e => {
      e.preventDefault();
      const schema = object().shape({
         name: string()
            .typeError('name-string')
            .required('name-required')
            .min(3, 'name-greater'),
         age: number()
            .typeError('age-number')
            .required('age-required')
            .positive('age-positive')
            .integer('age-integer')
            .min(18, 'age-greater')
            .max(70, 'age-smaller'),
         birthday: date()
            .typeError('birthday-invalid')
            .required('birthday required'),
         email: string()
            .typeError('email-string')
            .required('email-required')
            .email('email-invalid'),
         password: string()
            .typeError('password-string')
            .required('password-required')
            .matches(/[0-9]/, 'password-number')
            .matches(/[a-z]/, 'password-lowercase')
            .matches(/[A-Z]/, 'password-uppercase')
            .matches(
               /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
               'password-special-characters'
            )
            .min(8, 'password-length'),
         bio: string()
            .typeError('bio-string')
            .optional()
            .default(() => ''),
         url: string()
            .typeError('website-string')
            .required('website-required')
            .url('website-invalid'),
      });
      const newForm = { ...form, birthday: new Date(birthday) };
      schema
         .validate(newForm, { abortEarly: false, strict: false })
         .then(() => {
            console.log(form);
         })
         .catch(error => {
            const inner = error?.inner;
            const firstError = Array.isArray(inner) ? inner[0] : {};
            const path = firstError?.path;
            const message = firstError?.message;
            setErrors({ ...errors, [path]: message });
         });
   };
   return (
      <StyledElement>
         <form onSubmit={onSubmit}>
            <h2>Yup</h2>
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
            {ageError && <h6>{ageError}</h6>}
            <label>Birthday</label>
            <Input
               type='text'
               value={birthday}
               options={{
                  date: true,
                  datePattern: ['Y', 'm', 'd'],
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
export default Yup;
