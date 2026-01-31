import Checkbox from '@/Components/ui/Checkbox.jsx';
import InputError from '@/Components/ui/InputError.jsx';
import InputLabel from '@/Components/ui/InputLabel.jsx';
import PrimaryButton from '@/Components/ui/PrimaryButton.jsx';
import TextInput from '@/Components/ui/TextInput.jsx';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login.submit'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[#252550] text-4xl font-bold">Connexion</h1>
                <div className="grid grid-cols-2">
                    <div className="bg-[#6886ab] w-4 h-4 rounded-full rounded-tl-none"></div>
                    <div className="bg-[#252550] w-4 h-4 rounded-full rounded-tr-none"></div>
                    <div className="bg-[#252550] w-4 h-4 rounded-full rounded-bl-none"></div>
                    <div className="bg-[#6886ab] w-4 h-4 rounded-full rounded-br-none"></div>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Adresse e-mail" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            disabled={processing}
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Se souvenir de moi
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={route('register.form')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Pas encore inscrit ?
                    </Link>

                    <PrimaryButton
                        className={`bg-[#252550] ${processing ? 'opacity-75' : ''}`}
                        disabled={processing}
                        type="submit"
                    >
                        {processing ? 'Connexion en cours...' : 'Se connecter'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

