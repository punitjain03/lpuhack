import { useQuery } from 'react-query';
import { FarmerData } from 'src/types/farmerData';
import api from '../api';
import { GlobalStoreContext } from '../contexts/gloablStore';

export function useSubmitFarmerData(farmerData: FarmerData) {
  const { isLoading, data, error } = useQuery(
    'submit-farmer-data' + farmerData.name,
    () => api.submitFarmerData(farmerData)
  );
  return {
    isLoading,
    data,
    error,
  };
}
