import ProfileNav from '@/app/ui/navbar/ProfileNav';
import Editor from '@/app/ui/Editor'
export default function page({ children }) {
    return (
        <section className="text-black font-Roboto">
            
            <div className="flex justify-center items-center min-h-screen">
                <Editor />
            </div>
        </section>
    );
}