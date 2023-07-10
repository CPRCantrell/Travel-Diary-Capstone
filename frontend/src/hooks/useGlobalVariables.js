import useAuth from "./useAuth";

const useGlobalVariables = () => {

    const [user, token] = useAuth()

    const BASE_URL = 'http://localhost:8000/api'
    const AUTHENTICATION = {headers:{Authorization: 'Bearer ' + token}}

    return ([BASE_URL, AUTHENTICATION]);
}

export default useGlobalVariables;