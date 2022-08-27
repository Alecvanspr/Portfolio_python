import renderer from 'react-test-renderer';
import { render, screen} from "@testing-library/react"
import TransactionRow from '../../components/TransactionRow';

it('', ()=>{
    //Arrange
    const item = {
        naam:"Nieuw item",
        datum: Date.now(),
        type:"Inkomsten",
        bedrag:33.00
    }
    
    render(
        <TransactionRow
            item = {item}
            editItem = {(item)=>{console.log("edit "+item.naam)}}
            handleDelete = {(item)=>{console.log("delete "+item.naam)}}
        ></TransactionRow>
    )    
})