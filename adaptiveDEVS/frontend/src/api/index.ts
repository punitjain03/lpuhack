import axios from 'axios';
import { FarmerData } from 'src/types/farmerData';
import { queryClient } from './queryClient';

const api = {
  submitFarmerData: async (data: FarmerData) => {
    return axios
      .post('http://localhost:5000/farmerData', data)
      .then((res) => res.data);
  },
};

export default api;
