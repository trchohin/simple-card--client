import React, { use, useState } from 'react';

const Users = ({ userPromise }) => {
    const initialUsers = use(userPromise);
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = { name, email };
        console.log(newUser);

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    newUser._id = data.insertedId;
                    const newUsers = [...users, newUser]
                    setUsers(newUsers)
                    alert("user added successfully")
                    e.target.reset();
                    console.log('data after creating user in db ', data);
                }
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    const handleDeleteUser = (id) =>{
        console.log("delete this user",id);
        fetch(`http://localhost:3000/users/${id}`,{
            method:'DELETE'
        })
        .then(res =>res.json() )
        .then(data => {
            console.log("after delte",data)
        }
        )
        
    }

    return (
        <div>
            <div>
                <h2>Add User</h2>
                <form onSubmit={handleAddUser}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" required />
                    <br /><br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required />
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <h3>User List</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {users.map(user => (
                        <li key={user._id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            padding: '8px',
                            marginBottom: '6px',
                            borderRadius: '4px'
                        }}>
                            <span>{user.name} : {user.email}</span>
                            <button
                                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer' }}
                                onClick={() => handleDeleteUser(user._id)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Users;
