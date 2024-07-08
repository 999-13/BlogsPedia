import UserProfile from '@/app/ui/UserProfile';
import ProfileNav from '@/app/ui/navbar/ProfileNav';
export default function page({ children }) {
  return (
    <>
    <div className="text-black">
      <UserProfile />
    </div>
    </>
  );
}