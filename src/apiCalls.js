export const fetchData = async (username = '') => {
  const response = await fetch(`/api/search/${username}`);
  const data = await response.json();
  return data;
};
