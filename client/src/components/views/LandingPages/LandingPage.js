import React,{useEffect} from 'react'
import axios from 'axios'
function LandingPage() {
  
    useEffect(() => {
        axios.get('/api/hello')
       .then(response => console.log(response.data));
    },[]);

    return (
        <div>
                LanndingPage
        </div>
    )
}

export default LandingPage
