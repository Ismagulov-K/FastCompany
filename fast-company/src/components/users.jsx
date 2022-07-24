import React, {useState} from "react"
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll);
    // const usersArray = api.users.fetchAll();

    const generatePhrase = (count) => {
        let text = '';
        if (count >= 5 || count == 1){
            text = 'человек тусанет с тобой сегодня'
        }else if(count <= 4 && count > 1){
            text = 'человека тусанут с тобой сегодня'
        }else if(count == 0){
            text = 'Никто не тусанет с тобой :('
        }
        return text;
    };

    const getBadgeClasses = (count) => {
        let classes = "badge m-2 fs-4 fw-bolder ";
        classes += count === 0 ? "bg-danger" : "bg-primary";
        return classes;
    };

    const titleSpan = (count) =>{
        if (count > 0){
            return <span className={getBadgeClasses(count)}>{count} {generatePhrase(count)}</span>
        }
        return <span className={getBadgeClasses(count)}>{generatePhrase(count)}</span>

    };


    const renderQualities = (qualities) => {
        return qualities.map((i) => (
            <span className={`badge m-2 bg-${i.color}`} key={i._id}>{i.name}</span>

        ))

    };

    const handleDelete = (id) => {
        setUsers(users.filter(user => user._id !== id))
    };


    const tableBody = (usersArray) => {
        return (
            usersArray.map((user) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{renderQualities(user.qualities)}</td>
                    <td>{user.profession.name }</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                        <button className="btn btn-sm m-2 btn-danger"
                                onClick={() => handleDelete(user._id)}>
                                Delete
                        </button>
                    </td>
                </tr>
            ))
        )
    };


    return (
        <>
            {titleSpan(users.length)}
            {!!users.length && <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Удалить</th>
                    </tr>
                </thead>
                <tbody>
                  {tableBody(users)}
                </tbody>
            </table>
            }
        </>
    )
};

export default Users;