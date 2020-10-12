import React from "react";
import { Table,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Badge } from 'reactstrap';
import PropTypes from 'prop-types'
import "../css/style.css";

class Home extends React.Component {
    constructor(props){
        super(props);
          this.state ={
              list:[],
              main_header:[],
              dropdown:[]
          }
          this.addcol = this.addcol.bind(this);

        }

        addcol(eve){

            // this.setState(prevState => ({
            //     main_header: [...prevState.list.slice(0, eve), ...prevState.list.slice(eve + 1)]
            // }))
            const list  = this.state.main_header;
            const columns = ['weight']
            list.push(columns);
            this.setState({
                columns:list
            })
            
        }
componentDidMount(){
            window.scrollTo(0, 0);
            const list=[];
    fetch("http://localhost:3001/list")
      .then(res => res.json())
      .then(
        (result) => { 
            var arr = result['near_earth_objects'];
            for(var i in arr){
                list.push(arr[i])
            }
            this.setState({
                list:list
            })
        });
            const header = ['id','name','is_potentially_hazardous_asteroid','absolute_magnitude_h'];
            this.setState({
                main_header:header
            })
        }
render(){

    Table.propTypes = {
        // Pass in a Component to override default element
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        size: PropTypes.string,
        bordered: PropTypes.bool,
        borderless: PropTypes.bool,
        striped: PropTypes.bool,
        dark: PropTypes.bool,
        hover: PropTypes.bool,
        responsive: PropTypes.bool,
        // Custom ref handler that will be assigned to the "ref" of the inner <table> element
        innerRef: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.string,
          PropTypes.object
        ])
        };
    

        return (
        <div className="main_div">
        <div className="option_div">
        <UncontrolledDropdown className="svg_div">
      <DropdownToggle caret>
      <span>
            <svg height={24} viewBox="0 0 24 24">
                    <g data-name="Layer 2">
                        <g data-name="funnel">
                            <rect width="24" height="24" opacity="0"/>
                            <path  fill="#fff" d="M13.9 22a1 1 0 0 1-.6-.2l-4-3.05a1 1 0 0 1-.39-.8v-3.27l-4.8-9.22A1 1 0 0 1 5 4h14a1 1 0 0 1 .86.49 1 1 0 0 1 0 1l-5 9.21V21a1 1 0 0 1-.55.9 1 1 0 0 1-.41.1zm-3-4.54l2 1.53v-4.55A1 1 0 0 1 13 14l4.3-8H6.64l4.13 8a1 1 0 0 1 .11.46z"/>
                        </g>
                    </g>
                </svg>
                
            </span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
            <UncontrolledDropdown className="svg_div">
      <DropdownToggle caret>
      <span>
      <svg height={24} viewBox="0 0 24 24"><g data-name="Layer 2">
                    <g data-name="plus-square">
                        <rect width="24" height="24" opacity="0"/>
                        <path fill="#fff" d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm1 15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"/>
                        <path fill="#fff" d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z"/>
                    </g>
                    </g>
                </svg>
            </span>
      </DropdownToggle>
      <DropdownMenu>
          {this.state.main_header.map((list,index)=>{
              return(
              <DropdownItem onClick={()=>this.addcol(index)} key={index}>{list}</DropdownItem>
              )
          })}
        
      </DropdownMenu>
    </UncontrolledDropdown>
        </div>
        
            
            
            
            
            <Table bordered hover responsive>
                <thead>
                    <tr>
                    {this.state.main_header.map((list,index)=>{
                return(
                    <th key={index}>{list}</th>
                    )
                })}
                    </tr>
                </thead>
            <tbody>
            {this.state.list.map((list,index)=>{
              return(
                <tr key={index}>
                {this.state.main_header.map((sublist,key)=>{
                    if(sublist!=='is_potentially_hazardous_asteroid'){
                        return(
                            <td key={key}>{list[""+sublist+""]}</td>
                        )
                    }else{
                        if(list['is_potentially_hazardous_asteroid']){
                            return(
                                <td key={key}><Badge color="danger" pill>Danger</Badge></td>
                            )
                        }else{
                            return(
                                <td key={key}><Badge color="success" pill>Safe</Badge></td>
                            )
                        }
                    }
                   
                })}
                </tr>
              )
          })}
            </tbody>
          </Table>
    </div>
          
        );
      
      

   
}
    
       

}

export default Home;