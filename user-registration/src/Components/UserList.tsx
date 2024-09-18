import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registrationDate: string;
}

const UserList: React.FC = () => {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:5000/users");
      const sortUsers = response.data.sort(
        (a: User, b: User) =>
          new Date(b.registrationDate).getTime() -
          new Date(a.registrationDate).getTime()
      );
      setUser(sortUsers);
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold">User List</h1>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-gray-100 mb-2">
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{new Date(user.registrationDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
