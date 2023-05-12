

const LoginPage = () => {

    
    const url = "https://accounts.google.com/o/oauth2/v2/auth"
    const client_id = "169346533635-mt05gutaslpavfvje15a1hnjauudu3tc.apps.googleusercontent.com"
    const redirect_URI = 'https://next-js-movie-tau.vercel.app/callbackpage'
    const scope = 'profile%20email%20openid'
    const response_type = 'code'
    const fullUrl = `${url}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&prompt=consent%20select_account`
    return ( 
        <>
            <h2>Login Page</h2>
            <a href={fullUrl}>Login with Google</a>
            
        </>
     );
}

export default LoginPage;
