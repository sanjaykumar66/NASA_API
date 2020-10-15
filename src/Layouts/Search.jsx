import React from "react";
import { Link } from "react-router-dom";
 import {  Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types'
import "../css/style.css";

class Search extends React.Component{
    constructor(props){
        super(props);
    }
search(eve){
    eve.preventDefault();
    console.log(document.getElementById("search").value)
    var config = {
        method: 'get',
        url: 'https://api.nasa.gov/neo/rest/v1/neo/'+document.getElementById("search").value+'?api_key=eAiagrBeKGZr110YNK2Hoy6Lim5trwP7Yb7cW4JX',
        headers: { }
      };
      
      Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

    render(){
        return(
            <div className="main_div">
        <div className="option_div">
           </div></div>
        )
    }
}

export default Search;