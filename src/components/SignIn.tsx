import React, { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import appFirebase, { db } from '@config/firebase'
import { collection, getDoc, getDocs, query, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
const auth = getAuth(appFirebase)

interface IFormSignUp {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

function SignIn () {
  //   const navigate = useNavigate()
  const [registering, setRegistering] = useState(false)
  const [text, setText] = useState(false)
  const [formData, setFormData] = useState<IFormSignUp>({
    fullname: '',
    username: '',
    email: '',
    password: ''
  })
  const { register, formState: { errors }, handleSubmit } = useForm<IFormSignUp>()
  const onSubmit: SubmitHandler<IFormSignUp> = data => {
    console.log(data)
    if (registering) {
      addDoc(collection(db, 'users'), { data })
      setFormData({
        fullname: '',
        username: '',
        email: '',
        password: ''
      })
      // createUserWithEmailAndPassword(auth, data.email, data.password)
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
    }
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {registering ? 'Sign Up' : 'Sign in to your account'}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                {registering
                  ? (
                    <>
                      <div className='mb-4'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Full Name</label>
                        <input
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          type="text"
                          placeholder="Full name"
                          minLength={8}
                          {...register('fullname',
                            {
                              required: 'Full name is required',
                              pattern: {
                                value: /^[a-zA-Z]{8,}$/,
                                message: 'Full name is not valid'
                              }
                            })}
                            value={formData.fullname} // Establece el valor desde el estado
                            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                            />
                      </div><p className='mt-2 text-xs text-red-600 dark:text-red-400'>
                        {errors.fullname && (errors.fullname as any).message}
                      </p><div>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                        <input
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          id='username'
                          type='text'
                          placeholder='Username'
                          minLength={8}
                          {...register('username',
                            {
                              required: 'Username is required'
                            })}
                            value={formData.username} // Establece el valor desde el estado
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />

                      </div><p className='mt-2 text-xs text-red-600 dark:text-red-400'>
                        {errors.username && (errors.username as any).message}
                      </p>
                    </>
                    )
                  : null}
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id='email'
                    type='email'
                    placeholder='Email'
                    {...register('email',
                      {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: 'Email is not valid'
                        }
                      })}
                      value={formData.email} // Establece el valor desde el estado
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <p className='mt-2 text-xs text-red-600 dark:text-red-400'>
                  {errors.email && (errors.email as any).message}
                </p>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id='password'
                    type='password'
                    placeholder='Password'
                    {...register('password',
                      {
                        required: 'Password is required',
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-]).{8,}$/,
                          message: 'Password is not valid'
                        }
                      })}
                      value={formData.password} // Establece el valor desde el estado
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <p className='mt-2 text-xs text-red-600 dark:text-red-400'>
                  {errors.password && (errors.password as any).message}
                </p>
                <div>
                  <p>{text}</p>
                </div>
                <div>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {registering ? 'Register' : 'Log In'}
                  </button>
                  <h2>
                    {registering ? 'f you already have an account  ' : 'if you don´t have an account  '}
                    <button
                      className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
                      onClick={() => setRegistering(!registering)}>{registering ? 'Log In' : 'Register'}</button>
                  </h2>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignIn
