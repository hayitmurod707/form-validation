import { useState } from 'react';
import { StyledElement } from './StyledElements';
const Joi = () => {
   const [joi, setJoi] = useState({
      age: '',
      bio: '',
      email: '',
      name: '',
      sex: '',
      url: '',
   });
   const { age, bio, email, name, url } = joi;
   const onSubmit = e => {
      e.preventDefault();
   };
   return (
      <StyledElement>
         <form onSubmit={onSubmit}>
            <h1>Joi validation</h1>
         </form>
      </StyledElement>
   );
};
export default Joi;
