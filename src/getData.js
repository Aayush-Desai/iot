import fetchData from "./fetchData";

const getData = async ({ph,temp1,temp2,tur1,tur2}) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      ph,
      temp1,
      temp2,
      tur1,
      tur2
    }
  };
  const url = "/dumy";
  const response = await fetchData(url, fetchOptions);
  return response;
};

export default getData;