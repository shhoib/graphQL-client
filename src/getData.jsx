import {gql,useMutation} from '@apollo/client'
import { useState } from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'


const GetData = () => {

    const navigate = useNavigate()

    const LOGIN_MUTATION = gql`
        mutation login($username: String!) {
        login(username: $username) {
        username
        accessToken
        refreshToken
     }
    }
    `
    const [username, setUsername] = useState('');

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: { username },
    });


    const handleLogin= async()=>{
        try {
            const response = await login();
            const { accessToken, refreshToken } = response.data.login;

            Cookies.set('accessToken', accessToken);
            Cookies.set('refreshToken', refreshToken);
            console.log(response);
            navigate('/displaydata')
          } catch (error) {
            console.error(error);
          }
    }

  return (

    <div>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <button onClick={handleLogin} >login</button>
    </div>
  )
}

export default GetData


    // const {data} = useQuery(QUERY_ALL_USERS)
    // if(data){  
    //     console.log(data);
    // }
    // const QUERY_ALL_USERS = gql`
    // query ExampleQuery{
    //     users {
    //     id
    //     name
    //     age
    //   }
    // }
    // `
