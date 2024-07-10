import React, { useState } from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Welcome Back!</h2>
          <p className="text-center mb-4">Please sign in to continue</p>
          <div className="flex justify-center">
            <a href="http://localhost:5000/auth/google" className="btn btn-primary w-full">Login with Google</a>
          </div>
          <div className="collapse collapse-arrow bg-base-200 mt-4">
            <input type="radio" name="login-method" defaultChecked />
            <div className="collapse-title text-xl font-medium">Login with Email</div>
            <div className="collapse-content">
              <input type="email" placeholder="Email" className="input input-bordered w-full mb-2" />
              <input type="password" placeholder="Password" className="input input-bordered w-full mb-2" />
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 mt-4">
            <input type="radio" name="login-method" />
            <div className="collapse-title text-xl font-medium">Login with Facebook</div>
            <div className="collapse-content">
              <button className="btn btn-primary w-full">Login with Facebook</button>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>Don't have an account? <a href="/register" className="text-blue-500">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
