function ProfileCard({ name, role, favoriteTopic }) {
  return (
    <article className="profile-card">
      <h3>{name}</h3>
      <p>{role}</p>
      <small>Favorite topic: {favoriteTopic}</small>
    </article>
  );
}

export default function PropsDemo() {
  return (
    <div className="demo-grid">
      <ProfileCard name="Asha" role="Frontend beginner" favoriteTopic="JSX" />
      <ProfileCard
        name="Rahul"
        role="Learning React state"
        favoriteTopic="useState"
      />
      <ProfileCard
        name="Mina"
        role="Building mini projects"
        favoriteTopic="Forms"
      />
    </div>
  );
}
