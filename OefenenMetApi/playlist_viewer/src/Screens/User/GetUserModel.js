import axios from "axios";
import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'

export default function GetUserModel(props){
    const URL = "https://api.spotify.com/v1/me"
    const {token} = props
    const[user,setUser] = useState([])
    const[toggle,setToggle] = useState(false)

    const getUser = async() => {
        const {data} = await axios.get(URL,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params: {
                
            }
        })
        setUser(data)
    }
    const getImage= () => {
        if(user.images>0){
            return(
                <img href={user.images[0].url} />
            )
        }
    }
    const getFormItem=(label,item)=>{
        if(item){
            try{
            return(
                <FormGroup className="row">
                        <label for={"Display-"+label} className="col-3">{label}</label>
                        <Input 
                            id={"Display-"+label}
                            className="col-5"
                            value={item}
                        />
                    </FormGroup>
            )
            }catch(err){
            console.log(err)
            }
    }
    }

    const changeToggle= () =>{
        setToggle(!toggle)
    }

    getUser()
    return(
        <div>
            <button className="spotify_btn" onClick={() => changeToggle()}>{user.display_name}</button>
        
        <Modal isOpen={toggle} toggle={()=>changeToggle()}>
            <ModalHeader toggle={()=>changeToggle()}>
                Profiel
            </ModalHeader>
            <ModalBody>
                {() => getImage()}
                <Form>
                    {getFormItem("Naam:", user.display_name)}
                    {getFormItem("Email:", user.email)}
                    {getFormItem("Country:", user.country)}
                    {getFormItem("Followers:", user.followers.total)}
                    {getFormItem("Product:", user.product)}
                    {getFormItem("Type:", user.type)}

                </Form>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </Modal>
        
        
        </div>
    )
}