export const newRoutine = async (
    token,
    name,
    goal,
    isPublic
  ) => {
    console.log(token, "new routine")
    const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
       name: name, 
       goal: goal,
       isPublic: true
        
      }),
    });
    const data = await response.json();
    console.error(data, "data");
  
    return data;
  };