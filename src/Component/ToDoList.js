import React ,{Component}from 'react';
import {Modal,ModalBody,ModalHeader, Button, Form, FormGroup, Label, Input, Col} from 'reactstrap'
//import { list } from '../shared/list';
import Switch from "react-switch";


class Todo extends Component{
  constructor(props){
    super(props)
    this.state = {
      isToDo:true,
    
      selectedIndex:-1,
      listItems:this.returnList(),
     
      currentItem:{ 
      work:"",
      date:"",
      time:""
      }

    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
   
  }
  toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    })
}
  handleChange( isToDo) {
    this.setState({
      isToDo: !this.state.isToDo
  })
  }
  handleInputChange= e =>{
    
    this.setState({
      currentItem:{
        work:e.target.name === "work" ? e.target.value : this.state.currentItem.work,
        date:e.target.name === "date" ? e.target.value : this.state.currentItem.date,
        time:e.target.name === "time" ? e.target.value : this.state.currentItem.time,
      }
    
    })
   
  }
  handleSubmit = e =>{
   
  
    this.onAdd(this.state.currentItem)
    this.toggleModal()
    e.preventDefault()
   
  }
 returnList=() => {
   if(localStorage.getItem('works')== null)
      localStorage.setItem('works',JSON.stringify(this.state.currentItem))
      
    return JSON.parse(localStorage.getItem('works'))
 }
 onAdd=(data)=>{
   console.log(this.state.selectedIndex)
  
   if( this.state.selectedIndex === -1){
      let list = this.returnList()
      list.push(data)
      localStorage.setItem('works',JSON.stringify(list))
      this.setState({
        listItems:list,
        currentItem:{
        work:"",
        date:"",
        time:""
        }

      })  
    }else if( this.state.selectedIndex !== -1){
      this.Update()
    }
    
   
 }
 handleDelete = (index) => {
  var list = this.returnList()
  list.splice(index, 1);
  localStorage.setItem('works', JSON.stringify(list))
  this.setState( { listItems:list})
}
 handleEdit = (index) =>{
  var retrieve = this.state.listItems[index]
   this.setState({
     selectedIndex:index,
     currentItem:{
      work:retrieve.work,
      date:retrieve.date,
      time:retrieve.time
     } 
   })
   this.toggleModal()
 
 }

Update=()=>{
  
    let listToUpdate = this.returnList()
   // listToUpdate.splice(this.state.selectedIndex,0,this.state.currentItem)
    listToUpdate[this.state.selectedIndex].work=this.state.currentItem.work
    listToUpdate[this.state.selectedIndex].date=this.state.currentItem.date
    listToUpdate[this.state.selectedIndex].time=this.state.currentItem.time
    console.log( listToUpdate)
    localStorage.setItem('works', JSON.stringify(listToUpdate))
    this.setState( { 
      listItems:listToUpdate,
      selectedIndex:-1,
      currentItem:{
        work:"",
        date:"",
        time:""
        }
    })
  
  

}
 
  render(){
  return (
    
      <div className='container'>
       
     {/* -----------------------------------toggleButton-----------------------------------  */}
      <label>
      <span className="fa fa-list-alt fa-2x ">&nbsp; </span>
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
      
       {/* -----------------------------------HeadLine & Add Button-----------------------------------  */}
        {this.state.isToDo ? <div className="row mb-10"><h1 className="col-5 col-sm-8"> to-do-list</h1><button className=" btn btn-primary  rounded-circle ml-auto" onClick={this.toggleModal}><i className="fa fa-plus  fa-lg"  ></i></button></div> : <h1> Data Table</h1>}
        {/* -----------------------------------Table-----------------------------------  */}
        <div className="table-responsive">
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Work</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            {this.state.isToDo && <th  scope="col">Update/Delete</th> }
          </tr>
          </thead>
          <tbody>
            {
              this.state.listItems.map((item,index)=>{
              return <tr key={index}>
              {this.state.isToDo ?<td>{item.work}</td> : <td></td>}
              {this.state.isToDo ?<td>{item.date}</td> : <td></td>}
              {this.state.isToDo ?<td>{item.time}</td> : <td></td>}
              {this.state.isToDo && <td>
                <button className='btn btn-warning' onClick={()=>this.handleEdit(index)}><i className=" fa fa-pencil "></i></button>
                &nbsp;
                <button className='btn btn-danger' onClick={()=>this.handleDelete(index)}><i className="fa fa-trash"></i></button>
              </td> }
            </tr>
              })
            }
            
          </tbody>
        </table>
         {/* -----------------------------------Modal to Add new Item-----------------------------------  */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Add New Item</ModalHeader>
            <ModalBody>
            <div className="row row-content">
                   
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="work" md={4}>Work to do</Label>
                                <Col md={8}>
                                    <Input type="text" id="work" name="work"
                                        placeholder="work"
                                        value={this.state.currentItem.work}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="date" md={4}>Date</Label>
                                <Col md={8}>
                                    <Input type="date" id="date" name="date"
                                        placeholder="date"
                                        value={this.state.currentItem.date}
                                        onChange={this.handleInputChange} />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="time" md={4}>Time</Label>
                                <Col md={8}>
                                    <Input type="time" id="time" name="time"
                                        placeholder="Time"
                                        value={this.state.currentItem.time}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            
                            
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Add
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
               </div>

            </ModalBody>
            </Modal>
        
        </div>
        
       
      </div>
   
      
  );
}
}

export default Todo;
