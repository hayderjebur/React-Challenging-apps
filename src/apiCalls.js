export const fetchData = async (num) => {
  console.log('api calls', num);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${num}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};
