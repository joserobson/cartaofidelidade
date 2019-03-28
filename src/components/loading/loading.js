
import React,{Component} from 'react'

import './loading.css';

class Loading extends Component{

    static show(){
        document.getElementById("loading").style.display = 'block';
    }

    static close(){
        document.getElementById("loading").style.display = 'none';
    }


    render(){
        return <div id="loading">
                    <div className="loader"></div>      
               </div>
    }

}

export default Loading;
