import InputError from '@/Components/ui/InputError.jsx';
import InputLabel from '@/Components/ui/InputLabel.jsx';
import PrimaryButton from '@/Components/ui/PrimaryButton.jsx';
import TextInput from '@/Components/ui/TextInput.jsx';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        verification_code: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[#252550] text-4xl font-bold">Inscription</h1>
                <div className="grid grid-cols-2">
                    <div className="bg-[#6886ab] w-4 h-4 rounded-full rounded-tl-none"></div>
                    <div className="bg-[#252550] w-4 h-4 rounded-full rounded-tr-none"></div>
                    <div className="bg-[#252550] w-4 h-4 rounded-full rounded-bl-none"></div>
                    <div className="bg-[#6886ab] w-4 h-4 rounded-full rounded-br-none"></div>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="first_name" value="Prénom" />
                        <TextInput
                            id="first_name"
                            type="text"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            autoComplete="given-name"
                            onChange={(e) => setData('first_name', e.target.value)}
                            disabled={processing}
                            required
                        />
                        <InputError message={errors.first_name} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel htmlFor="last_name" value="Nom" />
                        <TextInput
                            id="last_name"
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            disabled={processing}
                            required
                        />
                        <InputError message={errors.last_name} className="mt-1" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Adresse e-mail" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="verification_code" value="Code de vérification" />
                    <TextInput
                        id="verification_code"
                        type="text"
                        name="verification_code"
                        value={data.verification_code}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('verification_code', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.verification_code} className="mt-1" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Déjà inscrit ?
                    </Link>

                    <PrimaryButton
                        className={`bg-[#252550] ${processing ? 'opacity-75' : ''}`}
                        disabled={processing}
                        type="submit"
                    >
                        {processing ? 'Inscription en cours...' : "S'inscrire"}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
