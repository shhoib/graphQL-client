import {gql,useQuery} from '@apollo/client'

const Datas = () => {

      const QUERY_ALL_USERS = gql`
       query ExampleQuery{
        users {     
        name
        age
        username
       }
      }
     `
      const {data} = useQuery(QUERY_ALL_USERS)
      if(data){  
          console.log(data);
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
        
    </div>
  )
}

export default Datas