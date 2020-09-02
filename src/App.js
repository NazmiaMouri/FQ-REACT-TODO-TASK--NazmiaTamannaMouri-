import React ,{Component}from 'react';
import Switch from "react-switch";
import './App.css';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      isToDo:true
    }
    this.handleChange = this.handleChange.bind(this);
   
  }
  handleChange( isToDo) {
    this.setState({
      isToDo: !this.state.isToDo
  })
  }
  
 
  render(){
  return (
    <div className="App">
      <div className='container'>
      
      <label>
      <span class="fa fa-list-alt fa-2x ">&nbsp; </span>
      <Switch
            onChange={this.handleChange}
            checked={this.state.isToDo}
            uncheckedIcon={
              <div className="rounded-pill"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width:"100%",
                  fontSize: 10,
                  color: "white",
                  paddingRight: 2
                }}
              >
               Data
              </div>
            }
          />
      </label>
      
      
        {this.state.isToDo ? <div className="row mb-10"><h1 className="col-5 col-sm-8"> to-do-list</h1><button className=" btn btn-primary  rounded-circle ml-auto"><i className="fa fa-plus  fa-lg"  ></i></button></div> : <h1> Data Table</h1>}
        <div class="table-responsive">
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Work</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            {this.state.isToDo && <th  scope="col">Update/Delete</th> }
          </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>eat</td>
              <td>5/6/90</td>
              <td>12:00</td>
              {this.state.isToDo && <td>
                <button className='btn btn-warning'><i className=" fa fa-pencil "></i></button>
                &nbsp;
                <button className='btn btn-danger'><i className="fa fa-trash"></i></button>
              </td> }
            </tr>
          </tbody>
         
        
              
        </table>
        
        </div>
        
       
      </div>
    </div>
      
  );
}
}

export default App;
