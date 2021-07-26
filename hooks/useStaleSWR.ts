import useSWR, { cache } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useStaleSWR = (dataKey, condition) => {
  const revalidationOptions = {
    revalidateOnMount: !cache.has(dataKey),
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  return useSWR(condition ? dataKey : null, fetcher, revalidationOptions);
};

export default useStaleSWR;
