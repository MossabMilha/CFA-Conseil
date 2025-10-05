import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        
        try {
            const response = await axios.post('login', {
                email: formData.email,
                password: formData.password,
                remember: formData.remember
            });
            
            // Handle successful login (Inertia will handle the redirect based on the response)
            window.location.href = response.data.redirect || '/dashboard';
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Validation errors
                setErrors(error.response.data.errors || {});
            } else {
                // Other errors
                setErrors({ email: error.response?.data?.message || 'An error occurred during login.' });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[#252550] text-4xl font-bold">Login.</h1>
                <div className="grid grid-cols-2">
                    <div className='bg-[#6886ab] w-4 h-4 rounded-full rounded-tl-none'></div>
                    <div className='bg-[#252550] w-4 h-4 rounded-full rounded-tr-none'></div>
                    <div className='bg-[#252550] w-4 h-4 rounded-full rounded-bl-none'></div>
                    <div className='bg-[#6886ab] w-4 h-4 rounded-full rounded-br-none'></div>
                </div>
            </div>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleChange}
                        disabled={processing}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleChange}
                        disabled={processing}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton 
                        className={`bg-[#252550] ${processing ? 'opacity-75' : ''}`}
                        disabled={processing}
                        type="submit"
                    >
                        {processing ? 'Logging in...' : 'Log in'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
