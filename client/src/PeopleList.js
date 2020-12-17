import React, { useState, useEffect} from "react";
import axios from "axios";
import Person from "./Person";

class PeopleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            people: {},
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/get_fam')
            .then((res) =>{
                this.setState({data: res.data.map(person => {
                    return {
                        firstName: person.first_name,
                        surname: person.last_name,
                    }
                })})
                console.log(this.state.data);
            })
    }

    render() {
        return <div>
            {
                this.state.data.map(
                    (person) => {
                        return <Person
                                firstname={person.firstName}
                                lastname={person.surname}
                                />
                    }
                )
            }
        </div>
    }
}

export default PeopleList;