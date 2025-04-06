export const fetchApi = async (url: string, tag: string) => {
  const data = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    next: {
      tags: [tag],
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error fetching data", err);
    });

  return data;
};
