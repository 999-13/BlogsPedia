import UserDrafts from '@/app/ui/userDrafts';
import ProfileNav from '@/app/ui/navbar/ProfileNav'
export default function page({ children }) {
  return (
    <section className="text-black">
      
      <div className="flex justify-center items-center min-h-screen">
        <UserDrafts/>
      </div>
      
    </section>
  );
}