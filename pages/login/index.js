import LoginForm from 'components/admin/login/LoginForm';
import Layout from 'components/layout';

export default function Login() {
    return (
        <div className="bg-gradient-to-r from-green-300 via-teal-500 to-emerald-600 dark:bg-gradient-to-r dark:from-green-800 dark:via-teal-900 dark:to-emerald-800">
            <div className="flex lg:flex-row justify-center min-h-screen items-center">
                <LoginForm />
            </div>
        </div>
    );
}



Login.getLayout = function getLayout(page) {
    return (
        <Layout>
         {page}
        </Layout>
    );
};
