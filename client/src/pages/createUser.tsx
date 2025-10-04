import { useState } from "react";
import { createUser } from "../services/users.service";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !about) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await createUser({ name, age: Number(age), about });
      setMessage(res.message);
      setName("");
      setAge("");
      setAbout("");
    } catch (err: any) {
      setMessage("Error creating user: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 md:p-8 shadow-lg rounded-2xl mt-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Create User
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/** Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label htmlFor="name" className="w-full sm:w-24 text-gray-700 font-medium">
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/** Age */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label htmlFor="age" className="w-full sm:w-24 text-gray-700 font-medium">
              Age:
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/** About */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label htmlFor="about" className="w-full sm:w-24 text-gray-700 font-medium">
              About:
            </label>
            <input
              id="about"
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/** Submit */}
          <div className="flex justify-center sm:justify-end mt-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
              type="submit"
            >
              Create User
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center sm:text-left text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
