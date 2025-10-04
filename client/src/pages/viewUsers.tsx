import { useState, useEffect } from "react";
import { getUsers } from "../services/users.service";

interface IUser {
  _id: string;
  name: string;
  age: number;
  about: string;
}

export const ViewUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-8 text-gray-700">Loading users...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">All Users</h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex flex-col sm:flex-row justify-between p-4 border border-gray-200 rounded-2xl shadow hover:shadow-md bg-white transition"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-gray-800">Name: {user.name}</p>
                <p className="text-gray-700">Age: {user.age}</p>
              </div>
              <div className="italic text-gray-600">{user.about}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
