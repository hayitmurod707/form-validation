import styled from 'styled-components';
export const StyledElement = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   padding: 0 0 100px 0;
   width: 100%;
   & form {
      display: flex;
      flex-direction: column;
      width: 400px;
      & h2 {
         font-size: 32px;
         font-weight: 600;
         margin: 0;
         text-align: center;
      }
      & label {
         color: #6e7892;
         font-size: 15px;
         font-weight: 500;
         margin: 16px 0 8px 0;
      }
      & input {
         border-radius: 12px;
         border: 1.5px solid rgba(137, 141, 166, 0.3);
         font-size: 18px;
         font-weight: 500;
         height: 44px;
         outline: none;
         padding-left: 15px;
         width: 100%;
         &:focus {
            border: 1.5px solid #0071f2;
         }
      }
      & h6 {
         color: #ff5749;
         font-size: 14px;
         font-weight: 400;
         margin: 8px 0;
      }
      & button {
         background-color: #0071f2;
         border-radius: 12px;
         border: none;
         color: #ffffff;
         cursor: pointer;
         font-size: 17px;
         font-weight: 500;
         height: 44px;
         margin: 32px 0 0 0;
         padding: 0 20px;
         &:focus {
            outline-offset: 2px;
            outline: 1.5px solid #0071f2;
         }
      }
   }
`;
