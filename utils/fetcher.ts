export const postData = async (url: string, args?) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    const info = await res.json();
    const error = new Error(info.data);
    throw error;
  }

  return res.json();
};

export const putData = async (url: string, args?) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    const info = await res.json();
    const error = new Error(info.data);
    throw error;
  }

  return res.json();
};
