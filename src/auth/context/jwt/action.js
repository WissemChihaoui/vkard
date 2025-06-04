// // import axios, { endpoints } from 'src/utils/axios';

// import { setSession } from './utils';
// import { STORAGE_KEY } from './constant';

// /** **************************************
//  * Sign in
//  *************************************** */
// export const signInWithPassword = async ({ email, password }) => {
//   try {
//     const params = { email, password };

//     const res = await axios.post(endpoints.auth.signIn, params);
    
//     const { accessToken } = res.data;
   
//     if (!accessToken) {
//       throw new Error('Access token not found in response');
//     }

//     setSession(accessToken);
//   } catch (error) {
//     console.error('Error during sign in:', error);
//     throw error;
//   }
// };

// /** **************************************
//  * Sign up
//  *************************************** */
// export const signUp = async ({ email, password, name }) => {
//   const params = {
//     email,
//     password,
//     name,
//   };

//   try {
//     const res = await axios.post(endpoints.auth.signUp, params);

//     const { accessToken } = res.data;

//     if (!accessToken) {
//       throw new Error('Access token not found in response');
//     }

//     localStorage.setItem(STORAGE_KEY, accessToken);
//   } catch (error) {
//     console.error('Error during sign up:', error);
//     throw error;
//   }
// };

// /** **************************************
//  * Sign out
//  *************************************** */
// export const signOut = async () => {
//   try {
//     await axios.post(endpoints.auth.signOut);
//     await setSession(null);
//   } catch (error) {
//     console.error('Error during sign out:', error);
//     throw error;
//   }
// };
