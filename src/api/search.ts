export async function getSearchUser(token : string, userSearch : string) {
    
    const response = await fetch('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers', 
    {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({Body: {SearchText: userSearch}})
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    })

    return response;
}