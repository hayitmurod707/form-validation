import { useState } from 'react';
import { number, object, string } from 'yup';
import { StyledElement } from './StyledElements';
const Yup = () => {
   const [yup, setYup] = useState({
      age: '',
      bio: '',
      email: '',
      name: '',
      sex: '',
      url: '',
   });
   const [errors, setErrors] = useState({});
   const {
      age: ageError,
      bio: bioError,
      email: emailError,
      name: nameError,
      url: urlError,
   } = errors;
   const { age, bio, email, name, url } = yup;
   const onSubmit = e => {
      e.preventDefault();
      const schema = object().shape({
         name: string()
            .typeError('Name must be string')
            .required('Name is required')
            .min(3, 'Name length must be 3'),
         age: number()
            .typeError('Age must be number')
            .required('Age is required')
            .positive('Age must be positive number')
            .integer('Age must be integer number')
            .min(18, 'Age must be greater than 18')
            .max(70, 'Age must be smaller than 70'),
         email: string()
            .typeError('Email must be string')
            .required('Email is required')
            .email('Email is invalid'),
         bio: string()
            .typeError('Bio must be string')
            .optional()
            .default(() => ''),
         url: string()
            .typeError('Website must be string')
            .required('Website is required')
            .url('Website is invalid'),
      });
      schema
         .validate(yup, {
            trailing: true,
         })
         .then(() => {
            console.log(yup);
         })
         .catch(error => {
            const path = error?.path;
            setErrors({ ...errors, [path]: error });
         });
   };
   return (
      <StyledElement>
         <form onSubmit={onSubmit}>
            <h1>Yup validation</h1>
            <label>Name</label>
            <input
               type='text'
               value={name}
               onChange={e => {
                  setYup({ ...yup, name: e.target.value });
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
                  setYup({ ...yup, age: e.target.value });
                  setErrors({ ...errors, age: null });
               }}
               onFocus={() => {
                  setErrors({ ...errors, age: null });
               }}
            />
            {ageError && <h6>{ageError?.message}</h6>}
            <label>Email</label>
            <input
               type='text'
               value={email}
               onChange={e => {
                  setYup({ ...yup, email: e.target.value });
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
                  setYup({ ...yup, url: e.target.value });
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
                  setYup({ ...yup, bio: e.target.value });
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
export default Yup;
