import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const { signIn, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignin = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result.user);

                navigate(location?.state ? location.state : '/');

            })
            .catch(error => {
                console.error(error);
            })
    }
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            // Save user info to MongoDB
            saveUserToDatabase(result.user);
            navigate(location?.state ? location.state : "/");
        } catch (error) {
            console.error("Google sign in error:", error);
        }
    };

    const saveUserToDatabase = (user) => {
        fetch('https://contesthub-server-gules.vercel.app/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                displayName: user.displayName,
                email: user.email,
                role: 'user'
                
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('User saved to database', data);
        })
        .catch(error => {
            console.error('Error saving user to database', error);
        });
    };
    // const handleGithubSignIn = async () => {
    //     try {
    //         await signInWithGithub();
    //         navigate(location?.state ? location.state : "/");
    //     } catch (error) {
    //         console.error("Github sign in error:", error);
    //     }
    // };
    return (
        <div className="container mx-auto lg:px-20 px-5 py-5">
            <div>
                <h2 className="text-3xl my-10 text-center">Please Login</h2>
                <form onSubmit={handleSignin} className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" required name="email" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" required name="password" placeholder="Password" className="input input-bordered" />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="text-center mt-4 flex gap-2 justify-center">
                    <button onClick={handleGoogleSignIn} className="btn btn-ghost"><FcGoogle />
                        Login with Google</button>
                    {/* <button onClick={handleGithubSignIn} className="btn btn-primary">Login with Github</button> */}
                </div>
                <p className="text-center mt-4">Do not have an account Please <Link className="text-purple-500 font-bold" to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;