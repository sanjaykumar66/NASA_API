import React from "react";
import { Link } from "react-router-dom";
 import {  Form, FormGroup, Input,Table,UncontrolledDropdown, Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem,Badge, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types'
import Axios from "axios"
import "../css/style.css";

class Home extends React.Component {
    constructor(props){
        super(props);
          this.state ={
              list:[],
              main_header:[['id'],['name'],['is_potentially_hazardous_asteroid'],['absolute_magnitude_h'],["designation"],["estimated_diameter","kilometers","estimated_diameter_min"],["close_approach_data","0","close_approach_date_full"],["close_approach_data","0","orbiting_body"]],
              current:[['id'],['name'],['is_potentially_hazardous_asteroid'],['absolute_magnitude_h'],["designation"]],
              dropdown:[],
              search:false,
              date:false,
              searchexp:false,
              dateexp:false,
          }
        
          this.addcol = this.addcol.bind(this);
          this.page=this.props.match.params.page;
          this.search=this.search.bind(this);
          this.date=this.date.bind(this);
        }

        addcol(eve){

            // this.setState(prevState => ({
            //     main_header: [...prevState.list.slice(0, eve), ...prevState.list.slice(eve + 1)]
            // }))
            const list  = this.state.current;
            const columns = this.state.main_header[eve]
            list.push(columns);
            this.setState({
                current:list
            })
            
        }

        filter(eve){
       
        }
componentDidMount(){

            window.scrollTo(0, 0);
            const list=[];
    fetch("https://scribeless-api.glitch.me/list?page="+this.page)
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
            
        }
        componentWillReceiveProps(nextProps) {
            
            if (nextProps.match.params.page !== this.props.match.params.page) {
               this.page=nextProps.match.params.page;
            this.componentDidMount();
            }
        }


        renderobject(list,sublist){
          
            var value=list[sublist[0]];
            for (var i=1;i<sublist.length;i++){
                
               
                value=value[sublist[i]];
                if(value===undefined){
                    value="NIL"
 break;
                }
               
            }
         
            return value;
           
        }
        arraycompare(md2){
           // var list=[];
            var md1 = this.state.current;
 md2=[md2]   
   
            for(var x = 0; x < md1.length; x++){
                for(var y = 0; y < md2.length; y++){
                  if(md1[x][0] === md2[y][0] && md1[x][1] === md2[y][1] && md1[x][2] === md2[y][2]){
                     
                      return true;
                      
                  }

                }
            }
           
            return false

        }

        search(){
            console.log(this.props.match.params);
            this.setState({
                search:!this.state.search
            })
        }
        date(){
            this.setState({
                date:!this.state.date
            })
        }
        datequery(eve){
            eve.preventDefault();
            var config = {
                method: 'get',
                
                url: 'https://scribeless-api.glitch.me/searchdate?start='+document.getElementById("startdate").value+'&end='+document.getElementById("enddate").value,
                headers: { }
              };
              
              Axios(config)
              .then( (response)=> {
                  if(response.data!=="undefined"){
                      var list=[];
                    Object.values(response.data['near_earth_objects']).map((value)=>{
                                Object.values(value).map((child)=>{
                                        list.push(child);
                    })
                })

            this.setState({
                        list:list,
                        date:!this.state.date,
                        dateexp:false
                    })
                this.addcol(6);
                  }
                  else{
                    this.setState({
                        dateexp:true
                    })
                  }
                  
                
              })
              .catch( (error)=> {
                  
                this.setState({
                    searchexp:true
                })
              });
        }
        query(eve){
            eve.preventDefault();
            
            var config = {
                method: 'get',
                
                url: 'https://scribeless-api.glitch.me/search?q='+document.getElementById("search").value,
                headers: { }
              };
              
              Axios(config)
              .then( (response)=> {
                  if(response.data!=="undefined"){
                    this.setState({
                        list:[response.data],
                        search:!this.state.search,
                        searchexp:false
                    })
                  }
                  else{
                    this.setState({
                        searchexp:true
                    })
                  }
                  
                
              })
              .catch( (error)=> {
                  
                this.setState({
                    searchexp:true
                })
              });
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
    

        return (<>
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
          
        <DropdownItem onClick={(eve)=>{this.search()}} >Search by Id</DropdownItem>
        <DropdownItem onClick={(eve)=>{this.date()}} >Search by Date</DropdownItem>
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
               
             return !this.arraycompare(list)?
             
              <DropdownItem onClick={()=>this.addcol(index)} key={index}>{list[list.length-1]}</DropdownItem>:<></>
              
          })}
        
      </DropdownMenu>
    </UncontrolledDropdown>
        </div>
        
            
            
            
            
            <Table bordered hover responsive>
                <thead>
                    <tr>
                    {this.state.current.map((list,index)=>{
                return(
                    <th key={index}>{list[list.length-1]}</th>
                    )
                })}
                    </tr>
                </thead>
            <tbody>
            {this.state.list.map((list,index)=>{
              return(
                <tr key={index}>
                {this.state.current.map((sublist,key)=>{
                    if(!sublist.includes('is_potentially_hazardous_asteroid')){
                 
                        return(
                            <td key={key}>{sublist.length>1?this.renderobject(list,sublist):list[sublist]}</td>
                        )
                    }else{
                        if(list[sublist]){
                            
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


      <Page number={parseInt(this.props.match.params.page)}/>
    </div>
     <div>
    
     <Modal isOpen={this.state.search} toggle={this.search} >
       <ModalHeader toggle={this.search}>Search by ID</ModalHeader>
       <ModalBody>
       <Form onSubmit={(eve)=>{this.query(eve)}}>
      <FormGroup>
 
        <Input type="number" name="query"  id="search" placeholder="Search By Id" />
        {this.state.searchexp?<Badge color="danger" pill>No Results Found</Badge>:<></>}
      </FormGroup>
      <Button color="primary">Submit</Button></Form>   </ModalBody>
       <ModalFooter>
         
         <Button color="secondary" onClick={this.search}>Cancel</Button>
       </ModalFooter>
     </Modal>


     <Modal isOpen={this.state.date} toggle={this.date} >
       <ModalHeader toggle={this.date}>Search by ID</ModalHeader>
       <ModalBody>
       <Form onSubmit={(eve)=>{this.datequery(eve)}}>
      <FormGroup>
 
        <Input type="date" id="startdate" placeholder="enddate" />
        <Input type="date" id="enddate" placeholder="enddate" />
        {this.state.dateexp?<Badge color="danger" pill>No Results Found</Badge>:<></>}
      </FormGroup>
      <Button color="primary">Submit</Button></Form>   </ModalBody>
       <ModalFooter>
         
         <Button color="secondary" onClick={this.date}>Cancel</Button>
       </ModalFooter>
     </Modal>
   </div>
          </>
        );
      
      

   
}
    
       

}

export default Home;






class Page extends React.Component{
constructor(props){
    super(props);
this.state={
    pages:[],
    pagination_display:true
}
this.pagerender=this.pagerender.bind(this);

}

componentDidMount(){
   
}
pagerender(){
    var list=[];
    for(var i=this.props.number-4;i<this.props.number+4;i++)
    {
        
        if(i>0){
            
            
            list.push({"page":i});
        }
    
    }
   return list;
    
}
render()
{
return(
<Pagination className="pagination" style={{display:this.state.pagination_display===true?'flex':'none'}} aria-label="Page navigation example">
     
     <Link to="/page/0"> <PaginationItem >
        <PaginationLink first  />
      </PaginationItem></Link>
      <Link to={"/page/"+this.props.number+1}> 
      <PaginationItem >
        <PaginationLink previous  />
      </PaginationItem></Link>
      {this.pagerender().map(value=>{
          return(
              <Link to={"/page/"+value.page}>
            <PaginationItem {...this.props.number===value.page?"active":""} >
            <PaginationLink >
              {value.page}
            </PaginationLink>
          </PaginationItem>
          </Link>
          )
      })}
      <Link to={"/page/"+parseInt(this.props.number)+1}> 
      <PaginationItem>
        <PaginationLink next  />
      </PaginationItem></Link>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>



)
}
}
