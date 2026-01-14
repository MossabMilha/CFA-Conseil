import InputError from '@/Components/ui/InputError.jsx';
import InputLabel from '@/Components/ui/InputLabel.jsx';
import PrimaryButton from '@/Components/ui/PrimaryButton.jsx';
import TextInput from '@/Components/ui/TextInput.jsx';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
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
            const response = await axios.post('registerAdmin', formData);
            // Handle successful registration
            window.location.href = response.data.redirect || '/blogs';
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ email: error.response?.data?.message || 'An error occurred during registration.' });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[#252550] text-4xl font-bold">Register.</h1>
                <div className="grid grid-cols-2">
                    <div className='bg-[#6886ab] w-4 h-4 rounded-full rounded-tl-none'></div>
                    <div className='bg-[#252550] w-4 h-4 rounded-full rounded-tr-none'></div>
                    <div className='bg-[#252550] w-4 h-4 rounded-full rounded-bl-none'></div>
                    <div className='bg-[#6886ab] w-4 h-4 rounded-full rounded-br-none'></div>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="first_name" value="First Name" />
                        <TextInput
                            id="first_name"
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            className="mt-1 block w-full"
                            autoComplete="given-name"
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputError message={errors.first_name} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputError message={errors.last_name} className="mt-1" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={handleChange}
                        disabled={processing}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleChange}
                        disabled={processing}
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleChange}
                        disabled={processing}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="verification_code" value="Verification Code" />
                    <TextInput
                        id="verification_code"
                        type="text"
                        name="verification_code"
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={processing}
                    />
                    <InputError message={errors.verification_code} className="mt-1" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton
                        className={`bg-[#252550] ${processing ? 'opacity-75' : ''}`}
                        disabled={processing}
                        type="submit"
                    >
                        {processing ? 'Registering...' : 'Register'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
