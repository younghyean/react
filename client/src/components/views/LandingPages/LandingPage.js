import React,{useEffect} from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
  
    useEffect(() => {
        Axios.get('/api/hello')
       .then(response => console.log(response.data));
    },[]);

    const onClickHandler = ()=>{
        Axios.get('/api/users/logout')
        .then(response => {
           if(response.data.success){
            props.history.push('/login');
           }
           else{
               alert('로그아웃 하는데 실패 하였습니다.');
           }
        })
    }
    return (
        <div style ={{
            display : 'flex', justifyContent: 'center', alignItems:'center',
            width : '100%', height : '100vh'

        }}>
                시작페이지
                <button onClick={onClickHandler}>
                    로그아웃
                </button>
        </div>
    )
}

export default withRouter(LandingPage)
