const fetchData = async (url, data) => {
  return await fetch(url, { 
    method: "POST", 
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({postcodes: data})
  })
  
}

export default fetchData