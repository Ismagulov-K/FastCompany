import React, {useState} from "react"
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll);

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
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

            <h2>
                <span
                    className={"badge m-2 " + (users.length > 0 ? "bg-primary" : "bg-danger")}>
                  {users.length > 0
                      ? `${
                          users.length + " " + renderPhrase(users.length)
                      } с тобой сегодня`
                      : "Никто с тобой не тусанет :("}
                </span>
            </h2>
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