import { toast, Bounce } from 'react-toastify';

export const serverErrorNotif = () => {
  return toast.error('Unable to contact server', { 
    position: "top-right",
    autoClose: 5000, 
    hideProgressBar: false, 
    closeOnClick: true, 
    pauseOnHover: true, 
    draggable: true, 
    progress: undefined, 
    theme: "light", 
    transition: Bounce
  });
}

export const customWarningNotif = (msg) => {
  return toast.warning(`${msg}`, { 
    position: "top-right",
    autoClose: 5000, 
    hideProgressBar: false, 
    closeOnClick: true, 
    pauseOnHover: true, 
    draggable: true, 
    progress: undefined, 
    theme: "light", 
    transition: Bounce
  });
}

export const customSuccessNotif = (msg) => {
  return toast.success(`${msg}`, { 
    position: "top-right",
    autoClose: 5000, 
    hideProgressBar: false, 
    closeOnClick: true, 
    pauseOnHover: true, 
    draggable: true, 
    progress: undefined, 
    theme: "light", 
    transition: Bounce
  });
}