export async function setUser(token : string, data : any) {
    
    const response = await fetch('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole', 
    {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({Body: {...data}})
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    })

    return response;
}