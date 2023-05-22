export const deleteRoutine = async (token, routineId) => {

    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(response);
      return data;
    } catch (error) {
      console.error(error);
    }
  };