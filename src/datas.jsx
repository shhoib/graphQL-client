import {gql,useQuery} from '@apollo/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Datas = () => {

    const navigate = useNavigate();

      const QUERY_ALL_USERS = gql`
       query ExampleQuery{
        users {     
        name
        age
        username
       }
      }
     `
      const {data,error} = useQuery(QUERY_ALL_USERS)
      if(error){
        console.log(error);
      }
      useEffect(() => {
        if (error && error.message.includes('209')) {
          navigate('/');
        }
      }, [error, navigate]);

    //   if(data){  
        //   console.log(data);
    //   }

      if(error){
        console.log(error.message);
      }
  return (

    <div>
        {data && data.users.map((datas,index)=>(
            <div key={index} className='d-flex'>
            <h2>{datas.name}</h2>
            {/* <h2>{datas.age}</h2>
            <h2>{datas.username}</h2> */}
            </div>
        ))}
        {error && 
        <h2>no authentication please login</h2>
        }
        
    </div>
  )
}

export default Datas