import PublicBlogs from '@/app/ui/PostBlogs';
// import RelatedBlogs from "@/app/ui/RelatedBlogs"

export default function page({ params }) {
  return (
    <>
      <section className="text-black">
        <PublicBlogs  id={params._id}/>
      </section>
      {/* <div>
        <RelatedBlogs />
      </div> */}
    </>
  );
}