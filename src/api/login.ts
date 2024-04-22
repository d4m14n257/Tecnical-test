export async function getLogin(user : string, password : string) {
    
    const response = await fetch('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication', 
    {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Body: {Username: user, Password: password}})
    }).then((response) => {
        return response.json();
    })

    return response;
}