import LoginForm from '@/app/ui/login';
export default function page({ children }) {
  return (
    <section className="text-black">
      <LoginForm />
    </section>
  );
}