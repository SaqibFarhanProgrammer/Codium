export default function Profile() {
  const user = {};

  const userBlogs = [
    {
      id: 1,
      title: 'Why Clean UI Matters More Than Fancy Design',
      description:
        'Clean interfaces reduce cognitive load and help users focus on what actually matters.',
      readTime: '4 min read',
    },
    {
      id: 2,
      title: 'React Component Architecture Explained',
      description: 'A practical way to structure React components for scalability and reuse.',
      readTime: '6 min read',
    },
    {
      id: 3,
      title: 'Glassmorphism Done Right',
      description: 'Glass UI should enhance focus, not distract users with noise.',
      readTime: '3 min read',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <img
          src={
            user.avatar
              ? user.avatar
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHG7RXDNemVraC50-CavzN5eUYCgzYAp9DA&s'
          }
          alt="Profile"
          className="rounded-full object-cover h-20 2-20"
        />

        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">
            {user.name ? user.name : 'no name'}
          </h1>
          <p className="text-zinc-500 text-sm mt-2">{userBlogs.length} published posts</p>
        </div>
      </div>

      {/* User Blogs */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-100 mb-8">Your Articles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userBlogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold text-zinc-100 mb-2">{blog.title}</h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{blog.description}</p>

              <p className="text-xs text-zinc-500">{blog.readTime}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
