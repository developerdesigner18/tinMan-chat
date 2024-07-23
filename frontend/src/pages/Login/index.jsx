import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { onLogin } from "./services";
import { ACCESS_TOKEN, USER_DATA, setLocalStorageItem } from "../../utils/localStroageManager";

const Login = () => {

   const [nickname, setNickname] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const onSubmitHandler = async (e) => {
      e.preventDefault();

      if (!nickname) {
         toast.error('Nickname is required');
         return;
      }

      const toastId = toast.loading('Loading...');
      setLoading(true);

      const response = await onLogin({ nickname });

      if (response.success) {
         setLocalStorageItem(ACCESS_TOKEN, response.data.data.accessToken);
         setLocalStorageItem(USER_DATA, response.data.data.user);
         navigate("/");
      } else {
         toast.error(response.message);
      }

      setLoading(false);
      toast.dismiss(toastId);
   }

   return (
      <div className="transition-none w-screen h-screen p-4 flex justify-center items-center bg-dark-primary">
         <form
            onSubmit={onSubmitHandler}
            className="w-full sm:w-[500px] max-w-[500px] border border-[#374151] bg-dark-secondary shadow-lg shadow-gray-500/40 rounded px-8 pt-6 pb-8 mb-4"
         >
            <h3 className="mb-4 sm:mb-0 text-center text-xl text-light-primary font-semibold">Login</h3>

            <div className="mb-4">
               <label className="block text-light-primary text-sm font-bold mb-2" htmlFor="nickname">
                  Nickname
               </label>
               <input
                  className="shadow appearance-none border border-[#374151] rounded w-full py-2 px-3 text-light-primary bg-[#374151] leading-tight focus:outline-none focus:shadow-outline"
                  id="nickname"
                  name="nickname"
                  type="text"
                  placeholder="abc"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
               />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
               <button
                  className="bg-blue-500 hover:bg-blue-700 text-light-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}
               >
                  Sign In
               </button>
            </div>
         </form>
      </div>
   )
};

export default Login;
