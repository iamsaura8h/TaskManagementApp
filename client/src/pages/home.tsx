// pages/home.tsx
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-5xl font-bold mb-4">Welcome to MERN Minima</h1>
            <div className='flex flex-row gap-2'>
                <div
                    className="bg-slate-300 text-4xl rounded-xl p-4 text-black cursor-pointer"
                    onClick={() => navigate('/createUser')}
                >
                    Create User
                </div>
                <div
                    className="bg-slate-300 text-4xl rounded-xl p-4 text-black cursor-pointer"
                    onClick={() => navigate('/viewUsers')}
                >
                    View Users
                </div>
            </div>

            </div>
        </div>
    );
}

export default Home;