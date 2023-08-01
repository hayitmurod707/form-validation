import { Fragment } from 'react';
import Joi from './Joi';
import Yup from './Yup';
const App = () => (
   <Fragment>
      <h1 style={{ textAlign: 'center', margin: '32px 0' }}>Form validation</h1>
      <h4 style={{ textAlign: 'center' }}>
         <a href='https://github.com/hayitmurod707/form-validation'>Github</a>
      </h4>
      <Joi />
      <Yup />
   </Fragment>
);
export default App;
