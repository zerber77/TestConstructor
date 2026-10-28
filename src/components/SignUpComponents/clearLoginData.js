export function clearLoginData(authData) {
    localStorage.removeItem('authToken')
    authData.isAuthenticated = false
    authData.login = ''
    authData.name = ''
    authData.role = ''
}